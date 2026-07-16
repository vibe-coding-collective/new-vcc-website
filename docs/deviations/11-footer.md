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
  - `logo-footer-wordmark.svg` — the **colorful retro VCC wordmark** (`34e7cef0…`, 708×202),
    which is actually a horizontal cluster of **5 googly-eyed blobs** (red/yellow/green/teal/
    blue, no orange). It is the SINGLE decorative footer graphic (spec `css-nu3ilp`, node
    `12:253`), `alt`-empty / `aria-hidden`; rendered large + bottom-cropped (see the
    "mascot row" entry below).
  No text-fallback was needed (the task's fallback path only applies if the real footer
  variant is not determinable — it was). The blue nav logo was **not** copied or recolored.
- **[perf] RESOLVED (polish pass 2026-07-16): `logo-footer-mark.svg` minified via a 2-decimal
  precision pass.** Was 447,541 B raw / 156,654 B gzip; now **329,807 B raw / 109,468 B gzip**
  — 117,734 B (26.3 %) off raw, 47,186 B (30.1 %) off gzip. Same treatment as the nav logo
  (`logo-nav.svg`, likewise minified this pass): path coordinates rounded to ≤2 decimals with
  trailing zeros dropped; `viewBox="0 0 100 93.0005"`, all attributes, the `#F6F5F2` fills and
  all 20 paths are byte-preserved. **Verified visually identical** with a headless-Chrome 2×/4×
  render diff on a dark background (mean per-channel delta ≈0.13/255; <0.15 % of pixels differ
  perceptibly, all edge antialiasing). One-off script, no committed deps — the "known
  SVG-optimization opportunity for a later pass" flagged here is now actioned.
- **[approx] RESOLVED: the wordmark is the ONE bottom-anchored blob graphic, no longer a
  faint centered watermark.** Earlier this same SVG was rendered centered at `opacity: 0.16`
  as a faint watermark *and* the bottom blobs were a **separate** placeholder row — two
  representations of what is really one element. Per `31-recovered-assets.md` Group 3 the
  footer has a SINGLE wordmark element (node `12:253`), so it is now rendered exactly once:
  full opacity, `width: min(var(--content-1400), 92%)`, bottom-anchored, `translate: 0 46%`
  so the lower ~46% is cropped by `overflow:hidden` and the blob tops peek up. The static
  capture's recorded `top:201px` at intrinsic 708×202 is clearly overridden by the live
  render (LARGE, bottom-cropped per the orchestrator screenshot), so the **scale/crop are
  visual-pass tuning values**; the element sits behind the content (`z-index:0`).

## Footer — "mascot row" = the wordmark rendered large — RESOLVED

- **[content] RESOLVED: the six placeholder blobs are removed; the live "mascot row" IS the
  wordmark.** Per `31-recovered-assets.md` **Group 3** (orchestrator-corrected), there is **no
  separate runtime-injected mascot row** in the original — the "row of googly-eyed blobs peeking
  from the bottom edge" is the colorful footer **wordmark** (`logo-footer-wordmark.svg`, node
  `12:253`) rendered large and cropped at the band's bottom edge. Reading the SVG confirms it is
  literally a horizontal cluster of **5 googly-eyed blobs** — red `#EB3722`, yellow `#FFD226`,
  lime `#91BD3C`, teal `#1CA9B0`, blue `#0056A1` (each = body + 2 white eyes + 2 dark pupils),
  spanning X≈[21,684] and Y≈[41,182] of the 0–202 viewBox. The six `aria-hidden <span>`
  placeholder blobs and every `.footer-mascot*` rule were **deleted** and replaced by the real
  wordmark, bottom-cropped.
- **[content] The earlier "six mascots incl. orange" live reading was a mis-segmentation.** The
  prior deviation logged six blobs including **orange**; the real wordmark has **five** and no
  orange (the orange blob belongs to the §02 hero mascot). The JSON is authoritative (Group 3);
  the observer over-counted / mis-attributed an orange. No 6th/orange blob exists in the page data.
- **[content] Obsolete color-token notes withdrawn.** The prior `#eb3722` literal and
  `--green-bright` blob-fill choices — and the "add a `--red` token *for this row*"
  recommendation — no longer apply: the CSS placeholder blobs are gone and the real SVG carries
  its own colors. (A `--red` token may still be worth adding for §02; that is out of this
  section's scope.)

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
- **[arch] RESOLVED (polish pass 2026-07-16): the self-init is gated out of unit tests
  (reviewer N1).** `interactions.ts` still self-initializes on load for dev + production, but
  the bottom `initInteractions()` call is now guarded by `import.meta.env.MODE !== 'test'`, so
  importing the module under Vitest no longer leaks a persistent document-level click listener
  into the test environment. Dev/production behavior is unchanged — `import.meta.env.MODE` is a
  Vite-static string, so the guard tree-shakes to a constant and `initInteractions()` always
  runs in the browser bundle. The unit tests already call `initInteractions()` explicitly; a
  new regression test asserts a bare import wires no document listener (all 15 prior tests still
  pass, 16 with the new one). **On the guard choice:** `import.meta.vitest === undefined` (the
  first-suggested form) was tested and rejected — inside an *imported source module* Vitest
  leaves `import.meta.vitest` undefined unless in-source testing (`includeSource`) is configured,
  so that check would not have skipped the self-call; the `MODE` check needs no config change
  and is the standard Vite-static env guard.
