# Deviations — Section 02 (hero header)

Section-local deviations from `https://vibecoders.global/` (captured in `docs/spec/`).
The integrator consolidates these into `docs/DEVIATIONS.md` at merge time.
Legend: **[arch]** structural · **[content]** copy/data · **[a11y]** accessibility ·
**[perf]** payload/assets · **[approx]** unverifiable-so-approximated.

## Recovered hero assets swapped in (RESOLVES the earlier placeholders)

The chips, googly blob and collage now use the **real recovered Group-1 assets**
(`docs/spec/31-recovered-assets.md`). All 9 source files were downloaded and byte-checked
against the spec's stated sizes (exact match) before optimizing. The prior "no asset URL /
decorative placeholder" deviations are **resolved**; the swap surfaced two spec-vs-reality
findings (flagged to the orchestrator).

- **[content] Headline photo chips = real recovered photos (3).** The three `<span>`
  colour-blocks are now `<img>` chips — `hero-chip-1.webp` (yellow, after `communities`),
  `hero-chip-2.webp` (green, before `TECH-LITE`), `hero-chip-3.webp` (teal, after
  `BUILDERS`) — in the definite JSON node order. **On-view finding:** each served PNG already
  bakes in its colored rounded-square tile + flower-masked photo + cream outline on a
  transparent field, resolving spec 1a's open question ("baked into the PNG or applied by the
  runtime — confirm on view" → **baked in**). So the CSS chip `background`/`border-radius`
  frame was removed — a solid CSS backer would fill the tile's rounded-transparent corners
  and read as a hard square. Em-based sizing is kept per the current CSS. The earlier
  `--green-bright` vs `--green` chip-colour choice is now moot (colours are baked into the assets).
- **[content] Orange googly blob = real recovered SVG.** The plain `--orange` disc is replaced
  by `hero-googly-blob.svg` (self-contained: `Body` `#EC6C23` + white `#F6F5F2` sclera + dark
  `#181814` pupils). The earlier "eyes omitted / not invented" deviation is resolved — the real
  eyes ship. **Desktop SVG only:** the tablet/mobile exports are the same shape (aspect ~1.18)
  and SVG scales losslessly, so shipping them would be unreferenced dead weight — kept lean per
  the inventory's own "ship the desktop SVG only and scale it" guidance. Flagged to the
  orchestrator in case the literal on-disk 9-file set is wanted.
- **[content] 862×350 collage = three real recovered composites.** The three CSS
  `hero-graphic-blob` `<span>`s are replaced by `hero-collage-1/2/3.webp` (members1/2/3,
  left→right). **On-view finding — contradicts inventory spec 1c:** spec 1c (HEAD-only, "PNG
  body not fetched") called these "plain photo rectangles" and said the flower masks +
  teal/yellow/red blob backgrounds are a runtime CSS composite "not present as assets." The
  **downloaded PNG bodies show the opposite** — each bakes in the colored blob (collage-1
  ~teal, -2 ~yellow, -3 ~orange), the flower/squircle photo mask, and the cream outline, all
  on transparency. So the task's planned approach (keep CSS blobs, clip the photos into them)
  was **not** applied — it would double the colored blob and crop the baked flower silhouette
  into a rounded rect. The self-contained composites are placed directly at full frame height
  with a natural overlap (source order 1→3 = paint order → right-over-middle-over-left,
  matching the live stacking). More faithful than the placeholder path; reported as a
  spec-vs-reality gap.
- **[perf] Assets optimized on download (batch-1 precedent: ~2× display size, WebP).** Chips
  288² PNG → 192² WebP q82 (~7.0–7.6 KB each, was ~102–114 KB). Collage ~1894² PNG → 760px-edge
  WebP q80 (38–47 KB each, was 1.69–2.39 MB). Googly SVG shipped as-is (1.44 KB). Total hero
  imagery ≈150 KB referenced (dir `du -sh` 160 KB) — down from ~5.9 MB of raw source PNGs.
  Per-file sizes are in the builder report.
- **[content] The `--red` collage-blob approximation is now moot.** No CSS collage blob remains
  (the red/orange is baked into `hero-collage-3.webp`), so the earlier "approximate red with
  `--orange` / suggest a `--red` token" note no longer applies to this section.

## Structure / type / a11y

- **[a11y] Headline is the page's single `<h1>` (was four `<p>` runs).** Heading-hierarchy
  policy (`DEVIATIONS.md`). Accessible name resolves to "communities FOR TECH-LITE BUILDERS"
  (the aria-hidden chips contribute nothing). Source casing kept byte-exact
  (`communities` lowercase; visual uppercase from `.t-hero`).
- **[a11y] Alt-text convention (now real `<img>`s).** The chips and googly are decorative
  `<img alt="">` inline in the `<h1>` — the canonical decorative-image convention; they add
  nothing to the accessible name, which stays "communities FOR TECH-LITE BUILDERS". The
  collage photos are `<img alt="">` inside the `hero-graphic` wrapper, which keeps its
  `aria-hidden="true"`: the collage is a decorative composite (event photos in the runtime-style
  flower/blob treatment), intentionally not exposed to AT, matching the section's established
  convention. Logged per the task's "follow the existing alt convention" instruction.
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
  orchestrator before merge. `data-reveal` on both blocks is preserved through this asset swap.
- **[perf] `.gitkeep` sentinel removed.** `public/assets/hero-header/` now holds the real
  recovered assets (7 files: `hero-chip-1/2/3.webp`, `hero-collage-1/2/3.webp`,
  `hero-googly-blob.svg`), so the placeholder sentinel that kept the empty directory tracked is
  gone.
