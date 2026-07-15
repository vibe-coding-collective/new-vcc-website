# Deviations — Section 10 (Contact CTA / off-white card)

Owner: builder(10-contact-cta). The integrator consolidates these into `docs/DEVIATIONS.md`.
Legend: **[arch]** structural · **[content]** copy/data · **[a11y]** accessibility ·
**[perf]** payload/assets · **[approx]** unverifiable-so-approximated.

## Copy (byte-exact, verbatim)

- **[content] Heading, paragraph, label and address are byte-exact** from the spec / capture:
  `up for a collaboration?`, `Get in touch if you'd like to partner with us or just to have a
  coffee-chat.` (straight apostrophe in `you'd`), `Email:`, `dan.porder@vibecoders.global`.

## Email address — PLAIN TEXT, styled green (faithful to capture)

- **[content][a11y] The email address is rendered as plain text (`<span>`), not a `mailto:`
  link**, and colored green `#498d44` (`.cta-email-address` → `var(--green)`, matching
  css-813ies). This faithfully reproduces the capture, where the address is a
  non-interactive `<p>` (css-rnvkzt/css-813ies), **not** an anchor. Logged because it is a
  deliberate a11y/UX trade-off: a real site would normally make this a `mailto:` link. Kept
  as plain text for fidelity; recommend revisiting (make it a `mailto:`) in a UX pass.
- **[content] `Email:` label colored black `#000`** (`.cta-email-label` → `var(--black)`,
  matching css-iguuiu) — the one place the `--black` token is used, per tokens.css.

## `contact for more` CTA — `target="_self"` (the single exception)

- **[content] This CTA uses `target="_self"`**, unlike every other `contact for more` /
  `Start a chapter` / city link on the page (which are `target="_blank"`). This is faithful
  to the capture: the Contact-CTA `contact for more` is `_self` on all three breakpoints
  (spec §7 / 40-interactions.md §6 — the `_self` accounting). Kept `_self`; **added
  `rel="noopener"`** per the contract instruction (harmless on a same-tab navigation; added
  for consistency with the page's other outbound CTAs). href unchanged
  (`https://calendar.app.google/z9XuskPpZPvE5A5h7`). Uses the shared `.btn .btn--light`.

## `Email:` label kept at all breakpoints (desktop-canonical)

- **[content] The `Email:` label is shown at every breakpoint.** The original renders it only
  on desktop (≥1280) and omits it on tablet/mobile (which show just the address). Per the
  ratified desktop-canonical rule in `DEVIATIONS.md` ("Contact 'Email:' label … the
  mobile/tablet omission is not followed"), the label is kept everywhere. To accommodate the
  added label on narrow screens, the email row uses `flex-wrap: wrap` (`.cta-email`), so
  `Email:` and the address stay on one line on wide viewports and wrap to two centered lines
  on narrow ones — never overflowing.

## Illustration asset (the yellow smiley-sun doodle)

- **[perf] `contact-illustration.svg` downloaded to `public/assets/contact-cta/`** from
  `https://vibecoders.global/_assets/v11/14c2673a765c25af90dd14c74544b1c7faa8b46c.svg`
  (300×298, ~7.9 KB). It **is present in the static capture with a determinable URL**, so it
  was downloaded (not treated as runtime-injected, unlike the §02 hero collage). The Figma
  export embeds hex fallbacks in its fills, so it renders standalone. The artwork is the
  hand-drawn yellow smiley-sun "collaboration" doodle the orchestrator observed live.
- **[a11y] Illustration is decorative → `alt=""`.** It carries no information the copy doesn't
  already convey; the wrapper is a plain `<div>`, not a `<figure>` (which would imply
  meaningful content).
- **[approx] `preserveAspectRatio="none"`** on the SVG means it would distort if its box aspect
  differed from the viewBox. The box uses `aspect-ratio: 300 / 298` so it stays proportional
  as it scales (`300px` desktop → `191px` < 1280, `max-width: 100%` on tiny viewports), and
  the `<img>` fills it exactly — no distortion.

## Layout / responsive

- **[arch] Illustration + text are side-by-side on desktop (css-k74qhi row) and stack to a
  column < 1280** (css-d8w1zi at tablet, css-t040yc at mobile — the original stacks at **both**
  tablet and mobile, not only mobile). Internal padding: `80px 52px` desktop → `52px 24px`
  (< 1280) → `32px 12px 40px` (< 800). Text-column gap `32 → 20 → 16px`. Illustration
  `300×298 → 191×189.7` at < 1280 (same size at tablet and mobile).
- **[arch] Card radius `32px` (desktop/tablet, css-d1un8n) → `20px` (< 800, css-9hp8h3)**, via
  the shared `--radius-card` / `--radius-card-mobile` tokens (the switch at 800 matches the
  site).
- **[content] Type scales down only at `< 800`** (desktop = tablet in the capture): heading
  `32 → 20px` (ls `0.64 → 0.4`, css-z2l67j), paragraph `24 → 18px` (css-rqghrp), email
  `24 → 18px` (css-7qompo). Heading uses `.t-card-title` (32px, css-i0585y); paragraph and
  email use `.t-body-lg` (24px, css-up3oa8).
- **[a11y] Heading hierarchy.** `up for a collaboration?` is an `<h2>` (original used `<p>`),
  per the heading-hierarchy policy.
- **[arch] Page gutter / max-width / 80px inter-section gap delegated to `main#app`.** The card
  fills the wrapper's inner width and carries only its own internal padding (the card's padding
  is content padding, not a page gutter).

## Interactions

- **[approx] `data-reveal` on `.cta-inner`** (per 40-interactions.md §1 — `<main>` and its
  top-level blocks reveal on scroll). Content is **not pre-hidden in CSS** (no reveal script
  yet).
- **[approx] No hover/press states** (original has none; spec §40.4). The light button keeps
  its shared 4px ink border + hard shadow. Keyboard focus uses the UA default ring.
