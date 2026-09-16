# Continuing development with an AI agent

When someone asks _"what should I tell my agent to continue this project?"_, send them here.

A vague "continue the development" makes an agent invent scope. In this repository the most likely detours are
building a Markdown editor, which is out of scope and recorded in
[ADR 0004](architecture/0004-editor-out-of-scope.md), or making raw HTML "work" in a project whose product is
sanitization. A prompt that works fixes four things: **where to read**, **what to do**, **what not to touch**, and
**how to prove it works**.

## Recommended prompt

Copy this, replace the task placeholder, and paste it as the first message:

```text
You are continuing development of the MDHoriZon repository.

BEFORE WRITING ANY CODE, READ THESE FILES IN THIS ORDER:
1. AGENTS.md — the project's mandatory rules.
2. ROADMAP.md — the authoritative plan (phases, milestones, definition of done).
3. README.md — what the project is and how to run it.
4. docs/architecture/0001-test-runner-and-test-layout.md — where each kind of test lives.
5. tests/fixtures/Golden-Test-Document.md — the rendering contract.

TASK FOR THIS ITERATION
Work ONLY on: <PHASE AND TASK — e.g. "Phase 1, Markdown Rendering Core: the reusable MarkdownRenderer
in src/core/markdown/ with remark-gfm">.
If that task is not listed as open in ROADMAP.md, say so and do not implement it.
Do not start any other phase. The Markdown editor is out of scope (docs/architecture/0004-editor-out-of-scope.md):
do not add editor code or an editor dependency.

RULES YOU CANNOT BREAK
- One Markdown core: never duplicate rendering logic and never create a separate renderer for web and
  mobile.
- The sanitizer is a mandatory stage, never an optional plugin. While the sanitization policy (Phase 2)
  does not exist, do not enable raw HTML and do not use dangerouslySetInnerHTML.
- Plugin configuration is centralized; do not spread it across components.
- The core must stay independent of the UI and testable without page components.
- Do not add a dependency without stating why the current stack cannot do the job and what it costs in
  bundle size.
- Documentation, code, comments and commit messages in ENGLISH.
- NEVER run `npm create vite@latest .` or any scaffolder inside the repository, and never pass
  --overwrite: it deletes everything except .git.
- Do not reformat ROADMAP.md or tests/fixtures/. In ROADMAP.md you may only tick checkboxes.

HOW TO KNOW YOU ARE DONE
Every new Markdown feature needs TWO things: a case in tests/fixtures/Golden-Test-Document.md and an
automated test (next to the code for unit/component tests, under tests/ for fixture tests). And this
must pass, in this order:
  npm run format:check && npm run lint && npm run typecheck && npm test && npm run build
Before you start:  nvm use && npm ci
(If npm fails with EROFS: npm_config_cache="$PWD/.cache/npm" npm ci)

HOW TO WORK
- One task per branch and per pull request: feat/<short-description>. Never commit to main.
- Small commits, imperative mood, with a body explaining WHAT and WHY.
- If you need a design decision (a library, a policy, a format), do not invent it: write it as a
  decision record under docs/architecture/ using the template in its README, and tell me.
- If something is ambiguous, stop and ask. Do not silently pick an interpretation.

WHEN YOU FINISH, REPORT
1. Which files you changed and why.
2. The real output of the five verification commands.
3. What you could NOT verify. You do not have a real Android/iOS WebView: be honest, do not claim the
   golden rule is satisfied, and do not tick the roadmap checkbox if its definition of done requires a
   platform you cannot test.
4. What the next task would be.
```

## Short version

For a quick "keep going" nudge:

```text
Continue MDHoriZon. Read AGENTS.md, ROADMAP.md and docs/architecture/0001-*.md before touching anything.
Work only on the next open task in Phase 1 (the MarkdownRenderer), on a branch, with small commits in
English. Every new Markdown feature needs a case in tests/fixtures/Golden-Test-Document.md plus its own
test.
Before you say you are done: npm run format:check && npm run lint && npm run typecheck && npm test && npm run build.
The editor is out of scope (no editor code, no editor dependency), and never run a scaffolder or --overwrite
inside the repository.
Tell me what you could not verify (you have no real WebView) instead of assuming it.
```

## If the agent is contributing to a fork

Append these three lines so the work arrives as a pull request instead of landing on `main`:

```text
Work on YOUR fork, never on the upstream repository: add upstream
(git remote add upstream https://github.com/wachin/MDHoriZon.git), branch from upstream/main, and open a
pull request by filling in .github/pull_request_template.md. Do not push to main.
```

## Why the prompt is written this way

| Element                                     | What it prevents                                                                                                                           |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Mandatory reading first                     | Re-inventing conventions that are already written down; most of an agent's value is not having to re-derive them                           |
| One named task                              | "Continue the development" produces four half-finished features in one enormous commit                                                     |
| Explicit block on the editor                | The likeliest detour: building an editor is attractive work, and it is out of scope ([ADR 0004](architecture/0004-editor-out-of-scope.md)) |
| The sanitizer note for Phase 1              | An agent "making HTML work" introduces XSS into a project whose product _is_ sanitization                                                  |
| The five commands as the definition of done | Declaring something finished that does not compile or pass tests                                                                           |
| The honesty clause about WebView            | The most damaging failure mode: claiming the golden rule while never testing Android or iOS                                                |
| Decisions become ADRs, questions get asked  | The agent picking a library on its own and you discovering it in the pull request                                                          |

## What not to say

- **"Continue the development."** No scope, so the agent chooses one — probably not yours.
- **"Build the Markdown editor."** Forbidden by the roadmap until Phases 0–20 are complete and stable.
- **"Fix whatever is missing."** Ambiguous; it will pick the easiest visible thing.
- **"Optimize" or "refactor everything."** Violates the rule against modifying unrelated files.
- **"Use library X."** Violates the dependency policy unless the reason and the bundle cost are stated.
- **"Make it work on Android."** It cannot verify that from a terminal; you will get a claim, not evidence.
- **Nothing.** Without pointing at `AGENTS.md`, the agent may never read the rules that are already in the
  repository.

## Notes for the maintainer

- `AGENTS.md` sits at the repository root, and many agent harnesses load it automatically. Naming it in the
  prompt is still worth it, because the harnesses that do not load it are exactly the ones that need the
  prohibitions.
- The prompt asks the agent to report what it could not verify. Treat that section as the most important part of
  its answer: the golden rule requires desktop, mobile and Android WebView, and no terminal-only agent can
  satisfy the last two on its own.
- If an agent asks for a decision the roadmap leaves open, that is the prompt working as intended. The answer
  belongs in `docs/architecture/` as a decision record, not in a chat reply that vanishes.
