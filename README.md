# new-vcc-website

Ground-up rebuild of the [Vibe Coding Collective](https://vibecoders.global/) website.

The live site was produced with a Figma no-code process, so there is no source code to work from. An earlier developer attempt lives at [`vibe-coding-collective/website`](https://github.com/vibe-coding-collective/website); this repo starts over from scratch by studying the live site as a user and reverse-engineering it into code.

## How this repo is built: a native Claude Code orchestration setup

This project doubles as a testbed for a "big-orchestrator / worker-fleet" workflow using **only native Claude Code features** — no third-party frameworks. One model plans and delegates; a fleet of workers executes in parallel, each isolated in its own git worktree.

| Role | Model | Where it runs |
|------|-------|---------------|
| **Orchestrator** — plans, decomposes, integrates | **Fable 5** | the main Claude Code session you talk to |
| **Workers** — build, review, test, research | **Opus 4.8** | subagents defined in `.claude/agents/` |

Both run at **max effort**.

### Operator quickstart
1. Open this repo in Claude Code (desktop app or CLI).
2. Confirm the session model is **Fable 5** — `.claude/settings.json` sets it as the default; otherwise pick it in the model selector (or `/model fable`).
3. Set effort to max: `/effort max`.
4. Workers are pinned to **Opus 4.8** via `CLAUDE_CODE_SUBAGENT_MODEL` in `.claude/settings.json`, so every subagent the orchestrator spawns runs on Opus — including the built-in general-purpose one. (This avoids the common gotcha where "use a subagent" silently inherits the caller's model.)
5. Give the orchestrator your build brief. It plans, partitions the work into non-overlapping file ownership, and delegates to the worker roles below.

The full protocol the models follow lives in **[CLAUDE.md](./CLAUDE.md)**.

## Worker roles (`.claude/agents/`)
- **builder** — implements one scoped slice in an isolated worktree; owns only its files; writes tests; pushes a branch.
- **reviewer** — adversarial review of a branch before merge (correctness, scope, contract drift, tests).
- **tester** — runs the verification gate (typecheck / build / lint / tests) and reports real results.
- **researcher** — studies the live site and produces the implementation spec under `docs/spec/`.

## Status
**The clone is built.** All eleven sections (`src/sections/01-nav-sticky.html` → `11-footer.html`) are implemented against the specs in [`docs/spec/`](./docs/spec/) using the real recovered assets, and the full gate — `npm run verify` (typecheck · lint · tests · build) — is green. Deliberate departures from the original are logged in [DEVIATIONS.md](./docs/DEVIATIONS.md).

Not yet deployed to a host.

## License
MIT — see [LICENSE](./LICENSE).
