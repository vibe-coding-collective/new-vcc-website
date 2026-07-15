# Section 10 — Contact CTA (off‑white card)

Section `css-d1un8n css-axoe5v`: **`#f6f5f2`** background, radius **32px**. Inner `css-k74qhi`:
`row; justify:center; align:center; gap:32px; padding:80px 52px` (`css-3xewvf` = centered row).

## Layout

Two columns:

1. **Left — illustration** `css-4onwt9` (**300×298**), SVG:
   `/_assets/v11/14c2673a765c25af90dd14c74544b1c7faa8b46c.svg`.
   *(Orchestrator live observation at ~1366px viewport, 2026‑07‑15 (not verifiable from static capture): it is a hand‑drawn **yellow smiley‑sun doodle**.)*
2. **Right — text column** `css-eyvxf1` (`flex:1; column; align:center; gap:32px`):
   - Heading + paragraph block (`css-a8ckuu`):
     ```
     up for a collaboration?
     Get in touch if you'd like to partner with us or just to have a coffee-chat.
     ```
   - Email block (`css-7403bt`):
     ```
     Email:
     dan.porder@vibecoders.global
     ```
   - The light `contact for more` button
     (href `https://calendar.app.google/z9XuskPpZPvE5A5h7`, **`target="_self"`** here).

## Type & color

| Element | Font / size | Color | Class |
|---|---|---|---|
| `up for a collaboration?` | Golos Black 32px UC | `#181814` | `css-i0585y`+`css-871ihu` |
| paragraph (`you'd` = straight `'`) | Golos Medium 24px | `#181814` | `css-up3oa8`+`css-elb20k` |
| `Email:` | Golos Medium 24px | **`#000` black** | `css-nbet0w`+`css-iguuiu` |
| `dan.porder@vibecoders.global` | Golos Medium 24px | **green `#498d44`** | `css-rnvkzt`+`css-813ies` |

The email address is **plain text**, not a `mailto:` link. (Green `#498d44` styling is capture‑derived — class `css-813ies`.)

## Breakpoint note

The `Email:` label is present on **desktop (1280)** but **absent on mobile & tablet (375/800)**
(those show only the address). Layout goes from side‑by‑side (illustration + text) on desktop to
stacked on mobile — confirm illustration placement visually.
