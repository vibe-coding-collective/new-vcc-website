# Section 07 — FOR sponsors (blue card on off‑white)

Section `css-fy3uqk css-2fmumq` sits on **`#f6f5f2`**. **Header band** `#0056a1` blue
(`css-q46q7n`, top‑rounded) → **body band** `rgba(0,86,161,0.4)` blue tint (`css-tm4jxk`,
bottom‑rounded). Radius 32/20px.

## 7.1 Eyebrow + heading (blue band, light text)

Eyebrow pill bg **teal `#1ca9b0`** (`css-emccw1`), light `#f6f5f2` label:
```
FOR sponsors
```
Heading (Golos Black 60px/1.2/1.2px UC center, **light `#f6f5f2`** — `css-p5pzcn`+`css-mcnr9h`):
```
Put your brand in a room with builders
```
Sub‑paragraph (Golos Medium 20px center, **light `#f6f5f2`** — `css-9j145o`+`css-wp9y4g`):
```
Be part of the movement across 7 countries. Reach 1,100+ engaged builders. Associate your brand with anti-gatekeeping and real skill development.
```

## 7.2 Why Partner With Us (blue‑tint band, dark text)

Label (Golos Black **32px** UC `#181814` — `css-ubny2b`+`css-i0585y`+`css-871ihu`;
CORRECTION 2026-07-16: originally transcribed as 20px, but `css-i0585y` is the 32px
card-title class per the capture and tokens §2.2 — caught by builder 07/09, verified
by its reviewer against `_capture/css-rules.css` and `dom-1280.html`):
```
Why Partner With Us
```
Bulleted list in **two columns** (`css-7nelag`): column A = bullets 1–2 (`css-ymoq7s`),
column B = bullets 3–5 (`css-pbatqu`). Each bullet is a `<ul><li>` with a `•` marker
(`content:'\2022'`), Golos Medium 20px `#181814` (`css-6tz1ex`+`css-qh54ry`).

Verbatim bullets (`We've` = straight apostrophe):
```
Builders, not browsers. People who actually ship projects and value real skill.
1,100+ members across 7 countries. Word-of-mouth growth only. No inflated numbers.
Custom solutions. We work with your goals, not templates.
Community-first approach. Your investment makes something real, not just a booth or a logo placement.
Proven model. We've run 20+ events. We know what works.
```
> **Breakpoint copy note:** on **mobile & tablet** each bullet's **lead phrase** is a separate
> run (e.g. `Builders, not browsers.` split from `People who actually ship…`), rendered as a
> distinct (heavier) span; on **desktop** each bullet is a single run. Reproduce the desktop
> single‑string form as canonical, optionally bolding the lead sentence on small screens.

Then the light `contact for more` button (href `https://calendar.app.google/z9XuskPpZPvE5A5h7`,
`target="_blank"`).

## Responsive

Two bullet columns on desktop/tablet; on mobile they stack into one column. Section radius
32px (≥800) / 20px (375).
