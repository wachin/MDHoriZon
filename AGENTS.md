# AGENTS.md

Rules for AI agents — and for humans — working in this repository.

> Read this file before changing anything. Then read [`ROADMAP.md`](ROADMAP.md) (the authoritative design
> document) and [`README.md`](README.md) (the practical guide).

---

## 1. What this project is

MDHoriZon is a **Markdown reading and publishing engine**: one rendering core, reused unchanged across the desktop
browser, mobile browsers, Android WebView and iOS WebView, with an optional, user-controlled offline content
library. It is not a CMS, and it is not an editor — that ambition was withdrawn
([ADR 0004](docs/architecture/0004-editor-out-of-scope.md)).

Current state: **Phases 0–6 are complete** — foundation, the Markdown rendering core, the security boundary, the
golden test suite, code blocks and tables, mathematics with KaTeX, and Mermaid diagrams. The app renders
`tests/fixtures/Golden-Test-Document.md` through the real pipeline as a Phase 1 preview screen. Phase 7 (reading
experience) is next; several earlier phases carry open checkboxes that belong to later work — relative assets
(Phase 8), the offline path (Phases 10–12) and real-browser/WebView verification (Phase 20). Check `ROADMAP.md`
for the current list rather than trusting this paragraph.

Two things about Mermaid are worth knowing before touching it: its SVG never passes through the Markdown
pipeline, so [ADR 0006](docs/architecture/0006-mermaid-svg-boundary.md) is the boundary that applies instead; and
Mermaid is pinned to the major version that needs no forced transitive pin, for the reason recorded in
[`docs/references.md`](docs/references.md).

## 2. Source of truth and phase discipline

- **`ROADMAP.md` is authoritative.** If it disagrees with `README.md`, the roadmap wins — fix the README instead.
- Work only on tasks marked in the roadmap. If a task does not exist there, propose it before implementing it.
- **The Markdown editor is out of scope** ([ADR 0004](docs/architecture/0004-editor-out-of-scope.md)): no editor code,
  no editor dependency. Phases 21–22 were removed from the roadmap. If an editor ever returns, it is a separate
  project with its own roadmap — not a change to this one.
- Do not skip phases to reach a more interesting feature.
- Exact dependency versions come from `package.json` and `package-lock.json`, never from assumptions or prose.

## 3. Commands

Requires Node.js `^20.19.0 || ^22.13.0 || >=24` (declared in `package.json#engines`, pinned by `.nvmrc`; run
`nvm use` first).

| Command                | Purpose                                             |
| ---------------------- | --------------------------------------------------- |
| `npm ci`               | Install exactly what the lockfile pins (preferred). |
| `npm run dev`          | Vite dev server with HMR.                           |
| `npm run build`        | `tsc -b` + production build into `dist/`.           |
| `npm run typecheck`    | Type-check only.                                    |
| `npm run lint`         | ESLint.                                             |
| `npm test`             | Test suite once (Vitest).                           |
| `npm run test:watch`   | Test suite in watch mode.                           |
| `npm run format`       | Prettier write.                                     |
| `npm run format:check` | Prettier check (must pass in a PR).                 |
| `npm run preview`      | Serve the production build locally.                 |

In a sandbox where npm cannot write to `~/.npm/_cacache` (error `EROFS`), redirect the cache into the repository:
`npm_config_cache="$PWD/.cache/npm" npm ci`. `.cache/` is already gitignored.

## 4. Before declaring anything done

1. `npm run lint` passes.
2. `npm run typecheck` (or `npm run build`) passes.
3. `npm run build` succeeds.
4. `npm run format:check` passes.
5. `npm test` passes — and every new Markdown feature has a test, not only a fixture entry.
6. **The golden rule** is satisfied:

   > No Markdown feature is considered complete until it works in the desktop browser, mobile browser, Android
   > WebView, and has a reproducible automated or fixture-based test.

Never report work as complete based only on "it looked right in the browser".

## 5. Architecture rules (non-negotiable)

- **One Markdown implementation.** Never duplicate rendering logic and never create a separate renderer for web
  and mobile.
- **The sanitizer is a mandatory stage**, not an optional plugin. Never bypass it, for performance or convenience.
  The layered policy — raw HTML from the document never reaches the DOM, an unconditional sanitization stage for
  plugin-generated markup, and an explicit URL policy — is [ADR 0003](docs/architecture/0003-sanitization-policy.md).
  Never introduce `dangerouslySetInnerHTML`, widen the sanitize schema, or add a plugin without a markup review.
- **Keep plugin configuration centralized** (planned: `src/core/markdown/plugins.ts`), not spread across components.
- **The rendering core must stay independent from page-level UI** and testable without React page components.
- Keep components small and reusable; specialised components (`CodeBlock`, `TableWrapper`, `ResponsiveImage`,
  `MermaidDiagram`, …) hold non-trivial behavior and styling.
- **Preserve Android and iOS WebView compatibility.** Assume an older engine, touch input, and no Node APIs at
  runtime.
- **Test both the online and the offline path** whenever content loading changes.
- **Respect the test layout** ([ADR 0001](docs/architecture/0001-test-runner-and-test-layout.md)): unit and component
  tests are colocated with the code as `src/**/*.test.ts(x)`; fixture and cross-cutting tests live in `tests/` and
  run with `// @vitest-environment node`. Never weaken or delete a fixture guard to make a change pass.
- **Do not add a dependency** without a clear reason and an evaluation of its bundle impact. The platform and the
  existing stack come first.
- **Do not create directories** drawn from the roadmap's target tree merely for appearance. Create them when the
  implementation that needs them begins.
- **Do not redesign the architecture** without documenting the reason under `docs/architecture/` and explaining it
  in the pull request.

## 6. Files to treat with care

| Path                                     | Rule                                                                                                                                                                                 |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `ROADMAP.md`                             | The specification. Do not restructure or reformat it. Updating task checkboxes is fine, in its own commit.                                                                           |
| `tests/fixtures/Golden-Test-Document.md` | The rendering contract. **Never simplify it** because a feature is unimplemented — add sections and let unsupported ones become explicit targets. Excluded from Prettier on purpose. |
| `tests/assets/does-not-exist.png`        | **Must never exist.** It is a deliberate negative test for graceful image failure.                                                                                                   |
| `tests/assets/example.png`               | Keep the filename and the relative path used by the fixture.                                                                                                                         |
| `tests/articles/example.md`              | The target of the cross-directory relative link. Keep it short and keep both of its relative paths working.                                                                          |
| `package-lock.json`                      | Generated. Never hand-edit it; change dependencies through npm.                                                                                                                      |
| `.gitignore`                             | Hand-curated (Capacitor, Android/iOS, keystores, secrets). Never overwrite it with a template default.                                                                               |
| `.prettierignore`                        | Keeps the spec documents byte-stable. Do not remove `ROADMAP.md` or `tests/fixtures/` from it.                                                                                       |
| `vite.config.ts`                         | `base` is `/MDHoriZon/` in production and overridable with `VITE_BASE`. Do not hard-code a different base.                                                                           |

## 7. Dangerous operations — forbidden

- **Never run `npm create vite@latest .` (or any scaffolder) inside this repository.** It refuses to write into a
  non-empty directory and offers _“Remove existing files and continue”_, which deletes everything except `.git`.
- **Never pass `--overwrite`** to `create-vite`; never select _“Remove existing files and continue”_.
- If scaffolding is ever genuinely required, follow the safe procedure documented in
  [`README.md`](README.md#bootstrap-notes-how-this-repository-was-initialized): scaffold into a temporary
  directory, then `rsync -a --ignore-existing` into the repository root.
- **Never commit secrets**, tokens, keystores, signing material or local machine configuration. `.gitignore`
  already covers the common cases.
- **Never rewrite published history** (`git push --force` on `main`, rebasing pushed commits, amending pushed
  commits).
- **Never modify unrelated files** in the same change. Prefer separate, small, reversible commits.
- **Never vendor a third-party project into this repository** — no submodules, no copied trees. Record the reference
  and its pinned revision in [`docs/references.md`](docs/references.md) and keep the checkout outside the tracked
  tree ([ADR 0002](docs/architecture/0002-reference-material-lives-outside-the-repo.md)).
- Never "fix" a failing check by disabling the rule, skipping the test, or weakening the sanitizer.

## 8. Repository map

```text
src/                          application code; the Markdown core will live in src/core/
tests/fixtures/               Golden Test Document (rendering contract) — Prettier-excluded
tests/assets/                 assets referenced by the fixtures (see its README.md)
tests/articles/               relative-link targets used by the fixtures
public/                       static files copied verbatim into dist/, including .nojekyll
.github/workflows/            ci.yml (PR verification) and deploy-pages.yml (GitHub Pages)
.github/ISSUE_TEMPLATE/       issue forms; .github/pull_request_template.md is the PR checklist
.github/dependabot.yml        grouped minor/patch updates; majors are reviewed by hand
docs/architecture/            decision records (why, not what) — see its README for the template
docs/continuing-development.md  ready-to-paste prompt for an agent starting work here
docs/references.md            curated third-party sources, pinned revisions and what was found
tests/*.test.ts               fixture and cross-cutting guards (node environment)
src/**/*.test.ts(x)           unit and component tests, colocated with the code (jsdom)
ROADMAP.md                    authoritative specification (Phases 0–20, milestones M0–M12)
README.md                     purpose, quick start, contribution guide, bootstrap history
CONTRIBUTING.md               short entry point for new contributors
CODE_OF_CONDUCT.md            Contributor Covenant 2.1
SECURITY.md                   private vulnerability reporting
AGENTS.md                     this file
```

## 9. Commit and pull request conventions

Branch names: `feat/…`, `fix/…`, `chore/…`, `docs/…`, `test/…`.

Commit subjects (imperative, short, matching the roadmap style):

```text
chore: initialize vite react typescript project
feat: add markdown rendering pipeline
feat: add responsive markdown tables
feat: add code block copy button
feat: add offline content library
fix: handle relative markdown image paths
```

A pull request must state **what** changed, **why** (with the roadmap phase/milestone), and **how it was verified**
(commands run, platforms checked). Keep pull requests small; split them rather than mixing concerns.

## 10. Style

- TypeScript **strict**; do not weaken `tsconfig` options to silence an error.
- Prettier decides formatting: no semicolons, single quotes. Run `npm run format` rather than argue about style.
- ESLint decides lint rules; do not add inline disables without an explanatory comment.
- Documentation, code identifiers, comments and commit messages are written in **English** so international
  contributors can participate. Additional translated docs are welcome as extra files (for example `README.es.md`),
  never as replacements.

## 11. Useful first tasks

Checklist items still open include: the content model (Phase 9), the reading experience (Phase 7), the bundle
budget (Phase 18), the sanitization element/attribute/URL lists that Phases 4–6 each narrowed (Phase 2 — its shape
is [ADR 0003](docs/architecture/0003-sanitization-policy.md)), and end-to-end and WebView testing (Phase 20), which
is where the device half of every feature lives.
Pick one from `ROADMAP.md` rather than inventing work.

## 12. When something is ambiguous

Do not invent behavior and do not silently pick an interpretation. Prefer, in order: annotate the roadmap, open an
issue, or ask in the pull request — and leave an explicit note in the code or docs so the next contributor sees the
open question.
