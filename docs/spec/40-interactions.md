# 40 — Interactions, Animation & Dynamic Behavior

What is observable from the static HTML / extracted CSS / runtime JS is stated as fact; anything
requiring a live render is marked **UNKNOWN — needs visual check**. The page ships a large Figma
Sites runtime (`/_runtimes/sites-runtime.<hash>.js`, ~1.2 MB) plus a page bundle
(`/_components/v2/<hash>.js`, ~157 KB); most motion is runtime‑driven, not CSS.

## 1. Scroll‑reveal entrance animations (confirmed, values UNKNOWN)

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
- **UNKNOWN — needs visual check:** exact easing curve, duration, stagger, and whether reveals
  replay on re‑enter. No `transition`/`@keyframes` for these exist in the static CSS, so values
  are computed in JS. Reasonable default for a clone: `opacity 0→1` + `translateY(20–30px)→0`
  over ~400–600ms `ease-out`, triggered once at ~10–15% visibility.

## 2. Sticky navigation (confirmed)

The nav is `position:sticky; top:0` inside a full‑page `pointer-events:none` overlay; only the
nav pill has `pointer-events:auto` (see `01-nav-sticky.md`). It stays pinned at the top while
scrolling. It also participates in the entrance reveal above.

## 3. In‑page navigation buttons (behavior UNKNOWN)

`find an event` (header + nav) and the desktop nav links `for vibe coders` / `for hosts` /
`for sponsors` are `<button>`s with **no href** → JavaScript handlers.
- Best inference: they **smooth‑scroll** to the matching section (`for vibe coders → FOR vibe
  coders`, `for hosts → FOR CITY LEADERS`, `for sponsors → FOR sponsors`; `find an event →`
  the cities/events list). There are **no `#anchor` targets** in the DOM, so scrolling is
  computed in JS.
- **UNKNOWN — needs visual check:** confirm scroll targets and whether `find an event` opens
  anything (e.g. a panel) instead of scrolling.

## 4. Hover / press states (UNKNOWN)

- Interactive elements set `cursor:pointer` (`css-134pm3`, buttons, links) but there are **no
  `:hover`, `:active`, or `:focus` style rules in the static CSS**. Any hover/press feedback is
  applied by the runtime.
- The two button styles are "neo‑brutalist" (4px `#181814` outline and/or a hard
  `6px 6px 0 0 #878787` shadow). A very common paired interaction is *press = translate the
  button by the shadow offset and collapse the shadow* — **plausible but UNCONFIRMED**.
- **UNKNOWN — needs visual check:** hover color/scale on buttons, links, city rows, team
  avatars, and testimonial cards.

## 5. Marquee capability (present in runtime; usage UNKNOWN)

The reset CSS defines a marquee system: `.marquee-container` / `.marquee` with
`@keyframes scroll { 0%{translateX(0%)} 100%{translateX(-100%)} }`, CSS vars for
`--duration`/`--direction`/`--timing-function`, plus `pause-on-hover`, `pause-on-click`, a
`.paused { animation-play-state:paused }` utility, and `@media (prefers-reduced-motion:reduce)`
disabling. **No `.marquee` element exists in the captured DOM.**
- The most likely user of a marquee would be the `supported BY` sponsor‑logo strip (a common
  scrolling‑logos pattern) — but that strip is empty in all captures.
- **UNKNOWN — needs visual check:** whether the sponsor strip renders and marquees live.

## 6. Runtime‑injected content (UNKNOWN)

Two regions are empty in static HTML and would be filled by the runtime (see their sections):
- Hero 862×350 graphic block (`02-hero-header.md`) — Figma frame with no fill/children; likely a
  placeholder. **UNKNOWN if a graphic appears live.**
- `supported BY` logo strip (`03-stats.md`) — 7 sponsor logos in the Figma data.

## 7. Media / embeds / forms

- **No `<iframe>`, `<video>`, `<audio>`, `<embed>`, `<canvas>`** and **no `<form>`** on the page.
  All media is `<img>` (PNG) or inline‑referenced SVG. Images use `loading="lazy"` and responsive
  `srcSet`/`sizes` (`?w=`/`?h=` variants).
- The runtime bundle references **Rive** and **Lottie** generically (engine capability), but no
  Rive/Lottie instance is present in this page's DOM or assets.
- **External actions (open in new tab):** every `contact for more` / `Start a chapter` →
  Google Calendar appointment page; `Join our team` → a Google Form; `Meetups`/`LinkedIn`/city
  links → Meetup/LinkedIn/Luma. There is no on‑site form submission or email capture.

## 8. Progressive enhancement / boot

- A `<style>#container{display:none}</style>` hides content until the runtime boots and reveals
  it; a `<noscript>` shows a full‑screen "This site requires JavaScript … Reload page" fallback.
- Because all copy is server‑rendered, **a static clone does not need any of this** — render the
  content directly and add the scroll‑reveal + sticky nav as the only required "dynamic" behavior.

## 9. Accessibility notes (observed)

- No real heading tags (`<h1>`–`<h6>`); all headings are `<p>`. Builders should add a proper
  heading hierarchy.
- `<main tabindex="-1">`, a hidden bypass/skip‑link style (`.bypass-link`) exists in the reset.
- Decorative images use `alt=""`; some avatar/link wrappers carry `role="link"` / `tabindex="0"`.
- Team member and reviewer **names render uppercase via `text-transform`**, so source casing is
  preserved for screen readers while display is uniform caps.
