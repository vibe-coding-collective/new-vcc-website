# Section 02 — Hero Header

`<header class="css-c4hkyr …">` — `padding-top:200px; padding-bottom:60px;`
`display:flex; flex-direction:column; align-items:center; gap:32px;` on the cream page bg.

> Note: the visible hero wordmark is **not** "Vibe Coding Collective" (that appears only in
> `<title>`, the logo SVGs, and social meta). The visible display copy is the four words below.

## Copy (verbatim — identical on all breakpoints)

Four separate `<p>` runs in a centered, wrapping row (`flex-wrap:wrap; gap:8px; max-width:900px`):

```
communities
FOR
TECH-LITE
BUILDERS
```

> **Orchestrator live observation at ~1366px viewport, 2026‑07‑15 (not verifiable from static capture):** live, the headline row **interleaves
> small rounded‑square photo chips** (with yellow / green / teal backgrounds) and **one orange
> googly‑eyes blob** between/after the words — e.g. `COMMUNITIES [photo chip] FOR / [photo chip]
> TECH-LITE [orange googly blob] / BUILDERS [photo chip]`. These chips are runtime‑injected
> (absent from static HTML, which shows only the four `<p>` words).

Lead paragraph (`max-width:900px`, centered):

```
Join thousands of new creators building with GenAI in pubs, studios, and community spaces around the globe!
```

Two CTA buttons in a centered row (`gap:24px`):

```
find an event
contact for more
```

## Type & color

| Element | Font | Size / LH / LS | Color |
|---|---|---|---|
| The four words | Golos Text Black 900, uppercase | 80px / 1.0 / 1.6px, center | `#181814` (`css-jjm8g7`+`css-c5giwt`) |
| Lead paragraph | Golos Text Medium 500 | 24px / 1.5 / 0, center | `#181814` (`css-up3oa8`+`css-elb20k`) |
| `find an event` | Golos Black 900 UC | 16px / 1.5, center | `#f6f5f2` on `#181814` button |
| `contact for more` | Golos Black 900 UC | 16px / 1.5, center | `#181814` on `#f6f5f2` button |

The four words are inline‑wrapping (not forced line breaks): at 80px they wrap within the
900px column and center. Word gap 8px.

## Buttons

Same two shared button components documented in `01-nav-sticky.md`:
- `find an event` — dark `#181814` button, white label, `box-shadow:6px 6px 0 0 #878787`,
  radius 12px, padding `16px 20px`. **No href (JS).**
- `contact for more` — light `#f6f5f2` button, dark label, `4px solid #181814` outline,
  same hard shadow, radius 12px. href `https://calendar.app.google/z9XuskPpZPvE5A5h7`
  (`target="_blank"`).

## Hero graphic block (immediately below the header)

After `</header>`, inside wrapper `css-dczajm`, sits:

```
<div class="css-gsc6h8 css-nevt4e"></div>
   css-gsc6h8 = max-width:1400px; width:862px; height:350px;
   css-nevt4e = margin-bottom:-60px; display:block;
```

In the **static HTML** this is an empty 862×350 block — a Figma FRAME named `Container` with
`"fills":[]` and no children. The next block overlaps it upward by 60px via the negative margin.

> **Orchestrator live observation at ~1366px viewport, 2026‑07‑15 (not verifiable from static capture) — the block is NOT blank live.** It renders a
> runtime‑injected **photo collage**: event photos masked into flower/cloud blob shapes on
> colored rounded blobs (teal, yellow, red visible), partially overlapping, occupying this
> 862×350 (max 1400px) frame just below the CTA buttons (`margin-bottom:-60px`). The same collage
> style renders on the tablet DOM. Because it is runtime‑injected, it is not in any static asset
> reference. **A faithful clone should reproduce the 862×350 collage here, not empty space.**

## Responsive

- Word size stays 80px in the captured CSS across breakpoints (mobile stacks them more due to
  narrower column). Confirm mobile word size visually if a smaller size is desired.
- Both CTAs remain; layout stays centered column → button row.

## Interactions

Header block has the standard entrance reveal (`opacity:~0.9; transform:translateY(20px)`
in the snapshot) — see `40-interactions.md`.
