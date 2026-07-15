# 10 — Design Tokens

All values below are extracted from the page's own inline `<style>` block
(`docs/spec/_capture/css-rules.css`, 519 rules) and `@font-face` block
(`docs/spec/_capture/font-faces.css`). Nothing here is guessed. Where a value maps to a
specific hashed class, the class is named so builders can grep the capture.

---

## 1. Color palette

Extracted hex values with frequency and observed usage. There is no CSS custom‑property
palette — colors are inlined per rule. Suggested token names are a recommendation.

| Hex | Suggested token | Usage |
|---|---|---|
| `#fde9c9` | `--cream` (page bg) | Page/body background on all breakpoints; the base canvas. |
| `#181814` | `--ink` | Primary text; dark buttons (`find an event`); footer background; button outline. Most‑used color (34×). |
| `#f6f5f2` | `--off-white` | Light text on colored/dark areas; `contact for more` button face; sticky nav pill bg; `FOR sponsors` / `for companies` section bg; contact‑CTA card bg. |
| `#498d44` | `--green` | `FOR vibe coders` eyebrow pill; green stat numbers (`4,000+`, `9`, `100%`); city name links; email address text. |
| `#91bd3c` | `--green-bright` | `FOR vibe coders` card header band. |
| `rgba(145,189,60,0.4)` | `--green-tint` | `FOR vibe coders` card body band (40% of `#91bd3c`). |
| `#0056a1` | `--blue` | `FOR sponsors` / `for companies` header band; some city link text; nav scroll‑link text. |
| `rgba(0,86,161,0.4)` | `--blue-tint` | `FOR sponsors` / `for companies` body band. |
| `#ffd226` | `--yellow` | `FOR CITY LEADERS` card header band; testimonial quote‑mark chip bg. |
| `rgba(255,210,38,0.4)` | `--yellow-tint` | `FOR CITY LEADERS` card body band. |
| `#ec6c23` | `--orange` | Eyebrow pills for `From "What If?"`, `FOR CITY LEADERS`, `reviews`; used as SVG `--fill-0`. |
| `#1ca9b0` | `--teal` | `FOR sponsors` / `for companies` eyebrow pills; footer link text. |
| `#878787` | `--shadow-grey` | Hard drop‑shadow color on buttons (`6px 6px 0 0 #878787`). |
| `#d9d9d9` | `--grey-200` | Team‑avatar tint layer (`mix-blend-mode:color` over photos). |
| `#000` | `--black` | The `Email:` label only. |
| `#fff` | `--white` | Two team‑avatar tint layers. |

> Section color system: each "audience" section is color‑coded — **green** = vibe coders,
> **yellow/orange** = city leaders, **blue/teal** = sponsors & companies, **orange** = the
> two cream sections' eyebrows (projects, reviews). Each colored section card has a solid
> **header band** (top corners rounded) and a **40%‑tint body band** (bottom corners rounded).

---

## 2. Typography

### 2.1 Font families (self‑hosted, NOT Google Fonts)

Loaded via 84 `@font-face` rules pointing at `/_woff/v2/…woff2` (6 unicode‑range subsets each:
`english`, `latin-extended-a/b/additional`, `rest-latin`, `rest`). `font-synthesis:none`.

| CSS family string | Real font | Weights used | Role |
|---|---|---|---|
| `"Golos Text:Black"` | **Golos Text** | 900 | All headings, eyebrows, buttons, names — every uppercase display string. |
| `"Golos Text:Medium"` | **Golos Text** | 500 | All body copy / paragraphs / bullets. |
| `"Golos Text:Bold"` | **Golos Text** | 700 | Rare (a 20px variant, `css-hyek4f`). |
| `"Jost:Regular"` / `"Jost"` | **Jost** | 400 | Declared/loaded but **not observed on any visible text node** in the homepage DOM. Likely a leftover. Treat as optional. |
| `"Noto Sans"`, `"Noto Sans Symbols"`, `"Noto Sans Math"` (`:Regular`/`:Bold`) | Noto fallbacks | — | Emoji/symbol fallback in mixed runs (flags, arrows). Always appended after Golos in fallback lists. |

Fallback keyword after the family is always `sans-serif`. Example full stack seen on emoji
runs: `"Golos Text:Black","Noto Sans:Bold","Noto Sans Math:Regular","Noto Sans Symbols:Bold","Noto Sans Symbols2:Regular",sans-serif`.

Recommended clone substitutes (both on Google Fonts): **Golos Text** and **Jost**.

### 2.2 Type scale (desktop / 1280 canonical)

Golos Text · weight 900 unless noted · `text-transform:uppercase` unless noted.
`LH` = line‑height (unitless), `LS` = letter‑spacing.

| Style | Size | LH | LS | Transform | Align | Example use | Class(es) |
|---|---|---|---|---|---|---|---|
| Hero display | **80px** | 1.0 | 1.6px | upper | center | `communities/FOR/TECH-LITE/BUILDERS`, `4,000+` | `css-jjm8g7` |
| Big stat number | **60px** | 1.2 | 1.2px | upper | left | `9`, `100%` | `css-iaf5xm` |
| Section H2 | **60px** | 1.2 | 1.2px | upper | center | `get inspired by community`, `START A CHAPTER IN YOUR CITY!`, `Put your brand…`, `what people say`, `TEAM TRAINING` | `css-p5pzcn` |
| Section title (band) | **52px** | 1.5 | 1.04px | upper | center | `members are ALREADY HERE`, `All cities`, `How It Works`, `WHO'S DOING THIS` | `css-sf9yj5` |
| Card title / city name | **32px** | 1.5 | 0.64px | upper | center/left | value‑card titles, step titles, `Immersive 3D`, city names | `css-i0585y` (center), `css-514v69` (left), `css-lhj367`/`css-65o562` (city) |
| Card title (alt) | **28px** | 1.5 | 0.56px | upper | center | breakpoint variant of card title | `css-n164e2` |
| Eyebrow label | **20px** | 1.5 | 0px | upper | center | `FOR vibe coders`, `FOR sponsors`, etc. | `css-wm7eh7` |
| Team name | **20px** | 1.5 | 0px | upper | center | `Dan Porder` → renders `DAN PORDER` | `css-xjo1dh` |
| Team role | **20px** | 1.5 | 0px | none | center | `Founder`, `Creative Technologies` | `css-6toy3o` |
| Body / lead | **24px** | 1.5 | 0px | none | center | hero paragraph, email address | `css-up3oa8`, `css-rnvkzt` |
| Body | **20px** | 1.5 | 0px | none | center/left | most paragraphs & bullets | `css-9j145o` (center), `css-3vyy31`/`css-naacuj`/`css-26c6mk` |
| Body small | **18px** | 1.5 | 0px | none | — | some subtitles | `css-rqghrp`, `css-7qompo` |
| Body xs | **16px** | 1.5 | 0px | none | — | dense text at small breakpoints | `css-n6l5zh`, `css-v5uh6u` |
| Button label | **16px** | 1.5 | 0px | upper | center | `contact for more`, `find an event`, `Start a chapter` | `css-l572mm` |
| Nav / footer link | **16px** | 1.5 / 0 | 0px | upper | center | nav scroll‑links, footer links | `css-aznh0v` (nav), `css-8d3sqr` (footer) |

Weight‑500 body sizes seen: 16 / 18 / 20 / 24 px, all `line-height:1.5`.
A few nodes carry `line-height:0` on a wrapper and set the real LH on the inner run.

### 2.3 Text colors (color is a separate stacked class)

| Color | Class(es) | Applied to |
|---|---|---|
| `#181814` | `css-871ihu`, `css-elb20k`, `css-c5giwt`, `css-hsb877`, `css-c39cjd`, `css-d5zdmh`, `css-edy0ng`, `css-6t7o1p`, `css-2k1chy`, `css-8mzjpb`, `css-htps5s`, `css-qh54ry`, `css-hwksvl` | dark headings & body on light/cream/green/yellow |
| `#498d44` (green) | `css-sf32d9`, `css-scvvzt`, `css-drsdby`, `css-14f55u`, `css-813ies` | `4,000+`, `9`, `100%`, email |
| `#0056a1` (blue) | `css-q9ufa1`, `css-7j6izm`, `css-tkopkt`, `css-vu1m4a`, `css-kb5z3h` | city links, nav active link |
| `#f6f5f2` (light) | `css-wp9y4g`, `css-mcnr9h`, `css-prwy36`, `css-pbywvp`, `css-j9ud6x` | text on dark/blue/green buttons & bands |
| `#1ca9b0` (teal) | `css-fitnmu` | footer links |
| `#000` | `css-iguuiu` | `Email:` label |

> The letter‑spacing value is duplicated on the color class as `--letter-spacing`, e.g.
> `css-c5giwt{ … --letter-spacing:1.6px }`, which the `.adjustLetterSpacing::after` pseudo
> uses to trim the trailing gap.

---

## 3. Spacing

Flexbox `gap` and padding values observed (px). Layout is essentially an 8‑ish scale with
some off‑grid values (46, 52).

- **Gaps:** `8, 10, 12, 16, 24, 28, 32, 40, 46, 52, 60, 80`.
- **Buttons:** padding `16px 20px` (dark `find an event`), `16px 18px`/`16px 20px` inner.
- **Eyebrow pills:** desktop `padding:12px 24px`; mobile `padding:12px 20px`.
- **Section cards:** side padding `52px` (`css-hc5w33`); header/body band vertical padding
  `52px` (`css-mcko7`, `css-c1fogv`, `css-gfkn38`); cream sections `padding:80px 0` with
  `gap:80px`/`60px`.
- **Hero header:** `padding-top:200px; padding-bottom:60px; gap:32px`.
- **Sticky nav:** `padding:8px 40px`.
- **Footer inner:** `padding:80px`.
- **Content max‑widths:** `900px` (header & section‑header text), `600px` (stat subtext,
  city column area is `400px`), `1200px` (project cards), `1400px` (wide rows / hero graphic),
  `1600px` (main content wrapper), `350–351px` (card text columns), `700px` (a wide text block).

---

## 4. Border radius

| Radius | Where |
|---|---|
| **12px** | Buttons (`contact for more`, `find an event`) and their 4px outline. |
| **20px** | Team‑avatar frames; card containers and eyebrow pills **on mobile (375)**; value/how‑it‑works inner blocks. |
| **32px** | Section cards, eyebrow pills, and large rounded containers **on tablet/desktop**. |

Section/pill corner radius is **20px at 375** and **32px at 800/1280** (mobile uses
`css-xofy3g`/`css-ysf3wl` = 20px; desktop uses `css-fy3uqk`/`css-oyzv` = 32px). Colored
section cards split radius across two bands: top band rounds top corners, body band rounds
bottom corners (`css-s9jzkc` + `css-mcko7`, etc.).

---

## 5. Shadows & borders (neo‑brutalist button style)

- **Hard offset shadow:** `box-shadow: 6px 6px 0px 0px #878787;` — on both button styles
  (`css-giutwj` dark button, `css-4a1acn` overlay on the light button, `css-2be7c7`).
  No blur, solid grey, offset down‑right 6px.
- **Button outline:** the light `contact for more` button uses an absolutely‑positioned
  overlay with `border: 4px solid #181814; border-radius:12px;` (`css-15fpuq`).
- No soft/blurred shadows anywhere. No gradients. No general borders besides the button outline.

---

## 6. Breakpoints

Only two thresholds (see `00-overview.md` §4):

| Name | Range | Design width |
|---|---|---|
| Mobile | `< 800px` | 375 |
| Tablet | `800px – 1279px` | 800 |
| Desktop | `≥ 1280px` | 1280 |

Two body background media rules also key on these (all resolve to the same `#fde9c9`).

---

## 7. Copy glyphs (verbatim fidelity)

- **Curly apostrophe `’` (U+2019):** `isn’t` (in `Your city isn’t here?`) and `What’s`
  (in footer `What’sApp` / `What’sapp`).
- **Straight apostrophe `'` (U+0027, encoded `&#x27;` in source):** `You're`, `You'll`,
  `We've`, `didn't`, `I'd`, `won't`, `other's` etc. — every other contraction.
- **Straight double quotes `"…"`:** `No "someday."`, `From "What If?"`.
- **Arrow `→` (U+2192)** with a normal space either side: `From "What If?" → to a Vibe App`.
- **Double space** (intentional, preserved) after `120 minutes.`:
  `…in under 120 minutes.  No matter your level…`.
- **Trailing spaces** exist on a few nodes in source (`team-building `, `Flien Groeneveld `,
  `4,000+ `); not visually significant.
- **Emoji:** flags use regional‑indicator pairs; England/Scotland use tag‑sequence
  subdivision flags (`🏴󠁧󠁢󠁥󠁮󠁧󠁿`, `🏴󠁧󠁢󠁳󠁣󠁴󠁿`). See `03-stats.md` / `04-for-vibe-coders.md` for exact strings.
