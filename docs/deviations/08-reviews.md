# Deviations — Section 08 (reviews / "what people say")

Owner: builder(08-reviews). The integrator consolidates these into `docs/DEVIATIONS.md`.
Legend: **[arch]** structural · **[content]** copy/data · **[a11y]** accessibility ·
**[perf]** payload/assets · **[approx]** unverifiable-so-approximated.

## Eyebrow color — ORANGE (matches the corrected contract + capture)

- **[content] Eyebrow pill is orange `#ec6c23` (`--eyebrow-bg: var(--orange)`), class
  `css-r7xudp`** — capture-verified and matching ARCHITECTURE §6 (corrected 2026-07-15).
  This is the eyebrow the earlier spec error mis-assigned to projects (§05); §05 is green,
  §08 reviews is orange. Not a divergence — recorded for traceability.

## Copy (byte-exact, verbatim)

- **[content] All three quotes, names, roles and locations are byte-exact from the spec /
  capture.** Straight apostrophes throughout (`I'd`, `didn't`, `it's`); the 🫣 emoji
  (U+1FAE3, "face with peeking eye") in card 2 is preserved exactly, including the single
  space before it (`…a thing 🫣`). No trailing spaces exist on any of these strings (unlike
  §06's team names) — none added.
- Card 1 — Tomoki / Photographer / Osaka Pop-up. Card 2 — Heeezil / 3D Artist / London
  chapter. Card 3 — Christian / Developer / London chapter. Name + role render on one line
  (css-810q0y row), location below (css-kd4wqv).

## Structure / semantics / a11y

- **[a11y] Real heading + testimonial semantics** (original used `<p>`/`<div>` only). The
  section heading `what people say` is an `<h2>`; each testimonial is a `<figure>` with a
  `<blockquote>` (the quote) and a `<figcaption>` (the reviewer). Improves the document
  outline and quote semantics per the heading-hierarchy policy (`DEVIATIONS.md`).
- **[a11y] Reviewer names keep source casing** (`Tomoki`, `Heeezil`, `Christian`) with the
  uppercase display supplied by `.t-team-name` (`text-transform`), so screen readers get the
  natural casing. Role uses `.t-team-role` (900, not uppercased — matches css-c68jms);
  location uses `.t-body` (500 — matches css-26c6mk).
- **[a11y] Reviewer avatars get descriptive `alt`** (`Illustrated avatar of Tomoki`, etc.),
  per the ARCHITECTURE §8 alt convention which lists reviewer avatars as meaningful. The
  originals ship `alt=""`. The 180×32 quote/rating **flourish is decorative → `alt=""`**
  (the convention explicitly lists "quote flourish" as decorative). If review prefers the
  avatars also be `alt=""` (they are abstract blob illustrations, not identifying photos, and
  the name is adjacent), that is a trivial change — flagged.

## Assets (sourced from the CDN, not hotlinked)

- **[perf] Four SVGs downloaded to `public/assets/reviews/`** from
  `https://vibecoders.global/_assets/v11/<hash>.svg` (they are in the static capture with
  determinable URLs, so downloaded per the asset convention — not runtime-injected):
  - `testimonial-flourish.svg` (`b803453e…`, 362 B) — the 180×32 quote/rating flourish,
    reused on all three cards. It is a small yellow tab (`#FFD226`) that extends the yellow
    quote box's bottom edge.
  - `reviewer-tomoki.svg` (`052c5017…`, 1450 B), `reviewer-heeezil.svg` (`e9fd76ec…`,
    1441 B), `reviewer-christian.svg` (`1f28de6c…`, 1508 B) — the 100×100 avatar
    illustrations (unique per reviewer). ~16 KB total for the folder.
  - The Figma exports embed hex fallbacks in every fill (`var(--fill-0, #EC6C23)` …), so they
    render correctly standalone with no CSS variables supplied.
- **[approx] Avatar sizing.** The reviewer SVGs are **non-square** (viewBox ≈ 93×79 / 93×81 /
  93×50) and carry `preserveAspectRatio="none"`. The original places each inside the 100×100
  box with a per-avatar percentage inset (css-lfulrq / css-l0b87e / css-57hdr) computed to
  match each viewBox's aspect. Reproduced with **one rule** — `width: 93.334%; height: auto`,
  centered in the 100×100 box — which renders every avatar at its natural aspect (no
  distortion) and vertically centered, matching the original's intent without per-avatar CSS.

## Layout / responsive

- **[arch] Card row resolves to 2-per-row + 1 centered, not literally "3 across".** The
  desktop rules (css-zcybxd: `flex-wrap: wrap; justify-content: center; gap: 46px`; cards
  `width: 500px`) need ≥ ~1592px of card area for three across. Under the ratified `main#app`
  `max-width: 1600` (≈1520px inner) only two 500px cards fit per row, so the third wraps and
  `justify-content: center` centers it. The **original resolves the same way at its own
  ~1600px max-width** — true 3-across is unreachable under the 1600 cap. The spec's "three
  ~500px cards across" is the designer's wide-screen phrasing; the flex rules are reproduced
  faithfully. Cards **stack to a single column < 1280** (css-a8cijb).
- **[arch] `padding-right: 40px` on the card row kept (css-zcybxd), and it shifts the centered
  cards ~20px left of the section centre** within the symmetric `main#app` gutter. Reproduced
  faithfully from the capture/spec; flagged for the integration visual pass (likely a Figma
  auto-layout frame artifact). Removed when the cards stack (`< 1280`).
- **[arch] Inert rounded-top corners omitted.** css-jdk4aq sets `border-top-*-radius: 32px`
  but has **no background** (the block is cream-on-cream), so the radius is visually inert;
  omitted to keep the stylesheet clean. No visual difference.
- **[arch] Page gutter / max-width / 80px inter-section gap delegated to `main#app`.** This
  section carries only its internal spacing: `padding-block: 40px` (css-jdk4aq) and the 52px
  gap between the intro and the testimonials block (css-jdk4aq gap). No page gutter, no
  bottom/inter-section margin.
- **[content] Mobile type/size.** Quote text `20 → 16px` at `< 800` (css-42ggai). Card width
  `500px → 100%` at `< 800` handled by `width: 500px; max-width: 100%` (equivalent to the
  capture's mobile `width:100%` once the container is narrower than 500px). Quote-box radius
  `32 → 20px` at `< 800`, following the shared `--radius-card` / `--radius-card-mobile`
  convention.

## Mobile horizontal-overflow fix — reviewer meta (2026-07-16)

- **[content] Reviewer text scales down on mobile to the original's own mobile values, and the
  row inset tightens `32 → 28px`.** Root cause of a **~16px document-level horizontal scroll at
  375** (contributor alongside §04's heading; the wider of the two set `scrollWidth`): the
  name/role/location kept their desktop 20px sizes on mobile (the tokens `--fs-eyebrow` /
  `--fs-body` have no mobile step-down), and `.rv-name`/`.rv-role`/`.rv-location` are
  `white-space: nowrap`. The nowrap `name + role` line, offset by `padding-left 32 + avatar 100
  + gap 16 = 148px`, ran past the viewport. Restored the capture's mobile sizes at `< 800`:
  **name `20 → 18px` (css-xw2kgc), role & location `20 → 16px` (css-53h18j / css-jg1rhv)**, and
  the reviewer-row inset **`32 → 28px` (css-69mn3x)** — all faithful to the original's 375 DOM.
- **[a11y improvement, divergence from original] `.rv-nameline { flex-wrap: wrap }` at `< 800`.**
  With the restored mobile sizes the `name + role` line fits on **one line at 375, identical to
  the original**. But the fixed-overflow target also requires **320**, which is narrower than the
  original's captured 375 breakpoint — at 320 even the reduced nowrap line (~184px) exceeds the
  available meta width (~144px). `flex-wrap` lets `name` and `role` **stack** (name line 1, role
  line 2) instead of overflowing, so there is never a horizontal scrollbar at any phone width.
  The original keeps a single nowrap line and was not verified below 375; the operator wants a
  usable mobile site, so this graceful wrap is a deliberate improvement over the source.
- **Verification (headless Chrome):** `documentElement.scrollWidth === innerWidth` at **375 and
  320** and across a 320→799 sweep; desktop **1366** and tablet **800** `.rv-*` rects are
  byte-identical before/after (all changes live inside `@media (width < 800px)`).

## Interactions

- **[approx] `data-reveal` on the intro and the testimonials block** (per 40-interactions.md
  §1). The capture caught the **testimonials block** mid-reveal with a **stronger** entrance
  (`opacity: 0.5; transform: translateY(30px)`) than other blocks' `translateY(20px)`; that
  stronger offset is to be honored in the later JS phase. For now the marker is the shared
  `data-reveal` and **content is not pre-hidden in CSS** (no reveal script yet).
- **[approx] No hover/press states** (original has none; spec §40.4). Keyboard focus uses the
  UA default ring.

## Assumptions (report, don't improvise)

- **Mobile quote-box padding kept at the desktop values** (24/32/24/40, css-ldpngt). The
  mobile capture changed the quote **font** class (css-42ggai) and the **card width**, but the
  box's padding class was not separately re-verified per breakpoint; the desktop padding is
  used at all sizes (comfortable in a ≥343px card). Low-risk; flagged for the visual pass.
- **[content] §08's own heading (`what people say`) stays 60px on mobile** vs the
  original's 32px (`css-i05ae1` — the same mobile class §04's heading now uses). It fits
  (short words, no overflow), so it was out of scope for the overflow fix; it is covered
  by the systemic mobile `--fs-h2` step-down queued with the integrator (reviewer-flagged
  at the gate, 2026-07-16).
