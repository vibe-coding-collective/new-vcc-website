# Deviations — Section 07 (FOR sponsors / blue card on off-white)

Section-scoped deviation log for the integrator to consolidate into
`docs/DEVIATIONS.md` at merge time. Legend mirrors `DEVIATIONS.md`: **[arch]**
structural · **[content]** copy/data · **[a11y]** accessibility · **[perf]**
payload/assets · **[approx]** unverifiable-so-approximated.

Source of truth followed: **desktop (1280) canonical** per `docs/DEVIATIONS.md`.
Copy/glyphs are byte-exact from `docs/spec/20-sections/07-for-sponsors.md` and the
`_capture/dom-1280.html` sponsors block.

## Mobile-parity batch (2026-07-16)

- **[arch] This section's H2 is the documented EXCEPTION to the shared 32px mobile heading.**
  The other section H2s step to 32px on mobile via the tokens.css `<800` `.t-h2` override
  (`css-i05ae1`), but the original sizes "Put your brand in a room with builders" at **28px/0.56**
  on mobile (`css-n164e2`, the band-title tier — it's a long heading). So `.fsp-title` keeps a
  scoped `@media (width < 800px)` override at 28px (was 34px). The lede also steps 20 → 16px
  (`css-n6l5zh`). Verified at 375/320: no horizontal overflow (`scrollWidth === innerWidth`).

---

## Discrepancy caught (surfaced to the orchestrator; I followed the capture)

- **[content] "Why Partner With Us" label size — spec §7.2 prose (20px) vs its own
  class reference (32px).** Spec 07 §7.2 says *"Label (Golos Black **20px** UC #181814
  — css-ubny2b+css-i0585y+css-871ihu)"*, but the referenced classes contain **no 20px**:
  `css-ubny2b` is layout-only (`max-width:1400px; width:min-content; min-width:100%`),
  `css-871ihu` is color-only (#181814), and the only font-size is **`css-i0585y` = 32px**
  (confirmed in `_capture/css-rules.css` AND in `10-design-tokens.md` §2.2, which lists
  `css-i0585y` as the 32px card title — the same class the companies §9.2 card titles use
  and correctly call "32px"). The §7.2 "20px" is a transcription error. Per "the capture/
  tokens win on an internal spec contradiction," I rendered the label at **32px** via the
  shared `.t-card-title` utility. If the orchestrator wants the literal 20px, swap
  `.t-card-title` → `.t-eyebrow` on `.fsp-partner-title` — flag if so.

## Structure / semantics

- **[a11y] Heading hierarchy** (original emitted every string as `<p>`): `<h2>` for the
  section heading `Put your brand in a room with builders`; `<h3>` for the sub-label
  `Why Partner With Us` (introduces the bullet list). Matches the 04/06 h2→h3 precedent.
- **[arch/a11y] Bullet list normalized: one `<ul>` of five `<li>` instead of the
  original's FIVE single-item `<ul>`s.** The Figma export wraps each bullet in its own
  `<ul><li><span>` (`css-wc1msa` ul + `css-h10wqm` li + `css-90q2bv` span). Five one-item
  lists is poor semantics; the five reasons are one list. Collapsed to a single `<ul>`
  with five `<li>` (text directly on the `<li>` via `.t-body`), consistent with builder
  04's markup-normalization precedent.
- **[arch] Two-column bullet split reproduced with CSS Grid on the single list.** The
  original groups the bullets into two flex columns — column A = bullets 1–2 (`css-ymoq7s`),
  column B = bullets 3–5 (`css-pbatqu`). I keep one semantic `<ul>` and place items with
  explicit `grid-column`/`grid-row` (1,2 → col A; 3,4,5 → col B), so the 2|3 split is
  faithful without splitting the logical list. Columns stay at desktop AND tablet (spec
  "two columns on desktop/tablet"); they collapse to one column on mobile (<800), where the
  nth-child placements reset to auto-flow.
- **[content] Bullet `•` marker recreated in CSS.** `base.css` resets `list-style:none`
  globally, so the spec's `content:'\2022'` marker is re-added as `.fsp-bullet::before`
  (a `•` with a 30px hanging indent, matching the original li `margin-inline-start:30px`).
- **[content] Desktop-canonical single-run bullets.** Each bullet is a single string
  (desktop form), NOT the mobile/tablet split-lead-phrase form. Per `DEVIATIONS.md`
  ("Sponsor bullets §07"), the optional lead-sentence bolding on small screens was **not**
  added (kept uniform for simplicity; trivial to add later).

## Off-white backing + rounded card (non-obvious, important)

- **[arch] Section root carries `background: var(--off-white)` AND `border-radius`.** The
  body band's tint is `--blue-tint = rgba(0,86,161,0.4)` — **semi-transparent** — so it
  composites over whatever is behind it. That backing must be **off-white** (#f6f5f2), not
  the cream page (#fde9c9), or the tint renders a warmer/wrong light-blue. Contract §6
  mandates the off-white bg for exactly this reason. The matching `border-radius`
  (`--radius-card` 32 / `--radius-card-mobile` 20) is required alongside it: the bands round
  their outer corners, and a **square** off-white root would show off-white corner nubs
  poking past those rounded corners against the cream page. Rounding the root aligns it with
  the bands so the off-white stays an invisible compositing backing (this is exactly what
  the original section does — `css-fy3uqk` `border-radius:32px` + `css-2fmumq` bg #f6f5f2).
  Sections 04/06 sit on cream and need neither (transparent root → cream nubs are invisible).

## Layout / spacing

- **[arch] Bands use the contract's shared 52px padding** (`.band--header`/`.band--body`,
  base.css; 40/24 on mobile). The original's bands use asymmetric inner padding
  (`css-vaqhek` 52/52/40-left-only; `css-kn7nox` 52/32/80) — superseded by the shared
  band-padding pattern kept consistent across all four card sections (04/06/07/09), per the
  04 precedent.
- **[arch] Header text column capped at `--content-900`** and centred, consistent with the
  04/06 audience-card headers (the original leaves it uncapped up to the ~1400 band width; a
  ~1400px single line of 20px body copy is poor UX). Bullet block capped at `--content-1400`
  (matches original `css-8hg00j` max-width:1400).
- **[arch] Page frame is contract-owned, not carried here.** `main#app` (base.css) owns the
  gutter, 1600 max-width, and 80px inter-section gap. This section sets only INTERNAL
  spacing. Viewed **in isolation** (this branch, before the base.css wrapper is merged) the
  card renders edge-to-edge with no outer gutter — expected; the wrapper supplies it post-merge.
- **[approx] Mobile heading scaled 60px → 34px** (letter-spacing 1.2px → 0.68px,
  proportional). The desktop scale is canonical and the spec is silent on mobile sizes; 60px
  (`BUILDERS`) overflows 375px. Same value/rationale as builder 06's mobile h2 reduction.
- **[approx] Grid columns top-aligned.** The original vertically-centres the shorter column A
  (`css-ymoq7s justify-content:center`) against column B's 3 bullets; the grid top-aligns
  both columns (row 1 shared). Cleaner and a negligible visual difference with multi-line
  bullets.

## Links / CTA

- **[a11y] `rel="noopener"` added to the `contact for more` CTA** (`target="_blank"` →
  `https://calendar.app.google/z9XuskPpZPvE5A5h7`). The original emits `target="_blank"`
  with **no** `rel`; `noopener` prevents the opened tab reaching `window.opener`
  (security/perf). Logged per the task's explicit instruction. URL unchanged.

## Interactions (no JS this phase — ARCHITECTURE §9)

- **`data-reveal`** on three top-level blocks: the header intro group (`.fsp-intro`), the
  "Why Partner" block (`.fsp-partner`), and the CTA (`.fsp-cta`). No pre-hiding in CSS
  (there is no reveal script yet — hidden content would just vanish).
- **`id="for-sponsors"`** kept on the section root (nav "for sponsors" smooth-scroll target)
  + `scroll-margin-top: var(--nav-height)` so it clears the fixed nav.
- **[approx] No hover/press affordance added** — the original has none (interactions §4).
  Default focus outline on the CTA left intact for keyboard users.

## Assets

- **None.** This section is text + bullets + button only (no images), so no
  `public/assets/for-sponsors/` directory is created.

## Copy fidelity (preserved verbatim — NOT deviations)

- **Straight apostrophe** in `We've` (bullet 5; source `&#x27;`). Eyebrow source casing
  `FOR sponsors` kept (display uppercases via `.eyebrow`). `1,100+` / `7 countries` /
  `20+` reproduced as-is.
