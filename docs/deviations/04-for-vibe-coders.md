# Deviations — Section 04 (FOR vibe coders / green card)

Section-scoped deviation log. The integrator consolidates this into `docs/DEVIATIONS.md`
at merge time. Legend: **[arch]** structural · **[content]** copy/data · **[a11y]**
accessibility · **[perf]** payload/assets · **[approx]** unverifiable-so-approximated.

Source of truth followed: **desktop (1280) canonical** per `docs/DEVIATIONS.md`
("Desktop-canonical copy"). Copy/glyphs are byte-exact from
`docs/spec/20-sections/04-for-vibe-coders.md` §4.

---

## City links — final URL choices (required by the DEVIATIONS "Links / URLs" policy)

Desktop-canonical hrefs. On the 1280 DOM the site already uses the **stable base URLs**
(not the dated `/events/NNN/` single-event links that mobile/tablet use), so no
substitution was needed on desktop — I simply did not adopt the mobile/tablet dated
variants. Each linked row is `target="_blank"` with an **added** `rel="noopener"`.

| City | Final href | Note |
|---|---|---|
| `berlin` 🇩🇪 | `https://www.meetup.com/vibe-coding-collective-eu/` | Desktop base URL (stable). Mobile/tablet used dated `…/events/312898072/?` — **not adopted**. |
| `delft` 🇳🇱 | `https://luma.com/z32gtwo6` | Stable Luma URL (same on all breakpoints). |
| `Kyiv` 🇺🇦 | `https://luma.com/zxoxma81` | Stable Luma URL (desktop/mobile only; absent on tablet). |
| `London` 🏴 (England) | `https://luma.com/bhfumnou` | Desktop base URL (stable). Tablet used dated `…/vibe-coding-collective/events/313129591/` — **not adopted**. |
| `boston` 🇺🇸 | — (plain-text `TBA`) | Not a link. |
| `Edinburgh` 🏴 (Scotland) | — (plain-text `TBA`) | Not a link. |

- **[content] Dropped the dated `/events/NNN/` Meetup links** that appear on the
  mobile/tablet DOM copies (`berlin`, tablet `London`, tablet-only `Lisbon`). They are
  single-event pages that go stale; desktop already prefers the stable bases. `Lisbon`
  (🇵🇹, tablet-only) is not present in the desktop set and is therefore not shown.
- **[a11y] Added `rel="noopener"` to every external link** (`berlin`/`delft`/`Kyiv`/
  `London` + `Start a chapter`). The original emits `target="_blank"` with **no** `rel`;
  `noopener` prevents the opened tab from reaching `window.opener` (security/perf). Logged
  per the task's explicit "log the rel addition" instruction.
- **`Start a chapter`** → `https://calendar.app.google/z9XuskPpZPvE5A5h7`, `target="_blank"`
  + `rel="noopener"` (spec §4.4).

## City-row markup — normalized to one clean link per city

- **[arch] Each linked city is a single row-level `<a>`** wrapping `flag + name + arrow`.
  The Figma export's desktop DOM is inconsistent per row: `berlin` links only the name
  (arrow is a non-link div); `delft` links the name **and** emits a duplicate `<a>` on the
  arrow; `Kyiv` wraps the whole row in an `<a>` with the name as a `<p>` and a
  `role="link"` div on the arrow; `London` links the name **and** adds a separate
  `target="_self"` arrow `<a>` to the same URL. I collapsed all four to one consistent,
  keyboard-focusable `<a>` per row (`target="_blank"`), dropping the duplicate arrow
  sub-links and the desktop `London` `_self` arrow (redundant — same href).

## Semantics & accessibility

- **[a11y] Heading hierarchy:** `<h2>` for the section heading
  (`2-HOUR HACKATHONS THAT ACTUALLY WORK`), `<h3>` for the three value-card titles and for
  `All cities`. `Your city isn’t here?` is a `<p>` (a CTA prompt, not a document heading) —
  kept out of the outline. Original emitted every string as `<p>` (Figma generic tags).
- **[a11y] List semantics:** the 3 value cards and the city list use `<ul>`/`<li>`
  (semantic lists); the original used `<div>`s.
- **[a11y] Flag emoji `aria-hidden="true"`.** Regional-indicator/tag-sequence flags render
  inconsistently across screen readers; the city name already conveys the location, so the
  flag is decorative. This keeps each link's accessible name equal to the city name (e.g.
  "berlin"). City names keep their **source casing** (`berlin`, `delft`, `Kyiv`, `London`,
  `boston`, `Edinburgh`) for SRs; the uppercase display comes from CSS `text-transform`.
- **[a11y] City-arrow `<img alt="">`** (decorative — the adjacent name conveys the link),
  per the ARCHITECTURE §8 alt convention.
- **[a11y] Descriptive `alt` on the 3 value photos** (the originals ship `alt=""`):
  "Four people gathered around a laptop at a candlelit pub table, building together";
  "A presenter smiling beside a projector screen showing a playful demo app with cat-ear
  filters"; "A group leaning in around laptops at a bar table, learning from each other".

## Assets

- **[perf] Value-card photos downloaded from the live site as the real flower-masked
  composites** (`/_assets/v11/…?w=512`, transparent PNG = flower mask + colored blob baked
  in): `value-tech-folks.png` (**blue** blob), `value-low-barrier.png` (**orange** blob),
  `value-learn-room.png` (**green** blob) — matching the orchestrator's blue/orange/green
  observation. 512×512 sources served into a 250×250 box (2× for retina). **No placeholder
  gap** — the masked composites were downloadable, so none was needed.
- **[perf] `icon-city-arrow.svg`** downloaded from the live site (360 B; diagonal ↗ arrow,
  stroke `#0056A1` blue, matching the blue city links). Rendered as an `<img>`, so its
  internal `var(--stroke-0, #0056A1)` falls back to the blue default.

## Layout / spacing

- **[arch] Outer section spacing comes from the shared wrapper (RESOLVED).** The original
  carried the page gutter (40px sides), max-width (1600), and the **80px inter-section gap**
  on a shared `<main>` wrapper. This section initially self-carried an approximation and
  flagged the gap; the orchestrator ratified the wrapper as a contract amendment
  (`main#app` in base.css, main commit `8fa82d8`), and commit `4d4e4b6` on this branch
  **removed all self-carried page rhythm** (root `padding-inline`/`padding-block` and the
  mobile 16px/24px variants). Section 04 now supplies internal spacing only and depends on
  `main#app` for gutter/centering/inter-section gap. (Consequence: the section renders
  edge-to-edge if built against a pre-amendment `base.css` — an artifact of isolation, not
  a bug; correct after merging into main ≥ `8fa82d8`.)
- **[arch] Bands use the contract's shared 52px side padding** (`.band--header` /
  `.band--body` in base.css). The original's bands used **32px** horizontal inside a 52px
  vertical band; the 52px value is the ARCHITECTURE §5 shared-pattern choice, kept for
  consistency across all card sections (04/06/07/09). Noted for traceability.
- **[arch] Mobile adaptations (<800):** body-inner gap → 40px, and the city-row **flag
  shrinks to 20px** (matches the original's mobile `css-qwbybc` 20px flag; the city name
  stays 32px as in the original). Tablet (<1280): value cards stack (gap 40) and
  body-inner gap → 52px. (The former mobile gutter/padding-block overrides were removed
  in `4d4e4b6` along with the rest of the self-carried page rhythm — the wrapper's 16px
  mobile gutter applies instead.)

## Interaction hooks (no JS this phase — per ARCHITECTURE §9)

- **`id="cities"`** set on the `All cities` block (`.fvc-cities`) — the nav "find an event"
  smooth-scroll target — plus `scroll-margin-top: var(--nav-height)` so it clears the fixed
  nav. Root keeps `id="for-vibe-coders"` (nav "for vibe coders" target).
- **`data-reveal`** on four top-level blocks (header group, value list, cities block,
  chapter CTA). No pre-hiding in CSS (there is no reveal script yet — hidden content would
  just vanish), per the contract.
- **[approx] No hover/press affordance added** (the original has none; §40.4). Left out to
  avoid an unnecessary approximation; trivial to add later.

## Discrepancies caught (surfaced to the orchestrator; I followed the spec/DOM)

- **City ORDER — `docs/DEVIATIONS.md` vs the spec/capture.** `DEVIATIONS.md`
  ("Cities list (§04)") summarizes the desktop order as `delft, berlin, Kyiv, London`, but
  spec §4.3's **1280 block** and the actual `_capture/dom-1280.html` both list **`berlin`
  first, then `delft`** (berlin, delft, Kyiv, London, boston, Edinburgh). Per "the spec
  wins on content," I used **berlin, delft, Kyiv, London, boston, Edinburgh**. The
  `DEVIATIONS.md` summary line appears to transpose the first two.
- **`Edinburgh` casing — task prompt vs desktop-canonical.** The task prompt's inline list
  wrote `edinburgh` (lowercase = the mobile variant), but the desktop-canonical spec §4.3
  and `DEVIATIONS.md` both use **`Edinburgh`** (capital E, Scotland flag). I used
  `Edinburgh`. (Moot for display: CSS `text-transform:uppercase` renders both as
  `EDINBURGH`; the difference is only source text for SRs.)
