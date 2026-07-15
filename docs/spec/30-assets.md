# 30 — Asset Inventory

**Base URL:** all paths below are relative to `https://vibecoders.global`.
Images live under `/_assets/v11/<40-hex>.<ext>`; fonts under `/_woff/v2/…`.
**Do not commit binaries** — this is an inventory only.

Responsive image variants are requested with query params: `?w=<N>` (width) or `?h=<N>`
(height), e.g. `…04fb16c4….png?w=256`. The `srcSet` widths below are the native/max sizes seen
in the HTML. 103 unique `/_assets` files are referenced in the static HTML; the most important
are itemised here, and the many small avatar/blob fragments are grouped.

## 1. Icons / meta

| Asset (`/_assets/v11/…`) | Format | Size | Use | Suggested filename |
|---|---|---|---|---|
| `f06a33a76f0c08b09214f5102862a79a0024e5ca.png` | PNG | favicon | `<link rel=icon>` | `favicon.png` |
| `29fc5075251b7ea59831a767214bc9a48715160e.png` | PNG | social card | `og:image` / `twitter:image` | `social-card.png` |

## 2. Logos

| Asset | Format | Displayed | Use | Suggested filename |
|---|---|---|---|---|
| `3b492e9c11829780dccd59affaefe4908037241c.svg` | SVG | — | **Nav logo, mobile (375)** | `logo-nav-mobile.svg` |
| `2e4c1b246a24953e795b570a482e061ce810d8a6.svg` | SVG | — | **Nav logo, tablet (800)** | `logo-nav-tablet.svg` |
| `8ea2bf38932813ccdcf1d22925d7ed334f25ca97.svg` | SVG | — | **Nav logo, desktop (1280)** | `logo-nav-desktop.svg` |
| `34e7cef03b76dea60414a4e330b3d08f8d43e2af.svg` | SVG | 708×202 | Footer watermark wordmark | `logo-footer-wordmark.svg` |
| `562debcb4a3ae6307669b96af0bfe1e8ffa3d39a.svg` | SVG | 100×93 | Footer logo mark | `logo-footer-mark.svg` |

## 3. Content photos (raster)

| Asset | Format | Displayed / native | Use | Suggested filename |
|---|---|---|---|---|
| `04fb16c4643b1aecea90df545c694694adfffca4.png` | PNG | 250×250 / 600w | Value card 1 "not only for TECH folks" | `value-tech-folks.png` |
| `fc766c55e144bd933ec0ba656230a0550d2a85a2.png` | PNG | 250×250 / 600w | Value card 2 "LOW BARRIER…" | `value-low-barrier.png` |
| `c1a03b9e7c869e7051099f2ddf05dc00cf0f98a3.png` | PNG | 250×250 / 600w | Value card 3 "LEARN FROM THE ROOM" | `value-learn-room.png` |
| `0a41f7b582848edb3d8f5a59698027f8995f76d1.png` | PNG | 200×200 / 1200w | Project "Immersive 3D" | `project-immersive-3d.png` |
| `84c1720b0a1c2429832f4466e29482df9fc46215.png` | PNG | 200×200 / 300w | Project "Motion Tracking" | `project-motion-tracking.png` |
| `aa5a516fe499c6d190243dc9a9e5cd421c746916.png` | PNG | 200×200 / 1200w | Project "Open Data Integration" | `project-open-data.png` |
| `c2395fbea2cd0e8eca188b0019c69e87fce516d0.png` | PNG | 200×200 / 1200w | Project "The Unexpected" | `project-unexpected.png` |
| `547a46b0dfe6a0bca6b9549c32a0783d6344f680.png` | PNG | full‑width, AR 2634/822 / 2634w | City‑leaders panoramic map | `city-leaders-map.png` |
| `7ccee39211d353e9dcd86461550118140b82b885.png` | PNG | 240×245 / 763w | Companies card "team-building" | `companies-team-building.png` |
| `c9655ebf623170cacf55920de14cefe3a44707c1.png` | PNG | 240×245 / 763w | Companies card "Custom sessions" | `companies-custom-sessions.png` |

## 4. Decorative SVGs (icons & flourishes)

| Asset | Use | Suggested filename |
|---|---|---|
| `7701da584c926e987f48dc442532fc28b5f2e4cf.svg` | Arrow icon on linked city rows (×4) | `icon-city-arrow.svg` |
| `eff5c9863d131ac4ddcf776414b0757a84dc68fa.svg` | How It Works step 1 icon | `step-1.svg` |
| `260725a02a5c94ee328e818303968da3f4f8510d.svg` | How It Works step 2 icon | `step-2.svg` |
| `3d0f6f5b723c0276df9f03ea49f4f2cd191026d8.svg` | How It Works step 3 icon | `step-3.svg` |
| `b803453e0abcb56b463d975c2de46612348e559b.svg` | Testimonial quote/rating flourish, 180×32 (×3, same) | `testimonial-flourish.svg` |
| `052c501797b3f7f6dc029a833f605a25e279dc23.svg` | Reviewer avatar — Tomoki, 100×100 | `reviewer-tomoki.svg` |
| `e9fd76ec2df65e2a96ec304f9e9b56a7b03c9486.svg` | Reviewer avatar — Heeezil, 100×100 | `reviewer-heeezil.svg` |
| `1f28de6c7a53f7f310e5b2353cb63926c7a5c7e5.svg` | Reviewer avatar — Christian, 100×100 | `reviewer-christian.svg` |
| `14c2673a765c25af90dd14c74544b1c7faa8b46c.svg` | Contact‑CTA illustration, 300×298 | `contact-illustration.svg` |

## 5. Team avatars (photos + blob masks + tints + frames)

The `WHO'S DOING THIS` avatars are composites (see `06-for-city-leaders.md` §6.3): a member
**photo** clipped by a blob `mask-image`, a `mix-blend-mode:color` tint over the same mask, and
a decorative SVG outline frame. Because the masked composites and the Figma person refs use
different hashes, a reliable photo→person map is **not determinable** from static files.

- **Blob mask / frame SVGs (reused across members):**
  `a912d2aac01286b942ab337bd9e1595ec7dc384d.svg` (×36),
  `e54b773c654e901a476251f8dee607a350253ef5.svg` (×48),
  `5af4bfba75e7e7192f379e5ef04869392ecaf3fe.svg` (×24),
  `9fca8ea511ee349466b485011cab77017b329b77.svg`, `03709987aa34d78db18394d298ea9e598b3bb1b8.svg`,
  `a23e76da4c565fc192bb02ec64558b3bdd825909.svg`, plus mask PNGs
  `3cb9dac8fbd4c341f933f067c6d3e79dc183332f.png`, `3e9082a3bec76117a60ed087768ef4e329865da1.png`.
- **Team member photos (PNG, in static HTML):**
  `663e9efc57322917f25b8e3267d7bb9d575393f6.png`, `0e94e89c62ac9f7753b3ade26a071e610254f9e5.png`,
  `e74107b57b550a1a6b221ce2991cfda19e4d80eb.png`, `81a4ea1e9e23f602a3add6a1cc3e2e513266d97b.png`,
  `0513060f5d4f5dcc4657ce31326d6e269582f690.png`, `d0bfed11749bc888506772cc707a623248657a50.png`,
  `401c134026bcc45807e269ab4bdf8664837a49be.png`, `5205b639ddeb71f7388f15ff3e1d0547c4c42d8e.png`,
  `b24c5722f9497bd96e7991eeddecbf6282ee750a.png`, `4fb4db65932a067cd94edb6584c48edad179acba.png`,
  `748d9db77fa3bd22b6ab1a93c255eb8f3f679183.png`, `daf8c55d0c0c15f78966ee41a738aeb2d515f9c8.png`.
- Small avatar‑outline SVGs (one per card, ×many): e.g. `f73502cadea2…svg`, `c0c7bb720169…svg`,
  `afba83f1d3fe…svg`, `d23a14bd216d…svg`, `726114d6f1d7…svg`, `54ee46ec3d52…svg`,
  `a9b92873d9f0…svg`, `5f0b8f569831…svg`, `96a1a79bd53b…svg`, `3e09fbda2e85…svg`. (Full list in
  `_capture/dom-1280.html`.)

> The complete 103‑file list is in `_capture/home-ssr.html` (grep `/_assets/v11/`). Anything not
> itemised above is a decorative avatar/blob fragment.

## 6. Runtime‑injected sponsor logos ("supported BY")

Empty in static HTML; from Figma page data (see `03-stats.md`). Inferred URLs
`/_assets/v11/<hash>.png`, ~50–80px tall:
`4f79c701f27104707bdbfaafd0642c59f158ff3e` (macpaw),
`5c67840b122b8508c56e83e052d3cc0938a886ca`, `d3ef03203f68628ad429dd38be6066d4dbd34f6c`,
`6b3d80b37f4380613a091362ed7f2960d0a23dff`, `1c3e99651b18b91cef5b82aae350937593ce6574`,
`5e973f77aa7840ba2e45e3022b81ae09b4b35c41`, `8e452d45246a391069309df65da2fde56013812f`.
**UNKNOWN whether these render live** — see `03-stats.md`.

## 7. Fonts (self‑hosted woff2)

Loaded via `@font-face` (full list in `_capture/font-faces.css`). Each family ships **6
unicode‑range subsets**: `english`, `latin-extended-a`, `latin-extended-b`,
`latin-extended-additional`, `rest-latin`, `rest`.

| Family dir (`/_woff/v2/…`) | Font | Weights / role |
|---|---|---|
| `GolosText_wght__1/GolosText_wght__1-<subset>.woff2` | **Golos Text** | 500 / 700 / 900 — all visible text |
| `Jost_wght__1/Jost_wght__1-<subset>.woff2` | **Jost** | 400 — loaded but not observed on visible nodes |
| `NotoSans-VF_3/NotoSans-VF_3-<subset>.woff2` | Noto Sans | fallback (regular/bold) |
| `NotoSansSymbols-VF_2/NotoSansSymbols-VF_2-<subset>.woff2` | Noto Sans Symbols | emoji/symbol fallback |
| `NotoSansMath-Regular_1/NotoSansMath-Regular_1-<subset>.woff2` | Noto Sans Math | math‑symbol fallback |

30 woff2 files total (5 families × 6 subsets). For a clone, **Golos Text** and **Jost** are both
on Google Fonts; Noto families are only needed to match emoji/symbol fallback exactly.
