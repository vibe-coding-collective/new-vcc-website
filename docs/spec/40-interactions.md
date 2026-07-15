# 40 — Interactions, Animation & Dynamic Behavior

What is observable from the static HTML / extracted CSS / runtime JS is stated as fact; anything
requiring a live render is either **Verified visually by orchestrator, 2026‑07‑15** (live‑browser
ground‑truth pass at ~1366px) or, where still unmeasurable, marked **UNKNOWN**. The page ships a
large Figma Sites runtime (`/_runtimes/sites-runtime.<hash>.js`, ~1.2 MB) plus a page bundle
(`/_components/v2/<hash>.js`, ~157 KB); most motion is runtime‑driven, not CSS.

## 1. Scroll‑reveal entrance animations (confirmed pattern; exact params approximate)

Top‑level blocks are animated in on scroll. The post‑JS DOM snapshots capture mid‑animation
inline styles, which reveal the pattern — **fade + slide‑up**:

| Block | Captured inline style |
|---|---|
| `<header>` (hero) | `opacity:0.899…; transform:translateY(20px)` |
| stats cluster / "supported BY" | `opacity:0.899…; transform:none` (and `opacity:1` when settled) |
| `<main>` | `opacity:0.899…; transform:none` |
| nav | `opacity:0.899…; transform:none` |
| **testimonials** | `opacity:0.5; transform:translateY(30px)` (a stronger reveal) |

- **Mechanism:** the runtime uses `IntersectionObserver` + `requestAnimationFrame` (both present
  in the JS) to drive `opacity` 0→1 and `transform: translateY(Npx)`→`none` as elements enter the
  viewport. Start offsets seen: `translateY(20px)` (most) and `translateY(30px)` (testimonials).
- **Still UNKNOWN (not measurable externally — orchestrator confirmed 2026‑07‑15).** Exact easing
  curve, duration, stagger, and replay behaviour are computed in JS (no `transition`/`@keyframes`
  in static CSS). **Recommended approximation:** `opacity 0→1` + `translateY(≈24px)→0` over
  **~500ms `ease-out`**, triggered once on viewport entry (~10–15% visible). Mark as an
  intentional approximation.

## 2. Sticky navigation (confirmed)

The nav is `position:sticky; top:0` inside a full‑page `pointer-events:none` overlay; only the
nav pill has `pointer-events:auto` (see `01-nav-sticky.md`). It stays pinned at the top while
scrolling. It also participates in the entrance reveal above.
**Verified visually by orchestrator, 2026‑07‑15:** pinned at `top:0`, fixed over every section
all the way down to the footer.

## 3. In‑page navigation buttons (confirmed smooth‑scroll)

`find an event` (header + nav) and the desktop nav links `for vibe coders` / `for hosts` /
`for sponsors` are `<button>`s with **no href** → JavaScript handlers.
- **Verified visually by orchestrator, 2026‑07‑15:** they are JS `<button>`s (onclick, no href)
  that **smooth‑scroll**. Measured landing Y at 1366px viewport (page height 12834px):
  `for vibe coders` → **1928** (top of the green section), `find an event` → **2948** (the
  cities/events block inside the green section), `for hosts` → **5361** (top of yellow FOR CITY
  LEADERS), `for sponsors` → **8860** (top of blue FOR sponsors). There are **no `#anchor`
  targets** in the DOM — implement as smooth `scrollIntoView` to those section elements.
  `find an event` scrolls (it does not open a panel).

## 4. Hover / press states (verified inconclusive → treat as none)

- Interactive elements set `cursor:pointer` (`css-134pm3`, buttons, links) but there are **no
  `:hover`, `:active`, or `:focus` style rules in the static CSS**. Any hover/press feedback is
  applied by the runtime.
- **Verified visually by orchestrator, 2026‑07‑15 (inconclusive but low‑risk):** hovering the nav
  `find an event` button produced **no visible before/after change**. Safe guidance: assume **no
  significant hover feedback**; builders may add a minimal press/hover affordance (e.g. translate a
  button toward its shadow) and **must mark it an intentional approximation**.
- The two button styles are "neo‑brutalist" (4px `#181814` outline and/or a hard
  `6px 6px 0 0 #878787` shadow); a press‑to‑offset interaction is a reasonable optional embellishment.

## 5. Sponsor‑logo marquee (confirmed live)

The reset CSS defines a marquee system: `.marquee-container` / `.marquee` with
`@keyframes scroll { 0%{translateX(0%)} 100%{translateX(-100%)} }`, CSS vars for
`--duration`/`--direction`/`--timing-function`, plus `pause-on-hover`, `pause-on-click`, a
`.paused { animation-play-state:paused }` utility, and `@media (prefers-reduced-motion:reduce)`
disabling. (No `.marquee` element is present in the static/SSR DOM — it is injected at runtime.)

- **Verified visually by orchestrator, 2026‑07‑15:** the `supported BY` sponsor‑logo strip
  **renders live as an auto‑scrolling marquee** — **7 logos in white rounded pills**, cycle order
  **OK Tech → MacPaw → Microsoft → ElevenLabs → Softr → Valae → Lovable → (repeat)**, slow
  continuous horizontal drift. Approximate a full loop at **~30–40s** (approximation — exact
  speed/direction not measured). See `03-stats.md` / `30-assets.md`.

## 6. Runtime‑injected content (resolved)

Two regions are empty in the static HTML and filled by the runtime (see their sections):
- Hero 862×350 graphic block (`02-hero-header.md`) — **Verified 2026‑07‑15:** renders live as a
  **photo collage** (blob‑masked event photos on colored blobs, teal/yellow/red); the headline
  also gains **interleaved photo chips + an orange googly‑eyes blob**. Runtime‑injected (empty in
  static HTML) — reproduce, do not leave blank.
- `supported BY` logo strip (`03-stats.md`) — **Verified 2026‑07‑15:** renders live as the 7‑logo
  auto‑scrolling marquee (white pills) described in §5.
- Footer also shows a **row of six googly‑eyed blob mascots** along its bottom edge (`11-footer.md`).

## 7. Media / embeds / forms

- **No `<iframe>`, `<video>`, `<audio>`, `<embed>`, `<canvas>`** and **no `<form>`** on the page.
  All media is `<img>` (PNG) or inline‑referenced SVG. Images use `loading="lazy"` and responsive
  `srcSet`/`sizes` (`?w=`/`?h=` variants).
- The runtime bundle references **Rive** and **Lottie** generically (engine capability), but no
  Rive/Lottie instance is present in this page's DOM or assets.
- **External actions (open in new tab):** every `contact for more` / `Start a chapter` →
  Google Calendar appointment page; `Join our team` → a Google Form; `Meetups`/`LinkedIn`/city
  links → Meetup/LinkedIn/Luma. There is no on‑site form submission or email capture.
  The lone `target="_self"` `contact for more` is the one in the **Contact CTA** section
  (`10-contact-cta.md`); all other `contact for more` CTAs are `target="_blank"`. (There is also a
  single `target="_self"` on the `London` city arrow sub‑link.)

## 8. Progressive enhancement / boot

- A `<style>#container{display:none}</style>` hides content until the runtime boots and reveals
  it; a `<noscript>` shows a full‑screen "This site requires JavaScript … Reload page" fallback.
- Because all copy is server‑rendered, **a static clone does not need any of this** — render the
  content directly and add the scroll‑reveal + sticky nav + sponsor marquee as the "dynamic" behavior.

## 9. Accessibility notes (observed)

- No real heading tags (`<h1>`–`<h6>`); all headings are `<p>`. Builders should add a proper
  heading hierarchy.
- `<main tabindex="-1">`, a hidden bypass/skip‑link style (`.bypass-link`) exists in the reset.
- Decorative images use `alt=""`; some avatar/link wrappers carry `role="link"` / `tabindex="0"`.
- Team member and reviewer **names render uppercase via `text-transform`**, so source casing is
  preserved for screen readers while display is uniform caps.
