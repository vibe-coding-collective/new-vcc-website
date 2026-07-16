# Deviations — Section 06 FOR CITY LEADERS

Intentional departures from the original (`https://vibecoders.global/`) for this
section, for the integrator to consolidate into `docs/DEVIATIONS.md`. Legend
mirrors `DEVIATIONS.md`: **[arch]** structural · **[content]** copy/data ·
**[a11y]** accessibility · **[perf]** payload/assets · **[approx]** approximated.

## ⚠️ INTENTIONAL DIVERGENCES (LOUD) — team batch (2026-07-16)

**Surfaced verbatim to the operator.** Everything in this block is a deliberate departure
from `https://vibecoders.global/`, or a known quality gap we are shipping on purpose.

### 1. [content] Two role titles corrected: "Creative Technologies" → "Creative Technologist"
**The ORIGINAL says "Creative Technologies"** on both cards. Operator-directed correction,
applied to **Cavan Judge** and **Joseph Wan**. We deliberately do NOT match the original
here. Guarded by a test so a future "fidelity" pass cannot silently revert it.

### 2. [content] Three people ADDED — the original's team block has 12, ours has 15
Appended after the existing 10 non-founders (founders stay 2):
- **Maitri Bhat** — *Marketing Strategist*
- **Cherry Feng** — *Social Media Expansion*
- **"Maybe you?" / VOLUNTEER** — a recruitment card, always LAST, whose name is a link to
  `https://calendar.app.google/z9XuskPpZPvE5A5h7` (`target="_blank"` + `rel="noopener"`,
  matching this section's existing external-CTA convention on "Join our team").

### 3. [content/arch] The volunteer doodle is EXEMPT from the grey tint — it stays YELLOW
**Operator decision.** Every other avatar gets the `mix-blend-mode: color` grey tint that
renders it greyscale; the doodle would be desaturated to grey by it. It keeps the orange
squiggle frame + squircle mask so the card still sits consistently in the grid. A test
asserts this exemption applies to **exactly one** card.

### 4. ⚠️ [perf] KNOWN QUALITY GAP — Maitri's and Cherry's photos are only 106×106
The supplied sources are **106×106**. They render at ~129 CSS px (and ~150–160px at
tablet), i.e. **upscaled even at 1×, and ~2.4× upscaled on a retina display** — they will
look noticeably softer than the other 13. **Not upscaled** (per instruction; upscaling
would add blur, not detail). The operator is sending high-res replacements — **the swap is
a one-file drop-in**: overwrite `team-maitri-bhat.webp` / `team-cherry-feng.webp`, no
markup or CSS change needed, because the two cards deliberately carry **no** per-person
framing rule (they use the default "photo fills the squircle" framing).
To avoid stacking lossy loss on top of a resolution deficit, these two ship **lossless**
WebP (5.2 / 5.4 KB) rather than the q72 used for the original 12 — still inside the
existing 5–20 KB range. The doodle is lossless too (16.7 KB; hard-edged flat colour).

### 5. [approx] Maitri's/Cherry's transparent corners were FLATTENED onto their own backdrop
Both sources arrived as rounded-corner PNGs with transparent (antialiased) corners whose
curve very nearly coincides with our squircle mask — which rendered a visible off-white
halo around those two avatars, and only those two. They are now composited onto a flat
colour sampled from each photo's own border (rgb(176) / rgb(146)) and ship fully opaque,
exactly like the other 13, so the squircle mask does 100% of the shaping. The flattened
pixels sit outside the mask and are never visible.

### 6. [a11y] The volunteer doodle is DECORATIVE (`alt=""`); the VOLUNTEER link is underlined
- **`alt=""`** on the doodle, per this section's existing convention (descriptive `alt` for
  content images that identify a person; `alt=""` for decorative art like the step icons).
  The adjacent "Maybe you? / VOLUNTEER" text carries the entire meaning; describing the
  drawing would only add noise before it.
- **The link reads "BECOME A VOLUNTEER", coloured `--blue` + underlined** (operator
  request, 2026-07-16: make it clearly a CTA, not a 15th name). `base.css` strips link
  styling site-wide (`a { color: inherit; text-decoration: none }`), which had left the
  roster's only link visually IDENTICAL to the 14 static names beside it. Colour choice is
  not arbitrary: `--blue` (#0056a1) is the site's established link idiom (§01 nav
  scroll-links, §04 city links) AND the accessible option on this band — measured **5.69:1**
  against the yellow-tint body band (~rgb(254,224,136)), passing WCAG AA for normal and
  large text; `--teal` (the footer's link colour) manages only **2.25:1** here and would
  fail even the 3:1 large-text bar. The underline stays because colour alone is exactly the
  failure mode WCAG 1.4.1 names. Verified at 1366/375/320: no overflow, `rgb(0,86,161)` vs
  the neighbours' `rgb(24,24,20)`.

### 7. [approx] Luisa's and Poppy's whole CARD sits ~9.6px right of the original's
**CORRECTED AT THE GATE (2026-07-16)** — the first draft of this entry named the wrong
mechanism, claiming the original placed those two *squircles* ~9px off-centre *within their
squiggles*. It does not: the reviewer pixel-scanned the original and found Luisa's and
Poppy's windows are its **best-centred** (+0.25px vs Erika's +1.50px). What the tester and
reviewer independently measured is that the original shifts their **entire card — squiggle
and window together — ~9.6px LEFT of the column** (painted squiggle bbox: Poppy x573–773,
Luisa x981–1181, vs Eric's x583–783). The phantom "9px off-centre" came from measuring
against `css-us4svo`, a Figma auto-layout box that is 219.27px wide on exactly those two
cards (their 265px 2-up photo widens it) instead of the painted 200px frame.
We place all 15 cards on the clean column with the window centred. **Face framing is
reproduced exactly either way** (photo box + mask offset match to ≤0.023px); only the
card's column placement differs on those two.

**Scope note (reviewer, gate):** this is a live delta only for **Luisa**, who occupies the
same grid slot in both builds (9.31px). For **Poppy** it describes the ORIGINAL's geometry
only — she is no longer the trailing lone card in ours (§2 added 3 people), so she now sits
at x176, column 1 of row 5, and her placement difference is dominated by that roster reflow
rather than by 9.6px. Don't go hunting for a 9.6px Poppy shift; it has been subsumed.

### 7b. [approx] Uniform caption gap vs the original's per-card float
The original's avatar→role gap is **not** constant: it varies **16.0–43.9px** across the 12
cards (mode 40.36) because its caption wrapper height floats with each photo's overflow. We
ship a uniform **40.4** — the modal value, matching 8/12 within ~1.3px — which runs ~24px
tighter than the original on **Luisa and Poppy** and ~10px on **Joseph**. Deliberate
normalization; the alternative is per-card caption offsets that encode a Figma artifact.

### 7c. [approx] Frame height and per-card window wobble normalized
Our squiggle frame renders **200×200**; the original's is **200×198.875** (Δ1.125px), which
is the main driver of the sub-pixel vertical residual in the framing match. The original's
mask window also **wobbles per card** (y 34.224–35.469, x 35.454–36.687); ours sits
perfectly centred on every card. Same class of deliberate normalization as §7.

### 7d. Not reproduced: a latent bug in the ORIGINAL
The original's **Poppy card stacks two photos** — a leftover copy of Luisa's image
(`5205b639`) sitting underneath Poppy's own (`daf8c55d`), both at opacity 1 in the same
window. Invisible in the render but real, and almost certainly unintended. We ship one
photo per card. Recording it so nobody "restores" it as fidelity.

### 8. RESOLVED, NOT a divergence — the original does **not** stretch faces
Flagged for investigation: the original's `<img>`s were reported as computing
`object-fit: fill` with natural sizes that disagree with their rendered aspect (e.g.
Sofiia: natural 130×133 rendered into a 131×188 box), implying the original vertically
**stretches** faces by up to 1.41×. **Measured directly on all 13 photo elements at 1366:
every one computes `object-fit: cover` with `object-position: 50% 50%` — not `fill`.**
`cover` preserves the asset's aspect and crops the overflow, so the layout box aspect
differing from the image aspect is expected and harmless. **There is no distortion in the
original, and none to diverge from.** Our build uses the same `cover` + `50% 50%`.
Related: our shipped assets are the SAME crops as the original's, at higher resolution —
each one's aspect matches the original's natural aspect to ≤0.008 (e.g. our Sofiia
353×360 = 0.981 vs the original's 130×133 = 0.977). The earlier concern that our Sofiia
(0.98) mismatched "the aspect the original renders her at" (0.70) compared our asset
against the original's layout BOX, not its image. No re-download was needed.

## ⚠️ INTENTIONAL DIVERGENCES (LOUD) — mobile-parity batch (2026-07-16)

**Surfaced verbatim to the operator.**

### The mobile brief's team/how-it-works sizes were DESKTOP values (measurement artifact) — corrected
An upstream brief specified, for the ORIGINAL at 375px: team flower frames **200px** in a "dense
overlapping 2-up collage", and how-it-works icons **170px** in an "overlapping row". Those are the
original's **DESKTOP** values (the headless width-clamp artifact — see §02's LOUD note). Measured
at TRUE 375 device metrics (agreeing with the SSR capture `dom-375.html`, class `css-yb99np` =
120×119px / `css-uyaw1n` = 100×100px), the original's REAL mobile is: team frames **120px** and
how-it-works icons **100px, stacked in a COLUMN** (`css-a8cjdg` is `flex-direction: column`, not
an overlapping row). **We built to the TRUE original.** Concretely on `<800`:
- Team member + founder frames set to a **uniform 120px** (founders were 136px; there is NO 200px
  mobile variant). Our members were already 120px, so this is essentially a founder-size fix.
- How-it-works `--fcl-step-icon` **130px → 100px**; the steps already stack in a column (matches).

### ~~Team ARRANGEMENT: original mobile is a zigzag; ours is a 2-column grid~~ — SUPERSEDED
> **Obsolete.** The zigzag was subsequently built (see "Fast-path fix … mobile team ZIGZAG"
> at the foot of this file) and its amplitude/rhythm/alignment corrected in the team batch.
> Retained only as the historical record of the decision. Original text follows.
The original's mobile team is a **single-file zigzag** — one person per row, avatar alternating
flush-left (x≈12) / flush-right (x≈243), each row a horizontal `[text | avatar]` strip, ~167px
vertical pitch (measured live). **Ours keeps the clean 2-column grid** (avatar-over-label cards,
two per row) for the 12-person roster. Rationale: (a) the brief's specific arrangement directive
(200px overlap) was itself based on the erroneous measurement above; (b) faithfully reworking two
separate `<ul>`s (founders + members) into a continuous alternating-side zigzag risked NEW
horizontal-overflow regressions — directly against the operator's "nothing cut off / outside the
viewport" directive — for a secondary element the operator did not flag; (c) our grid is faithful
in frame SIZE (120px) and never overflows (`scrollWidth === innerWidth` at 320–390). This is a
deliberate, low-risk arrangement divergence; the exact zigzag can be a follow-up if desired.

### Standing divergences (re-logged per the operator's order)
- **[content] 12-person roster, Dan first.** The original's MOBILE variant shows only **8** people
  with **Sofiia first**; desktop shows the full team. Per the ratified go-live policy we keep the
  **12-person desktop-canonical roster (Dan Porder first)** on mobile too — we deliberately do NOT
  follow the original mobile's 8-person / Sofiia-first ordering.
- **[content] Corrected figures.** The lede reads "**4,000+** members" (original mobile capture:
  "1,200+"); the sponsor/among-us counts elsewhere read **10 countries / 4,000+** (original:
  7 countries / 1,100+). Go-live content policy — never restore the original's numbers.

### Mobile type step-down (this section's headings) — [arch]
`.fcl-title` (H2), `.fcl-block-title` (band title) and `.fcl-step-title` (card title) no longer
hand-roll their mobile sizes; they now inherit the shared **tokens.css** `<800` overrides
(H2 → 32px/0.64, band → 28px/0.56, card → 20px/0.4 — matching original `css-i05ae1` / `css-n164e2`
/ `css-z2l67j`). This FIXED prior wrong values (block-title was 30px → now 28; step-title 24px →
now 20). Team NAME inherits the tokens `--fs-eyebrow` (→ 18px, `css-gmhvhh`); only the team ROLE
keeps a scoped 16px override (`css-p8lmy`).

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

- **[content] 15-person roster, Dan Porder first** — the original's 12 (2 founders + 10)
  **plus the 3 operator-added people** (Maitri, Cherry, and the "Maybe you?" recruitment
  card, which stays last). See LOUD §2. Mobile's 8-person / Sofiia-first variant is **not**
  followed: membership + order are canonical; only **layout** adapts responsively (see below).
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

- **~~[approx] Per-instance mask-position offsets not reproduced; photo centred at 64%.~~
  RESOLVED (team batch, 2026-07-16) — and this entry was WRONG, in the way the operator
  eventually noticed ("photos are not zoomed on faces like the original's").** The
  per-card `mask-position` values (e.g. `14.6px 41.65px`) are **not runtime artifacts**:
  they ARE the per-person face framing. The original sizes each photo individually
  (Dan 158.91×230.66, Luisa 265.23×198.92, …) and slides the ~129px squircle over it, so
  the window lands tight on that person's face. Centring a uniform 128px `object-fit:cover`
  box instead showed each person's full width = visibly looser framing.
  **Now reproduced per person.** Each card carries a `fcl-member--<slug>` modifier whose
  CSS sets four ratios (`--fcl-photo-w/h/x/y`, plus `--fcl-win` for Joseph). Values are
  expressed as RATIOS OF THE FRAME WIDTH and scaled with `calc()`, so one table serves
  every breakpoint — confirmed by measuring the original at **1366** (200px frame,
  128.772 mask) and **375** (120px frame, 77.26 mask): the ratios agree to 4 decimal
  places. **Verified: our photo box and offset now match the original's to ≤0.02px on all
  12 people.** The 3 added people have no measured counterpart and use the default
  (photo fills the window).
  - **Joseph Wan's card genuinely uses a SMALLER squircle** — mask `a23e76da…` at
    **117.944²** where every other card uses `e54b773c…`/`5af4bfba…` at **128.772²**
    (0.5897 vs 0.6439 of the frame). Confirmed at both 1366 and 375, and visible. Reproduced.
  - **Load-bearing:** `.fcl-avatar-img` needs `max-width: none`. `base.css` resets
    `img { max-width: 100% }`, which silently clamps the deliberately-oversized photos back
    to the window width — heights still apply, so it distorts the crop rather than failing
    loudly. This bit during the build; a test now guards it.
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
  original PNGs (fetched at `?h=512`, downscaled to 360px tall). These 12 are the SAME
  crops as the original's, at higher resolution — each one's aspect matches the original's
  natural aspect to ≤0.008, which is why reproducing the original's per-person photo box +
  mask offset yields the identical framing, only sharper.
  The **3 added** assets (LOUD §2/§4/§5) ship lossless: `team-maitri-bhat.webp` (106×106,
  5.2 KB), `team-cherry-feng.webp` (106×106, 5.4 KB), `team-maybe-you.webp` (194×191,
  16.7 KB, the only avatar with an alpha channel — it is a doodle on transparency, so the
  `.fcl-avatar-img` off-white background supplies its squircle; without that, yellow art on
  the yellow band would be invisible).

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
- **[a11y] The added VOLUNTEER link follows the same convention** — `target="_blank"` +
  `rel="noopener"` → `https://calendar.app.google/z9XuskPpZPvE5A5h7`. It is the roster's only
  link, so it is underlined to be recognisable as one (LOUD §6); the doodle beside it is
  decorative (`alt=""`), since the "Maybe you? / VOLUNTEER" text carries the meaning.

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
    150/190). The inner mask/tint/frame composite scales proportionally with the bigger box.
    (Historical note: this originally read `--fcl-avatar-photo: 64%` — the uniform-photo-box
    variable that the team batch DELETED when it replaced the one-size-fits-all crop with the
    original's per-person framing ratios. See §"per-person framing" below.)
  - **Verified live:** my rendered avatar rects at 1366 match the original's exactly — founders
    x278/x889 (200×200), members x176/x583/x990, column pitch 407, row pitch 332, founder→member
    pitch 332 (queried from both DOMs). **Re-verified after the team batch — still true.**
  - **[arch] Card-internal rhythm corrected (team batch, 2026-07-16) — this was the operator's
    "spacing is slightly off".** The columns and the 332px row pitch already matched, so a pitch
    check passed; what differed was how the space is DISTRIBUTED inside each card. Measured on
    the live original at **1366 AND 800** — the three gaps are CONSTANTS, identical at both
    widths (they do NOT scale with the frame):

    | gap | original | ours (before) | ours (now) |
    |---|---|---|---|
    | avatar → role | **40.4px** | 16.6 | 40.6 |
    | role → name | **0px** | 4 | 0.2 |
    | name → next row's avatar | **32px** | 52.5 | 32.5 |
    | row pitch | 332.8 | 332 | 332 |

    The caption sat too close to its photo and too far from the next row. Fixed with
    `.fcl-member { gap: 40px }` · `.fcl-member-meta { gap: 0 }` · `.fcl-members { row-gap: 32px }`
    · `.fcl-founders { margin-block-end: -8px }` (the parent `.fcl-team` flex gap already
    contributes 40px, and the founders→members transition must use the same 32px as every other
    row). All four metrics now match within **0.8px**.
  - **[arch] A trailing row of ONE now CENTRES, as the original does.** The original lays the
    roster out as a CENTRED wrap: its 10th member (Poppy, alone in the last row) sits in the
    MIDDLE column at x583 — not the left column a grid puts her in. Ours left-aligned it. Now
    `.fcl-members > :last-child:nth-child(3n + 1) { grid-column: 2 }`, which reproduces the
    original's behaviour both for its 10-person roster and for our 13th card (the "Maybe you?"
    card — verified centred at x583). A trailing row of TWO would still left-align (not
    expressible in a 3-track grid); revisit with a flex wrap if the roster ever ends 3n+2.
  - **Tablet (<1280):** 3 FLEXIBLE columns (`repeat(3, 1fr)`, 150px avatars, 24px column /
    40px row gaps) — the fixed 280px tracks + 407px pitch overflow below 1280, so they reflow;
    founders stay a centred 2-up row (230px cards, 80px gap). **Column choice logged: 3** (keeps
    the desktop rhythm; drops to 2 only at mobile). Tablet inherits the corrected 40px
    avatar→caption gap from the base rule, which is right: that gap is a CONSTANT in the
    original (40.4px at 800 as well as at 1366).
    **[approx] logged:** the original does NOT shrink its frames at 800 — it keeps **200px**
    avatars and just tightens the column pitch to 224 (x76/300/524). Ours uses 150px. That is
    the pre-existing tablet divergence, deliberately left alone in the team batch (out of the
    operator's brief, and changing it risks the load-bearing 1280 fit).
  - **Mobile (<800):** the single-file ZIGZAG (see the fast-path note at the foot of this file),
    uniform 120px frames, 166px pitch, amplitude x12/x243 — all corrected in the team batch to
    match the original exactly. Membership/order untouched.
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

## Fast-path fix (operator-approved, 2026-07-16): mobile team ZIGZAG

- The 2-col mobile grid is replaced by the original's single-file zigzag: one person
  per row, 120px avatar hugging alternating edges, text strip on the opposite side;
  founders start LEFT, members start RIGHT (both verified against the live original at
  true 375 — the members' inverted start was caught and fixed during verification).
- **~~[approx]~~ Zigzag amplitude inset ~28px — RESOLVED (team batch, 2026-07-16).** The
  rows sat at x40/x215 instead of the original's x12/x243 because each list is nested
  inside `main#app`'s 16px page gutter PLUS the band's 24px mobile padding (16 + 24 = 40,
  vs the original's 12px gutter). The two lists now bleed back out by the 28px difference
  (`width: calc(100% + 56px); margin-inline: -28px` — the width must grow too, or the
  centred flex item just shrinks its margin box and nothing moves). **Verified at true 375:
  avatars now at x=12 / x=243, right edges 132 / 363 — identical to the original.** No
  overflow introduced: `scrollWidth === innerWidth` at 320/360/375/390.
- **Mobile rhythm fixes found while measuring (same batch):**
  - **Founders→members pitch was 206px vs 166px everywhere else.** `.fcl-founders` set
    `margin-block-end: var(--space-46)` intending "list gap ≈ row pitch", but that stacked
    on top of the parent `.fcl-team`'s 40px flex gap (46 + 40 = 86). Now 6px → a uniform
    166px pitch, matching the original's single continuous ~166.6px rhythm.
  - **Text is LEFT-aligned on every row, not alternating.** Measured on all 8 of the
    original's mobile cards: computed `text-align: left` throughout (text starts at x=12
    when the avatar is right, x=148 when it is left). Ours flipped to `text-align: right`
    on the reversed rows, pushing copy against the avatar instead of the viewport edge.
    Only the row DIRECTION alternates now. Our strips land at x=12..227 / x=148..363 —
    exactly the original's.

### 9. Mobile zigzag: the members-list inversion was REMOVED at the gate (2026-07-16)
An earlier fast-path (main `942e347`) added `.fcl-members .fcl-member:nth-child(odd|even)`
rules forcing the members list to start on the RIGHT, justified by a real measurement of the
original ("first member avatar at x=243"). The measurement was right; the inference was not.
The original's **mobile roster starts with Sofiia** (its 8-person mobile variant), so its
Abhinav-on-the-right is just the alternation continuing from Dan-on-the-left. We ship **Dan
first** (ratified roster divergence), so the copied rule put **Sofiia and Abhinav on the same
edge** — a visible stutter at the founders→members seam, live in production. Both the tester
and the reviewer caught it independently. Fix = delete the inversion: the base rules already
alternate correctly across the two lists (founders end R on Sofiia → members resume L on
Abhinav). **Lesson recorded: copy the RULE, not the coordinate — a surface measurement taken
from a page whose roster differs will not transfer.**
