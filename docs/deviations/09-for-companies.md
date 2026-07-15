# Deviations — Section 09 (for companies / blue card on off-white)

Section-scoped deviation log for the integrator to consolidate into
`docs/DEVIATIONS.md` at merge time. Legend mirrors `DEVIATIONS.md`: **[arch]**
structural · **[content]** copy/data · **[a11y]** accessibility · **[perf]**
payload/assets · **[approx]** unverifiable-so-approximated.

Source of truth followed: **desktop (1280) canonical** per `docs/DEVIATIONS.md`.
Copy/glyphs are byte-exact from `docs/spec/20-sections/09-for-companies.md` and the
`_capture/dom-1280.html` companies block.

---

## Structure / semantics

- **[a11y] Heading hierarchy** (original emitted every string as `<p>`): `<h2>` for the
  section heading `TEAM TRAINING`; `<h3>` for the two card titles (`team-building `,
  `Custom sessions`). Matches the 04/06 h2→h3 precedent.
- **[a11y] Two offering cards as a `<ul>`/`<li>` list** (the two offerings are a list),
  instead of the original's `<div>`s — consistent with builder 04's value-card list
  semantics.
- **[arch] Card image wrapper dropped.** The original wraps each `<img>` in a fixed
  240x245 box (`css-jk7nsm`) with the image absolutely positioned + `object-fit:cover`. I
  put the sizing directly on the `<img>` (`width:240px; aspect-ratio:240/245;
  object-fit:cover`) — one fewer element, same result — matching builder 04's value-image
  approach.

## Off-white backing + rounded card (non-obvious, important)

- **[arch] Section root carries `background: var(--off-white)` AND `border-radius`.**
  Identical rationale to section 07: the body band's tint (`--blue-tint =
  rgba(0,86,161,0.4)`) is semi-transparent and composites over this backing, which must be
  off-white (#f6f5f2) not the cream page, or the light-blue skews warm (contract §6). The
  matching `border-radius` (32 / 20 mobile) aligns the root with the rounded bands so no
  off-white corner nub peeks out against the cream page. Reproduces the original's
  `css-fy3uqk` (`border-radius:32px`) + `css-2fmumq` (bg #f6f5f2) on the section.

## Layout / spacing

- **[arch] Bands use the contract's shared 52px padding** (`.band--header`/`.band--body`,
  base.css; 40/24 mobile). The original uses `css-pjc867` 52/32 (header) and `css-n3yu3f`
  52/60 (body) inner padding — superseded by the shared band-padding pattern kept consistent
  across all four card sections (04/06/07/09), per the 04 precedent.
- **[arch] Header text column capped at `--content-900`** and centred (04/06 precedent; the
  original leaves it uncapped). Cards row capped at `--content-1200` (original `css-jg3xbf`
  max-width:1200).
- **[arch] Card content centred.** The card container (`css-cf43y`) is `align-items:center`
  and the title/body classes are `text-align:center`; the original's card TEXT wrapper
  (`css-9uyk0n`) is oddly `align-items:flex-start`, but with centred text classes and a
  centred card the visible result is centred — I render it cleanly centred.
- **[arch] Cards row `align-items:flex-start`** (tops aligned) — matches the tablet variant
  (`css-7cqj53`). The desktop original uses `align-items:center` (`css-2acloa`), but with
  equal-width `flex:1` cards and near-equal body lengths the difference is negligible;
  flex-start keeps the two images on a clean shared baseline.
- **[content] Card-text gap = 8px** between title and body. The original `css-9uyk0n` sets
  no gap (relying on line-height); 8px (`--space-8`) restores comfortable separation,
  consistent with builder 04's value-card text gap. Card gap = 20px literal (original
  `css-cf43y gap:20px`; there is no 20px spacing token — literal per the 06 precedent for
  off-scale values).
- **[arch] Responsive:** 2 cards across at desktop (gap 40, `css-2acloa`) and tablet (gap
  24, `css-7cqj53`); stacked single column on mobile (<800), per spec §Responsive.
- **[arch] Page frame is contract-owned, not carried here** (`main#app`, base.css). Only
  INTERNAL spacing here. In isolation (pre-merge) the card renders edge-to-edge — expected.
- **[approx] Mobile heading scaled 60px → 34px** (letter-spacing 1.2px → 0.68px). Desktop
  scale is canonical; `TRAINING` at 60px overflows 375px. Same rationale/value as builder 06.

## Links / CTA

- **[a11y] `rel="noopener"` added to the `contact for more` CTA** (`target="_blank"` →
  `https://calendar.app.google/z9XuskPpZPvE5A5h7`). Original omits `rel`; added for
  security/perf, per the task's explicit instruction. URL unchanged.

## Assets

- **[perf] Both card images downloaded from the live site and served as WebP.**
  `companies-team-building.webp` (from `/_assets/v11/7ccee392…png?h=512`) and
  `companies-custom-sessions.webp` (from `/_assets/v11/c9655ebf…png?h=512`). The live
  originals are **256-colour palette PNGs with alpha** (the site quantized them), 500x512,
  ~95–109 KB each; re-encoded to WebP (`-q 82 -alpha_q 100`, alpha preserved) at **~24.5 KB
  each** — served into a 240x245 box (~2x for retina). Filename suffix changed .png → .webp
  and no `srcSet` is emitted (single optimized resolution), matching builder 06's WebP
  precedent. `30-assets.md` suggested filenames were `companies-team-building.png` /
  `companies-custom-sessions.png` (stem kept, extension changed).
- **[content] The images are flower-masked photo composites** (like the section-04 value
  cards): an off-white (#f6f5f2) flower frame around the photo, with **fully transparent
  corners** (alpha 0). On the blue-tint body band the transparent corners let the tint show
  through and the off-white flower frame reads as an off-white card — the intended look
  (verified by compositing the fetched asset over the exact tint colour). Displayed with
  `object-fit:cover`; source aspect 500/512 ≈ box 240/245, so nothing is cropped.
- **[a11y] Descriptive `alt` added** on both card images (originals ship `alt=""`), per the
  ARCHITECTURE §8 content-image convention: "Two people collaborating closely over a laptop
  at a vibe coding workshop table" and "A facilitator presenting AI workshop slides beside a
  laptop in a library setting". (Alts describe the visible photo content; the flower-mask
  framing is decorative.)

## Interactions (no JS this phase — ARCHITECTURE §9)

- **`data-reveal`** on the header intro group (`.fco-intro`), the cards row (`.fco-cards`),
  and the CTA (`.fco-cta`). No pre-hiding in CSS. `id="for-companies"` kept on the root (not
  a nav scroll target — the four targets are for-vibe-coders/cities/for-city-leaders/
  for-sponsors — so no `scroll-margin-top`).
- **[approx] No hover/press affordance added** — the original has none (interactions §4).

## Copy fidelity (preserved verbatim — NOT deviations)

- **Trailing space** kept on the `team-building ` card title (source has it). Eyebrow source
  casing `for companies` kept (display uppercases via `.eyebrow`). Heading `TEAM TRAINING`
  and both card bodies reproduced exactly.
