# Section 03 — Stats + "supported BY"

Wrapper `css-ui2p7e`: `padding-top:24px; padding-bottom:80px; column; align-items:center; gap:80px`,
on cream page bg. Sits directly under the hero graphic block (which overlaps it upward via
`margin-bottom:-60px`). Two blocks: the stats cluster, then "supported BY".

## Copy (verbatim — identical across breakpoints)

Headline pair (centered, `gap:12px`):
```
4,000+ 
members are ALREADY HERE
```
(`4,000+` has a trailing space in source.)

Descriptive paragraph (centered, one visual line of text; `anyone` is wrapped in its own
`<span>` but is **not** visually emphasized in the captured CSS — same color/weight):
```
From photographers to chefs to accountants. Seven countries. One mission: prove that anyone can build.
```

Two stats side by side (row, `max-width:600px`, `gap:24px`, each column centered):
```
9
Countries
🇬🇧🇩🇪🇺🇸🇯🇵🇺🇦🇵🇹🇳🇱🇵🇰
```
```
100%
Word of mouth
```

Then:
```
supported BY
```

## Type & color

| Element | Font / size / LH / LS | Color | Class |
|---|---|---|---|
| `4,000+` | Golos Black 80 / 1.0 / 1.6px | **green `#498d44`** | `css-jjm8g7`+`css-sf32d9` |
| `members are ALREADY HERE` | Golos Black 52 / 1.5 / 1.04px, UC, center | `#181814` | `css-sf9yj5`+`css-hsb877` |
| paragraph | Golos Medium 24 / (LH set inline) / 0, center | `#181814` | `css-oygtas`/`css-up3oa8`+`css-elb20k` |
| `9`, `100%` | Golos Black 60 / 1.2 / 1.2px, UC | **green `#498d44`** | `css-iaf5xm`+`css-scvvzt` |
| `Countries`, `Word of mouth` | Golos Black 32 / 1.5 / 0.64px, UC | `#181814` | `css-514v69`/`css-i0585y`+`css-871ihu` |
| flag string | Golos Black 32 (Noto fallback for emoji) | — | `css-126xrq`+`css-871ihu` |
| `supported BY` | Golos Black 32 / 1.5 / 0.64px, UC | `#181814` | `css-65o562`/`css-9a7xzl`+`css-871ihu` |

## Data notes (discrepancies — reproduce verbatim, do not "fix")

- Number says **`9`** Countries but the flag string contains **8** flags:
  🇬🇧 GB · 🇩🇪 DE · 🇺🇸 US · 🇯🇵 JP · 🇺🇦 UA · 🇵🇹 PT · 🇳🇱 NL · 🇵🇰 PK.
- Copy elsewhere says "Seven countries" (this paragraph) and "7 countries" (sponsors), while
  the stat says 9. All are intentional as‑is content.

## "supported BY" sponsor‑logo strip

Directly after the `supported BY` label is an **empty container** in the static HTML:
`<div class="css-5knerd css-v27th6"></div>`. In the Figma page data this is a logo strip of
**7 images**, runtime‑injected (none appear in the static `/_assets` references):

| Figma node | Runtime asset (inferred `/_assets/v11/<hash>.png`) | Native size |
|---|---|---|
| `macpaw 1` | `4f79c701f27104707bdbfaafd0642c59f158ff3e` | ~200×80 |
| `image 9` | `5c67840b122b8508c56e83e052d3cc0938a886ca` | ~171×80 |
| `image 118` | `d3ef03203f68628ad429dd38be6066d4dbd34f6c` | ~200×80 |
| `image 119` | `6b3d80b37f4380613a091362ed7f2960d0a23dff` | ~202×80 |
| `image 120` | `1c3e99651b18b91cef5b82aae350937593ce6574` | ~201×80 |
| `image 121` | `5e973f77aa7840ba2e45e3022b81ae09b4b35c41` | ~249×80 |
| `image 123` | `8e452d45246a391069309df65da2fde56013812f` | ~183×80 |

> **Orchestrator live observation at ~1366px viewport, 2026‑07‑15 (not verifiable from static capture) — it renders live as an auto‑scrolling
> marquee.** Seven partner logos, **each in a white rounded pill**, cycle continuously under
> `supported BY` in this order: **OK Tech → MacPaw → Microsoft → ElevenLabs → Softr → Valae →
> Lovable → (repeat)**. Slow continuous horizontal drift; approximate a full loop at **~30–40s**
> (approximation — exact speed/direction not measured). Only `macpaw 1`'s hash is confirmed
> (`4f79c701…`); the other six brand names come from the live capture and are **not** individually
> mapped to the remaining `image N` hashes above.

## Interactions

Stats cluster and "supported BY" each have the standard entrance reveal in the snapshot
(`opacity` ~0.5–0.9, `transform:none`/`translateY`). See `40-interactions.md`.
