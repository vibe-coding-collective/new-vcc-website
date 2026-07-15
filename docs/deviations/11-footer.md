# Deviations — Section 11 (footer) + site-wide interactions

Section-local deviations from `https://vibecoders.global/` (captured in `docs/spec/`).
The integrator consolidates these into `docs/DEVIATIONS.md` at merge time.
Legend: **[arch]** structural · **[content]** copy/data · **[a11y]** accessibility ·
**[perf]** payload/assets · **[approx]** unverifiable-so-approximated.

## Footer — links / copy

- **[content] WhatsApp kept as a LINK (ratified policy).** Desktop (1280) renders
  `What'sApp` as **plain text, no href**; mobile/tablet render it as a link. Per the
  ratified footer policy in `DEVIATIONS.md`, the rebuild keeps it a **link** for usable
  UX while using the **desktop casing** `What'sApp` (curly apostrophe U+2019, copied
  byte-exact from the spec's glyph-corrected verbatim block). Href
  `https://chat.whatsapp.com/BxLUpQMiXwo6d1vG7YSirT`, **`target="_self"`** per the
  capture (the 375/800 link was `_self`). No `rel` added: `_self` replaces the current
  document, so there is no `window.opener` to neutralize.
- **[content][a11y] `Meetups` / `LinkedIn` open in a new tab with `rel="noopener"`.**
  `Meetups → https://www.meetup.com/vibe-coding-collective/`,
  `LinkedIn → https://www.linkedin.com/company/vibe-coding-collective/posts`, both
  `target="_blank"`. `rel="noopener"` is added to every `_blank` link (security/perf,
  no visual change) — consistent with the other sections.
- **[a11y] Links are a real `<ul>` list; copyright lines are `<p>`.** The original stacks
  loose nodes; grouping the three social links as a list and the copyright as paragraphs
  gives the footer a sensible structure. Display casing (uppercase links) comes from the
  `.t-link` utility's `text-transform`, so the source casing `What'sApp` is preserved for
  screen readers. Copyright text (`All rights reserved`, `London, UK. 2026`) is byte-exact.

## Footer — logo assets (REAL, sourced from the original)

- **[perf] Real footer SVGs sourced into `public/assets/footer/` (per the assets doc &
  §8 "each builder sources its own assets").** The two footer marks are **not** derived
  from the blue nav logo — they are the genuine footer assets fetched from the original:
  - `logo-footer-mark.svg` — the **white/off-white retro VCC mark** (`562debcb…`, 100×93,
    entirely `#F6F5F2`). This is the "centered white retro logo" from the live observation.
    Given as an `<img alt="Vibe Coding Collective">`.
  - `logo-footer-wordmark.svg` — the **colorful retro VCC wordmark** (`34e7cef0…`, 708×202).
    The `alt`-empty / `aria-hidden` watermark behind the content (spec `css-nu3ilp`).
  No text-fallback was needed (the task's fallback path only applies if the real footer
  variant is not determinable — it was). The blue nav logo was **not** copied or recolored.
- **[perf] `logo-footer-mark.svg` is heavy (~447 KB).** It is the same stippled micro-path
  monogram style as the committed nav logo (`logo-nav.svg`, ~447 KB) — off-white instead of
  blue — so the raw real artwork is kept to match the established repo standard rather than
  altering it. Flagged as a known SVG-optimization opportunity for a later pass (reducing
  coordinate precision could shrink it substantially without visible change).
- **[approx] Wordmark watermark opacity/offset approximated.** The capture places the
  wordmark `position:absolute; top:201px` but records no opacity; rendered centered at
  `opacity: 0.16` so it reads as a faint watermark behind the content — consistent with the
  live "black band with a centered white retro logo" observation. The static-capture's exact
  placement/opacity is not recoverable; this is a visual-pass tuning item.

## Footer — mascot row (runtime-injected; decorative placeholders)

- **[approx][content] Six googly-blob mascots = decorative CSS placeholder blobs, no eye
  artwork.** Live, a row of six googly-eyed blob mascots peeks up from the footer's bottom
  edge (colors left→right red / orange / yellow / green / teal / blue). They are
  **runtime-injected** — absent from the static capture, no determinable asset URL — so they
  are reproduced as `aria-hidden` `<span>` blobs in the observed colors, lower halves clipped
  by the footer's `overflow: hidden` (the "peek"). **No googly-eye artwork is invented.** The
  real mascots are queued for the asset-recovery task.
- **[content][approx] `red` mascot uses the literal `#eb3722`; `green` uses `--green-bright`.**
  No `--red` token exists in `tokens.css`, and the row already contains a distinct `orange`
  blob (`--orange` #ec6c23), so `orange` cannot double as `red`. `#eb3722` is the brand red
  taken from the **real** footer wordmark SVG (`fill="var(--fill-0, #EB3722)"`), used as a
  logged literal. `green` uses `--green-bright` (#91bd3c) — the playful lime the real retro
  logo itself uses — matching the section-02 hero-chip precedent. **Recommendation:** add a
  `--red` (#eb3722) token to `tokens.css` (also requested by §02); this row and the hero
  collage's "red" blob would then use it instead of literals/approximations.

## Footer — layout / structure

- **[arch] Full-bleed dark band OUTSIDE `main#app`, self-guttered (like the nav).** The
  `<footer class="s-footer" id="footer">` is inlined directly into `<body>`, so it carries
  its own `padding-inline` (40px desktop, 24px mobile) and `max-width` content cap rather
  than inheriting the `main#app` gutter. Background `var(--ink)`.
- **[arch] Column gap loosened from the captured 10px.** `css-suww2`'s `gap:10px` reads too
  tight between the logo mark and the two-column row in the rebuilt proportions; a
  `margin-block-end: 40px` on the mark gives balanced separation. Documented as an
  intentional spacing adaptation.
- **[arch] Mobile: two-column row stacks and centers.** The spec is desktop-canonical and
  silent on the mobile footer; at <800px the left links (~245px) + right copyright cannot sit
  side-by-side on a 375px viewport, so the row stacks centered, padding drops to `60px 24px`,
  and the mascots shrink (64→40px, smaller gap) so all six fit. Consistent with the site's
  mobile card-padding adaptation already logged in `DEVIATIONS.md`.
- **[approx] No hover/press states** (original has none; spec §40.4). Links use the UA focus ring.
- **[arch] `data-reveal` on `.footer-inner`.** The footer content participates in the
  site-wide scroll-reveal, consistent with every other section revealing its content block.
  The decorative watermark + mascots are siblings (not gated) and show immediately. Purely
  additive — the `html.js` gate keeps the footer fully visible with no JS. Remove the marker
  if the integrator prefers the footer never to animate.

## Site-wide interactions (this batch also delivers `src/interactions.ts` + CSS)

- **[approx] Scroll-reveal implements the approximation from spec §40.1 / `DEVIATIONS.md`.**
  `opacity 0→1` + `translate 0 24px→0` over **0.5s ease-out**, once on first viewport entry
  (IntersectionObserver, `threshold: 0.1` ≈ "10–15% visible"), then unobserved. The
  original's exact easing/duration/stagger/replay are computed in its JS runtime and were not
  externally measurable — this is an intentional approximation.
- **[arch] No-JS gate via `html.js`.** `interactions.ts` stamps `<html class="js">` at init;
  `interactions.css` hides `[data-reveal]` **only** under `html.js`, so with no JavaScript the
  class is never added and all content stays fully visible (content is never hidden
  unconditionally). Above-the-fold reveal blocks (e.g. the hero) may show a brief fade after
  the deferred module boots — inherent to the JS-gated pattern and accepted per spec §40.8.
- **[a11y] Reduced motion fully honored.** Under `prefers-reduced-motion: reduce`, smooth
  scroll falls back to `behavior: 'auto'` (instant) and reveal is applied immediately (no
  observer, no transition — belt-and-braces in both the JS and a CSS media block).
- **[arch] Robustness fallbacks.** With no `IntersectionObserver` (or no `matchMedia`) the
  module reveals everything immediately rather than leaving content hidden — the reveal is a
  pure enhancement over already-visible content.
- **[arch] `src/main.ts` touched by explicit grant — imports only.** Added exactly two lines
  (`import './styles/interactions.css'` and `import './interactions'`); nothing else changed.
  Note: main.ts's existing header comment still says interactive behavior "arrives in a later
  phase" — left untouched per the imports-only grant; the file's owner may refresh it.
