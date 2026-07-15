# 00 — Overview, Site Map & Structure

Source of truth: <https://vibecoders.global/> (captured 2026‑07‑15).
Raw captures live in `docs/spec/_capture/` (see end of this file).

> **Verbatim policy.** All user‑visible copy in this spec is quoted exactly, including
> deliberate mixed casing (`berlin`, `London`, `delft`, `boston`), punctuation and emoji.
> Where copy is quoted for building, it is placed in fenced code blocks so Markdown does
> not "smart‑quote" or otherwise alter characters. Apostrophes matter: the site mixes a
> **curly** apostrophe (`’` U+2019, e.g. `isn’t`, `What’s`) with a **straight** apostrophe
> (`'` U+0027, e.g. `You're`, `We've`, `didn't`). See `10-design-tokens.md` §Copy glyphs.

---

## 1. Site map

**This is a single‑page site.** Verified via:

- `https://vibecoders.global/sitemap.xml` → exactly **one** `<loc>`: `https://vibecoders.global/` (lastmod `2026-06-10T09:13:06Z`).
- `https://vibecoders.global/robots.txt` → **Not Found** (404).
- Every `<a href>` in the document is **external** or a scroll target — there are no internal page routes.

There are **no internal anchor URLs** (`#id`) either. In‑page navigation is done with
`<button>` elements handled by JavaScript (see `40-interactions.md`), not `href="#..."`.

### All outbound links (text → href, `target`)

| Link text | href | target | Appears in |
|---|---|---|---|
| `contact for more` (all CTAs) | `https://calendar.app.google/z9XuskPpZPvE5A5h7` | `_blank` (one instance `_self`) | header, vibe‑coders "Start a chapter", sponsors, companies, contact CTA, nav |
| `Start a chapter` | `https://calendar.app.google/z9XuskPpZPvE5A5h7` | `_blank` | FOR vibe coders (cities) |
| `berlin` | `https://www.meetup.com/vibe-coding-collective-eu/` | `_blank` | Cities list |
| `delft` / `Delft` | `https://luma.com/z32gtwo6` | `_blank` | Cities list |
| `Kyiv` | `https://luma.com/zxoxma81` | `_blank` | Cities list (375 & 1280 only) |
| `London` | `https://luma.com/bhfumnou` | `_blank` (one `_self`) | Cities list |
| `Join our team` | `https://docs.google.com/forms/d/e/1FAIpQLSdF9cGO8BJeZdCznidPJDBajWgC3ER7OR1BI-xSsVV8niZUsg/viewform` | `_blank` | WHO'S DOING THIS |
| `Meetups` | `https://www.meetup.com/vibe-coding-collective/` | `_blank` | Footer |
| `LinkedIn` | `https://www.linkedin.com/company/vibe-coding-collective/posts` | `_blank` | Footer |

Buttons **without** an href (JS behaviour, not links):
`find an event` (header + nav), `for vibe coders` / `for hosts` / `for sponsors` (desktop nav
scroll links), and the nav logo button. `boston` and `Edinburgh`/`edinburgh` are **`TBA`** —
plain text, not links. `What'sApp` / `What'sapp` in the footer is plain text (no href).
`dan.porder@vibecoders.global` is plain text (not a `mailto:` link).

> **UNKNOWN — needs visual check:** the exact JS behaviour of `find an event` and the three
> `for …` nav buttons (scroll‑to‑section vs. open a panel). Best inference: they smooth‑scroll
> to the matching section. Documented in `40-interactions.md`.

---

## 2. Global structure

```
<body>  (background #fde9c9, cream)
 └─ #container
     └─ [breakpoint container]        ← ONE of three, chosen by width (see §4)
         ├─ <header>                   Hero header (NOT the sticky bar)
         ├─ <div> hero graphic + stats
         ├─ <main>
         │   ├─ <section> FOR vibe coders        (green card)
         │   ├─ <div>     Project showcase        (cream)
         │   ├─ <section> FOR CITY LEADERS         (yellow card: map + How It Works + team)
         │   ├─ <section> FOR sponsors             (blue card on #f6f5f2)
         │   ├─ <div>     reviews                   (cream)
         │   ├─ <section> for companies             (blue card on #f6f5f2)
         │   └─ <section> Contact CTA               (#f6f5f2 card)
         ├─ <footer>                    (dark #181814)
         └─ <div> sticky nav overlay    (light #f6f5f2 pill, position:sticky top:0)
```

- **No `<h1>`–`<h6>` tags.** Every heading and paragraph is a `<p>` (or `<span>`/`<li>`);
  Figma Sites emits semantic tags only via `accessibleHTMLTag`, which here is left as
  generic. The document has one `<header>`, one `<main tabindex="-1">`, one `<footer>`,
  one `<nav>`, and several `<section>` wrappers. Builders should re‑introduce a real
  heading hierarchy (recommended: `Vibe Coding Collective`/hero → `h1`, section titles → `h2`,
  card titles → `h3`).
- **Sticky nav is the last DOM node**, rendered inside a full‑page, `pointer-events:none`
  overlay; the nav itself is `position:sticky; top:0` so it pins to the top of the viewport.
  Only the nav pill has `pointer-events:auto`.
- **`<noscript>`** shows a full‑screen "This site requires JavaScript / enable JavaScript…
  Reload page" fallback. The real content is server‑rendered, so it is visible without JS,
  but the site's own runtime hides `#container` until JS boots (`<style>#container{display:none}</style>`
  is overridden by the runtime). See `40-interactions.md`.

---

## 3. Homepage section inventory (in page order)

Numbered files live in `20-sections/`. Desktop (1280) order:

| # | File | Section | One‑line description |
|---|---|---|---|
| 0 | `01-nav-sticky.md` | **Sticky nav bar** | Pinned top pill: logo + (desktop) 3 scroll links + `contact for more` + `find an event`. Contents differ per breakpoint. |
| 1 | `02-hero-header.md` | **Hero header** | `communities / FOR / TECH-LITE / BUILDERS` (80px), a paragraph, and two CTAs, over 200px top padding. Followed by an **empty 862×350 graphic block**. |
| 2 | `03-stats.md` | **Stats + supported BY** | `4,000+ members are ALREADY HERE`, `9 Countries` + 9 flag emoji, `100% Word of mouth`, and a `supported BY` logo strip (runtime‑injected, empty in static HTML). |
| 3 | `04-for-vibe-coders.md` | **FOR vibe coders** | Green rounded card: hackathon pitch, 3 value cards, the **All cities** list (differs per breakpoint), `Start a chapter`. |
| 4 | `05-project-showcase.md` | **From "What If?" (projects)** | Cream section: `get inspired by community`, 4 alternating image/text project cards. |
| 5 | `06-for-city-leaders.md` | **FOR CITY LEADERS** | Yellow rounded card: chapter pitch + panoramic map, `How It Works` (3 steps), `WHO'S DOING THIS` (team grid), `Join our team`. |
| 6 | `07-for-sponsors.md` | **FOR sponsors** | Blue rounded card on off‑white: sponsor pitch + `Why Partner With Us` bullets + CTA. |
| 7 | `08-reviews.md` | **reviews** | Cream section: `what people say`, 3 testimonial cards with quote mark + star rating. |
| 8 | `09-for-companies.md` | **for companies** | Blue rounded card on off‑white: `TEAM TRAINING`, 2 cards, CTA. |
| 9 | `10-contact-cta.md` | **Contact CTA** | Off‑white rounded card: illustration, `up for a collaboration?`, email, CTA. |
| 10 | `11-footer.md` | **Footer** | Dark bar: logo(s), WhatsApp/Meetups/LinkedIn, copyright. |

---

## 4. Tech observations (how the Figma Sites export is built)

- **Generator:** Figma Sites. Assets under `/_assets/v11/<40‑hex>.<ext>`, fonts under
  `/_woff/v2/…`, runtime at `/_runtimes/sites-runtime.<hash>.js`, page component bundle at
  `/_components/v2/<hash>.js` + `.css`, and page data at `/_json/<uuid>/_index.json`.
- **Fully server‑rendered.** `curl` returns ~337 KB of HTML with all copy inline. No
  hydration needed to read content. A clone can be pure static HTML/CSS.
- **Three complete DOM copies, one per breakpoint.** The page renders **all three**
  breakpoint variants into the DOM and toggles them with `display:none` media queries.
  Each variant is a top‑level element carrying `data-breakpoint-id` / `data-width` /
  `data-height`:

  | Variant id | `data-width` | Shown when | Role |
  |---|---|---|---|
  | `node-56_2062` | 375 | `width < 800px` | **Mobile** |
  | `node-83_1139` | 800 | `800px ≤ width < 1280px` | **Tablet** |
  | `node-2_2763` | 1280 | `width ≥ 1280px` | **Desktop** |

  Breakpoint gate CSS (verbatim):
  ```css
  @media (width < 1280px){[data-breakpoint-id="node-2_2763"]{display:none !important}}
  @media (width >= 1280px) or (width < 800px){[data-breakpoint-id="node-83_1139"]{display:none !important}}
  @media (width >= 800px){[data-breakpoint-id="node-56_2062"]{display:none !important}}
  ```
  So the only breakpoints are **800** and **1280**. A clone can implement this as ordinary
  responsive CSS (3 layouts) rather than 3 DOM copies — but **note that copy differs between
  the copies** (cities, team roster, some labels — see §5 and per‑section files). Pick one
  breakpoint's copy as canonical or reconcile; do not assume they match.
- **Styling:** atomic, hashed classes injected in one big `<style>` block, keyed
  `#container .css-XXXXXX { … }` (519 rules). The classes are **flat, with no media queries**
  — responsiveness comes entirely from which classes each breakpoint's DOM uses. A separate
  Tailwind v4 reset (`.tailwind` namespace) ships in `/_components/v2/*.css` but the page
  content does not use Tailwind utility classes.
- **Text engine quirks:** every text node carries `class="textContents"`; letter‑spacing is
  applied through a CSS variable `--letter-spacing` plus a `.adjustLetterSpacing::after`
  pseudo that subtracts one trailing letter‑spacing (`margin-left: calc(var(--letter-spacing) * -1)`).
  Color is set with **both** `color` and `-webkit-text-fill-color`. Emoji/symbol runs fall
  back through Noto Sans / Noto Sans Symbols / Noto Sans Math.
- **Runtime‑only content:** two visual regions are **empty in the static HTML** and populated
  by the Figma runtime — the hero's 862×350 graphic block and the `supported BY` sponsor‑logo
  strip. Both are documented with what the Figma page data (`_index.json`) reveals, and flagged
  `UNKNOWN — needs visual check`.
- **No `<iframe>`, `<video>`, `<embed>`, `<canvas>`, or forms** in the page (the runtime bundle
  supports Rive/Lottie/video generically, but this page uses none). All media is `<img>` (PNG)
  or inline‑referenced SVG.

---

## 5. Cross‑breakpoint copy differences (important)

The three DOM copies are **not** identical. Confirmed differences (full detail in the section files):

- **Cities list** differs in membership, order and casing at every breakpoint
  (`04-for-vibe-coders.md` §Cities). E.g. tablet(800) shows `Lisbon` and drops `Kyiv`;
  mobile(375) shows `Delft` capitalised, desktop/tablet show `delft`.
- **Team roster** (`06-for-city-leaders.md`): mobile shows **8** people; tablet & desktop show **12**.
  The two founders' order is swapped on mobile (Sofiia first) vs. tablet/desktop (Dan first).
- **Project eyebrow:** desktop = `From "What If?" → to a Vibe App`; mobile & tablet = `From "What If?" → to an app`.
- **Footer:** desktop = `What'sApp`; mobile & tablet = `What'sapp`.
- **Sponsor & "Email:" bits:** desktop shows an `Email:` label above the address; mobile/tablet
  render the sponsor "Why Partner With Us" bullets with the lead phrase as a separate (bold) run.
- **Nav contents** differ per breakpoint (see `01-nav-sticky.md`).

---

## 6. Capture files (`docs/spec/_capture/`)

| File | What it is |
|---|---|
| `home-ssr.html` | Full server‑rendered homepage HTML (337 KB, all 3 breakpoints, all inline styles/fonts). The definitive source. |
| `dom-375.html` / `dom-800.html` / `dom-1280.html` | Cleaned live DOM for each breakpoint (post‑JS snapshot, includes entrance‑animation inline styles). |
| `css-rules.css` | The 519 `#container .css-*` rules extracted from the page `<style>`. |
| `font-faces.css` | All 84 `@font-face` declarations (self‑hosted woff2). |
