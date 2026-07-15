# Deviations — Section 02 (hero header)

Section-local deviations from `https://vibecoders.global/` (captured in `docs/spec/`).
The integrator consolidates these into `docs/DEVIATIONS.md` at merge time.
Legend: **[arch]** structural · **[content]** copy/data · **[a11y]** accessibility ·
**[perf]** payload/assets · **[approx]** unverifiable-so-approximated.

## Runtime-injected visuals reproduced as placeholders (no invented artwork)

- **[approx][content] Headline photo chips + orange googly blob = decorative CSS placeholders.**
  Live, the `<h1>` interleaves small rounded-square photo chips (yellow after COMMUNITIES,
  green before TECH-LITE, teal after BUILDERS) and an orange googly-eyes blob after
  TECH-LITE (orchestrator live observation). These are **runtime-injected** — absent from
  the static capture, no determinable asset URL — so they are reproduced as decorative
  `<span>`s with the correct colors/positions and `aria-hidden="true"`. No photographic or
  mascot artwork is invented. Chips are sized in `em` so they track the headline font.
- **[approx] Googly blob rendered as a plain orange disc; eyes omitted.** Drawing googly
  eyes would be inventing artwork (disallowed), so the blob is a plain `--orange` circle
  placeholder marking the mascot's position.
- **[content][approx] Green chip uses `--green-bright` (#91bd3c).** The observation says
  "green"; the brighter lime reads as the more playful chip color. (`--green` #498d44 is the
  alternative.)
- **[approx] 862×350 photo collage = decorative colored-blob placeholder.** Live, this frame
  holds blob-masked event photos on teal/yellow/red blobs (runtime-injected, no asset URL).
  Reproduced at the original's 862×350 aspect (scaling below via `aspect-ratio`) as three
  overlapping organic blobs in the observed colors, `aria-hidden`. The masked photos
  themselves are intentionally not invented.
- **[approx] Observed "red" collage blob approximated with `--orange` (#ec6c23).** No `--red`
  token exists in `tokens.css`; the nearest warm token is used rather than hard-coding a new
  color. Suggest a `--red` token if the real collage is added later.

## Structure / type / a11y

- **[a11y] Headline is the page's single `<h1>` (was four `<p>` runs).** Heading-hierarchy
  policy (`DEVIATIONS.md`). Accessible name resolves to "communities FOR TECH-LITE BUILDERS"
  (the aria-hidden chips contribute nothing). Source casing kept byte-exact
  (`communities` lowercase; visual uppercase from `.t-hero`).
- **[a11y] Alt-text convention.** All decorative placeholders (chips, googly blob, collage
  blobs) are marked `aria-hidden="true"` — stronger than `alt=""` and appropriate since they
  are `<span>`/`<div>` placeholders, not `<img>`. No meaningful content photos are present
  in this section, so no descriptive alt text applies here.
- **[a11y] `contact for more` `<a>` gains `rel="noopener"`** (added to the `target="_blank"`
  link; security/perf, no visual change).
- **[arch][approx] Mobile headline scales via `clamp(30px, 9vw, 80px)`.** The captured
  headline is a fixed 80px at every breakpoint, but a single 80px word ("communities",
  11 chars ≈ 528px) overflows a 375px viewport. The size is overridden **only** `< 800px`
  and **only within `.s-hero-header`** (a scoped override of `.t-hero`'s size, not a global
  redefinition), tuned so the longest word fits down to ~320px; base.css's
  `overflow-wrap: break-word` is the safety net. Desktop/tablet stay the canonical 80px.
- **[arch] Page gutter + inter-section rhythm are delegated to the `main#app` wrapper.**
  Per the mid-batch contract amendment (base.css `main#app` owns padding-inline 40px/16px,
  max-width 1600 centered, and the 80px inter-section gap), this section carries **no**
  horizontal padding and **no** bottom padding — only `padding-block-start: 200px` (clears
  the fixed nav) and its internal 60px gap between the hero content and the collage.
- **[arch] Hero-region `margin-bottom:-60px` overlap reproduced (spec `css-nevt4e`).**
  Applied `margin-block-end: -60px` to `.s-hero-header`; it composes with the `main#app`
  wrapper's 80px inter-section gap to a **net ~20px** hero→stats seam (verified in a
  wrapper simulation: 80 − 60 = 20.0px), matching the original's tight spacing. Kept per the
  orchestrator integration note relaying the section-03 builder's report.
- **[content] Hero CTA order is `find an event` then `contact for more`** (matches the hero
  `<header>` DOM). Note the NAV's CTA order is the reverse (`contact for more` then
  `find an event`) — both are faithful to their respective source blocks.
- **[approx] No hover/press states** (original has none; spec §40.4). Keyboard focus uses the
  UA default ring.
- **[arch] `data-reveal` added at the integration gate** (reviewer finding): `.hero-inner`
  and `.hero-graphic` now carry the reveal marker per 40-interactions.md §1 (the hero is a
  listed reveal block; only the nav is exempt). The builder had omitted it; added by the
  orchestrator before merge. The `.gitkeep` explainer comment moved here too — the sentinel
  file itself is now empty (its rationale: hero imagery is runtime-injected on the original,
  so the directory ships empty until the asset-recovery task fills it).
