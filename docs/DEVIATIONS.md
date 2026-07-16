# DEVIATIONS — intentional differences from the original

Every deliberate departure from `https://vibecoders.global/` (as captured in
`docs/spec/`), each with a one-line rationale. Seeded by the contracts task.
**Section builders never edit this file** — each logs its entries (final URL choices,
mobile adaptations, hover/press approximations) in its own `docs/deviations/NN-slug.md`,
which the integrator (orchestrator) consolidates here at merge time.

Legend: **[arch]** structural · **[content]** copy/data · **[a11y]** accessibility ·
**[perf]** payload/assets · **[approx]** unverifiable-so-approximated.

---

## Structure & semantics

- **[arch] Single semantic DOM instead of three `data-breakpoint` DOM copies.** The
  original renders all three breakpoint variants into the DOM and toggles them with
  `display:none`. We author each section once and adapt with media queries — smaller,
  maintainable, and it removes the copy-drift the original carries between variants.
- **[a11y] Real heading hierarchy instead of all-`<p>`.** The original emits every
  heading and paragraph as `<p>`/`<span>`/`<li>` (Figma Sites left `accessibleHTMLTag`
  generic). We use `<h1>` (hero), `<h2>` (section headings), `<h3>` (card titles) with
  their visual size supplied by type utilities, so the document outlines correctly.
- **[arch] Nav is FIRST in the DOM (in a `<header>` banner), not a last-in-DOM overlay.**
  The original puts the sticky nav as the final node inside a full-page
  `pointer-events:none` overlay. We place it first in a real `<header>`, and section 01
  pins it with `position: fixed` (the short `<header>` can't host a page-wide `sticky`).
  Cleaner landmarks (`header > nav`, `main`, `footer`), same pinned-at-top result.
- **[arch] Landmarks:** exactly one `<header>` (banner) containing the `<nav>`, one
  `<main id="app">` (sections 02–10), one `<footer>` (contentinfo = section 11's root).
  The original's `<main tabindex="-1">` + `.bypass-link` skip pattern is not reproduced
  (no skip link yet); revisit if we add one.

## Desktop-canonical copy (resolving the cross-breakpoint drift, spec §5)

Where the three DOM copies disagree, **desktop (1280) copy is canonical**. Known items:

- **[content] Cities list (§04).** Use the desktop set/order/casing: `berlin`, `delft`,
  `Kyiv`, `London` (links) + `boston` `TBA`, `Edinburgh` `TBA` (Scotland flag on
  Edinburgh). We do **not** show tablet's `Lisbon` or mobile's `Delft`/`edinburgh`
  variants. (`berlin` and `boston` stay lowercase — intentional original casing.)
- **[content] Team roster (§06).** Use the tablet/desktop **12-person** grid with **Dan
  Porder first**, not mobile's 8-person / Sofiia-first ordering.
- **[content] Project eyebrow (§05).** `From "What If?" → to a Vibe App` (desktop), not
  the mobile/tablet `→ to an app`.
- **[content] Sponsor bullets (§07).** Each "Why Partner With Us" bullet is a **single
  run** (desktop), not the mobile/tablet split-lead-phrase form. Bolding the lead
  sentence on small screens is an allowed optional embellishment.
- **[content] Contact "Email:" label (§10).** Shown (desktop) above the address; the
  mobile/tablet omission is not followed.
- **[content] Footer WhatsApp casing (§11).** Use desktop `What'sApp` (curly apostrophe).
  BUT the original makes desktop `What'sApp` **plain text** while mobile/tablet link it —
  the footer builder should keep it a **link** (href
  `https://chat.whatsapp.com/BxLUpQMiXwo6d1vG7YSirT`) for usable UX, and log that choice
  in `docs/deviations/11-footer.md`.
- **[content] Nav contents per breakpoint (§01) are RESPONSIVE, not a copy conflict.**
  Keep all three states as show/hide: mobile = logo + `contact for more`; tablet = +
  `find an event`; desktop = + the three `for …` scroll links.
- **[content] Project-card DOM order (§05).** Keep desktop order (Immersive 3D, Motion
  Tracking, Open Data Integration, The Unexpected); ignore the mobile/tablet middle-two swap.

> **Preserved as-is (NOT deviations — do not "fix"):** mixed curly vs straight
> apostrophes; the double space after `120 minutes.`; trailing spaces in a few
> source strings. Reproduce verbatim (see spec §7).
>
> The original's contradictory membership/country figures were also on this list
> until go-live; they are now reconciled — see **Content corrections** below.

## Content corrections (go-live, 2026-07-16)

The clone reproduced the original's self-contradicting membership and country figures
verbatim, per spec §7. That was right while this repo was a fidelity exercise. It stopped
being right the moment the clone became the real `vibecoders.global` under our own name.
**Operator decision (2026-07-16): reconcile to the true figures.**

- **[content] Membership reads `4,000+` everywhere.** The original says `4,000+` (§03
  hero), `1,200+` (§06 lede) and `1,100+` (§07 lede + bullet) — a ~4x spread, with the
  `1,100+` sitting inside a "No inflated numbers" pledge that the hero contradicted.
- **[content] Countries reads `10` everywhere.** The original says `9` (§03 stat),
  "Seven countries" (§03 desc) and "7 countries" (§07 lede + bullet).
- **[content] RESOLVED — the §03 flag row now carries 10 flags, matching the stat.** The
  original shipped **8** flags (🇬🇧🇩🇪🇺🇸🇯🇵🇺🇦🇵🇹🇳🇱🇵🇰) against its own stat of `9`. The
  operator confirmed the roster (2026-07-16), so the row now reads
  🇺🇸🏴󠁧󠁢󠁥󠁮󠁧󠁿🇳🇱🇵🇹🇮🇳🇺🇦🇯🇵🏴󠁧󠁢󠁳󠁣󠁴󠁿🇩🇪🇵🇰 — US, **England**, Netherlands, Portugal, **India**, Ukraine,
  Japan, **Scotland**, Germany, Pakistan. Measured against the original's 8: **7 are kept**
  (US, NL, PT, UA, JP, DE, PK), the single 🇬🇧 (GB) is **replaced by separate England +
  Scotland flags** — consistent with §04, which already flags Edinburgh with the Scotland
  flag — and **India** is added. Net 8 − 1 + 3 = **10**: the flags were raised to match the
  stat, not the stat filed down to match the flags.
- **[content] England and Scotland are encoded as TAG SEQUENCES,** not regional-indicator
  pairs: `U+1F3F4` + 6 tag chars (`gbeng` / `gbsct`) + the `U+E007F` cancel tag. The tag
  chars are **invisible** in an editor, so the run looks like it carries stray characters —
  do not "tidy" it. Edit it by codepoint and re-check the grapheme count is 10:
  `[...new Intl.Segmenter("en",{granularity:"grapheme"}).segment(run)].length`. Rendering
  caveat for the two tag sequences: see the emoji-fallback bullet under **Fonts & emoji**.

## Links / URLs

- **[content] Prefer stable base URLs over dated `/events/NNN/` links.** The original's
  `berlin`/`London`/`Lisbon` point at single-event Meetup pages (e.g.
  `…/events/312898072/`) that will go stale. Recommend the base URLs as canonical
  (`berlin → https://www.meetup.com/vibe-coding-collective-eu/`,
  `London → https://luma.com/bhfumnou`). **Final per-link choice is the section 04
  builder's**, and each substitution must be logged in `docs/deviations/04-for-vibe-coders.md`
  (consolidated here by the integrator).
- **[content] `target` behavior** from spec §7 is otherwise reproduced (most CTAs/city
  links `_blank`; the Contact-CTA `contact for more` and footer WhatsApp are `_self`).

## Fonts & emoji

- **[perf] Golos Text self-hosted as a single VARIABLE woff2 per subset (latin,
  latin-ext), not 6 static per-weight files.** Google serves one variable file
  (`wght` 400–900) that the browser instances to 500/700/900; `font-weight: 400 900`
  covers all three design weights. Total payload ≈ 60 KB (well under the 1.5 MB budget).
- **[perf] Cyrillic / Cyrillic-ext subsets dropped.** All site copy is Latin; no Cyrillic
  content exists. (The original ships 6 subsets per family incl. Cyrillic.)
- **[perf] Jost omitted.** The original loads Jost but it is not used on any visible node
  (spec §2.1) — leftover. Not bundled.
- **[a11y/perf] Noto emoji/symbol fallback fonts NOT bundled; rely on the system emoji
  stack.** The original appends `Noto Sans` / `Noto Sans Symbols` / `Noto Sans Math` for
  flag/arrow/symbol runs. We let flags and arrows fall back to the OS emoji font, so flag
  glyph coverage is **font-stack dependent, not platform-level** — and the §03 flag row
  (10 flags, shipped 2026-07-16) is where that shows:
  - **macOS / iOS** (Apple Color Emoji) render the whole row correctly — regional-indicator
    pairs and the England/Scotland tag sequences alike.
  - **Chrome / Edge on Windows** fall back to **Segoe UI Emoji, which ships no country-flag
    glyphs at all.** The whole row degrades, not just the tag sequences: the 8
    regional-indicator pairs draw as boxed letter pairs (`US`, `NL`, …) and England/Scotland
    as two identical plain black flags 🏴. This is **not a regression** — the original's
    8-flag row already degraded the same way there.
  - **Firefox on Windows** bundles Twemoji Mozilla and renders both regional-indicator and
    subdivision flags correctly.
  - Android/Noto renders regional-indicator pairs; subdivision-flag support is newer, so
    treat England/Scotland there as unverified rather than assumed.

  **Accepted, not unnoticed:** the row is `aria-hidden="true"` decoration, the `10` stat
  beside it carries the actual meaning, and the flag **count** — and so the 5+5 wrap — holds
  regardless of glyph coverage (10 grapheme clusters either way; `text-wrap: balance`
  re-measures whatever the font gives it). Bundling Noto to fix it would cost far more than
  the blemish is worth. Cross-platform rendering variance is the price of the payload saving.

## Components & styling approximations

- **[arch] Light button uses a real `4px solid` border (padding pre-compensated),** not
  the original's absolutely-positioned outline overlay (`css-15fpuq`). Same look, simpler
  DOM; both button styles keep the same outer box size.
- **[approx] Letter-spacing is applied plainly;** the original's
  `.adjustLetterSpacing::after` trailing-gap-trim trick is not reproduced (negligible
  visual difference).
- **[arch] Mobile section-card band padding reduced to `40px 24px`** (desktop/tablet stay
  `52px`). The spec is desktop-canonical and silent on mobile card padding; 52px each
  side is unusable at 375px. Documented so it's an intentional, consistent adaptation.
- **[approx] Scroll-reveal entrance** (fade + `translateY ≈24px→0`, ~500ms ease-out, once
  on entry) is an approximation — the original's exact easing/duration/stagger is computed
  in JS and not externally measurable (spec §40.1). To be implemented in the later JS phase.
- **[approx] Sponsor-logo marquee** (~30–40s loop, white pills) approximates the original's
  runtime marquee (exact speed/direction unmeasured; spec §40.5). Section 03 owns it in CSS
  with a reduced-motion fallback.
- **[approx] Hover/press states.** The original has no static hover styles and showed no
  visible hover change when probed live (spec §40.4). Any press affordance a builder adds
  (e.g. nudging a button toward its shadow) is an optional approximation — log it.
- **[approx] Runtime-injected visuals** — the hero 862×350 photo collage (§02), the
  "supported BY" logo marquee (§03), and the footer googly-blob mascot row (§11) are
  absent from the static capture and reconstructed from live observation; treat their exact
  composition as approximate.
- **[approx] Page-wrapper rhythm (amendment 2026-07-15)** — `main#app` carries the
  original wrapper's `gap: 80px`, `max-width: 1600px`, and gutter (40px; 16px <800).
  Desktop values are capture-derived; the mobile wrapper gap was not separately
  verified and keeps 80px pending the integration visual pass.

## Mobile parity batch (2026-07-16)

- **[arch] Mobile display type is tokenized** (`tokens.css` mobile `:root`): H2 32/0.64,
  band-title 28/0.56, card-title 20/0.4, eyebrow/name 18 — transcribed from the original's
  own mobile classes; sections no longer hand-roll heading scaling (documented exceptions:
  §07's 28px H2, team/reviewer name+role 18/16).
- **[approx] Hero collage mobile bleed clips at the 16px content gutter,** not the true
  viewport edge (~16px less side-blob visible than the original). Center blob + all sizes
  exact. Full-bleed clip is a possible future refinement.
- **⚠️ LOUD (standing, re-flagged): 12-person roster (Dan first) and corrected figures
  (4,000+/10)** are kept on mobile; the original's mobile shows 8 people (Sofiia first)
  and the old contradictory figures.
- Team arrangement: initially shipped as a 2-col grid (logged divergence); superseded the
  same day by the operator-approved fast-path zigzag matching the original (see below).

## Per-section logs (consolidated at merge by the integrator)

- **§01 nav-sticky** — see `docs/deviations/01-nav-sticky.md`: single deduplicated logo
  SVG (three per-breakpoint files were the same art), logo as scroll-to-top button,
  nav-height measured 96/76px (token updated on main), active link styled like siblings.
- **§02 hero-header** — see `docs/deviations/02-hero-header.md`: chips/blob/collage as
  aria-hidden CSS placeholders (runtime-injected originals; asset-recovery task queued),
  clamp() mobile headline, -60px hero→stats overlap kept, data-reveal added at gate.
- **§03 stats** — see `docs/deviations/03-stats.md`: REAL sponsor logos shipped
  (recovered from page data, brand→hash mapping orchestrator-confirmed; same usage
  as the original site; licensing note logged), marquee approximations (36s loop,
  1400px cap, pause-on-hover), flags aria-hidden, flag row raised 8 → 10 to match the
  stat (England/Scotland as tag sequences; `text-wrap: balance` evens the 2-line wrap).
- **§04 for-vibe-coders** — see `docs/deviations/04-for-vibe-coders.md`: stable base
  city URLs, `rel="noopener"` on external links, city-row markup normalization, wrapper
  amendment adopted (no self-carried page rhythm), mobile flag sizing.
- **§05 project-showcase** — see `docs/deviations/05-project-showcase.md`: eyebrow
  green per corrected contract, cards stay a row at all breakpoints (capture-confirmed
  over the spec's guess), CDN images optimized, heading hierarchy.
- **§06 for-city-leaders** — see `docs/deviations/06-for-city-leaders.md`: map labels
  baked into the image (capture-verified, alt text carries the city list), 12-person
  desktop roster with capture-derived photo mapping (Luisa/Poppy shared-photo anomaly
  handled), avatars simplified to rounded rects (VISUAL-PASS ITEM: original blob-mask +
  blend tint), WebP-optimized assets, founders 2-up on mobile fixed at gate.

- **§07 for-sponsors** — see `docs/deviations/07-for-sponsors.md`: 32px partner title
  (spec's 20px prose was a transcription error, corrected at merge), single-`<ul>`
  two-column bullet grid with correct SR order, desktop-canonical lead phrases,
  off-white root compositing, noopener.
- **§09 for-companies** — see `docs/deviations/09-for-companies.md`: CDN images
  re-encoded to WebP with alpha, off-white root compositing, 20px card-gap literal,
  mobile h2 scaling, noopener.
- **§08 reviews** — see `docs/deviations/08-reviews.md`: figure/blockquote semantics
  upgrade, descriptive avatar alts (contract-ratified), 2+1 wrap faithful to the
  original under the 1600 cap, illustrated-avatar inset rule capture-validated,
  tablet flex-start alignment fixed at gate, left-offset artifact to visual pass.
- **§10 contact-cta** — see `docs/deviations/10-contact-cta.md`: email plain text
  (not mailto) per capture, `_self` CTA quirk preserved, smiley-sun doodle sourced
  from capture (was wrongly presumed runtime-injected), Email: label kept at all
  breakpoints (desktop-canonical).
- **§11 footer + interactions** — see `docs/deviations/11-footer.md`: WhatsApp kept as a
  link (`_self`) per ratified policy, real retro mark + wordmark SVGs sourced from the
  CDN, the "mascot row" resolved as the single 5-blob wordmark rendered large and
  bottom-cropped (page-data finding corrected the earlier six-blob live reading; scale/
  crop flagged for visual-pass tuning), reveal params approximation, no-JS gate
  (`html.js`), reduced-motion paths, `--red` token added at merge for the brand red.

## Progressive enhancement

- **[arch] No `#container{display:none}` boot-gate or `<noscript>` "enable JavaScript"
  wall.** The original hides content until its Figma runtime boots. Our content is plain
  static HTML/CSS and is fully usable with no JavaScript, so the gate is unnecessary.
