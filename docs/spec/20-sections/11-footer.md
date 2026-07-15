# Section 11 — Footer (dark)

`<footer class="css-setvkj …">`: background **`#181814`**. Inner `css-suww2`:
`column; align-items:center; gap:10px; padding:80px`.

## Layout

- **Large watermark wordmark** — `css-nu3ilp` (**708×202**, `position:absolute; left:50%;
  top:201px; transform:translateX(-50%)`), a big faint VCC logotype behind the content:
  `/_assets/v11/34e7cef03b76dea60414a4e330b3d08f8d43e2af.svg`.
- **Logo mark** — `css-ssdydo` (**100×93**): `/_assets/v11/562debcb4a3ae6307669b96af0bfe1e8ffa3d39a.svg`.
- **Two‑column row** (`css-jvpnk3`, `justify:space-between`):
  - **Left column** (`css-i5hden`, ~245px): three stacked items —
    `What'sApp` (**plain text, no link**), then `Meetups` and `LinkedIn` links.
  - **Right column** (`css-f4flf`, `align:flex-end; gap:12px`): copyright lines.

## Copy (verbatim)

Left column (teal `#1ca9b0`; `What's` uses a **curly** apostrophe). **Casing differs by
breakpoint:** desktop `What'sApp`, mobile & tablet `What'sapp`:
```
What'sApp            (desktop)   /   What'sapp   (mobile & tablet)   — plain text
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

> The `What'sApp` label has no href in any breakpoint (there is a WhatsApp group invite
> elsewhere in the project brief, but this text is not linked in the captured HTML).

## Interactions

Footer links use `cursor:pointer`; no static hover styling.
