# Deviations — Section 03 (Stats + "supported BY")

Owner: builder(03-stats). The integrator consolidates these into `docs/DEVIATIONS.md`.
Legend: **[arch]** structural · **[content]** copy/data · **[a11y]** accessibility ·
**[perf]** payload/assets · **[approx]** unverifiable-so-approximated.

## Sponsor logos → accessible text pills (the "supported BY" strip)

- **[perf/content] Each sponsor renders as an accessible white brand-name pill, not
  logo artwork.** The 7 logos are runtime-injected on the original and only **MacPaw**
  is hash-confirmed in `30-assets.md`; the other six brand→hash mappings are unknown, and
  third-party trademarks are not fabricated (contract instruction). Per the contract's
  fallback path, each pill shows the brand name as styled text. Per-brand gap log (all 7
  need real artwork sourced later, in this cycle order):
  - **OK Tech** — no confirmed asset hash. Text pill.
  - **MacPaw** — hash confirmed (`4f79c701…`) but not downloaded; kept as a text pill so
    the strip is visually consistent (1 real logo among 6 text pills would look broken).
  - **Microsoft** — no confirmed asset hash. Text pill.
  - **ElevenLabs** — no confirmed asset hash. Text pill.
  - **Softr** — no confirmed asset hash. Text pill.
  - **Valae** — no confirmed asset hash. Text pill.
  - **Lovable** — no confirmed asset hash. Text pill.
- **[perf] `public/assets/stats/` ships empty** (no binaries) as a result of the text-pill
  fallback. When brand→hash mappings are confirmed, drop optimized logos here and swap the
  pill contents for `<img>`.
- Pill style is an approximation of the "white rounded pill" live observation:
  `--off-white` background, 32px radius, 80px tall, min-width 180px, Golos 900 20px ink
  label (brand casing preserved). No hard shadow (not observed).

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
- **[arch] Marquee is inset within the section's 24px gutters, not full-bleed.** Simpler;
  the original's exact bleed was not measured.

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
