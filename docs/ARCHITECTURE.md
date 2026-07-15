# ARCHITECTURE — build contract for section builders

This is the frozen contract the four parallel section builders implement against.
The spec (`docs/spec/**`) is the source of truth for **what** each section is; this
document is the source of truth for **how** the sections plug into one shared page.
If something here contradicts the spec on _content_, the spec wins — report it. If
something here defines a _shared touchpoint_ (class, id, variable, path, breakpoint),
it is fixed — do not diverge; request a change instead.

---

## 1. The big picture

- **ONE semantic DOM + responsive CSS.** Not the original's three `data-breakpoint`
  DOM copies. Each section is authored once and adapts with media queries.
- **Desktop-first.** Desktop (≥1280) values are canonical. Override downward.
- **Build-time HTML includes.** Each section is its own file in `src/sections/`,
  inlined into `index.html` by a dependency-free Vite plugin (`vcc-html-includes`).
- **Styles cascade:** `tokens.css` → `fonts.css` → `base.css` → `sections.css`
  (imported in that order by `src/main.ts`). `sections.css` `@import`s the 11
  per-section stylesheets in DOM order.

---

## 2. File-ownership map

Contracts (this task) owns everything below **except** the 22 per-section files,
which are owned one-each by the section builders. **Never edit a file you don't own.**

| Path | Owner | Notes |
|---|---|---|
| `vite.config.ts` | contracts | include plugin; do not touch |
| `index.html` | contracts | shell + include markers; do not touch |
| `src/main.ts`, `src/main.test.ts` | contracts | style wiring + smoke test |
| `src/styles/tokens.css` | contracts | design tokens (`:root`) |
| `src/styles/fonts.css` | contracts | `@font-face` (Golos Text) |
| `src/styles/base.css` | contracts | reset + shared component classes |
| `src/styles/sections.css` | contracts | the 11 `@import` lines (do not reorder) |
| `public/fonts/*` | contracts | self-hosted woff2 |
| `docs/ARCHITECTURE.md`, `docs/DEVIATIONS.md` | contracts | this + the deviation log |
| **`src/sections/NN-slug.html`** | **section builder NN** | your section's markup |
| **`src/styles/sections/NN-slug.css`** | **section builder NN** | your section's styles |
| `public/assets/<slug>/*` | section builder | your section's images (see §8) |

The 11 slugs (root class = `s-<slug>`, root id = `<slug>`):

| NN | slug | root element | root class | root id |
|---|---|---|---|---|
| 01 | `nav-sticky` | `<nav>` | `.s-nav-sticky` | `nav-sticky` |
| 02 | `hero-header` | `<section>` | `.s-hero-header` | `hero-header` |
| 03 | `stats` | `<section>` | `.s-stats` | `stats` |
| 04 | `for-vibe-coders` | `<section>` | `.s-for-vibe-coders` | `for-vibe-coders` |
| 05 | `project-showcase` | `<section>` | `.s-project-showcase` | `project-showcase` |
| 06 | `for-city-leaders` | `<section>` | `.s-for-city-leaders` | `for-city-leaders` |
| 07 | `for-sponsors` | `<section>` | `.s-for-sponsors` | `for-sponsors` |
| 08 | `reviews` | `<section>` | `.s-reviews` | `reviews` |
| 09 | `for-companies` | `<section>` | `.s-for-companies` | `for-companies` |
| 10 | `contact-cta` | `<section>` | `.s-contact-cta` | `contact-cta` |
| 11 | `footer` | `<footer>` | `.s-footer` | `footer` |

---

## 3. The include mechanism

`index.html` contains markers of the exact form:

```html
<!-- @include: src/sections/03-stats.html -->
```

At **dev and build** time the `vcc-html-includes` plugin (`transformIndexHtml`, order
`'pre'`) replaces each marker with the referenced file's raw contents. Rules:

- The path is **relative to the project root** and must match exactly.
- A **missing file is a hard error** that fails the build, naming the marker.
- In dev, editing any `src/sections/*.html` triggers a **full page reload**.
- Your section file contains **only the section root element** (no `<html>`/`<body>`);
  it is inlined verbatim. Keep the root class + id exactly as in the table above.

Landmarks in `index.html` (do not change): `<header>` (banner) wraps the nav include;
`<main id="app">` wraps includes 02–10; the footer include's `<footer>` root is the
page `contentinfo` landmark, inlined directly into `<body>` (not double-wrapped).

---

## 4. CSS scoping rule (MANDATORY)

**Every selector in `src/styles/sections/NN-slug.css` must be scoped under that
section's `.s-<slug>` root.** No bare element selectors, no global selectors, no
`:root`, no restyling shared classes globally.

```css
/* GOOD (03-stats.css) */
.s-stats { padding-block: var(--space-80); }
.s-stats .stat-number { color: var(--green); }

/* BAD — leaks to the whole page, will be rejected in review */
section { padding: 40px; }
.stat-number { color: var(--green); }
.btn { background: hotpink; }   /* never redefine shared classes */
```

Need a tweak to a shared class only inside your section? Scope the override:
`.s-for-sponsors .btn { ... }`. Need a genuine change to a shared class or token?
Ask contracts — do not fork it.

---

## 5. Shared classes catalog (`base.css`)

Use these instead of re-implementing. All type/size values are the **desktop** scale;
add your own `@media` overrides for tablet/mobile as needed.

### Buttons
- `.btn` — base (inline-flex, 12px radius, `--shadow-hard`, 16/20 padding, Golos 900
  16px uppercase). Works on `<a>` and `<button>`.
- `.btn--dark` — ink bg, off-white label (the `find an event` style).
- `.btn--light` — off-white bg, ink label, **4px ink border** (padding pre-compensated
  so it matches `.btn--dark`'s outer size). The `contact for more` / `Start a chapter` /
  `Join our team` style.

### Eyebrow pill
- `.eyebrow` — uppercase 20px/900 pill, `padding:12px 24px` (12/20 on mobile),
  radius 32px (20 on mobile), **off-white label**. Set the color per section with the
  `--eyebrow-bg` variable (default orange). E.g. `.s-for-vibe-coders { --eyebrow-bg: var(--green); }`.

### Section card bands
- `.section-card` — full-width wrapper for a colored "audience" card.
- `.band--header` — **solid** header band, top corners rounded; set `--band-color`.
- `.band--body` — **40%-tint** body band, bottom corners rounded; set `--band-tint`.
- Padding `52px` (desktop/tablet), `40px 24px` (mobile). Radius 32/20px auto-switches.
- Example (section 04): put `--band-color: var(--green-bright)` on the header band and
  `--band-tint: var(--green-tint)` on the body band (or set both on `.s-for-vibe-coders`).

### Containers
- `.container` + one of `.container--900 | --1200 | --1400 | --1600` — centered
  max-width wrappers matching the spec's content widths. (Tokens exist for 350/400/
  600/700 too: `var(--content-350)` … for narrower inner columns.)

### Type utilities (desktop scale; compose with layout)
| Class | Size / weight | Upper? | Typical use |
|---|---|---|---|
| `.t-hero` | 80 / 900, LS 1.6px | yes | hero words, `4,000+` |
| `.t-stat` | 60 / 900, LS 1.2px | yes | `9`, `100%` |
| `.t-h2` | 60 / 900, LS 1.2px | yes | section headings |
| `.t-band-title` | 52 / 900, LS 1.04px | yes | `All cities`, `How It Works`, `WHO'S DOING THIS` |
| `.t-card-title` | 32 / 900, LS 0.64px | yes | value/project/step/company card titles, city names |
| `.t-card-title-alt` | 28 / 900, LS 0.56px | yes | breakpoint variant of card title |
| `.t-eyebrow` | 20 / 900 | yes | eyebrow text (the `.eyebrow` pill uses this style) |
| `.t-team-name` | 20 / 900 | yes | team + reviewer names (source casing kept for SRs) |
| `.t-team-role` | 20 / 900 | no | team roles (`Founder`, `Berlin Lead`) |
| `.t-body-lg` | 24 / 500 | no | hero lead, email, 24px body |
| `.t-body` | 20 / 500 | no | most body copy + bullets |
| `.t-body-sm` | 18 / 500 | no | small subtitles |
| `.t-body-xs` | 16 / 500 | no | dense small-breakpoint text |
| `.t-btn` | 16 / 900 | yes | button labels (already in `.btn`) |
| `.t-link` | 16 / 900 | yes | nav + footer links |

`.visually-hidden` is available for SR-only text.

---

## 6. Per-section color hooks (variable pattern)

Sections set **only** these variables; the shared classes read them:

| Variable | Set on | Meaning |
|---|---|---|
| `--eyebrow-bg` | section root (or the eyebrow) | eyebrow pill color |
| `--band-color` | `.band--header` | solid header-band background |
| `--band-tint` | `.band--body` | 40%-tint body-band background |

Color-by-audience (from spec §1): green = vibe coders (04); yellow/orange = city leaders
(06); blue/teal = sponsors + companies (07, 09); orange = the cream sections' eyebrows
(05 projects, 08 reviews). Sponsors/companies (07, 09) sit on `--off-white`, not cream —
set `background: var(--off-white)` on their section root.

---

## 7. Breakpoint strategy

Two thresholds only (spec §6). **Author desktop-first**, then override downward:

```css
/* desktop (>=1280) — canonical, unwrapped */
.s-x .thing { ... }

/* tablet (800–1279) */
@media (width < 1280px) { .s-x .thing { ... } }

/* mobile (<800) */
@media (width < 800px) { .s-x .thing { ... } }
```

`800` and `1280` are **hard-coded literals** (media queries can't read custom
properties). They're documented as constants at the bottom of `tokens.css`.

---

## 8. Asset convention

- Put each section's images under **`public/assets/<slug>/`** (kebab-case filenames).
  Reference them with root-absolute URLs: `/assets/<slug>/<file>` (Vite serves
  `public/` at `/`). Example: `/assets/project-showcase/project-immersive-3d.png`.
- Use the **"Suggested filename"** column in `docs/spec/30-assets.md` as the canonical
  name. Rough folder map (see 30-assets.md for the full inventory):
  - `nav-sticky/` — `logo-nav-mobile.svg`, `logo-nav-tablet.svg`, `logo-nav-desktop.svg`
  - `stats/` — `supported-by/*` sponsor logos (marquee; runtime-injected on the original)
  - `for-vibe-coders/` — `value-tech-folks.png`, `value-low-barrier.png`, `value-learn-room.png`, `icon-city-arrow.svg`
  - `project-showcase/` — `project-immersive-3d.png`, `project-motion-tracking.png`, `project-open-data.png`, `project-unexpected.png`
  - `for-city-leaders/` — `city-leaders-map.png`, `step-1.svg`…`step-3.svg`, team photos + blob/frame SVGs
  - `reviews/` — `testimonial-flourish.svg`, `reviewer-tomoki.svg`, `reviewer-heeezil.svg`, `reviewer-christian.svg`
  - `for-companies/` — `companies-team-building.png`, `companies-custom-sessions.png`
  - `contact-cta/` — `contact-illustration.svg`
  - `footer/` — `logo-footer-wordmark.svg`, `logo-footer-mark.svg`
- **Binaries are not committed yet** (per 30-assets.md); each builder sources/optimizes
  its own assets into its folder. `hero-header` collage and `stats` marquee logos are
  runtime-injected on the original — reproduce them (see the section spec files).
- **Alt-text convention:** meaningful content images (value/project/company cards, team
  photos, reviewer avatars, the map, logos) get **descriptive `alt`**; purely decorative
  flourishes (blob frames, quote flourish, googly mascots, city-row arrows where the
  adjacent city name already conveys the link) get **`alt=""`**. Logos: `alt="Vibe Coding
  Collective"`. (The originals ship empty/again-decorative alts; we add real ones.)

---

## 9. Interaction data-attribute contract (NO JS yet)

Interactive behavior (sticky/smooth-scroll nav, scroll-reveal, sponsor marquee) is a
**later phase**. For now, section builders add the **markers** below so the future JS
has stable hooks. Do **not** implement the JS, and do **not** hide `[data-reveal]`
content with CSS (there's no reveal script yet — hidden content would just disappear).

- **`data-scroll-target="<id>"`** — put on a nav/CTA `<button>` that should smooth-scroll
  to an element with that `id`. The four contract targets (must exist as ids):
  - `for-vibe-coders` — section 04 root (nav "for vibe coders")
  - `cities` — the "All cities" block **inside** section 04 (nav "find an event");
    **section 04's builder must add `id="cities"` to that block.**
  - `for-city-leaders` — section 06 root (nav "for hosts")
  - `for-sponsors` — section 07 root (nav "for sponsors")

  `html { scroll-padding-top: var(--nav-height); }` is already set so targets clear the
  fixed nav. If a target's own top needs extra offset, add `scroll-margin-top: var(--nav-height)`.
- **`data-reveal`** — put on top-level blocks that should fade+rise in on scroll. The
  future JS approximation: `opacity 0→1` + `translateY(24px→0)` over ~500ms ease-out,
  once on entry. It will gate the initial hidden state behind a `js`/`is-ready` class on
  `<html>` so no-JS users still see content — do not pre-hide in section CSS.
- **Marquee (section 03 only):** the "supported BY" strip is a **CSS `@keyframes`
  animation owned entirely by `03-stats.css`** (scoped under `.s-stats`). Include a
  `@media (prefers-reduced-motion: reduce)` fallback that shows the logos static.
- **Pinned nav (section 01 only):** pin with `position: fixed; top:0; inset-inline:0;
  z-index: var(--z-nav)` on `.s-nav-sticky`. (It is first-in-DOM inside a short
  `<header>`, so `position: sticky` would only pin within that header — use `fixed`.)
  Nav does not need `data-reveal`.
- **Hover/press:** the original has no hover styles; any press affordance (e.g. nudging a
  button toward its shadow) is an **optional approximation** — keep it minimal and note it.

---

## 10. Gate before you report

Run `npm run verify` (typecheck + lint + test + build) and make sure it's green.
Confirm your section inlined into `dist/index.html`. Keep your CSS scoped (§4).
Report the exact files you touched and the real command output.
