# Deviations — Section 01 (sticky nav)

Section-local deviations from `https://vibecoders.global/` (captured in `docs/spec/`).
The integrator consolidates these into `docs/DEVIATIONS.md` at merge time.
Legend: **[arch]** structural · **[content]** copy/data · **[a11y]** accessibility ·
**[perf]** payload/assets · **[approx]** unverifiable-so-approximated.

## Assets

- **[perf][arch] One logo file instead of three per-breakpoint SVGs.** `30-assets.md`
  lists `logo-nav-mobile.svg` (viewBox 60), `logo-nav-tablet.svg` (80) and
  `logo-nav-desktop.svg` (80). All three are the **same artwork**: tablet and desktop
  have byte-identical path data (they differ only in an auto-generated Figma clip-path
  id, `clip0_0_1277` vs `clip0_0_1298`), and the mobile file is that same art scaled by
  exactly 0.75 (verified: corner radius 12→9, control point 5.37258→4.02944). SVG is
  resolution-independent, so a single file scales cleanly to the 60/80 px box sizes set
  in CSS. Shipped one **`logo-nav.svg`** (byte-exact copy of the desktop original) and
  dropped the redundant two. Cuts the logo payload from ~1.3 MB (3 files) to 448 KB.
- **[perf] Logo shipped un-minified (448 KB raw / ~152 KB gzip).** It is genuine vector
  detail (21 ornate-script paths, ~3.9 avg decimal places from Figma), not embedded
  raster. A 2–3-decimal precision pass was prototyped and verified pixel-clean at ≤80 px
  display but saves only ~24–48 KB gzip; for a brand mark I kept the byte-exact CDN asset
  over a lossy rewrite. Recommend a uniform `svgo` pass across all site assets in a later
  perf phase rather than a one-off here.

## Structure / interaction

- **[arch] Pinned with `position: fixed`, not the original's `position: sticky`.** Per
  `ARCHITECTURE.md` §9 the nav is first-in-DOM inside a short `<header>`, where `sticky`
  would only pin within that header. Same pinned-at-top result. (Contract decision;
  noted for completeness.)
- **[arch] Logo is a scroll-to-top `<button>` targeting `data-scroll-target="hero-header"`.**
  The original logo is a JS `<button>` that scrolls to the top; the site has no `#anchor`
  targets. The interaction contract (§9) names four scroll targets and none is "page top",
  so the logo reuses the existing `hero-header` id (first element in `<main>`, effectively
  y≈0 after `scroll-padding-top`). This uses the documented `data-scroll-target` mechanism
  against an existing id — an extension, not a divergent contract. A future JS phase may
  special-case the logo to an absolute `scrollTo(0,0)` if exact top is desired.
- **[a11y] Logo accessible name lives on the button, image is decorative.** `§8` says
  logos get `alt="Vibe Coding Collective"`. Because the logo is an interactive control, the
  brand **and the action** are put on the control (`aria-label="Vibe Coding Collective,
  back to top"`) and the inner `<img>` is marked decorative (`alt=""`) to avoid a doubled
  announcement. Net accessible name: "Vibe Coding Collective, back to top, button".
- **[a11y] `contact for more` `<a>` gains `rel="noopener"`.** The original `target="_blank"`
  link ships no `rel`; `noopener` is added to sever the `window.opener` reference
  (security/perf best practice). No visual change.
- **[content][approx] The "active" scroll link is rendered identically to the others.**
  The spec flags `for vibe coders` as the highlighted/active item (class `css-b54yok`), but
  that class sets only `font-variation-settings: normal` — **no visible style** in the
  static capture; all three links are the same blue `#0056a1`. So all three render
  identically here. Any true active/scroll-spy state belongs to the later JS phase.
- **[approx] Single responsive DOM (show/hide), not three `data-breakpoint` copies.**
  Global policy (`DEVIATIONS.md`); nav specifics: `.nav-links` (the three scroll links) is
  hidden `< 1280`; `.nav-find-event` is hidden `< 800`; logo + `contact for more` always
  show. Matches the original's per-breakpoint contents.
- **[approx] `justify-content: space-between` at all breakpoints.** The original swaps the
  nav's justification per breakpoint (desktop `space-between`, tablet `center` with a
  `flex:1` right group, mobile `space-between`); all resolve to logo-left / CTAs-right,
  which `space-between` reproduces with one rule. Side padding still steps 40→32→12 px per
  breakpoint as captured.
- **[approx] No hover/press states.** The original has none observable (spec §40.4); none
  added. Keyboard focus uses the UA default ring (base.css does not suppress it).

## Measurement (reported to orchestrator, tokens.css NOT edited)

- **Nav height exceeds the `--nav-height: 72px` token.** The logo button is 80×80 px
  (desktop/tablet) / 60×60 px (mobile) per the captured CSS (`css-hoya1r` / `css-3h1llp`)
  and is the tallest item, so the box-model bar height is **80 + 2×8 = ~96 px** on
  desktop/tablet and **60 + 2×8 = ~76 px** on mobile — vs the 72 px token used for
  `scroll-padding-top`. First-screen clearance is unaffected (hero `padding-top:200px`
  clears either), but in-page smooth-scroll targets would sit ~24 px under the desktop bar.
  Recommend the integrator bump `--nav-height` to ~96px (or reduce the logo box) — see
  final report.
