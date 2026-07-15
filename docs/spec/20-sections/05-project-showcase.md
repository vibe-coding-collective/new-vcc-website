# Section 05 — From "What If?" → project showcase (cream)

Wrapper `css-j2cdf4`: `padding:80px 0; column; align-items:center; gap:80px` on cream page bg.
No colored card — sits directly on `#fde9c9`.

## 5.1 Eyebrow + heading

Eyebrow pill bg **green `#498d44`** (`css-4uqxnc` desktop/tablet, `css-8ikb59` mobile;
CORRECTION 2026-07-15 — this file originally said orange `css-r7xudp`, but that class
belongs to the city-leaders/reviews eyebrows; capture-verified by builder 03/05 and the
orchestrator), light `#f6f5f2` label. **Text differs by
breakpoint** (arrow `→` = U+2192 with normal spaces):
- Desktop (1280): `From "What If?" → to a Vibe App`
- Mobile & tablet (375/800): `From "What If?" → to an app`

Heading (Golos Black 60px/1.2/1.2px UC center `#181814` — `css-p5pzcn`+`css-c39cjd`):
```
get inspired by community
```
Sub‑paragraph (Golos Medium 20px center `#181814` — `css-naacuj`+`css-elb20k`). **Note the
intentional double space** after `120 minutes.`:
```
In every session, our members move from a blank screen to a functional project in under 120 minutes.  No matter your level, you can ship:
```

## 5.2 Project cards (4, zigzag)

Container `css-zfhr1y`: `flex-direction:column; align-items:center; gap:60px` — **always a
vertical stack** at every breakpoint. Each card `css-jg3xbf` (`max-width:1200px`) `css-2ackvv`
(`row; justify:center; align:center; gap:52px`) pairs a **200×200** image with a text column
(`css-4klpjv`, `max-width:350px`; title/body left‑aligned). Cards **alternate image side**
(zigzag):

| Card | Image side (desktop) | Image asset (`/_assets/v11/…`) |
|---|---|---|
| Immersive 3D | left | `0a41f7b582848edb3d8f5a59698027f8995f76d1.png` |
| Motion Tracking | right | `84c1720b0a1c2429832f4466e29482df9fc46215.png` |
| Open Data Integration | left | `aa5a516fe499c6d190243dc9a9e5cd421c746916.png` |
| The Unexpected | right | `c2395fbea2cd0e8eca188b0019c69e87fce516d0.png` |

Copy (verbatim, identical across breakpoints):
```
Immersive 3D
Building interactive 3D apps and environments from scratch.
```
```
Motion Tracking
Real-time body, face, and object detection
```
```
Open Data Integration
Playing with live APIs from NASA, global finance, or geo-mapping.
```
```
The Unexpected
From a hand standing trainer tracker to a finger-controlled game. If you can vibe it, you can build it.
```
Title = Golos Black 32px UC left `#181814` (`css-514v69`+`css-871ihu`); body = Golos Medium 20px
left `#181814` (`css-3vyy31`+`css-elb20k`).

## Responsive / DOM order note

- The cards are a vertical stack at all breakpoints; on mobile the image/text of each row
  presumably stacks (image above text) — confirm visually.
- **DOM order of the middle two cards differs:** desktop DOM order is
  `Immersive 3D, Motion Tracking, Open Data Integration, The Unexpected`; mobile & tablet DOM
  order is `Immersive 3D, Open Data Integration, Motion Tracking, The Unexpected`. Visually the
  desktop reads top‑to‑bottom in that order; keep the desktop order as canonical.

## Interactions

Standard entrance reveal on the block. No hover styles in static CSS.
