import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
// Vite `?raw` import — the section's bytes exactly as they sit on disk and exactly as
// the include plugin will paste them into dist (see vite.config.ts).
import html from './sections/06-for-city-leaders.html?raw'

// The CSS is read from disk rather than imported: vitest stubs CSS modules (`css: false`
// by default), so `…css?raw` resolves to an EMPTY string here and every assertion below
// would vacuously pass. Reading the bytes also means we assert on the AUTHORED source,
// not on anything a transform might rewrite. (`fileURLToPath(import.meta.url)` is not an
// option: the happy-dom environment replaces the global URL constructor.)
const fromRoot = (...parts: string[]): string => resolve(process.cwd(), ...parts)

// Comments are stripped before any assertion, for two reasons: they contain braces
// (e.g. the note quoting base.css's `img { max-width: 100% }`), which would truncate a
// `[^}]*` rule-body match; and prose mentioning a value must never be able to satisfy —
// or falsify — an assertion about the declarations.
const css = readFileSync(fromRoot('src/styles/sections/06-for-city-leaders.css'), 'utf8')
  .replace(/\/\*[\s\S]*?\*\//g, '')

/**
 * Regression guard for the §06 team block.
 *
 * Same rationale as §03's flag-row guard: nothing else in the gate protects this.
 * eslint doesn't lint HTML or CSS, tsc never sees them, and the include plugin copies
 * the markup into dist verbatim. What makes this block worth guarding is that its
 * failure modes are all SILENT — the page still renders, nothing throws, and the diff
 * looks harmless:
 *
 *  - Per-person face framing lives in a CSS table keyed by a `fcl-member--<slug>`
 *    modifier on each card. Drop or rename the class on EITHER side and that person
 *    silently falls back to the default framing (the whole person, not their face) —
 *    which is exactly the bug the operator reported. The cross-file test below is the
 *    only thing tying the two halves together.
 *  - `.fcl-avatar-img { max-width: none }` counteracts base.css's global
 *    `img { max-width: 100% }`. Without it the oversized photos are clamped back to the
 *    window width and every face re-crops wrongly. Found the hard way during the build.
 *  - "Creative Technologist" is a deliberate DIVERGENCE from the original's "Creative
 *    Technologies" (operator-directed). An agent "restoring fidelity" would regress it.
 */

const PEOPLE_WITH_MEASURED_FRAMING = [
  'dan', 'sofiia', 'abhinav', 'cavan', 'liberatus', 'joseph',
  'erika', 'luisa', 'flien', 'eric', 'uvin', 'poppy',
] as const

const ADDED_PEOPLE = ['maitri', 'cherry', 'volunteer'] as const

const cardsOf = (listClass: string): string[] => {
  const list = html.match(new RegExp(`<ul class="${listClass}">([\\s\\S]*?)</ul>`))
  if (!list) throw new Error(`Could not find <ul class="${listClass}"> in §06 markup.`)
  return list[1].split(/(?=<li class="fcl-member)/).filter((c) => c.includes('fcl-member'))
}

const assetPath = (file: string): string =>
  fromRoot('public/assets/for-city-leaders', file)

describe('§06 team — roster', () => {
  it('has 2 founders and 13 members (12 from the original + 3 operator-added)', () => {
    expect(cardsOf('fcl-founders')).toHaveLength(2)
    expect(cardsOf('fcl-members')).toHaveLength(13)
  })

  it('keeps the "Maybe you?" recruitment card LAST', () => {
    const members = cardsOf('fcl-members')
    expect(members[members.length - 1]).toContain('fcl-member--volunteer')
  })
})

describe('§06 team — per-person face framing (measured from the original)', () => {
  const allCards = [...cardsOf('fcl-founders'), ...cardsOf('fcl-members')]

  it.each(PEOPLE_WITH_MEASURED_FRAMING)(
    'card for "%s" carries its modifier class AND a matching CSS ratio rule',
    (slug) => {
      // HTML side: exactly one card claims this person.
      const claiming = allCards.filter((c) => c.includes(`fcl-member--${slug}"`))
      expect(claiming).toHaveLength(1)

      // CSS side: that class actually sets the framing custom properties.
      const rule = css.match(new RegExp(`\\.fcl-member--${slug}\\s*\\{([^}]*)\\}`))
      expect(rule, `no CSS ratio rule for fcl-member--${slug}`).not.toBeNull()
      for (const prop of ['--fcl-photo-w', '--fcl-photo-h', '--fcl-photo-x', '--fcl-photo-y']) {
        expect(rule?.[1], `${slug} is missing ${prop}`).toContain(prop)
      }
    },
  )

  it('reproduces Joseph\'s smaller 117.944 squircle (the original\'s only odd window)', () => {
    const rule = css.match(/\.fcl-member--joseph\s*\{([^}]*)\}/)
    expect(rule?.[1]).toContain('--fcl-win: .5897')
  })

  it('keeps `max-width: none` on the photo (base.css would clamp it to the window)', () => {
    const rule = css.match(/\.fcl-avatar-img\s*\{([^}]*)\}/)
    expect(rule?.[1]).toContain('max-width: none')
  })

  it('never stretches a face: the photo is object-fit:cover, not fill', () => {
    const rule = css.match(/\.fcl-avatar-img\s*\{([^}]*)\}/)
    expect(rule?.[1]).toContain('object-fit: cover')
    expect(rule?.[1]).not.toContain('object-fit: fill')
  })

  it('gives the 3 added people no per-person ratio rule (they use the default)', () => {
    for (const slug of ADDED_PEOPLE) {
      expect(css).not.toMatch(new RegExp(`\\.fcl-member--${slug}\\s*\\{[^}]*--fcl-photo-w`))
    }
  })
})

describe('§06 team — operator-directed content', () => {
  it('says "Creative Technologist" twice and never "Creative Technologies"', () => {
    expect(html.match(/Creative Technologist/g)).toHaveLength(2)
    expect(html).not.toContain('Creative Technologies')
  })

  it('renders the volunteer name as an external link to the booking calendar', () => {
    const card = cardsOf('fcl-members').at(-1) ?? ''
    const anchor = card.match(/<a\b([\s\S]*?)>BECOME A VOLUNTEER<\/a>/)
    expect(anchor, 'BECOME A VOLUNTEER is not wrapped in an <a>').not.toBeNull()
    expect(anchor?.[1]).toContain('href="https://calendar.app.google/z9XuskPpZPvE5A5h7"')
    expect(anchor?.[1]).toContain('target="_blank"')
    // rel=noopener on every target=_blank, per this section's a11y/security convention.
    expect(anchor?.[1]).toContain('rel="noopener"')
    expect(card).toContain('>Maybe you?<')
  })

  it('exempts ONLY the volunteer doodle from the grey tint (it must stay yellow)', () => {
    expect(css).toMatch(/\.fcl-member--volunteer\s+\.fcl-avatar-media::after\s*\{\s*content:\s*none/)
    const exemptions = css.match(/\.fcl-member--\w+\s+\.fcl-avatar-media::after/g) ?? []
    expect(exemptions).toHaveLength(1)
  })
})

describe('§06 team — assets and a11y', () => {
  const photos = [...html.matchAll(/<img class="fcl-avatar-img"[^>]*?src="([^"]+)"[^>]*?alt="([^"]*)"/g)]

  it('references one photo per card and every file exists on disk', () => {
    expect(photos).toHaveLength(15)
    for (const [, src] of photos) {
      const file = src.split('/').pop() as string
      expect(existsSync(assetPath(file)), `missing asset: ${src}`).toBe(true)
    }
  })

  it('gives all 14 real people a descriptive alt, and the doodle an empty one', () => {
    const alts = photos.map(([, , alt]) => alt)
    expect(alts.filter((a) => a === '')).toHaveLength(1) // the decorative doodle only
    expect(alts).toContain('Maitri Bhat')
    expect(alts).toContain('Cherry Feng')
    // The empty alt belongs to the volunteer card's doodle, not to a person's photo.
    const doodle = photos.find(([, src]) => src.includes('team-maybe-you'))
    expect(doodle?.[2]).toBe('')
  })

  it('keeps every avatar frame decorative', () => {
    const frames = [...html.matchAll(/<img class="fcl-avatar-frame"[^>]*>/g)]
    expect(frames).toHaveLength(15)
    for (const [tag] of frames) {
      expect(tag).toContain('alt=""')
      expect(tag).toContain('aria-hidden="true"')
    }
  })
})
