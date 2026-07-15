# Orchestration protocol — new-vcc-website

This file is the operating contract for building this repo with a **Fable-5 orchestrator + Opus-4.8 worker fleet**, using **native Claude Code features only** (subagents + git worktrees). Read it before delegating any work.

## Mission
Rebuild the Vibe Coding Collective website by studying the live site at <https://vibecoders.global/> and reverse-engineering it into clean, maintainable code. There is no source for the original (it was produced with a Figma no-code process). An earlier developer attempt lives at `vibe-coding-collective/website`. The detailed build brief comes from the operator; **this file governs _how_ the work is coordinated, not _what_ the site is.**

## Roles & models
- **Orchestrator = the main session (Fable 5, max effort).** You plan, decompose, delegate, review, and integrate. You do **not** write feature code directly — you coordinate workers and keep your context for the plan and the integration picture.
- **Workers = subagents (Opus 4.8, max effort)** defined in `.claude/agents/`: `builder`, `reviewer`, `tester`, `researcher`. `CLAUDE_CODE_SUBAGENT_MODEL` in `.claude/settings.json` forces **every** subagent to Opus 4.8, so even an ad-hoc/general-purpose spawn runs on Opus.

## Coordination rules (non-negotiable)
These exist to prevent the failure modes that break parallel agent work:

1. **Decompose by file ownership, not by feature.** Before any parallel work, split the task so **no two workers can touch the same file**. State each worker's owned paths explicitly in its task. *(Prevents file-clobber collisions.)*
2. **Contracts first, sequentially.** Shared interfaces, types, design tokens, and routes are defined and committed by **one** worker (or you) *before* dependent workers start. Workers build against the committed contract and never silently change it. *(Prevents intent drift.)*
3. **One worker = one git worktree = one branch.** The `builder` role sets `isolation: worktree`, so Claude Code gives each builder its own worktree automatically — edits are physically isolated and cannot collide. Never let a worker edit the main checkout. If a worker ever creates a worktree by hand, the convention is `git worktree add -b <task-slug> .claude/worktrees/<task-slug>` (that path is gitignored).
4. **Verify before merge.** A branch is not "done" until the `tester` gate is green (typecheck / build / lint / tests) **and** a `reviewer` has adversarially reviewed it. Trust real command output, never a worker's self-reported "done."
5. **Integrate through a single gate — you.** Pull worker branches into `main` one at a time, re-running the gate after each. Workers never merge to `main` directly. *(This is the PM / integration role.)*

## Workflow loop
1. **Plan** (you, in plan mode): read the brief, inspect the live site / spec, produce a task graph with explicit per-task file ownership and dependencies.
2. **Contracts** (one worker): commit shared interfaces / tokens / routes first.
3. **Fan out** (`builder` × N, ≤5 at a time): each builds its slice in its own worktree and pushes a branch.
4. **Verify** (`tester` + `reviewer` per branch): gate green, review clean.
5. **Integrate** (you): merge branches into `main` sequentially, re-verifying each.
6. **Repeat** for the next batch.

## Coordination checklist — watch for all of these, not just the big three
- **File collisions** → worktrees + disjoint ownership (rules 1 & 3).
- **Task races / duplicate work** → assign slices explicitly; never let two workers pick the same one.
- **Intent drift** → contracts-first (rule 2); reviewer checks adherence.
- **Orchestrator losing track** → treat git branches / PRs and the spec as ground truth, not worker claims.
- **False "done"** → the tester gate is mandatory (rule 4).
- **Wasted coordination overhead** → split by context boundary; if a task isn't cleanly separable, do it in one worker, not many.
- **Cost / runaway spawn** → keep concurrent workers small (3–5); reserve large fan-outs for genuinely parallel work.

## Team size
Start with **3–5 concurrent workers**. Returns diminish past ~5; the bottleneck becomes review/integration, not worker count.

## Roadmap (deliberately NOT in this basic setup)
This scaffold is the native **"basics"**: dispatch-and-collect, no live UI, no mid-flight intervention. The intended next phase adds live orchestrator↔worker steering, a board UI for observability, full PR-based adversarial review, worker-provisioned CI/deploy checks, and separate staging/prod environments — the territory of **Agent Teams** plus a kanban layer.
