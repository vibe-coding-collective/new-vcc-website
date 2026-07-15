# Section 11 — Footer (dark)

`<footer class="css-setvkj …">`: background **`#181814`**. Inner `css-suww2`:
`column; align-items:center; gap:10px; padding:80px`.

## Layout

- **Large watermark wordmark** — `css-nu3ilp` (**708×202**, `position:absolute; left:50%;
  top:201px; transform:translateX(-50%)`), a big centered VCC logotype behind the content:
  `/_assets/v11/34e7cef03b76dea60414a4e330b3d08f8d43e2af.svg`.
- **Logo mark** — `css-ssdydo` (**100×93**): `/_assets/v11/562debcb4a3ae6307669b96af0bfe1e8ffa3d39a.svg`.
- **Two‑column row** (`css-jvpnk3`, `justify:space-between`):
  - **Left column** (`css-i5hden`, ~245px): three stacked items —
    the WhatsApp label (a **link on 375 & 800**, plain text on 1280 — see Copy), then `Meetups` and `LinkedIn` links.
  - **Right column** (`css-f4flf`, `align:flex-end; gap:12px`): copyright lines.

> **Orchestrator live observation at ~1366px viewport, 2026‑07‑15 (not verifiable from static capture):** the footer is a black band with a
> **centered white retro VCC logo**; along the **bottom edge sits a row of six googly‑eyed blob
> mascots** peeking up, colored (left→right) **red, orange, yellow, green, teal, blue**. Left
> links are uppercase teal (`WHAT'SAPP / MEETUPS / LINKEDIN`); right text is
> `All rights reserved` / `London, UK. 2026`. (The mascot row is a footer element not present in
> the static `/_assets` references itemised above — reproduce it as a decorative bottom‑edge row.)

## Copy (verbatim)

Left column (teal `#1ca9b0`; `What's` uses a **curly** apostrophe). **Casing differs by
breakpoint:** desktop `What'sApp`, mobile & tablet `What'sapp`:
```
What’sapp   (mobile 375 & tablet 800)  → https://chat.whatsapp.com/BxLUpQMiXwo6d1vG7YSirT   (target=_self)
What’sApp   (desktop 1280)             — plain text, no href
Meetups              → https://www.meetup.com/vibe-coding-collective/   (target=_blank)
LinkedIn             → https://www.linkedin.com/company/vibe-coding-collective/posts   (target=_blank)
```
Right column (light `#f6f5f2`, Golos Medium 20px — `css-3w0wvn`+`css-wp9y4g`):
```
All rights reserved
London, UK. 2026
```

## Type & color

| Element | Font / size | Color | Class |
|---|---|---|---|
| `What'sApp` | Golos Black 16px UC | teal `#1ca9b0` | `css-995lll`+`css-fitnmu` |
| `Meetups`, `LinkedIn` | Golos Black 16px UC (`white-space:nowrap`) | teal `#1ca9b0` | `css-8d3sqr`+`css-fitnmu` |
| copyright lines | Golos Medium 20px | light `#f6f5f2` | `css-3w0wvn`+`css-wp9y4g` |

> **Capture‑derived (per `_capture/dom-375/800/1280.html`):** the footer WhatsApp label **is a
> link on mobile (375) and tablet (800)** — `<a href="https://chat.whatsapp.com/BxLUpQMiXwo6d1vG7YSirT"
> target="_self">What'sapp</a>` — and **plain text (no href) on desktop (1280)** (`What'sApp`).

## Interactions

Footer links use `cursor:pointer`; no static hover styling.
