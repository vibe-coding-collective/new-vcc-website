# Section 08 — reviews / "what people say" (cream)

Wrapper `css-jdk4aq`: `padding:40px 0; column; align-items:center; gap:52px` on cream page bg.

## 8.1 Eyebrow + heading

Eyebrow pill bg **orange `#ec6c23`** (`css-r7xudp`), light label:
```
reviews
```
Heading (Golos Black 60px/1.2/1.2px UC center `#181814`):
```
what people say
```

## 8.2 Testimonials (3)

Layout `css-3vj1k`: desktop `css-zcybxd` = `flex-wrap:wrap; justify:center; gap:46px;
padding-right:40px` (three ~500px cards across, wrapping); tablet & mobile `css-a8cijb` =
`column; gap:46px` (stacked). Each card `css-i5fjj5` (`width:500px`) `css-tgvl21`:

1. A **yellow `#ffd226`** rounded quote box (`css-d1un8n`, radius 32px, `overflow:clip`) holding
   the quote text (Golos Medium 20px `#181814`), with a **180×32 decorative graphic**
   overlaid at the box's bottom edge (`css-sluck7`, same asset on all three:
   `/_assets/v11/b803453e0abcb56b463d975c2de46612348e559b.svg` — a quote/rating flourish).
2. Below the box, a row (`css-yostx2`, `padding-left:32px; gap:16px`): a **100×100** reviewer
   avatar illustration (SVG, unique per reviewer) + a name/role/chapter column (`css-kd4wqv`,
   `gap:4px`).

All three quote boxes are yellow (`#ffd226`).

**Verbatim (straight apostrophes throughout `I'd` / `didn't` / `it's`; note emoji in #2):**

**Card 1** — reviewer avatar `/_assets/v11/052c501797b3f7f6dc029a833f605a25e279dc23.svg`
```
Thank you for giving me an experience that changed my attitude toward tech!
Tomoki
Photographer
Osaka Pop-up
```
**Card 2** — reviewer avatar `/_assets/v11/e9fd76ec2df65e2a96ec304f9e9b56a7b03c9486.svg`
```
My partner was raving about the vibe coding collective so I popped along last month - it was so inspiring! Turns out I'd been vibe coding for work for aaaages, just didn't know it was a thing 🫣
Heeezil
3D Artist
London chapter
```
**Card 3** — reviewer avatar `/_assets/v11/1f28de6c7a53f7f310e5b2353cb63926c7a5c7e5.svg`
```
Coding has always puzzled me, but now it's a lot more accessible, and this community is great for both improving my own skills as well as seeing cool stuff other are doing.
Christian
Developer
London chapter
```

Type: name = Golos Black 20px **uppercase** `#181814` (`css-wm7eh7`; e.g. `Tomoki` → `TOMOKI`);
role = Golos Black 20px `#181814` (`css-c68jms`); chapter/location = Golos Medium 20px `#181814`
(`css-26c6mk`).

## Interactions

The testimonials block carries a notably stronger entrance state in the snapshot
(`opacity:0.5; transform:translateY(30px)`) — a scroll‑reveal. See `40-interactions.md`.

## Responsive

3 cards across (wrapping) on desktop → stacked column on tablet & mobile.
