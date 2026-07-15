# Section 01 — Sticky Nav Bar (global)

The nav is the **last DOM node** on the page. It lives inside a full‑page overlay
(`css-vxbanq`: `height:<full page>; inset:0; pointer-events:none`, wrapper `css-5eam1e`)
and the `<nav>` itself is:

```
position: sticky; top: 0;            /* css-gfszfx = top:0 ; css-bq0x32 = sticky */
display: flex; justify-content: space-between; align-items: center;
padding: 8px 40px;
background: #f6f5f2;                  /* css-r6imyg */
overflow: clip; pointer-events: auto;
```

Net effect: a light off‑white bar pinned to the **top** of the viewport that stays visible
while scrolling. It is ~56px tall (8px padding + button height). Because the hero header has
`padding-top:200px`, hero content is not hidden behind it.

> The `position:sticky; top:0` is **capture‑derived**; an **orchestrator live observation at
> ~1366px viewport, 2026‑07‑15** confirms the bar stays pinned over every section down to the footer.

## Layout

`space-between` row with three groups:

1. **Left — logo button** (`<button class="css-hoya1r …">`, `cursor:pointer`). Contains an
   `<img>` VCC logo. **The logo SVG differs per breakpoint:**
   | Breakpoint | Logo asset |
   |---|---|
   | 375 | `/_assets/v11/3b492e9c11829780dccd59affaefe4908037241c.svg` |
   | 800 | `/_assets/v11/2e4c1b246a24953e795b570a482e061ce810d8a6.svg` |
   | 1280 | `/_assets/v11/8ea2bf38932813ccdcf1d22925d7ed334f25ca97.svg` |
2. **Middle — scroll links** (`css-z8tyhr`, gap based). **Desktop (1280) only.** Three
   `<button>`s (no href):
   ```
   for vibe coders
   for hosts
   for sponsors
   ```
   Type: Golos Black 16px uppercase. Color: blue `#0056a1` family (`css-kb5z3h`). The first,
   `for vibe coders`, is rendered as the **active/highlighted** item (distinct text class
   `css-b54yok`); the other two use the muted run. These map to the on‑page sections:
   `for vibe coders → FOR vibe coders`, `for hosts → FOR CITY LEADERS`, `for sponsors → FOR sponsors`.
3. **Right — CTAs** (`css-drwxnh`: flex‑end, gap 12px): `contact for more` link then
   `find an event` button.

## Per‑breakpoint contents (verbatim)

- **375 (mobile):** logo + `contact for more` **only**. No scroll links, no `find an event`.
- **800 (tablet):** logo + `contact for more` + `find an event`. No scroll links.
- **1280 (desktop):** logo + `for vibe coders` + `for hosts` + `for sponsors` + `contact for more` + `find an event`.

## Buttons (shared component — see also §Design Tokens §5)

- **`contact for more`** = light button. Structure: `<a>` (`css-4ecuzd`, radius 12px) →
  face `css-8c10oc` (`background:#f6f5f2`, `cursor:pointer`) + label (Golos Black 16px UC,
  `#181814`) + absolute outline `css-15fpuq` (`4px solid #181814`, radius 12px) +
  shadow layer `css-4a1acn` (`box-shadow:6px 6px 0 0 #878787`). Padding `16px 20px`.
  href = `https://calendar.app.google/z9XuskPpZPvE5A5h7`, `target="_blank"`.
- **`find an event`** = dark button. `<button class="css-fscf6o css-giutwj">`:
  `background:#181814`, `box-shadow:6px 6px 0 0 #878787`, radius 12px, padding `16px 20px`;
  label Golos Black 16px UC, `#f6f5f2`. **No href — JS handler.**

## Interactions

- Nav has an entrance animation state in the live snapshot (`opacity:0.899…; transform:none`)
  — same reveal treatment as other top‑level blocks (see `40-interactions.md`).
- `cursor:pointer` on logo, links, buttons. No hover styles are present in the static CSS;
  hover feedback (if any) is JS/runtime — an **orchestrator live observation (~1366px, 2026‑07‑15)**
  found **no visible hover change** on the nav `find an event` button; see `40-interactions.md` §4.
- **Scroll‑link and `find an event` click behaviour.** Capture‑derived: they are JS `<button>`s
  (onclick, **no href**) that **smooth‑scroll** to sections. Landing positions below are an
  **orchestrator measurement at 1366px viewport, 2026‑07‑15 — section‑anchor semantics, not pixel
  constants** (page height 12834px): `for vibe coders` → **1928** (top of the
  green section), `find an event` → **2948** (the cities/events block inside the green section),
  `for hosts` → **5361** (top of yellow FOR CITY LEADERS), `for sponsors` → **8860** (top of
  blue FOR sponsors). There are **no `#anchor` targets** in the DOM — implement as smooth
  `scrollIntoView` to those section elements.
