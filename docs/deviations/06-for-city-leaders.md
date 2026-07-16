# Deviations — Section 06 FOR CITY LEADERS

Intentional departures from the original (`https://vibecoders.global/`) for this
section, for the integrator to consolidate into `docs/DEVIATIONS.md`. Legend
mirrors `DEVIATIONS.md`: **[arch]** structural · **[content]** copy/data ·
**[a11y]** accessibility · **[perf]** payload/assets · **[approx]** approximated.

## Map & its city labels

- **[content/arch] The 11 map city labels are part of the map image, not DOM text.**
  Verified `EDINBURGH, LONDON, AMSTERDAM, DELFT, BERLIN, KYIV, BOSTON, NEW YORK,
  LISBON, ISLAMABAD, OSAKA` appear **zero times** as text nodes across all four
  captures (`dom-1280`, `dom-800`, `dom-375`, `home-ssr`). They are baked into the
  panoramic PNG (confirmed by rendering the fetched asset — diamond markers, black
  or red text, some rotated). So the section reproduces them **via the image**, not
  as positioned HTML text. This resolves the task's "text nodes vs image" question.
- **[content] This city set deliberately differs from section 04's "All cities" list.**
  Reproduced as-is per spec; not reconciled with §04.
- **[perf] Map served as one optimized WebP** (`city-leaders-map.webp`, 1600×500,
  ~36 KB) instead of the original PNG with a `srcSet` up to 2560w. Source fetched at
  `?w=2048` then downscaled to 1600 (display max ≈ 1520px); the bold labels stay
  legible. Single resolution, no `srcSet`.
- **[approx] Full map shown at its natural ratio (2634/822), not cover-cropped.** The
  original wraps the 2634/822 image in a 1200/396 (≈3.03:1) slot with
  `object-fit:cover`, which would clip the far-edge labels (Edinburgh / Osaka). We
  display the full panorama (`width:100%; height:auto`) so **all** labels remain
  visible. `object-fit:cover` is kept as a harmless belt-and-suspenders since the box
  ratio equals the image ratio.

## Team roster & photos

- **[content] 12-person desktop/tablet roster, Dan Porder first** (per `DEVIATIONS.md`
  §"Team roster"). Mobile's 8-person / Sofiia-first variant is **not** followed:
  membership + order are canonical; only **layout** adapts responsively (see below).
- **[content] Photo → person mapping recovered from DOM order.** Although
  `30-assets.md`/spec flag the mapping as UNKNOWN (the masked composites use different
  hashes than the Figma `dan/sofiia/…` refs), the **desktop DOM pairs each photo hash
  with a name directly**; I mapped by that DOM order. Best available mapping — if the
  org has canonical headshots they may differ.
  - Anomaly logged: **Luisa Von Funcke and Poppy Astrini share the same base photo
    hash** (`5205b639…`, byte-identical on fetch). Poppy's card additionally layers a
    **distinct overlay** (`daf8c55d…`, a different person). To avoid showing the same
    face twice, **Poppy uses her distinct overlay image**; Luisa uses `5205b639…`.
- **[approx] Avatar treatment UPGRADED to the original blob composite (resolves the
  earlier "simplified to 20px rounded-rect" deviation).** Each avatar now layers, per
  the capture: (1) a member **photo masked into an organic squircle blob**
  (`mask-image` = `avatar-mask.svg`, `mask-mode:alpha`), (2) a **grey
  `mix-blend-mode:color` tint** (`--grey-200` `#d9d9d9`) that renders the photo
  **grayscale**, and (3) a hand-drawn **orange squiggle frame** `<img>`
  (`avatar-frame-NN.svg`) behind the photo. Founders keep the clone's larger box
  (`--fcl-avatar-lg`, incl. the 136px mobile fix — not regressed). Findings that
  shaped the (faithful) implementation, each verified from the recovered assets:
  - **The "organic blob" mask is a squircle, and there is only one shape.** All 8
    recovered mask assets (6 SVG + 2 PNG) are the **byte-identical** continuous-corner
    rounded-square (superellipse, corner ratio 0.3575) at different export sizes —
    confirmed by md5 of the SVG path data and by alpha-contour analysis of the PNGs.
    So we ship **one** mask (`avatar-mask.svg` = `e54b773c…`, 128.8² squircle, 840 B)
    and scale it via `mask-size`; the other 7 would be exact duplicates.
  - **The "orange" is the frame, not a tint** — every frame is filled brand orange
    (`fill="var(--fill-0,#EC6C23)"` → renders orange as a plain `<img>`).
    **CORRECTION (reviewer-verified at the gate, 2026-07-16):** the 10 shipped frame
    files are geometrically IDENTICAL (max pairwise path delta ≤0.001 on a 200-unit
    canvas; the capture applies no rotation) — the original renders the SAME squiggle
    on every card. **RESOLVED (polish pass 2026-07-16): the 10 per-hash files were
    collapsed to a single `avatar-frame.svg`** — frame-06's content (the majority
    geometry and the cleanest structure, no `<g>` wrapper) kept canonical; the max
    0.001-unit shift on the four non-identical frames is ≤0.002 px at 2× display,
    invisible. This mirrors the 8→1 mask decision. All 12 cards reference the one file
    now; the frame→person table below is retained as **historical provenance**, not
    visual variety.
  - **No orange TINT exists.** Grepping the capture CSS, `mix-blend-mode:color` layers
    use only `#d9d9d9` (×7) and `#fff` (×2); `#ec6c23` appears solely as the eyebrow
    pill bg and the frame fill — never as a tint. Under the `color` blend both grey and
    white are neutral (saturation 0) → identical **grayscale**; we use grey uniformly.
    The tokens file corroborates this ("`--grey-200`: team-avatar tint layer",
    "`--white`: two team-avatar tint layers"). The earlier review's "orange tint on
    Joseph / Luisa / Poppy" is those three **sharing the orange `Union` frame**
    (`avatar-frame-06`), which the DOM-order recovery reproduces exactly.
- **[approx] Frame→person mapping — HISTORICAL PROVENANCE (the per-hash files are now
  collapsed to one; see the RESOLVED note above).** DOM-order-recovered from `dom-1280`
  (best available; the spec flags it as not cleanly determinable). Recorded for
  provenance only — the `avatar-frame-NN.svg` files below were numbered by
  first-appearance order of each distinct desktop frame, then deduplicated to the single
  `avatar-frame.svg`:

  | # | Person (role) | Frame file | Source hash |
  |---|---|---|---|
  | 1 | Dan Porder (Founder) | `avatar-frame-01.svg` | `f73502ca…` |
  | 2 | Sofiia Matsiutsia (Founder) | `avatar-frame-02.svg` | `c0c7bb72…` |
  | 3 | Abhinav | `avatar-frame-03.svg` | `afba83f1…` |
  | 4 | Cavan Judge | `avatar-frame-04.svg` | `d23a14bd…` |
  | 5 | Liberatus Fusi | `avatar-frame-05.svg` | `726114d6…` |
  | 6 | **Joseph Wan** | `avatar-frame-06.svg` | `54ee46ec…` (shared "Union") |
  | 7 | Erika Tsai | `avatar-frame-07.svg` | `a9b92873…` |
  | 8 | **Luisa Von Funcke** | `avatar-frame-06.svg` | `54ee46ec…` (shared) |
  | 9 | Flien Groeneveld | `avatar-frame-08.svg` | `5f0b8f56…` |
  | 10 | Eric Lonergan | `avatar-frame-09.svg` | `96a1a79b…` |
  | 11 | Uvin Withana | `avatar-frame-10.svg` | `3e09fbda…` |
  | 12 | **Poppy Astrini** | `avatar-frame-06.svg` | `54ee46ec…` (shared) |

- **[approx] Per-instance mask-position offsets not reproduced; photo centred at 64%.**
  The Figma runtime places each squircle with per-card sub-pixel `mask-position` values
  (e.g. `14.6px 41.65px`) — runtime artifacts. We centre the photo at
  `--fcl-avatar-photo: 64%` of the box, matching the capture's photo:frame ratio
  (≈128.8/200 ≈ 0.64; the founder card `dom-1280`#1 computes to a centred squircle).
- **[perf] Assets shipped: 1 frame SVG (`avatar-frame.svg`, ~1.06 KB) + 1 mask SVG
  (840 B).** The 10 per-hash frames were all HEAD-200 from `/_assets/v11/…` on
  2026-07-16 and then collapsed to one (see the RESOLVED note above), so only the single
  canonical frame ships. NOT shipped: the 7 smaller 120×119 frames and the 4 mobile-size
  mask exports (§31 Group 4) — our responsive layout reflows the same 12 desktop cards,
  so the 200px frame + the single scalable squircle mask cover every breakpoint.
- **[a11y] Frame `<img>` is decorative** (`alt=""` + `aria-hidden="true"`); the photo
  keeps its descriptive `alt="<Name>"`.
- **Graceful degradation:** if `mask-image` is unsupported the photo falls back to a
  visible 20px rounded-rect (`border-radius`), never a blank box. A true 404 of the
  mask asset would hide the masked layer (a known CSS limitation); mitigated because
  the asset is shipped in `public/` and build-verified to land in `dist/`.
- **[perf] Team photos served as WebP** (~250×360, q72; ~6–20 KB each) instead of the
  original PNGs (fetched at `?h=512`, downscaled to 360px tall).

## Semantics / a11y

- **[a11y] Heading hierarchy** (original emitted all `<p>`): `<h2>` START A CHAPTER IN
  YOUR CITY! → `<h3>` How It Works / WHO'S DOING THIS → `<h4>` step titles. Steps are
  an `<ol>` (numbered process; markers hidden via base reset, the "1/ 2/ 3/" prefixes
  are the visible numbering). Team is two `<ul>` lists (founders, then the rest).
- **[a11y] Descriptive `alt` on content images** (`alt="<Name>"` on each photo;
  descriptive alt on the map). Step icons are decorative → `alt=""`.
- **[a11y] `rel="noopener"` added** to the `Join our team` `target="_blank"` link
  (the original omits it). URL unchanged:
  `https://docs.google.com/forms/d/e/1FAIpQLSdF9cGO8BJeZdCznidPJDBajWgC3ER7OR1BI-xSsVV8niZUsg/viewform`.

## Layout / responsive

- **[arch] Team grid reworked to the MEASURED live geometry (visual-parity pass, operator
  finding, 2026-07-16 — supersedes the earlier "desktop 5×2 at 150/190px" layout).** The
  original desktop grid was measured live at 1366 and reproduced to the pixel:
  - **Founders 2-up**, avatar frames **200×199**, centres **611px** apart (frame-edge gap
    ~411px) → landing at viewport **x278 / x889**. Implemented as a centred flex row of two
    280px cards (card > avatar, so long names sit on one line) with a **331px** gap
    (280 + 331 = 611 centre pitch).
  - **Regular members 3 PER ROW**, frames **200×199**, on a **407px** column pitch (frame-edge
    gap ~207px) → landing at viewport **x176 / x583 / x990**. Implemented as
    `grid-template-columns: repeat(3, 280px); column-gap: 127px; justify-content: center`
    (280 + 127 = 407 pitch; the 200px avatar centred in each 280px track puts the frame edges
    207px apart and the frames at the measured x's). Row pitch **~333px** via a 52px `row-gap`
    over the ~280px card, plus a 12px `margin-block-end` on the founders row so the
    founder→first-member pitch is uniform (~332px) with the member rows, matching the original's
    single continuous 333px rhythm.
  - Founders and regular members share the **same 200px frame** on desktop (the original's only
    difference is 2-up vs 3-up), so `--fcl-avatar` and `--fcl-avatar-lg` are both 200px here (was
    150/190). The inner mask/tint/frame composite is unchanged — it scales proportionally with
    the bigger box (`--fcl-avatar-photo: 64%`).
  - **Verified live:** my rendered avatar rects at 1366 match the original's exactly — founders
    x278/x889 (200×200), members x176/x583/x990, column pitch 407, row pitch 332, founder→member
    pitch 332 (queried from both DOMs).
  - **Tablet (<1280):** 3 FLEXIBLE columns (`repeat(3, 1fr)`, 150px avatars, 24/40 gaps) — the
    fixed 280px tracks + 407px pitch overflow below 1280, so they reflow; founders stay a centred
    2-up row (230px cards, 80px gap). **Column choice logged: 3** (keeps the desktop rhythm;
    drops to 2 only at mobile).
  - **Mobile (<800):** unchanged from the reviewer-verified build — 2 columns, founders 136px /
    regular 120px, 24/40 gaps, founder pitch shim reset to 0. Membership/order untouched.
- **[arch] Steps stack to a column below 1280** (spec §6.2: 3-across desktop →
  stacked at 800 & 375).
- **[approx] Mobile display type scaled down** (h2 60→34px, band-title 52→30px, step
  title 32→24px, letter-spacing scaled proportionally). The desktop scale is canonical
  and the spec is silent on mobile sizes; 60px overflows 375px. Consistent with
  `DEVIATIONS.md`'s "mobile card padding reduced" precedent.
- **[arch] Page frame is contract-owned, not carried here.** Per the ratified
  contract amendment (main, commit `8fa82d8`), `main#app` (base.css) owns the page
  gutter (`padding-inline` 40px desktop/tablet, 16px mobile), the 1600px centred
  max-width, and the 80px inter-section gap (flex column). This section therefore
  sets **no** page gutter, max-width, or inter-section margin — only INTERNAL spacing
  (shared band padding + gaps inside the yellow card). Note: viewed **in isolation**
  (this branch, before the base.css wrapper is merged) the card renders edge-to-edge
  with no outer gutter — expected; the wrapper supplies it post-merge.

## Interactions

- **[content] `data-reveal`** on the four top-level blocks (intro, map, How It Works,
  team). No pre-hiding, no JS (per ARCHITECTURE §9 — the reveal script is a later phase).
- **[approx] No hover/press affordance added** — faithful to the original, which has
  none (interactions §4). Default browser focus outline on the CTA is left intact for
  keyboard users.

## Copy fidelity (preserved verbatim — NOT deviations)

- Straight apostrophes in `You're` (step 3) and `WHO'S DOING THIS`; trailing spaces
  kept on `Flien Groeneveld ` and `Poppy Astrini `. Names render uppercase via the
  `.t-team-name` utility while source casing is preserved for screen readers
  (`CAVAN JUDGE`/`JOSEPH WAN`/`ERIKA TSAI` are uppercase in source; `Dan Porder` etc.
  are title-case and display as caps).
