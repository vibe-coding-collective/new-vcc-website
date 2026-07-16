import { describe, expect, it } from 'vitest'
// Vite `?raw` import — the section's bytes exactly as they sit on disk and exactly
// as the include plugin will paste them into dist (see vite.config.ts).
import html from './sections/03-stats.html?raw'

/**
 * Regression guard for the §03 "Countries" flag row.
 *
 * Unlike the other tests here (which unit-test TS modules), this one asserts on
 * section MARKUP. That is deliberate: nothing else in the gate protects that row.
 * eslint doesn't lint HTML, tsc never sees it, and the Vite include plugin copies
 * its bytes into dist verbatim.
 *
 * The row is fragile in a way that is invisible to a human reviewer. England and
 * Scotland are TAG SEQUENCES (U+1F3F4 + 6 tag chars + U+E007F cancel), so the run
 * carries 12 zero-width tag characters. Strip them — a formatter, or an agent
 * "cleaning up stray characters" — and each collapses to a bare black flag 🏴:
 * two identical black flags, on an `aria-hidden` row, in a diff that looks
 * unchanged. Invisible to the gate, to assistive tech, and to code review.
 *
 * IMPORTANT: a grapheme count alone does NOT catch that. 🏴 is still one grapheme,
 * so a tag-stripped run still counts exactly 10 (likewise, half-eating a
 * regional-indicator pair leaves the count at 10). The well-formedness tests below
 * are the load-bearing ones; the count guards a different thing — the row matching
 * the "10" stat rendered beside it.
 */

const FLAG_ROW_RE = /<p class="[^"]*\bs-stats__flags\b[^"]*"[^>]*>([^<]+)<\/p>/

const BLACK_FLAG = 0x1f3f4
const TAG_BASE = 0xe0000
const TAG_CANCEL = 0xe007f
const RI_FIRST = 0x1f1e6 // REGIONAL INDICATOR SYMBOL LETTER A
const RI_LAST = 0x1f1ff // REGIONAL INDICATOR SYMBOL LETTER Z

const codePointsOf = (s: string): number[] => [...s].map((c) => c.codePointAt(0) ?? 0)

const graphemesOf = (s: string): string[] =>
  [...new Intl.Segmenter('en', { granularity: 'grapheme' }).segment(s)].map(
    (entry) => entry.segment,
  )

/** True for a two-char regional-indicator pair, e.g. 🇺🇸. */
const isRegionalIndicatorPair = (grapheme: string): boolean => {
  const cps = codePointsOf(grapheme)
  return cps.length === 2 && cps.every((cp) => cp >= RI_FIRST && cp <= RI_LAST)
}

/** "🏴󠁧󠁢󠁥󠁮󠁧󠁿" → "gbeng". Returns null unless it is a well-formed tag sequence. */
const subdivisionOf = (grapheme: string): string | null => {
  const cps = codePointsOf(grapheme)
  if (cps[0] !== BLACK_FLAG) return null
  if (cps.length < 3) return null
  if (cps[cps.length - 1] !== TAG_CANCEL) return null
  const tags = cps.slice(1, -1)
  if (!tags.every((cp) => cp > TAG_BASE && cp < TAG_CANCEL)) return null
  return tags.map((cp) => String.fromCharCode(cp - TAG_BASE)).join('')
}

const readFlagRow = (): string => {
  const match = html.match(FLAG_ROW_RE)
  if (!match) {
    throw new Error(
      'Could not find the flag row (<p class="… s-stats__flags …">) in ' +
        'src/sections/03-stats.html — the guard below cannot run.',
    )
  }
  return match[1]
}

describe('§03 stats — Countries flag row', () => {
  const flags = graphemesOf(readFlagRow())

  it('carries exactly 10 flags, matching the "10" Countries stat beside it', () => {
    expect(flags).toHaveLength(10)
  })

  it('contains only well-formed flags — no half-eaten pairs, no stripped tag chars', () => {
    const malformed = flags.filter(
      (flag) => !isRegionalIndicatorPair(flag) && subdivisionOf(flag) === null,
    )
    expect(malformed).toEqual([])
  })

  it('still carries the England and Scotland tag sequences', () => {
    const subdivisions = flags
      .map(subdivisionOf)
      .filter((code): code is string => code !== null)
    expect(subdivisions).toEqual(['gbeng', 'gbsct'])
  })
})
