# Deviations — Section 05 (Project showcase)

Owner: builder(05-project-showcase). The integrator consolidates these into
`docs/DEVIATIONS.md`. Legend: **[arch]** structural · **[content]** copy/data ·
**[a11y]** accessibility · **[perf]** payload/assets · **[approx]** approximated.

## ⚠️ OPEN QUESTION — eyebrow color: contract says ORANGE, live site is GREEN

- **[content] The contract and the live capture disagree, and I need the integrator to
  decide.** I implemented **orange** to honor the committed contract (do not silently
  diverge), but the evidence says the real eyebrow is **green**:
  - `ARCHITECTURE.md §6` and `spec/20-sections/05-project-showcase.md §5.1` both say the
    eyebrow is **orange `#ec6c23`** (spec cites class `css-r7xudp`).
  - **But the captured DOM/CSS shows the project eyebrow is green `#498d44` on all three
    breakpoints:** desktop `css-oyzv css-4uqxnc` and tablet `…css-4uqxnc` → `background:#498d44`;
    mobile pill background `css-8ikb59` → `#498d44`.
  - The orange class the spec cites (`css-r7xudp`, `#ec6c23`) is actually used on the
    **FOR CITY LEADERS** and **reviews** eyebrows — not here. Looks like a transcription
    mix-up that propagated spec → architecture.
- **Implemented:** `--eyebrow-bg: var(--orange)` (one line in `05-project-showcase.css`).
  **Recommendation:** if fidelity to the live site wins, flip that one line to
  `var(--green)`. Flagged in the CSS with an inline note. Not changing it unilaterally
  because eyebrow color is a contract-stated value and this is the integrator's call.

## Copy (desktop-canonical, per `DEVIATIONS.md`)

- **[content] Eyebrow text is the desktop string at every breakpoint:**
  `From "What If?" → to a Vibe App` (straight quotes, arrow U+2192, normal spaces). The
  mobile/tablet variant `→ to an app` is **not** used (single DOM, desktop copy canonical).
- **[content] Intentional double space after "120 minutes."** kept byte-exact in the
  source and rendered via `white-space: pre-wrap` on the sub-paragraph.

## Project cards — DOM order & responsive layout

- **[content] Card DOM order is desktop-canonical:** Immersive 3D, Motion Tracking, Open
  Data Integration, The Unexpected. The mobile/tablet capture swaps the middle two (Open
  Data before Motion Tracking); per `DEVIATIONS.md` that swap is **ignored**.
  - *How the DOM-order quirk was resolved:* the image side alternates purely by **source
    order** within each card (card 1 & 3 are media-first → image left; card 2 & 4 are
    text-first → image right). Keeping the desktop card order therefore yields a clean
    left/right zigzag on wide viewports with **no CSS reordering**. On the original, the
    middle-two swap only re-assigns which of Motion/Open Data sits on which side; dropping
    it keeps the alternating pattern intact.
- **[arch] Cards stay a HORIZONTAL row at every breakpoint** (image beside text), NOT
  stacked. The spec guessed "on mobile the image/text presumably stacks (image above
  text)"; the capture shows otherwise — mobile keeps a row (`css-2acnr7`, `gap:16px`) with
  a 120px image (`css-e2dw57`). Resolution: row at all sizes; gap `52 → 16` at `<1280`,
  image `200 → 120` at `<800`. The "presumably stacks" note is superseded by the capture.
- **[approx] Title/body vertical spacing comes from line-height** (no explicit gap), as in
  the capture (the text column sets no gap).

## Assets & a11y

- **[perf] The 4 card images were sourced from the CDN and bundled to
  `/assets/project-showcase/` (NOT hotlinked).** Optimized widths for the 200px display:
  `?w=512` for the three 1200w-native images, native `300px` for motion-tracking (its max).
  ~272 KB total. Each PNG already contains its colored organic "blob" background (part of
  the artwork); `object-fit: cover` in a 200/120px square box reproduces the original crop.
- **[a11y] Descriptive `alt` text added** (originals ship `alt=""`), written from viewing
  each image — e.g. the handstand pose-detection shot, the projected live-data dashboard.

## Type / layout

- **[arch] Single semantic DOM; only the `< 800px` block scales type** (desktop = tablet in
  the capture). Mobile values from the site's own CSS: heading 60→32 (ls .64), sub 20→16,
  card title 32→20 (ls .4), card body 20→16.
- **[arch] Page gutter / max-width / inter-section 80px gap are NOT self-carried** — they
  are owned by `main#app` (base.css) per the ratified contract amendment. This section
  keeps only internal spacing: `padding-block: 80px` and 80px internal rhythm.
- **[a11y] Each card is an `<article>` with an `<h3>` title** (original used `<p>` only).
