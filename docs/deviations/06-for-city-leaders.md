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
- **[arch/approx] Avatar treatment simplified to clean 20px-radius frames.** The
  original composites each avatar as a photo masked into an **organic blob**
  (`mask-image` blob SVG, `mask-mode:alpha`) + a `mix-blend-mode:color` tint
  (`#d9d9d9` / `#fff` / `#ec6c23`) + a per-person decorative SVG outline frame, with
  founders larger. That system needs per-person blob/frame assets and a
  photo→blob→position mapping that is not reliably reproducible. Per design-tokens §4
  ("20px = team-avatar frames") and the task brief, avatars are rendered as **20px
  rounded-rect frames** (`object-fit:cover`, face-biased position); founders keep the
  larger size. Consequence: photos show their **original backgrounds** (mountains,
  brick wall, etc.) rather than being blob-cut-out. The `mix-blend` color tints are
  dropped.
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

- **[arch] Team rows: explicit column counts per breakpoint** (desktop 5×2, tablet
  3+3+3+1, mobile 2×5) via CSS grid, instead of the original's fixed-pixel
  `space-between` rows. Founders remain a distinct centred row of two at a larger
  size. Membership/order unchanged (LAYOUT-only adaptation, as instructed).
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
