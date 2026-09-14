# Contributing to MDHoriZon

Thanks for considering it. MDHoriZon is a public, GPL-3.0 project and contributions of every size are welcome:
code, fixtures, documentation, security review, accessibility, translations.

This file is the short version. It deliberately **links** to the canonical documents instead of copying them, so
there is only one place to keep up to date.

| Document                     | What it is                                                                       |
| ---------------------------- | -------------------------------------------------------------------------------- |
| [`README.md`](README.md)     | What the project is, quick start, architecture, fixtures, contribution workflow. |
| [`ROADMAP.md`](ROADMAP.md)   | **The authoritative plan.** Phases 0–22, milestones, definitions of done.        |
| [`AGENTS.md`](AGENTS.md)     | The rules the code must respect, for humans and AI agents alike.                 |
| [`SECURITY.md`](SECURITY.md) | How to report a vulnerability **privately**.                                     |

If the README and the roadmap ever disagree, **the roadmap wins** — and please open an issue so the README can be
fixed.

## Getting started

```bash
# 1. Fork, then clone YOUR fork and track the original repository.
git clone https://github.com/<your-user>/MDHoriZon.git
cd MDHoriZon
git remote add upstream https://github.com/wachin/MDHoriZon.git

# 2. Install exactly what the lockfile pins (Node version is in .nvmrc).
nvm use
npm ci

# 3. Start the dev server.
npm run dev
```

Requires Node.js `^20.19.0 || ^22.13.0 || >=24`. See the [README quick start](README.md#quick-start) for the
sandboxed-environment note about the npm cache.

## What to work on

1. Pick an unchecked task in [`ROADMAP.md`](ROADMAP.md). Say so in the issue or the pull request so two people do
   not build the same thing.
2. Prefer the [good first contributions](README.md#good-first-contributions) list if you are new to the codebase.
3. **Phases 21 and 22 (the future Markdown editor) are `FUTURE — DO NOT IMPLEMENT YET`.** They may start only after
   Phases 0–20 are complete and stable. Pull requests that start them will be asked to wait.
4. If your idea is not in the roadmap, **propose it first** (issue or draft pull request) instead of implementing
   it silently.

## Before you open a pull request

Run these, and make sure they pass:

```bash
npm run format:check
npm run lint
npm run typecheck
npm run build
```

Then respect the project's **golden rule**:

> No Markdown feature is considered complete until it works in the desktop browser, mobile browser, Android
> WebView, and has a reproducible automated or fixture-based test.

That means every new Markdown feature also adds a case to
[`tests/fixtures/Golden-Test-Document.md`](tests/fixtures/Golden-Test-Document.md) — the rendering contract. Never
simplify that document because something is not implemented yet; add sections and let unsupported ones become
explicit targets.

## Branch and commit conventions

```text
feat/<short-description>     new behavior
fix/<short-description>      bug fix
chore/<short-description>    tooling, dependencies, configuration
docs/<short-description>     documentation only
test/<short-description>     tests and fixtures
```

Commits use the imperative mood, a short subject, and a body explaining **what** and **why**
(see [`AGENTS.md`](AGENTS.md) §9 for the exact style). Keep commits small and reversible, and do not mix unrelated
changes in one pull request.

## Pull requests

Fill in the pull-request template. In short, a reviewer needs:

- **what** changed;
- **why**, with the roadmap phase or issue it addresses;
- **how** you verified it, including which platforms you checked;
- confirmation that no unrelated files, secrets or machine-specific configuration are included.

Small, focused pull requests are reviewed fastest. If a change grows, split it.

### What reviewers look for

Correctness, cross-platform behavior (including Android/iOS WebView), security, accessibility, and roadmap
alignment — **not** style preferences, which ESLint and Prettier already decide.

Reviewers may ask you to move a change to a later phase rather than reject it: the phase ordering in the roadmap is
deliberate, and the reader must be solid before anything is built on top of it.

## Tests

There is **no test runner configured yet** — choosing one is an open task in the roadmap
([Phase 3](ROADMAP.md)). Until then, verification means the commands above plus the Golden Test Document. If you
want to take that task, say so in an issue first, because the decision affects the whole project.

## Reporting bugs and proposing features

Use the issue templates. The most useful bug report includes a **minimal Markdown snippet** that reproduces the
problem — ideally as a new case in the Golden Test Document.

**Security vulnerabilities must never be reported in a public issue.** Use
[`SECURITY.md`](SECURITY.md) instead.

## Code of conduct

Be respectful and specific. This project follows the
[Contributor Covenant v2.1](https://www.contributor-covenant.org/version/2/1/code_of_conduct/); unacceptable
behavior can be reported privately to the maintainer through GitHub.

## License

MDHoriZon is licensed under **GPL-3.0** (see [`LICENSE`](LICENSE)). By submitting a pull request you agree to
license your contribution under the same terms and confirm you have the right to do so.
