# Section 04 — FOR vibe coders (green card)

A rounded section card. **Header band** `#91bd3c` (`css-wytt6c`) holds the eyebrow + heading;
**body band** `rgba(145,189,60,0.4)` (`css-mj3f8x`) holds the value cards + cities. Corner radius
**32px** (desktop/tablet) / **20px** (mobile). Side padding 52px; band vertical padding 52px.

## 4.1 Eyebrow + heading

Eyebrow pill (`css-oyzv`, radius 32/20px, `padding:12px 24px`/`12px 20px`, bg **green `#498d44`**
`css-4uqxnc`), label light `#f6f5f2`:
```
FOR vibe coders
```
Heading (Golos Black 60px/1.2/1.2px UC, center, `#181814` — `css-p5pzcn`+`css-c39cjd`):
```
2-HOUR HACKATHONS THAT ACTUALLY WORK
```
Sub‑paragraph (Golos Medium 20px, center, `#181814` — `css-9j145o`+`css-elb20k`). Note the
straight double quotes around `someday`:
```
Working apps. Real projects. The kind of stuff you can show people. No "someday." You walk out with something.
```

## 4.2 Value cards (3)

Row `css-7cqju2` on desktop (`flex-direction:row; justify:center; gap:32px`), **stacked column**
on tablet & mobile (`css-a8cioh`, `flex-direction:column; gap:40px`). Each card `css-cf4ph`
(`flex:1; column; align:center; gap:16px`): a **250×250** image (`css-b495q3`, `object-fit:cover`)
above a title + body.

Copy is identical across breakpoints:

**Card 1** — image `/_assets/v11/04fb16c4643b1aecea90df545c694694adfffca4.png`
```
not only for TECH folks
Your day job can be anything. Designer, chef, accountant, teacher. You bring passion. We handle the framework.
```
**Card 2** — image `/_assets/v11/fc766c55e144bd933ec0ba656230a0550d2a85a2.png`
```
LOW BARRIER, HIGH IMPACT
No prerequisites. No gatekeeping. If you can think of an idea, you can build it here. Beginners ship real apps alongside experienced builders.
```
**Card 3** — image `/_assets/v11/c1a03b9e7c869e7051099f2ddf05dc00cf0f98a3.png` (`You'll` = straight apostrophe)
```
LEARN FROM THE ROOM
Best ideas in the room become your ideas. Peer learning beats tutorials every time. You'll see how others think and solve problems differently.
```
Title = Golos Black **32px** UC center `#181814` (`css-i0585y`+`css-871ihu`); body = Golos Medium
20px center `#181814` (`css-9j145o`+`css-elb20k`).

## 4.3 "All cities" list

Label (Golos Black 52px/1.04px UC, `#181814` — `css-sf9yj5`+`css-hsb877`):
```
All cities
```
List is a single ~400px column (`css-i5g6io`+`css-7ys8wh`, `gap:40px`), each city a
`space-between` row (`css-sf5ny4`): left = flag emoji (Golos Black 32px, Noto fallback) + city
name (Golos Black 32px UC); right = an **arrow icon** for linked cities
(`/_assets/v11/7701da584c926e987f48dc442532fc28b5f2e4cf.svg`) **or** the word `TBA` for
unlaunched cities. Linked city names are **blue `#0056a1`** (`css-q9ufa1`/`css-7j6izm`); `TBA`
city names are `#181814` (`css-d5zdmh`) and `TBA` uses `css-edy0ng`.

> Note: this "All cities" list is **separate from** the labeled city markers drawn on the yellow
> section's map banner (EDINBURGH, LONDON, AMSTERDAM, LISBON, DELFT, BERLIN, KYIV, BOSTON,
> NEW YORK, ISLAMABAD, OSAKA — orchestrator live observation; the map is a raster image, so those
> labels are not verifiable from the static capture. See `06-for-city-leaders.md`). The two city
> sets deliberately differ; document both, do not reconcile.

**The city list differs per breakpoint — reproduce each exactly (casing + flag + link). All
hrefs below are transcribed from `_capture/dom-375/800/1280.html` and `home-ssr.html`; every city
link uses `target="_blank"`:**

### 375 (mobile) — order & verbatim
```
🇳🇱 Delft            → https://luma.com/z32gtwo6
🇩🇪 berlin           → https://www.meetup.com/vibe-coding-collective-eu/events/312898072/?
🇺🇦 Kyiv             → https://luma.com/zxoxma81
🏴󠁧󠁢󠁥󠁮󠁧󠁿 London           → https://luma.com/bhfumnou
🇺🇸 boston   TBA     (no link)
🏴󠁧󠁢󠁳󠁣󠁴󠁿 edinburgh TBA   (no link)
```
### 800 (tablet) — order & verbatim
```
🇩🇪 berlin           → https://www.meetup.com/vibe-coding-collective-eu/events/312898072/?
🇳🇱 delft            → https://luma.com/z32gtwo6
🇵🇹 Lisbon           → https://www.meetup.com/vibe-coding-collective/events/313129591/
🏴󠁧󠁢󠁥󠁮󠁧󠁿 London           → https://www.meetup.com/vibe-coding-collective/events/313129591/
🇺🇸 boston   TBA     (no link)
🇯🇵 Edinburgh TBA    (no link)   ← note: Japan flag on Edinburgh (as‑is in source)
```
### 1280 (desktop) — order & verbatim
```
🇩🇪 berlin           → https://www.meetup.com/vibe-coding-collective-eu/
🇳🇱 delft            → https://luma.com/z32gtwo6
🇺🇦 Kyiv             → https://luma.com/zxoxma81
🏴󠁧󠁢󠁥󠁮󠁧󠁿 London           → https://luma.com/bhfumnou
🇺🇸 boston   TBA     (no link)
🏴󠁧󠁢󠁳󠁣󠁴󠁿 Edinburgh TBA   (no link)
```
Differences: mobile lists `Delft` (capital D) first and `edinburgh` (lowercase); tablet swaps in
`Lisbon` (🇵🇹) for `Kyiv`, capitalises `Edinburgh`, and uses a 🇯🇵 flag on Edinburgh; desktop
matches tablet order but keeps `Kyiv` and the Scotland flag. `berlin` is always lowercase;
`boston` always lowercase. **`berlin` and `London` also change href per breakpoint** — mobile/tablet
`berlin` and tablet `London`/`Lisbon` point at dated `/events/NNN/` Meetup pages, while desktop
uses the base Meetup/Luma URLs. On desktop (1280) the `delft` and `London` rows additionally emit a
separate arrow‑image `<a>` to the same href (the `London` arrow one is `target="_self"`).

> **Correction (capture‑derived, supersedes an earlier note).** An orchestrator live query on
> 2026‑07‑15 was **desktop‑DOM‑scoped and wrongly reported "Lisbon is not a link."** Per
> `_capture/dom-800.html` / `home-ssr.html`, on the **800** breakpoint `Lisbon` **is** a link:
> `<a href="https://www.meetup.com/vibe-coding-collective/events/313129591/" target="_blank">Lisbon</a>`
> — the same href as tablet‑`London`.
>
> **Implementation note:** the `/events/NNN/` URLs are dated single‑event links that will go stale.
> Recommend builders adopt the base URLs as canonical (`berlin →
> https://www.meetup.com/vibe-coding-collective-eu/`, `London → https://luma.com/bhfumnou`) and
> record the substitution in DEVIATIONS — but this spec states the captured truth as‑is.

## 4.4 "Your city isn't here?" CTA

Row (`css-zfhupp`, `gap:12px`). Prompt (Golos Black 32px UC `#181814` — `css-i0585y`; note the
**curly** apostrophe in `isn’t`):
```
Your city isn’t here?
```
Then the light `Start a chapter` button (same component as `contact for more`;
href `https://calendar.app.google/z9XuskPpZPvE5A5h7`, `target="_blank"`):
```
Start a chapter
```

## Responsive summary

- Value cards: 3‑across (1280) → stacked (800, 375).
- Cities: always a vertical list; content set **and some hrefs** differ per breakpoint (above).
- Section radius 32px (≥800) / 20px (375).
