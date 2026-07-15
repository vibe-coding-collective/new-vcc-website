# Section 06 — FOR CITY LEADERS (yellow card)

Rounded section card (radius 32/20px). **Header band** `#ffd226` (`css-4d3tc7`) →
**body band** `rgba(255,210,38,0.4)` (`css-8wtqt9`). Contains three sub‑blocks: the pitch + map,
`How It Works`, and `WHO'S DOING THIS` (team).

## 6.1 Pitch + map (yellow header band)

Band `css-c1fogv`: `padding:52px 0; column; align-items:center; gap:40px`.
Eyebrow pill bg **orange `#ec6c23`** (`css-r7xudp`), light label:
```
FOR CITY LEADERS
```
Heading (Golos Black 60px/1.2/1.2px UC center `#181814`):
```
START A CHAPTER IN YOUR CITY!
```
Sub‑paragraph (Golos Medium 20px center `#181814`):
```
You pick the location. You host the first event. The community grows from there. 1,200+ members started exactly where you are now.
```
**Map image** — full‑width panoramic banner, `aspect-ratio:2634/822` (desktop `css-ng1io7`;
tablet variant `css-10elgb` = `aspect-ratio:1200/396`), `object-fit:cover`:
`/_assets/v11/547a46b0dfe6a0bca6b9549c32a0783d6344f680.png` (native 2634px wide; srcSet up to 2560w).

> **Orchestrator live observation at ~1366px viewport, 2026‑07‑15 (not verifiable from static capture):** the map banner shows labeled city markers
> (diamond markers; black or red text, some rotated): **EDINBURGH, LONDON, AMSTERDAM, LISBON,
> DELFT, BERLIN, KYIV, BOSTON, NEW YORK, ISLAMABAD, OSAKA**. This city set **deliberately differs**
> from the green section's "All cities" list (`04-for-vibe-coders.md` §4.3) — document both, do
> not reconcile.

> Note: the Figma data also contains a separate runtime image named `map`
> (`a7692bab7f6ad9b37f37dab5d266e3ca035326fa`, 1200×363) not present in static HTML. The visible
> banner is the `547a46b0…png` above.

## 6.2 How It Works (3 steps)

Label (Golos Black 52px UC `#181814`):
```
How It Works
```
Steps row `css-7cqju2` (`row; justify:center; gap:32px` on desktop; **stacked column** on
tablet/mobile). Each step `css-13yt9u` (`flex:1; column; align:center`): an SVG icon
(`css-s5ellx`) + title + body. Icons:

| Step | Icon asset (`/_assets/v11/…`) |
|---|---|
| 1 | `eff5c9863d131ac4ddcf776414b0757a84dc68fa.svg` |
| 2 | `260725a02a5c94ee328e818303968da3f4f8510d.svg` |
| 3 | `3d0f6f5b723c0276df9f03ea49f4f2cd191026d8.svg` |

Copy (verbatim; `You're` uses straight apostrophes):
```
1/ RUN first pop-up
Pick a venue: a cafe, studio, bar, and host your first 2-hour event. We handle the framework. You bring the community.
```
```
2/ support your folks
People show up. They bring friends. You become the familiar face. Word spreads because the experience is real.
```
```
3/ LEAD community
You're no longer running an event. You're leading a movement in your city. The builders trust you. The culture is yours.
```
Step title = Golos Black 32px UC `#181814` (`css-i0585y`); body = Golos Medium 20px `#181814`
(`css-9j145o`).

## 6.3 WHO'S DOING THIS (team grid)

Label (Golos Black 52px UC `#181814`; `WHO'S` uses a straight apostrophe):
```
WHO'S DOING THIS
```
Grid of member cards in `space-between` rows (`css-jvpnk3`); each member `css-cf4ph`
(`column; align:center; gap:16px`): a stylized avatar, then **role** (above) and **name** (below).

- **Type:** role = Golos Black 20px, title‑case, `#181814` (`css-6toy3o`); name = Golos Black
  20px **uppercase** `#181814` (`css-xjo1dh`). So e.g. source `Dan Porder` renders `DAN PORDER`;
  `CAVAN JUDGE` stays uppercase. (Source casing varies but display is uniform uppercase.)
- **Avatar treatment (distinctive):** each avatar is a layered `inline-grid` (`css-us4svo`/
  `css-4cmtt6`): a member **photo** masked into an **organic blob shape** (`mask-image` = a blob
  SVG, `mask-mode:alpha`), overlaid with a `mix-blend-mode:color` tint (`#d9d9d9`, `#fff`, or
  `#ec6c23`) masked to the same blob, plus a decorative SVG **outline frame**. Founder avatars
  are rendered larger than the rest. Blob mask SVGs used include
  `a912d2aac01286b942ab337bd9e1595ec7dc384d.svg`, `e54b773c654e901a476251f8dee607a350253ef5.svg`,
  `5af4bfba75e7e7192f379e5ef04869392ecaf3fe.svg`, `9fca8ea511ee…svg`, `03709987aa34…svg`,
  `3cb9dac8fbd4…png`, `3e9082a3bec7…png`.

> **UNKNOWN (still unresolved — orchestrator 2026‑07‑15):** the exact photo‑hash → person mapping
> is not reliably determinable from static files (the masked composites use different hashes than
> the Figma `dan/sofiia/…` refs). Team photo assets are inventoried generically in `30-assets.md`.
> Use real assets or placeholders.

### Roster — **differs by breakpoint**

**Tablet & Desktop (800 / 1280) — 12 people, this order:**
```
Founder                       Dan Porder
Founder                       Sofiia Matsiutsia
AI Engineer / Mumbai Lead     Abhinav
Creative Technologies         CAVAN JUDGE
AI Engineer                   Liberatus Fusi
Creative Technologies         JOSEPH WAN
Product Manager               ERIKA TSAI
Community Lead                Luisa Von Funcke
Amsterdam Lead                Flien Groeneveld
Berlin Lead                   Eric Lonergan
Berlin Lead                   Uvin Withana
Delft Lead                    Poppy Astrini
```
**Mobile (375) — 8 people; founders swapped, last 4 leads dropped:**
```
Founder                       Sofiia Matsiutsia
Founder                       Dan Porder
AI Engineer / Mumbai Lead     Abhinav
Creative Technologies         CAVAN JUDGE
AI Engineer                   Liberatus Fusi
Creative Technologies         JOSEPH WAN
Product Manager               ERIKA TSAI
Community Lead                Luisa Von Funcke
```
(Row width: desktop ~4 avatars per row; founders sit in a first row of 2 at larger size.
`Flien Groeneveld ` and `team-building ` have trailing spaces in source.)

## 6.4 Join our team

Light button (same component as `contact for more`), label:
```
Join our team
```
href `https://docs.google.com/forms/d/e/1FAIpQLSdF9cGO8BJeZdCznidPJDBajWgC3ER7OR1BI-xSsVV8niZUsg/viewform`,
`target="_blank"`.

## Responsive summary

- How It Works: 3‑across (1280) → stacked (800, 375).
- Team: 12 members (800/1280) → 8 members (375); founders order swaps on mobile.
- Map banner scales full width at all breakpoints.
