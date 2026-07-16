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
  ("10 Countries  100% Word of mouth" — the flag row is `aria-hidden="true"`, so AT never
  announces it; it is decoration only).

## Type / layout

- **[arch] Single semantic DOM; only the `< 800px` block scales type down** (desktop and
  tablet type are identical in the capture). Mobile values transcribed from the ORIGINAL's own
  mobile CSS — the labels below are the ORIGINAL's rendered text, so the stat appears here as
  `9`, though ours now reads `10` (see Content corrections in `docs/DEVIATIONS.md`):
  4,000+ 80→40 (ls .8), lead 52→28 (ls .56), desc 24→18, 9/100% 60→32 (ls .64),
  Countries/Word of mouth/flags/supported BY 32→20 (ls .4).
- **[approx] Paragraph `line-height: 0` (a Figma quirk) not reproduced** — uses the shared
  `.t-body-lg` (lh 1.5) so the sentence wraps sanely on narrow screens.
- **[arch] Page gutter / max-width / inter-section 80px gap are NOT self-carried** — they
  are owned by `main#app` (base.css) per the ratified contract amendment. This section
  keeps only internal spacing: `padding-block: 24px 80px` (asymmetric per spec) and the
  80px gap between the stats cluster and the "supported BY" strip.

## Visual-parity pass (operator finding, 2026-07-16)

- **[arch] Removed the CSS pill — logos now render BARE at 80px (supersedes the earlier
  "32px logo in an off-white pill" treatment).** Operator finding: the original renders each
  sponsor as a **bare `<img>` at 80px height directly on the cream background** — the off-white
  rounded pill is **baked into the recovered PNG**, not a separate element. The prior build
  doubled it (a CSS pill *plus* the baked pill) and shrank the logo to 32px inside. **Verified
  live** (DOM query at 1366): every sponsor image is `height: 80px`, its parent has
  `background: transparent` and `padding: 0` (no pill element), and the widths follow intrinsic
  ratios **171–249px** (Valae 171 → ElevenLabs 249). Also verified our PNGs carry the baked
  off-white pill (viewed the decoded files). Fix: dropped `background`/`padding-inline`/
  `min-width`/`border-radius` from `.s-stats__sponsor` (now just a shrink-wrapping flex item)
  and set `.s-stats__sponsor-logo { height: 80px; width: auto }` (was 32px). The `max-width`
  guard was raised **200px → 300px** to clear the 80px-height logos (widest ~249px) while still
  capping a hypothetical extreme-aspect logo (`object-fit: contain` letterboxes if hit).
- **[unchanged] Marquee mechanics kept:** duplicate track, `translateX(-50%)` loop, 36s, pause-
  on-hover, `aria-hidden` duplicate with `alt=""`, eager loading, `role="list"` semantics, and
  the reduced-motion static-wrapped fallback. **Seam math re-verified with the new dimensions:**
  the 7 logos sum **1406px** (202+200+201+249+183+171+200), and one track copy = 1406 + 7×24px
  gaps = **1574px** — matching the live measurement and exceeding the 1400px viewport cap
  (1574 > 1400), so the two-copy loop stays seamless on every width. (Item gap is the existing
  24px; already correct.)

## Flag row raised to 10 (operator finding, 2026-07-16)

- **[content] The row now carries 10 flags, matching the `10` Countries stat.** Supersedes the
  earlier deliberate gap (8 flags against a stat of 10, held open pending the operator
  confirming the countries). The row reads 🇺🇸🏴󠁧󠁢󠁥󠁮󠁧󠁿🇳🇱🇵🇹🇮🇳🇺🇦🇯🇵🏴󠁧󠁢󠁳󠁣󠁴󠁿🇩🇪🇵🇰 — US, England,
  Netherlands, Portugal, India, Ukraine, Japan, Scotland, Germany, Pakistan. Against the
  original's 8 (🇬🇧🇩🇪🇺🇸🇯🇵🇺🇦🇵🇹🇳🇱🇵🇰): **7 kept** (US NL PT UA JP DE PK), 🇬🇧 (GB) **replaced by
  separate England + Scotland flags** — consistent with §04, which already puts the Scotland
  flag on Edinburgh — and **India added**. Net 8 − 1 + 3 = **10**.
- **[content] England / Scotland are TAG SEQUENCES**, not regional-indicator pairs: `U+1F3F4` +
  6 tag chars (`gbeng` / `gbsct`) + the `U+E007F` cancel tag. The tag chars are **invisible**,
  so the run looks like it carries stray characters — never retype it by hand and don't "tidy"
  it; edit by codepoint and re-check the grapheme count is 10. Platforms whose emoji font lacks
  these sequences (notably Windows / Segoe UI Emoji) draw **both** as the same plain black 🏴 —
  accepted; see the emoji-fallback bullet in `docs/DEVIATIONS.md`.
- **[arch] `text-wrap: balance` on `.s-stats__flags` — the 2-line wrap is INTENDED.** 10 flags
  no longer fit on one line at ANY breakpoint (1280: 288px column @ 32px; 375: 159.5px @ 20px;
  320: 132px @ 20px), so the row always wraps. Natural wrap strands flags (8+2 at 1280, 7+3 at
  375, 6+4 at 320); `balance` gives a tidy centered **5+5** at every width and re-balances if a
  platform's emoji font measures flags wider, which a hard-coded `max-width` would not.
  Browsers never break *inside* a flag (verified: all 10 graphemes stay intact) and there is no
  horizontal page overflow at any width, so **no `overflow-wrap` / `word-break` guard is needed
  — do not add one.** Pre-Chrome 114 / Safari 17.5 / Firefox 121 fall back to the natural wrap:
  uneven, not broken. `balance` also fixes a pre-existing blemish — the shipped 8-flag row
  already orphaned a flag on mobile (7+1 at 375, 6+2 at 320).

## Preserved as canon (NOT deviations — do not "fix")

- **The trailing space in `4,000+ `** is reproduced verbatim per spec §7.
- **Superseded:** the original's `"9" Countries` with 8 flags and its "Seven countries"
  paragraph were on this list while the repo was a pure fidelity exercise. The go-live content
  corrections (stat → `10`, paragraph → "Ten countries") and the 10-flag row above replaced
  them — see **Content corrections** in `docs/DEVIATIONS.md`.
- **On `docs/spec/**`:** its record of the original's 9-and-8 is the historical capture of the
  ORIGINAL site. **Do not "sync" those values to our markup** — they are supposed to disagree
  with us. But do not read that as "the spec never needs touching": it is not uniformly
  historical, and it is not self-consistent. Two lines there needed correcting alongside this
  change — `20-sections/03-stats.md` carried a bullet describing **this build** (it claimed the
  flag row still had 8 flags "pending confirmation"), and `00-overview.md` mis-stated the
  ORIGINAL's own flag count as 9 when the capture shows 8. Fixing the first is not syncing;
  fixing the second makes the historical record *more* faithful. Check before assuming.

## Fast-path fix (operator-approved, 2026-07-16)

- **[content] Mobile marquee logos 50px** (desktop stays 80px): the original's mobile
  variant renders the logo scans at 50px (builder-measured at true 375, CDP). Verified
  ours at 50px post-fix. NOTE: the first attempt landed the rule in the reduced-motion
  block by mistake — caught by the fast path's mandatory browser verification before
  merge; the rule now lives in the `<800` block where it belongs.
