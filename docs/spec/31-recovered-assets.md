# 31 — Recovered Assets (runtime-injected imagery)

Recovery of the imagery that the **static HTML capture lacks** (the placeholders logged in
`docs/deviations/{02-hero-header,03-stats,06-for-city-leaders,11-footer}.md`). Every hash below is
mined from the Figma Sites **page-data JSON**, cross-referenced to the DOM structure in the section
specs, and **HEAD-verified live** (status / content-type / byte size) on 2026‑07‑16.

- **Source JSON:** `https://vibecoders.global/_json/e8b7663c-e6ea-4195-9e28-fee26262baf4/_index.json`
  (4.17 MB; `nodeById` = 2821 nodes, `assets` = 163 entries, `stablePathToAssetInfo` = 411 entries).
- **Asset URL pattern:** `https://vibecoders.global/_assets/v11/<40-hex>.<ext>`. Responsive variants
  via `?w=<N>`/`?h=<N>` (see `30-assets.md`).
- **Attribution audit trail:** `docs/spec/_capture/31-recovered-assets-attribution.json` (20 KB trim of
  the 4.17 MB page-data — maps every hash below to its Figma `assets` entry + referencing node id/name/ancestry).
- **Intrinsic dimensions** are the Figma-declared source size (`assets[hash].size` / fill
  `originalImageWidth×Height`); the served file may offer larger raster via `?w=`.
- **No binaries were downloaded.** PNG bodies were never fetched (HEAD only); a handful of **SVGs were
  read as text** (they are text) to confirm blob color/eyes — noted inline.

> **Headline result.** Groups 1 (hero) and 2 (sponsors) are **genuinely runtime-injected** and are now
> fully recovered (16 assets, all absent from the static capture). Groups 3 (footer mascots) and 4
> (avatar treatment) turned out to be **already present in the static capture** — the footer "mascot
> row" is the colorful footer **wordmark** (already inventoried), and the avatar mask/frame hashes were
> already in `30-assets.md`. For those two groups this file supplies the missing **attribution** (which
> hash is which), not new URLs. See the per-group notes and the summary table at the end.

---

## Group 1 — Hero (§02) · slug `hero-header` · ALL runtime-only, recovered

The canonical hero is `Main content section > Main heading` (Figma row `14:492`, breakpoint node
`2:2763`/Desktop). The three chips + the googly `Icon` are interleaved **between the four headline
words** exactly as observed; the collage is the 862×350 frame `84:7242` directly below. All 9 hashes
are **absent from the static HTML** (confirmed) — these are the runtime injections.

### 1a. Headline photo chips (3) — PNG, rendered 96×96, intrinsic 288×288

Identical across all breakpoints (verified in all 6 headline rows). Each chip is a single
`RECTANGLE` with an IMAGE fill — one PNG per chip (any colored rounded-square background is either
baked into the PNG or applied by the runtime; **confirm on view** — PNG body not fetched).

| Element (position in headline) | Observed bg¹ | URL (`/_assets/v11/…`) | HEAD | Bytes | Type | Intrinsic | Suggested path | Attribution (JSON) |
|---|---|---|---|---|---|---|---|---|
| Chip after `communities` | yellow | `5a562b3b849d4ac058cf94ecbb4ccd72c2b22cc0.png` | 200 | 113 692 | image/png | 288×288 | `public/assets/hero-header/hero-chip-1.png` | `RECTANGLE` name `h1_photo2 2` (`78:304`), idx 1 in row `14:492`, `fills[].imageRef` |
| Chip before `TECH-LITE` | green | `a60fb94841952ed196647c3674aab30f088c04ce.png` | 200 | 102 321 | image/png | 288×288 | `public/assets/hero-header/hero-chip-2.png` | `RECTANGLE` name `h1_photo4 1` (`78:330`), idx 3 |
| Chip after `BUILDERS` | teal | `8eb6191f8de2f90ec18753c99c5ba19ffc762aa2.png` | 200 | 108 141 | image/png | 288×288 | `public/assets/hero-header/hero-chip-3.png` | `RECTANGLE` name `h1_photo5 1` (`78:317`), idx 7 |

¹ Background colors are from the orchestrator's live observation (`deviations/02-hero-header.md`); the
chip-position order (which photo sits where) is **definite** from the JSON node order.

### 1b. Orange googly-eyes blob (`Icon`) — SVG

Instance of the shared blob component `2:88` ("Icon"), sitting **after `TECH-LITE`**. Fetched as text:
the SVG is a complete googly mascot — `Body` path `fill="var(--fill-0, #EC6C23)"` (**brand orange**)
plus `Eye left`/`Eye right` groups (white `#F6F5F2` sclera, dark `#181814` pupils). One recolorable
shape at three sizes; **desktop is canonical**. (The `--fill-0` CSS var means the same file can be
re-tinted, but as a plain `<img>` it renders orange.)

| Breakpoint | URL | HEAD | Bytes | Type | Intrinsic (viewBox) | Suggested path | Attribution |
|---|---|---|---|---|---|---|---|
| Desktop (canonical) | `f991abb570b9d8df72c1e09a4e57963894663628.svg` | 200 | 1 442 | image/svg+xml | 89.6×75.85 | `public/assets/hero-header/hero-googly-blob.svg` | Icon `14:524` → `stablePathToAssetInfo["I14:524;479:506"]` |
| Tablet | `c6fb4b8c949728c9f09dc81d9de08402eaa79f6d.svg` | 200 | 1 434 | image/svg+xml | 56×47.4 | `public/assets/hero-header/hero-googly-blob-tablet.svg` | Icon `83:1148` |
| Mobile | `66823e03c2c0eeaa51a2574025cc7d4b91be1873.svg` | 200 | 1 434 | image/svg+xml | 56×47.4 | `public/assets/hero-header/hero-googly-blob-mobile.svg` | Icon `56:2098` |

> All three are the **same orange blob shape** (aspect ≈ 1.18); tablet/mobile are just smaller
> exports. A clone can ship the desktop SVG only and scale it. (Two further identical-shape variants —
> `17d603650f…` desktop, `935c744b…` tablet/mobile — belong to a **duplicate** hero copy nested under
> a trailing `Event container` subtree, not the rendered page hero; ignore them.)

### 1c. 862×350 photo collage — 3 PNGs (photos only)

Frame `84:7242` ("Container", 862×350) contains three photo-fill rectangles with no mask or
colored-blob child NODES. **CORRECTION (2026-07-16, confirmed on download by builder 02 and its
reviewer):** this section's original "runtime CSS composite" conclusion was a HEAD-request-only
inference and is WRONG — the served PNG bodies BAKE IN the colored blob/tile + flower mask + cream
outline on transparency. The assets are self-contained composites; no CSS masking is needed (and
applying it would double the blobs). Same applies to the §1a chips. Left→right stacking order is
`members1, members2, members3`.

| Element | URL | HEAD | Bytes | Type | Intrinsic | Suggested path | Attribution |
|---|---|---|---|---|---|---|---|
| Collage photo 1 | `d6369c47dedead1915b65c8b0adbb4de5ae97729.png` | 200 | 1 756 626 | image/png | 1894×1938 | `public/assets/hero-header/hero-collage-1.png` | `RECTANGLE` `members1 1` (`84:7245`) |
| Collage photo 2 | `de323857ad977125c4dae433c37bbfaa6e05ed31.png` | 200 | 1 689 041 | image/png | 1894×1894 | `public/assets/hero-header/hero-collage-2.png` | `RECTANGLE` `members2 1` (`84:7243`) |
| Collage photo 3 | `8badb11d697555e42060d6b20370b2b9a2baa855.png` | 200 | 2 392 566 | image/png | 1894×1938 | `public/assets/hero-header/hero-collage-3.png` | `RECTANGLE` `members3 1` (`84:7244`) |

> **GAP (runtime composite):** the collage flower/cloud **masks** and the **teal/yellow/red rounded-blob
> backgrounds** are not present as assets in the JSON (the frame holds only the 3 photos). They are
> generated at runtime the same way team avatars are (mask-image + colored layer). Recovering the exact
> mask shapes for the collage is **not possible from the page data**; reuse the avatar blob masks (§4)
> or the placeholder blobs already built. These PNGs are large (1.7–2.4 MB) — downscale/convert to WebP
> when adopting.

---

## Group 2 — Sponsor wordmarks (§03) · slug `stats` · ALL runtime-only, recovered

All 7 logos live in the marquee container `84:7264` ("Container"). Each is a `RECTANGLE` with an IMAGE
fill; all 7 hashes are **absent from the static HTML**. The **source (DOM) order is definite**; node
names are generic (`image N`) except `macpaw 1`.

**Definite DOM order** (index → node → hash):
`0 image 9` · `1 image 118` · `2 image 119` · `3 macpaw 1` · `4 image 120` · `5 image 121` · `6 image 123`.

**Brand attribution.** Only **MacPaw** is certain (node name). The other six brand names come from the
orchestrator's live marquee reading (cycle order **OK Tech → MacPaw → Microsoft → ElevenLabs → Softr →
Valae → Lovable**, `03-stats.md`). Aligning that cycle to the DOM order **on the one known anchor
(MacPaw = idx 3)** yields the mapping below. This is an **inference**, not visually verified (PNG
bodies not downloaded); it assumes the marquee lays children out in DOM order and the observer read
them left→right through one full cycle. One corroboration: `image 121` (widest asset, 498×160) maps to
**ElevenLabs**, whose long wordmark fits the widest canvas.

| Inferred brand | Certainty | URL (`/_assets/v11/…`) | HEAD | Bytes | Type | Intrinsic | Suggested path | Attribution (JSON node) |
|---|---|---|---|---|---|---|---|---|
| **MacPaw** | **definite** | `4f79c701f27104707bdbfaafd0642c59f158ff3e.png` | 200 | 11 227 | image/png | 600×240 | `public/assets/stats/logo-macpaw.png` | `macpaw 1` (idx 3) |
| OK Tech | inferred | `6b3d80b37f4380613a091362ed7f2960d0a23dff.png` | 200 | 10 764 | image/png | 404×160 | `public/assets/stats/logo-ok-tech.png` | `image 119` (idx 2) |
| Microsoft | inferred | `1c3e99651b18b91cef5b82aae350937593ce6574.png` | 200 | 7 908 | image/png | 402×160 | `public/assets/stats/logo-microsoft.png` | `image 120` (idx 4) |
| ElevenLabs | inferred | `5e973f77aa7840ba2e45e3022b81ae09b4b35c41.png` | 200 | 7 216 | image/png | 498×160 | `public/assets/stats/logo-elevenlabs.png` | `image 121` (idx 5) |
| Softr | inferred | `8e452d45246a391069309df65da2fde56013812f.png` | 200 | 6 647 | image/png | 366×160 | `public/assets/stats/logo-softr.png` | `image 123` (idx 6) |
| Valae | inferred | `5c67840b122b8508c56e83e052d3cc0938a886ca.png` | 200 | 4 548 | image/png | 256×120 | `public/assets/stats/logo-valae.png` | `image 9` (idx 0) |
| Lovable | inferred | `d3ef03203f68628ad429dd38be6066d4dbd34f6c.png` | 200 | 8 499 | image/png | 400×160 | `public/assets/stats/logo-lovable.png` | `image 118` (idx 1) |

> **⚠ Licensing — third-party trademarks.** All 7 are external company logos. Only use them with the
> respective owners' permission / brand-guideline compliance. If unlicensed, keep the section-03
> **text-pill** fallback (already built). These are the same sponsor logos the original site displays;
> shipping them reproduces the original's usage.
>
> **✓ VISUAL CONFIRMATION (orchestrator, 2026-07-16):** all 7 hashes downloaded and inspected on a
> labeled contact sheet — every inferred brand→hash mapping above is CORRECT (Valae ✓, Lovable ✓,
> OKTech ✓, MacPaw ✓, Microsoft ✓, ElevenLabs ✓, Softr ✓). The table's filenames are final.

---

## Group 3 — Footer mascots (§11) · slug `footer` · ALREADY in the static capture

**Finding: there is no separate runtime-injected mascot row.** The "row of six googly-eyed blob
mascots" from the live observation **is the colorful footer wordmark** (`fotter`, node `12:253`), which
is already inventoried in `30-assets.md` as `logo-footer-wordmark.svg`. On Desktop it is flattened into
one SVG; on Mobile/Tablet the same wordmark is left **un-flattened** into individual googly-blob
vectors, which is how the blobs became visible. No footer variant (all 6 checked), and `animateRootIds`
(empty), contains any additional mascot node.

Read as text, the flattened wordmark (`34e7cef0…`) contains **exactly 5 googly blobs** — one each of:

| Blob color | Hex (`Body` fill) | Individual body SVG² (Mobile/Tablet, un-flattened) | HEAD | Bytes | Figma node |
|---|---|---|---|---|---|
| red | `#EB3722` | `8ee7b15c6406bbd0773700046d2992c1cb02ea4c.svg` | 200 | 776 | `Vector 89` |
| yellow | `#FFD226` | `96b9ee3d0bb3a2c6d48426d2b640bfcb18d2857e.svg` | 200 | 635 | `Vector 96` (`56:2559`) |
| green (lime) | `#91BD3C` | `a7658f4bae9384f3900da4f59548a4d06fe0717a.svg` | 200 | 638 | `Vector 94` (`56:2534`) |
| teal | `#1CA9B0` | `0e4f3ba2a51ee3d5b83000bb28a8d42dcb7de93e.svg` | 200 | 634 | `Vector 96` (`56:2568`) |
| blue | `#0056A1` | `b96a14534612d6058dcd7c019f39393032cf2fc3.svg` | 200 | 784 | `Vector 89` |

**Recommended asset — the whole cluster in one file** (already in the repo):

| Element | URL | HEAD | Bytes | Type | Intrinsic | Suggested path |
|---|---|---|---|---|---|---|
| Colorful mascot/wordmark (all 5 blobs) | `34e7cef03b76dea60414a4e330b3d08f8d43e2af.svg` | 200 | 6 628 | image/svg+xml | 708×202 | `public/assets/footer/logo-footer-wordmark.svg` *(already present)* |

² The individual body SVGs above are **body-only** (each blob's two eyes are separate tiny `Vector 37/41/38/42`
nodes). Extracting per-blob mascots is possible but fiddly; the single flattened `34e7cef0…` is the
practical asset and already ships.

> **Discrepancy to flag (not an error to "fix"):** the live observation reported **six** mascots incl.
> **orange**; the JSON wordmark has **five** (red/yellow/green/teal/blue — **no orange**), and there is
> no separate bottom-edge row in the data. The most likely reality is that the observer counted the
> wordmark's blobs and over-counted / mis-attributed an orange (the hero blob is orange). **Action for
> builders:** the six placeholder blobs in `s-footer` can be reduced to these five real colors, or the
> whole cluster replaced by the real `logo-footer-wordmark.svg`. If a true 6th/orange blob is later
> confirmed live, it is **not** derivable from this page data.

---

## Group 4 — Avatar treatment (§06) · slug `for-city-leaders` · ALREADY in the static capture

The full blob-avatar composite that section 06 simplified away. Each card = **decorative frame outline
(SVG)** + **`Mask group`** { `isMask` node carrying the **blob mask** + the photo } + a **tint rect**.
Confirmed on card `Group 12` (`199:1145`): `Union` frame `54ee46ec…` → `Mask group` → `Rectangle 9`
(`isMask`, `mask-mode:alpha`, mask hash + photo `imageRef`) + `image 7` (solid-fill tint). **All
mask/frame hashes are already in the static HTML** (in `30-assets.md`); the value here is the
**role/verified inventory**, since the previous inventory grouped them loosely.

### 4a. Blob mask shapes — 8 distinct (the `mask-image` cut-outs; **reused**, not per-person)

| Role (usage) | URL (`/_assets/v11/…`) | HEAD | Bytes | Type | Intrinsic | Breakpoints |
|---|---|---|---|---|---|---|
| Common regular-member mask (×19) | `e54b773c654e901a476251f8dee607a350253ef5.svg` | 200 | 840 | svg | 128.8² | D·T·M |
| Mask (PNG, ×11) | `3e9082a3bec76117a60ed087768ef4e329865da1.png` | 200 | 112 066 | png | 128.8² | D·T·M |
| Founder mask (×5) | `5af4bfba75e7e7192f379e5ef04869392ecaf3fe.svg` | 200 | 840 | svg | 128.8² | D·T·M |
| Mask (×2) | `a23e76da4c565fc192bb02ec64558b3bdd825909.svg` | 200 | 842 | svg | 117.9² | D·T |
| Mobile mask (×5) | `a912d2aac01286b942ab337bd9e1595ec7dc384d.svg` | 200 | 838 | svg | 77.3² | M |
| Mobile mask | `9fca8ea511ee349466b485011cab77017b329b77.svg` | 200 | 838 | svg | 77.3² | M |
| Mobile mask | `03709987aa34d78db18394d298ea9e598b3bb1b8.svg` | 200 | 835 | svg | 70.8² | M |
| Mobile mask (PNG) | `3cb9dac8fbd4c341f933f067c6d3e79dc183332f.png` | 200 | 45 391 | png | 77.3² | M |

Suggested paths: `public/assets/for-city-leaders/avatar-mask-{common,png-1,founder,alt,m1,m2,m3,m-png}.{svg,png}`.

### 4b. Decorative frame outlines — 17 distinct hand-drawn squiggles (one per card)

Two size classes: **10 at ≈200×198.88** (larger cards) and **7 at ≈120×119.33** (smaller cards). All
`SVG` nodes named `Union` or `Group N`, all present in `assets`/static HTML, all HEAD 200. A precise
frame→person map is **not cleanly determinable** (multiple cards reuse `54ee46ec…`; the `Group N`
squiggles vary per card) — consistent with `30-assets.md` / `06-for-city-leaders.md`. Full hash list:

- **≈200×198.88 (10):** `54ee46ec3d526893d265a6557144564dbc88e156` (`Union`, most-reused ×13, 1059 B) ·
  `f73502cadea2f4886912b551fe26ecd1cc739d2c` (`Group 9`, 1081) ·
  `c0c7bb72016953feeda21dca4f3f87ca6253e726` (`Group 18`, 1082) ·
  `afba83f1d3fe8aa9efb1fbc9d6252288de50713e` (`Group 15`, 1080) ·
  `d23a14bd216dcd705790b1a01f3bc95c23655ea9` (`Group 12`, 1081) ·
  `726114d6f1d7aa1972f996893c32124eef10575d` (`Group 16`, 1079) ·
  `a9b92873d9f088d0baf366e40a801b0fba80ae38` (`Group 10`, 1082) ·
  `5f0b8f569831660a8c5611362e6d58703cd1d4c0` (`Group 13`, 1081) ·
  `96a1a79bd53b45e1670e63a7f439a384f2ac911f` (`Group 20`, 1082) ·
  `3e09fbda2e85ec4f2a683f37499f5316a04ec581` (`Group 17`, 1082).
- **≈120×119.33 (7):** `dc6bab2b57808ae44afac1c454f6a3e6a8387b05` (`Union`, 1050 B) ·
  `8b0196c40fd97775b847f1064e1257e4eed0526d` (1073) · `c7020163ce327c41e1e25fbdc14a69e99ba0738c` (1065) ·
  `0aea003e678ab2c5aadbd152cf19ac91577adf27` (1068) · `9366d161e249315ec2825ae8b96c13f5f4faeb34` (1072) ·
  `15bb9d12f6ff19db058c7a553963aeafcbc38531` (1073) · `77fd29d00807af1f057cb9a7e02e0330ab063392` (1073).

All `.svg`; suggested paths `public/assets/for-city-leaders/avatar-frame-NN.svg`.

### 4c. Tint layer — no asset (spec only)

The tint is a **solid-color `RECTANGLE`** (e.g. `image 7`, `199:1150`) laid over the masked photo,
clipped to the same blob, with **`mix-blend-mode: color`** applied by the runtime CSS. Confirmed a
plain solid fill in the Figma data (e.g. white for the Luisa/Poppy card); the blend recipe lives in the
capture CSS (`06-for-city-leaders.md` §6.3 lists the palette `#d9d9d9` / `#fff` / `#ec6c23`). **There
is no tint asset to download** — reproduce with CSS.

---

## Summary — found / not-found per group

| Group | Assets recovered | Truly runtime-only (new) | Already in static capture | HEAD 200 | Remaining gap |
|---|---|---|---|---|---|
| 1 · Hero | **9** (3 chips + 3 googly + 3 collage photos) | 9 / 9 | 0 | 9/9 | Collage flower/cloud **masks** + teal/yellow/red **blob backgrounds** = runtime composite, no asset (reuse avatar masks) |
| 2 · Sponsors | **7** logos | 7 / 7 | 0 | 7/7 | Brand↔hash for the 6 non-MacPaw is **inferred**, not visually verified; **licensing** on all 7 |
| 3 · Footer mascots | **6** (1 flattened wordmark + 5 body SVGs) | 0 | 6 / 6 | 6/6 | Wordmark = 5 blobs (no orange); the observed "6th/orange" not in page data |
| 4 · Avatars | **25** (8 masks + 17 frames) | 0 | 25 / 25 | 25/25 | Precise frame→person map not determinable; tint is CSS-only (no asset) |
| **Total** | **47** unique (49 incl. 2 hero event-variant googly) | **16** | **31** | **49/49** | — |

**Net for builders:** swap the §02 hero placeholders (9 real assets) and the §03 text pills (7 real
logos, licensing permitting) — these are the genuine recoveries. §11 mascots and §06 avatar
mask/frame/tint were already available; this file pins their **attribution** so the blob treatments can
be rebuilt faithfully.

### What I searched but could not find (explicit gaps)
- **Hero collage masks/blob backgrounds** — searched frame `84:7242` and its parents/siblings: only 3
  plain photo rectangles, no mask/`isMask`/colored-blob nodes. Runtime-generated; not in page data.
- **A separate footer mascot row / an orange footer blob** — searched all 6 `Footer` subtrees, all
  `Icon`(`2:88`) instances, `animateRootIds` (empty), and every blob-shaped SVG's fill color: the only
  footer blob element is the 5-color wordmark. No orange, no separate row exists in the JSON.
- **Per-brand sponsor identity beyond MacPaw** — node names are generic `image N`, `ariaAttributes`
  empty; identity is inference from the live marquee order only.
- **Photo→person / frame→person exactness for avatars** — multiple cards share masks and the common
  `Union` frame; not reliably separable from the data (matches the pre-existing UNKNOWN in
  `06-for-city-leaders.md`).
