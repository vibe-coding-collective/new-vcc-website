# Deviations — Section 03 (Stats + "supported BY")

Owner: builder(03-stats). The integrator consolidates these into `docs/DEVIATIONS.md`.
Legend: **[arch]** structural · **[content]** copy/data · **[a11y]** accessibility ·
**[perf]** payload/assets · **[approx]** unverifiable-so-approximated.

## Sponsor logos → REAL recovered logos (the "supported BY" strip) — RESOLVED

- **[perf/content] RESOLVED: each pill now holds the sponsor's REAL recovered logo PNG.**
  Supersedes the earlier text-pill fallback (kept only while the artwork was unrecovered).
  The 7 logos were mined from the Figma page-data — see `docs/spec/31-recovered-assets.md`
  **Group 2**. The brand→hash mapping was **visually confirmed by the orchestrator**
  (2026-07-16 labeled contact sheet), so all 7 filenames are final. Files in DOM/cycle
  order (byte sizes HEAD-verified against Group 2, intrinsic dims read from the PNGs):
  - **OK Tech** — `logo-ok-tech.png` (404×160, 10 764 B)
  - **MacPaw** — `logo-macpaw.png` (600×240, 11 227 B) — the one name-certain node (`macpaw 1`).
  - **Microsoft** — `logo-microsoft.png` (402×160, 7 908 B)
  - **ElevenLabs** — `logo-elevenlabs.png` (498×160, 7 216 B)
  - **Softr** — `logo-softr.png` (366×160, 6 647 B)
  - **Valae** — `logo-valae.png` (256×120, 4 548 B)
  - **Lovable** — `logo-lovable.png` (400×160, 8 499 B)
- **[a11y] Accessible name moved from text → `alt`.** The VISIBLE track's `<img>` carries
  the brand name as its `alt`; the aria-hidden duplicate track (`aria-hidden="true"`) uses
  `alt=""`, so each logo is announced **exactly once** (no double-announce). The
  `role="list"` + `<li>` structure and both tracks are otherwise unchanged.
- **[approx] Display height normalized to 32px** (`.s-stats__sponsor-logo { height: 32px;
  width: auto }`). The scans have differing intrinsic heights (120 / 160 / 240px); a fixed
  display height keeps the pill row visually even while `width: auto` preserves each aspect
  ratio. Pill style unchanged from the live observation: `--off-white` bg, 32px radius,
  80px tall, min-width 180px, logo centered. No hard shadow (not observed).
- **[perf] `public/assets/stats/` now ships the 7 PNGs** (4.5–11 KB each, ~56.8 KB total).
  No lossless PNG optimizer was available in the build environment (oxipng / optipng /
  pngcrush / zopflipng / pngquant all absent) and adding one is out of this task's file
  scope, so the PNGs ship **byte-identical to the orchestrator-confirmed source** — they are
  already tiny. A lossless re-compression pass is a trivial later opportunity.
- **[legal] Licensing / provenance.** All 7 are third-party company trademarks. They are the
  **same sponsor logos the original vibecoders.global displays**, recovered from its own
  `/_assets/v11/` host, so shipping them **reproduces the original's usage** rather than
  introducing new marks; the orchestrator confirmed the mapping. Use remains subject to each
  owner's brand guidelines — if a mark must be pulled, revert that pill to the prior text-pill
  treatment (preserved in git history).

## Marquee (spec §40.5 / contract §9)

- **[approx] Pure-CSS `@keyframes s-stats-marquee`, 36s, linear, infinite.** 36s is the
  mid-point of the observed **~30–40s** loop (exact speed/direction unmeasured). Seamless
  loop via a single track holding **two identical groups**; `translateX(0 → -50%)` shifts
  by exactly one group. Each group carries a trailing `padding-inline-end` so seam spacing
  equals internal spacing. Direction: right-to-left (content drifts left).
- **[a11y] `prefers-reduced-motion: reduce` fallback (contract requirement):** animation
  disabled; a single static group is shown wrapped + centered; the duplicate group
  (`aria-hidden="true"`) is `display:none` so nothing is doubled for AT or layout.
- **[approx] Pause-on-hover** added in pure CSS (`animation-play-state: paused`), matching
  the original marquee system's documented `pause-on-hover`. Optional, no JS.
- **[arch] Marquee is inset within the page wrapper's gutter (`main#app`), not full-bleed.**
  Simpler; the original's exact bleed was not measured. (Reworded at the gate — the section
  no longer carries its own gutter post-amendment.)
- **[perf] Marquee hardening (polish pass 2026-07-16).** (1) The 14 marquee `<img>`s switched
  from `loading="lazy"` to `loading="eager"`: they are tiny (4.5–11 KB, ~57 KB total) and the
  track animates from first paint, so lazy-loading risked a first-loop pop-in as off-screen
  logos decoded mid-scroll — eager load removes that risk. (2) Added `max-width: 200px` +
  `object-fit: contain` to `.s-stats__sponsor-logo` as a guard so a future extreme-aspect logo
  can't stretch its pill (and the track) unboundedly wide; `object-fit` keeps the aspect ratio
  (letterboxes rather than distorts) if the cap is ever hit. No effect on the current logos,
  which render ≤~100 px wide at the fixed 32 px display height.

## Structure / a11y

- **[a11y] Heading hierarchy:** `<h2>` = "4,000+ members are ALREADY HERE" (two stacked
  spans: `.t-hero` green count + `.t-band-title` lead); `<h3>` = "supported BY" (labels the
  sponsor list). The original emits everything as `<p>`.
- **[arch] Dropped the no-op `<span>` around "anyone"** in the descriptive paragraph. The
  capture wraps it in a span with the same color/weight as the rest (not emphasized), so the
  wrapper carries no meaning; the rendered text is byte-identical.
- **[arch] Stat pair is plain `<div>`/`<p>`, not a `<dl>`.** A description-list's dt/dd
  order fights the number-over-label visual; plain elements read correctly to AT
  ("9 Countries 🇬🇧…🇵🇰  100% Word of mouth").

## Type / layout

- **[arch] Single semantic DOM; only the `< 800px` block scales type down** (desktop and
  tablet type are identical in the capture). Mobile values transcribed from the site's own
  mobile CSS: 4,000+ 80→40 (ls .8), lead 52→28 (ls .56), desc 24→18, 9/100% 60→32 (ls .64),
  Countries/Word of mouth/flags/supported BY 32→20 (ls .4).
- **[approx] Paragraph `line-height: 0` (a Figma quirk) not reproduced** — uses the shared
  `.t-body-lg` (lh 1.5) so the sentence wraps sanely on narrow screens.
- **[arch] Page gutter / max-width / inter-section 80px gap are NOT self-carried** — they
  are owned by `main#app` (base.css) per the ratified contract amendment. This section
  keeps only internal spacing: `padding-block: 24px 80px` (asymmetric per spec) and the
  80px gap between the stats cluster and the "supported BY" strip.

## Preserved as canon (NOT deviations — do not "fix")

- **"9" Countries with 8 flags** (🇬🇧🇩🇪🇺🇸🇯🇵🇺🇦🇵🇹🇳🇱🇵🇰), "Seven countries" in the
  paragraph, and the trailing space in `4,000+ ` are reproduced verbatim per spec §7.
