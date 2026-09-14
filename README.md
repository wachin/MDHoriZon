# MDHoriZon

> **A Markdown reading and publishing engine that renders consistently on the web, inside Android WebViews and
> inside iOS WebViews — with an optional, user-controlled offline content library.**

[![License: GPL v3](https://img.shields.io/badge/license-GPL--3.0-blue)](LICENSE)
[![Status: Phase 0 · foundation](https://img.shields.io/badge/status-phase%200%20%C2%B7%20foundation-blue)](#project-status)
[![PRs: welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)](#contributing)

MDHoriZon is **not** a blog CMS and **not** yet another Markdown editor. It begins as a Markdown **reader**:
one rendering core, reused unchanged across the desktop browser, the mobile browser, an Android application and an
iOS application, with offline reading available when the user explicitly asks for it.

The full design document lives in [`ROADMAP.md`](ROADMAP.md). This README is the practical entry point: what the
project is, how to run it, how to contribute, and how to avoid destroying the repository.

---

## Table of contents

- [What is MDHoriZon?](#what-is-mdhorizon)
- [Quick start](#quick-start)
- [Available npm scripts](#available-npm-scripts)
- [What MDHoriZon is and is not](#what-mdhorizon-is-and-is-not)
- [Features](#features)
- [Architecture: one core, many targets](#architecture-one-core-many-targets)
- [The golden rule](#the-golden-rule)
- [Technology stack](#technology-stack)
- [Project status](#project-status)
- [The road ahead: from reader to Live Markdown Editor](#the-road-ahead-from-reader-to-live-markdown-editor)
- [Repository structure](#repository-structure)
- [The Golden Test Document and fixtures](#the-golden-test-document-and-fixtures)
- [Bootstrap notes: how this repository was initialized](#bootstrap-notes-how-this-repository-was-initialized)
- [Contributing](#contributing)
- [Documentation map](#documentation-map)
- [Security](#security)
- [License](#license)

---

## What is MDHoriZon?

MDHoriZon is a **Markdown engine plus a reading application**.

It takes Markdown — plain files, with frontmatter, images and relative links — and turns it into a document that is
readable, predictable, secure and responsive on every target the project supports. The same content pipeline feeds
the website deployed to GitHub Pages, the Android app, the iOS app, and the optional offline library, so a document
never renders differently depending on where it is opened.

Concretely, MDHoriZon aims to be:

- a **rendering engine** (unified / remark / rehype based) that is testable in isolation, without React page code;
- a **reading application** with responsive typography, themes, navigation and accessibility;
- a **publishing frontend** for Markdown content, deployable as a static site to GitHub Pages;
- a **Capacitor application** for Android and iOS;
- an **optional offline reader**, where the user chooses what to download and keeps it available without network.

### Who it is for

- People who write in Markdown and want to _publish_ it without adopting a CMS.
- People who want the same article to be readable on a phone, in an app, and offline.
- Developers who need a reusable, sanitized, well-tested Markdown renderer they can embed in their own product.

### Documentation language

All project documentation is written in **English** on purpose: it is the language that lets international
contributors review and continue the work. Translations (`README.es.md`, and so on) are welcome as additional
files — never as replacements.

---

## Quick start

Requirements:

- **Node.js `^20.19.0 || ^22.13.0 || >=24`** (ESLint 10 sets the strictest floor; Node 22 LTS is recommended).
- **npm 10+** (the committed `package-lock.json` is the source of truth for versions).
- Git.

```bash
# 1. Fork on GitHub, then clone YOUR fork
git clone https://github.com/<your-user>/MDHoriZon.git
cd MDHoriZon

# 2. Keep the original repository as a remote so you can sync
git remote add upstream https://github.com/wachin/MDHoriZon.git

# 3. Install exactly what the lockfile pins
npm ci

# 4. Start the development server (prints a local URL, usually http://localhost:5173/)
npm run dev
```

To work on a feature:

```bash
git switch -c feat/short-description
# ... edit ...
npm run lint && npm run build
git commit -m "feat: short description"
git push -u origin feat/short-description
# then open a Pull Request against wachin/MDHoriZon
```

> If you are inside a locked-down or sandboxed environment where `npm` fails with `EROFS` while writing to
> `~/.npm/_cacache`, redirect the cache into the project (already gitignored):
>
> ```bash
> npm_config_cache="$PWD/.cache/npm" npm ci
> ```

---

## Available npm scripts

| Command                | What it does                                                                           |
| ---------------------- | -------------------------------------------------------------------------------------- |
| `npm run dev`          | Starts the Vite dev server with HMR.                                                   |
| `npm run build`        | Type-checks the whole project (`tsc -b`) and produces the production build in `dist/`. |
| `npm run preview`      | Serves the built `dist/` locally, to verify the production output.                     |
| `npm run lint`         | Runs ESLint over the repository.                                                       |
| `npm run typecheck`    | Runs `tsc -b` only, without emitting a build.                                          |
| `npm run format`       | Formats the repository with Prettier.                                                  |
| `npm run format:check` | Verifies formatting without writing (used in review).                                  |

**Before opening a pull request, `npm run lint`, `npm run build` and `npm run format:check` must all pass.** CI
will enforce this once the GitHub Actions workflows from the roadmap are added.

Prettier deliberately **ignores `ROADMAP.md` and `tests/fixtures/`** (see [`.prettierignore`](.prettierignore)):
the specification and the golden fixture are hand-maintained, byte-stable documents, and reformatting them would
produce large unrelated diffs that obscure real changes.

---

## What MDHoriZon is and is not

### In scope, initially

Markdown rendering, a responsive reading experience, Markdown-based publishing, static deployment, a Capacitor
application for Android/iOS, and an optional offline content reader.

### Explicitly deferred

These must **not** distract the first implementation: user accounts, authentication, comments, social features,
payments, a full CMS, a cloud database, server-side rendering, a complex authoring interface, and a complete
Markdown editor.

The last point matters: editor work has its own future phases and must not start early (see
[The road ahead](#the-road-ahead-from-reader-to-live-markdown-editor)). Those phases may be considered only after
the renderer and the reading experience are solid.

---

## Features

### Working today (Phase 0 — foundation)

- Vite 8 + React 19 + TypeScript 6 project, building and type-checking.
- **TypeScript strict mode** across application and tooling configs, with project references.
- ESLint 10 (flat config) with `typescript-eslint`, React Hooks and React Fast Refresh rules.
- **Prettier** configured, with the specification documents excluded so they stay byte-stable.
- **GitHub Pages base path** (`/MDHoriZon/` in production, `VITE_BASE`-overridable) and `public/.nojekyll`.
- HMR development server and a verified production build.
- Lockfile generated (`package-lock.json`, verified with `npm ci`); dependency and secrets hygiene in `.gitignore`.
- [`AGENTS.md`](AGENTS.md): the rules human and AI contributors must follow.
- The [Golden Test Document](tests/fixtures/Golden-Test-Document.md) fixture and its assets.

### Planned for the reader (Phases 1–20)

The reading experience must support, at minimum:

- Standard Markdown and **GitHub Flavored Markdown** (tables, task lists, strikethrough, autolinks).
- Headings with deterministic, linkable anchors.
- Ordered, unordered and nested lists; task lists; blockquotes; horizontal rules.
- Links, including **relative links** resolved against the source document.
- Images, including **relative images**, lazy loading and graceful failure.
- Inline code and fenced code blocks with **syntax highlighting** and **copy-to-clipboard**.
- Tables that **scroll horizontally** on narrow screens without breaking the viewport.
- **Mathematical notation with KaTeX** (`$inline$` and `$$display$$`).
- **Mermaid diagrams**, lazy-loaded, whose failures never break the article.
- Responsive typography, light and dark themes.
- A **security boundary** that sanitizes embedded HTML, `javascript:` URLs, event handlers and dangerous SVG.
- A **content model** with frontmatter and a content-loading architecture.
- An **offline content library**: explicit download, integrity, update and delete.
- A PWA/web-offline layer, GitHub Pages publishing, and Capacitor packaging for Android and iOS.
- Search, navigation, accessibility hardening and performance budgets.

None of these is implemented yet. The roadmap is the authoritative, itemized list — this section is only a summary.

---

## Architecture: one core, many targets

The project's central constraint is that **the rendering core is independent from the application UI**, and that
there is exactly one Markdown implementation for every target.

```text
                         Markdown source
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Content / Frontmatter│
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Markdown Core       │
                    │ unified / remark /  │
                    │ rehype              │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              ▼                ▼                ▼
          GFM / links       KaTeX           Mermaid
          tables/lists      mathematics      diagrams
              │                │                │
              └────────────────┼────────────────┘
                               ▼
                    ┌─────────────────────┐
                    │ Security / Sanitizer│
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Render Components   │
                    │ CodeBlock           │
                    │ TableWrapper        │
                    │ Images              │
                    │ MermaidDiagram      │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              ▼                ▼                ▼
          Web browser      Capacitor        Offline layer
                              │                │
                         Android/iOS      local content
```

Practical rules that follow from this diagram:

1. The Markdown core must be usable and testable **without React page components**.
2. There must be **no separate renderer for web and mobile**.
3. The sanitizer is a **mandatory stage**, never an optional plugin.
4. Plugins are configured in **one centralized place**, not scattered across components.

### The golden rule

> **No Markdown feature is considered complete until it works in the desktop browser, mobile browser, Android
> WebView, and has a reproducible automated or fixture-based test.**

This is the project's definition of done. A feature that renders on your laptop is not finished.

---

## Technology stack

Exact versions are declared in [`package.json`](package.json) and pinned by `package-lock.json`; the roadmap
deliberately does not hard-code them.

| Layer          | Technology                                           | Notes                                                                                     |
| -------------- | ---------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| UI             | React + TypeScript (strict)                          | Current stable.                                                                           |
| Build          | Vite                                                 | Fast dev server, static output for GitHub Pages.                                          |
| Linting        | ESLint (flat config)                                 | `typescript-eslint`, React Hooks, React Refresh.                                          |
| Formatting     | Prettier                                             | No semicolons, single quotes. `ROADMAP.md` and `tests/fixtures/` are excluded on purpose. |
| Markdown       | `react-markdown`                                     | Primary React renderer.                                                                   |
| GFM            | `remark-gfm`                                         | Tables, task lists, strikethrough, autolinks.                                             |
| Math           | `remark-math` + `rehype-katex` + `katex`             | Local rendering, no external service.                                                     |
| Highlighting   | `rehype-highlight` + `highlight.js`                  | Fenced code blocks.                                                                       |
| Diagrams       | Mermaid                                              | Lazy-loaded on demand.                                                                    |
| Sanitization   | `rehype-sanitize` or an equivalent controlled policy | Security boundary; compatibility verified before adoption.                                |
| Mobile         | Capacitor                                            | Shared web app packaged for Android/iOS.                                                  |
| Web publishing | GitHub Pages                                         | Static deployment.                                                                        |
| CI/CD          | GitHub Actions                                       | Lint, test and build.                                                                     |
| Offline        | Service Worker + Cache Storage / IndexedDB           | Web PWA, plus native storage for the mobile library.                                      |

### Dependency policy

- Do not upgrade dependencies blindly; review breaking changes first.
- Keep `package-lock.json` committed.
- Prefer well-maintained, focused dependencies.
- Do not add a dependency when the platform or the existing stack already solves the problem.
- **Every significant dependency must have a clear reason to exist** and its bundle impact evaluated.

---

## Project status

**Current phase: Phase 0 — Repository Foundation.** The application renders the starter screen only; no Markdown
pipeline exists yet. The foundation itself is complete and committed.

Phase 0 checklist:

| Task                                                | Status                                                 |
| --------------------------------------------------- | ------------------------------------------------------ |
| Confirm the GitHub repository is `wachin/MDHoriZon` | ✅                                                     |
| Initialize Vite + React + TypeScript                | ✅                                                     |
| Configure ESLint                                    | ✅                                                     |
| Configure Prettier                                  | ✅                                                     |
| Configure TypeScript strict checking                | ✅                                                     |
| Configure `vite.config.ts` for GitHub Pages         | ✅                                                     |
| Determine/configure the repository base path        | ✅ `base: '/MDHoriZon/'`, overridable with `VITE_BASE` |
| Add `public/.nojekyll`                              | ✅                                                     |
| Add `AGENTS.md`                                     | ✅                                                     |
| Add the project `.gitignore`                        | ✅                                                     |
| Add the Golden Test Document                        | ✅                                                     |
| Commit the initial foundation                       | ✅                                                     |

Milestones (see [`ROADMAP.md`](ROADMAP.md) for the full breakdown):

| Milestone | Scope                                                   |
| --------- | ------------------------------------------------------- |
| **M0**    | Repository foundation, linting, formatting, agent rules |
| **M1**    | Core Markdown/GFM renderer                              |
| **M2**    | Security boundary and sanitization                      |
| **M3**    | Golden test suite                                       |
| **M4**    | Code blocks, tables, math, Mermaid                      |
| **M5**    | Reading experience and themes                           |
| **M6**    | Content model and article navigation                    |
| **M7**    | GitHub Pages publishing                                 |
| **M8**    | Android Capacitor application                           |
| **M9**    | Offline content download/library                        |
| **M10**   | Android CI/CD and signed builds                         |
| **M11**   | iOS application                                         |
| **M12**   | Search, performance, accessibility, release hardening   |

All milestones are currently open.

---

## The road ahead: from reader to Live Markdown Editor

Phases 21 and 22 of the roadmap describe what happens **if the reader succeeds**. They are recorded now so the
architecture is built with that future in mind — but they are explicitly marked
**`Status: FUTURE — DO NOT IMPLEMENT YET`**.

### Why the reader comes first

The editor is not a separate product that can be bolted on: it must **reuse the mature Markdown core** built in
Phases 1–20. Without a trustworthy parser, a real sanitization boundary and a stable renderer, an editor would
duplicate Markdown logic and diverge from the reader's output. That is exactly what this project forbids.

### Phase 21 — research (`FUTURE — DO NOT IMPLEMENT YET`)

A **research and architectural design** phase, not a product phase. It must not introduce a production editor into
the repository. Its precondition is that Phases 0–20 are complete and that the reader, renderer, offline system,
web app, Android app, iOS app, security model, accessibility, performance and cross-platform validation are
considered stable. It studies the technical foundations (CodeMirror 6 among the candidates) before any
implementation decision is made.

### Phase 22 — prototype (`FUTURE — DO NOT IMPLEMENT YET`)

Begins only after Phase 21 produces a satisfactory architecture decision. It builds a **controlled prototype**,
isolated from the stable reader, proving that a user can: open a Markdown document, edit its source, see supported
formatting rendered inline, move the cursor through rendered content, reveal syntax when appropriate, keep
editing, preserve valid Markdown, undo/redo, and save.

### The vision: writing and reading as one state

The intended experience, inspired by modern live-preview editors but with its own architecture and identity:

```text
             WRITE + READ

        not

             WRITE
               ↓
             PREVIEW
```

The document itself is edited in place, with formatting rendered inline and no mandatory side-by-side preview
pane. A conventional reading view (and a raw source view) remain available, so the app can present:

| Mode             | Content                                                      |
| ---------------- | ------------------------------------------------------------ |
| **Reading**      | Pure rendered document                                       |
| **Live Preview** | Editable rendered Markdown — the principal future innovation |
| **Source**       | Raw Markdown                                                 |

Two invariants protect the user:

- **Markdown source stays authoritative.** The project must never invent a proprietary document format.
- **The editor must not weaken the reader's guarantees.** It inherits the same security suite, plus
  editor-specific cases such as malicious pasted HTML and malformed Mermaid.

The roadmap also warns against a feature explosion: plugins, theme marketplaces, sync services, collaborative
editing, databases, proprietary formats, complex WYSIWYG conversion, AI writing assistants, cloud accounts and
publishing platforms are **all out of scope**, to be considered independently in the future.

### The decision gate

Even if the prototype works, the project does **not** automatically become an editor. A separate roadmap for
_MDHoriZon Live Markdown Editor 1.0_ is created only if the prototype proves the experience can be:

`fast · reliable · beautiful · accessible · secure · cross-platform · offline-capable · faithful to Markdown ·
pleasant on desktop · pleasant on mobile`

Its progression would be: **Prototype → Alpha → Beta → Desktop-ready → Mobile-ready → Production editor →
MDHoriZon Editor 1.0**, each stage with its own definition of done.

And the closing principle of the roadmap, which is the whole reason the reader is being built carefully first:

> The ultimate ambition is not to make **another Markdown editor**.
>
> The ambition is to make **MDHoriZon a first-class Markdown environment where reading and writing the same
> document feel like two natural states of one experience.**

**For contributors: do not open pull requests that start Phases 21–22.** Help make M1–M12 excellent instead; the
editor phases depend on them.

---

## Repository structure

Current state:

```text
MDHoriZon/
├── public/                          # static assets served as-is
│   ├── .nojekyll                    # tells GitHub Pages not to run Jekyll
│   ├── favicon.svg
│   └── icons.svg
├── src/                             # application code; the Markdown core will live in src/core/
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   ├── main.tsx
│   └── assets/
├── tests/
│   ├── assets/                      # assets referenced by the fixture (see its README)
│   │   ├── README.md
│   │   └── example.png
│   └── fixtures/
│       └── Golden-Test-Document.md  # the rendering specification / regression fixture
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json                    # project references
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts                   # React plugin + GitHub Pages base path
├── .prettierrc.json
├── .prettierignore
├── AGENTS.md                        # rules for human and AI contributors
├── ROADMAP.md                       # the authoritative design document
├── LICENSE                          # GPL-3.0
└── README.md
```

The **target** structure — `src/core/{markdown,security,code,math,mermaid}`, `src/components/`, `src/content/`,
`src/offline/`, `src/styles/`, `docs/architecture/`, `.github/workflows/`, `android/`, `ios/` — is specified in
[`ROADMAP.md`](ROADMAP.md).

Directories are created **when the corresponding implementation begins**, not for appearance. Planned paths drawn
from the roadmap are not authorization to add empty folders.

---

## The Golden Test Document and fixtures

[`tests/fixtures/Golden-Test-Document.md`](tests/fixtures/Golden-Test-Document.md) is the **rendering
specification and regression fixture** for the project. It is intentionally broad and deliberately not beautiful:
its job is to expose rendering regressions across headings, inline formatting, links, images, lists, task lists,
blockquotes, code blocks (including an unknown language and an extremely long line), tables (including a 12-column
wide table), horizontal rules, escaping, KaTeX, Mermaid, frontmatter, raw HTML and security cases, nested content,
content mixing, offline content loading and accessibility expectations.

Rules for it:

- **Do not simplify it** because the current application does not yet support a feature. Unsupported sections
  become explicit roadmap/test targets.
- **Every new Markdown feature gets a section (or an entry) here**, plus an automated assertion where possible.
- The document must render successfully before a renderer milestone can be marked complete.

### Image cases in section 4

| Case           | Path / URL                                                      | Expectation                                                                                                                 |
| -------------- | --------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Remote image   | `https://placehold.co/640x240/0b3d91/ffffff/png?text=MDHoriZon` | Loads over the network; must degrade gracefully when offline.                                                               |
| Relative image | `../assets/example.png` → `tests/assets/example.png`            | Resolved relative to the Markdown file; the file is committed.                                                              |
| Missing image  | `../assets/does-not-exist.png`                                  | **The file must never exist.** It is a negative test: broken image must not break the article, and `alt` text must survive. |
| Image as link  | `placehold.co` image inside `[ … ](https://github.com/)`        | An image wrapped in an anchor must render and be clickable as one unit.                                                     |

See [`tests/assets/README.md`](tests/assets/README.md) for the asset inventory and for how to regenerate
`example.png` with ImageMagick or GIMP.

### Fixing the dead placeholder host

The fixture originally used `https://via.placeholder.com/...`, a service that **no longer resolves** (requests fail
with no HTTP response at all), which is why the images appeared blank in the browser. The URLs were migrated to
[`placehold.co`](https://placehold.co), which was verified to return `HTTP 200` with `Content-Type: image/png`.

### Where to host images — options

| Option                                                                                                                          | Good for                                               | Trade-offs                                                                                                                                 |
| ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **`placehold.co`** _(currently used for the remote cases)_                                                                      | Throwaway placeholders, quick fixtures                 | Third-party availability; requires network.                                                                                                |
| **`dummyimage.com`**                                                                                                            | Same idea, alternative host, `&text=` syntax           | Same third-party dependency.                                                                                                               |
| **`picsum.photos`**                                                                                                             | Real-looking photos for visual/layout tests            | Returns JPEG, random per request.                                                                                                          |
| **Committed in the repo** (`tests/assets/`, `public/assets/`) — **recommended default**                                         | Anything an automated test or offline build depends on | Adds repository size; must be kept small.                                                                                                  |
| **GitHub itself** — `https://raw.githubusercontent.com/<user>/<repo>/<ref>/<path>` or a `github.com/.../blob/...?raw=true` link | Zero extra infrastructure; versioned with the code     | Served as `text/plain` with `Content-Disposition` unless the raw host is used; couples tests to a branch name; still a network dependency. |
| **GitHub Pages** (deploy your own `public/assets/` and reference `/MDHoriZon/assets/...`)                                       | Production content images after M7                     | Requires the Pages configuration to exist first.                                                                                           |
| **Object storage / CDN** (S3, Cloudflare R2, Backblaze B2)                                                                      | Large media libraries at scale                         | Cost, credentials, and a runtime dependency the offline mode must handle.                                                                  |

**Recommendation:** for anything a test, an offline bundle or a build depends on, commit the file — self-hosted
assets are the only ones that satisfy the project's offline requirement. Use a remote host only where "this must
load from the network" is the behavior under test (exactly the two remote cases above). If you prefer GitHub as
the host, use `raw.githubusercontent.com` pinned to a tag or commit SHA, never a moving branch, so the fixture
cannot change underneath a test run.

### Other fixture paths

`tests/fixtures/Golden-Test-Document.md` also references `../articles/example.md` as a **relative link** example
(which resolves to `tests/articles/example.md`). That target does not exist yet; unlike the image section, there is
no adjacent "missing link" case, so the file is expected to be created when relative-link resolution lands in
Phase 8/10. Do not create it blindly — confirm it against that phase's tests.

---

## Bootstrap notes: how this repository was initialized

This section exists so that **nobody deletes the repository by accident**. Read it before running any scaffolding
command.

### The command that does _not_ work here

The roadmap suggests:

```bash
npm create vite@latest . -- --template react-ts
```

Run inside this repository, that command **fails safely**: `create-vite` refuses to write into a non-empty
directory and shows a three-option menu. The first option is pre-selected, so pressing <kbd>Enter</kbd> selects
**Cancel operation** and prints `Operation cancelled` — which is exactly what happened the first time. Nothing was
created and nothing was deleted.

### The trap

| Menu option                            | What it actually does                                                                                                                                                                                                                                                 |
| -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Cancel operation** (default)         | Aborts immediately. Nothing is created, nothing is deleted. Safe.                                                                                                                                                                                                     |
| **Remove existing files and continue** | ⚠️ **Deletes every entry in the directory except `.git`** — `ROADMAP.md`, `LICENSE`, `.gitignore`, `tests/`, `src/`, `node_modules/` — and then scaffolds. Anything already committed can be restored from history, but **anything uncommitted is lost permanently**. |
| **Ignore files and continue**          | Keeps existing files and writes the template on top. Files whose names collide are **overwritten** (in this repository that means `.gitignore`, replacing the curated Capacitor/Android/iOS/secrets rules with the five-line Vite default).                           |

Two related flags behave the same way in non-interactive mode:

- `--overwrite` is the equivalent of _Remove existing files and continue_. **Never pass it.**
- `--no-interactive` on a non-empty directory simply **cancels**: there is no non-interactive "ignore" mode.

Two implementation details decide whether an accident is recoverable:

- _Remove existing files and continue_ preserves the `.git` directory (verified in the `create-vite` source), so the
  history and the index survive and committed work can be brought back with `git restore .`. **Uncommitted work
  cannot.** When this repository was initialized, `ROADMAP.md` had uncommitted edits — that option would have
  destroyed them silently.
- A directory containing **only** `.git` does not trigger the menu at all; `create-vite` treats it as empty.

### The procedure that was actually used (safe by construction)

Scaffold somewhere else, then copy in **only what is new**:

```bash
# 1. Scaffold into a throwaway directory, so no menu can ever touch existing files.
npm create vite@latest .vite-scaffold -- --template react-ts --no-interactive --eslint

# 2. Copy the template into the repository root, skipping every file that already exists.
#    --ignore-existing is what guarantees ROADMAP.md, tests/, .gitignore and LICENSE are untouched.
rsync -a --ignore-existing .vite-scaffold/ ./

# 3. Remove the throwaway directory.
rm -rf .vite-scaffold
```

Then these deliberate adjustments were applied:

1. `package.json` → `"name": "mdhorizon"` (the temporary directory name leaked into the package name).
2. `package.json` → added a `typecheck` script (`tsc -b`).
3. `tsconfig.app.json` / `tsconfig.node.json` → added `"strict": true` explicitly, as required by Phase 0.
4. `.gitignore` → merged `dist-ssr/` and `*.local` from the Vite template into the existing, far more complete
   ignore file (which already covered `node_modules/`, `dist/`, Android/iOS build output, keystores and secrets).
5. Phase 0 was then closed on top of the scaffold: **Prettier** (`.prettierrc.json` + `.prettierignore`, with
   `ROADMAP.md` and `tests/fixtures/` excluded so the specification and the golden fixture stay byte-stable), the
   **GitHub Pages base path** in `vite.config.ts` (`/MDHoriZon/`, overridable with `VITE_BASE` so Capacitor builds
   are not blocked later), **`public/.nojekyll`**, and **`AGENTS.md`**.

Two more details worth knowing:

- **`--eslint` was passed on purpose.** `create-vite` 9 defaults new React projects to **Oxlint**, but Phase 0 of
  the roadmap requires **ESLint**. Without the flag you get an `.oxlintrc.json` and an `oxlint` lint script
  instead of `eslint.config.js`.
- **Sandboxed environments:** if `npm` dies with `EROFS: read-only file system, open '~/.npm/_cacache/...'`, the
  package cache is outside the writable area. Point it at the project instead:
  `npm_config_cache="$PWD/.cache/npm" npm install`. `.cache/` is already gitignored, and this changes nothing
  about the committed dependency versions.

### Rules for everyone (and for AI agents)

- **Never** run `npm create vite@latest .` in this repository again.
- **Never** pass `--overwrite`.
- **Never** choose _Remove existing files and continue_.
- If a tool offers to "start fresh" in a non-empty directory, scaffold into a temporary directory and copy files
  in with `rsync --ignore-existing`, exactly as above.
- Verify afterwards with `git status`: only the files you intended to change should appear.

---

## Contributing

Contributions are genuinely welcome — this project is public precisely so others can help it grow. Please read this
section before opening a pull request; it is short, and it exists so your work can be merged without friction.

### Ways to help

- **Implement roadmap tasks.** Pick an unchecked item from [`ROADMAP.md`](ROADMAP.md) and say so in the issue/PR.
- **Finish the foundation.** Prettier configuration, `vite.config.ts` base path for GitHub Pages,
  `public/.nojekyll`, `AGENTS.md`, and a `.nvmrc` are all small, self-contained Phase 0 tasks.
- **Extend the fixture.** Add cases to the Golden Test Document that expose rendering regressions.
- **Report bugs with a fixture.** The best bug report is a new section in the fixture plus the observed vs
  expected rendering.
- **Security cases.** `javascript:` URLs, event handlers, dangerous SVG, malicious pasted HTML.
- **Accessibility and performance.** Heading hierarchy, focus management, contrast, bundle size, render latency.
- **Documentation.** Translations of this README, architecture notes under `docs/architecture/`, and clearer
  explanations of the security policy.

Not in scope: anything from Phases 21–22 (the future editor), CMS features, accounts, comments, or a rewrite of
the architecture. See [The road ahead](#the-road-ahead-from-reader-to-live-markdown-editor).

### Workflow

```bash
# 1. Fork wachin/MDHoriZon on GitHub.
# 2. Clone your fork and keep upstream configured.
git clone https://github.com/<your-user>/MDHoriZon.git
cd MDHoriZon
git remote add upstream https://github.com/wachin/MDHoriZon.git

# 3. Install exactly what the lockfile pins.
npm ci

# 4. Branch from an up-to-date main.
git fetch upstream
git switch -c feat/short-description upstream/main

# 5. Make a small, focused change. Add or update the fixture if rendering behavior changes.
npm run dev          # manual check in the browser
npm run lint         # must pass
npm run build        # type-check + production build must pass

# 6. Commit with the project's style, then push.
git commit -m "feat: add responsive table wrapper"
git push -u origin feat/short-description
```

Then open a Pull Request against `main` of `wachin/MDHoriZon` and fill in the checklist below.

### Branch names

```text
feat/<short-description>     new behavior
fix/<short-description>      bug fix
chore/<short-description>    tooling, dependencies, config
docs/<short-description>     documentation only
test/<short-description>     tests and fixtures
```

### Commit messages

The roadmap defines the style; use the imperative mood and keep the subject short:

```text
chore: initialize vite react typescript project
feat: add markdown rendering pipeline
feat: add responsive markdown tables
feat: add code block copy button
feat: add offline content library
fix: handle relative markdown image paths
```

Keep commits small and reversible. Do not mix unrelated changes in one commit or one PR.

### Pull request checklist

Copy this into your PR description:

```markdown
## What

<!-- One paragraph: what this PR changes. -->

## Why

<!-- Link the roadmap phase/milestone or the issue it addresses. -->

## How it was verified

- [ ] `npm run lint` passes
- [ ] `npm run build` passes
- [ ] Checked manually in the desktop browser
- [ ] Golden Test Document still renders correctly (if the renderer is involved)
- [ ] New/updated fixture or test covers the change
- [ ] No unrelated files modified
- [ ] No secrets, keys or local machine configuration committed
```

### Project rules your PR must respect

- **One Markdown implementation.** Do not duplicate rendering logic and never add a separate web and mobile
  renderer.
- **The sanitizer is not optional.** Do not bypass the security layer, for performance or convenience.
- **Every supported Markdown feature gets a fixture/test.**
- **Keep the core independent from page-level UI.** Components stay small and reusable.
- **Preserve Android and iOS WebView compatibility.** Assume an older engine, touch input and no Node APIs.
- **Test both online and offline paths** whenever content loading changes.
- **Do not redesign the architecture** without documenting the reason (a note under `docs/architecture/` plus an
  explanation in the PR).
- **Do not introduce a heavy dependency** without evaluating bundle impact and justifying it.
- **Do not modify unrelated files.** Prefer separate PRs.
- **Run lint, tests and build before declaring work complete** — a feature is not done until the
  [golden rule](#the-golden-rule) is satisfied.
- **Never commit secrets**, signing keys, API keys or local machine configuration.

### Review process

- Small, focused PRs are reviewed fastest. If a change grows, split it.
- The maintainer may ask you to move a change into a later phase rather than reject it outright; the roadmap
  ordering is deliberate.
- Reviewers check correctness, cross-platform behavior, security, accessibility and roadmap alignment — not style
  preferences that ESLint/Prettier already decide.
- If CI fails, fix it in your branch; do not ask for a merge with failing checks.
- Be kind and specific in review comments. The
  [Contributor Covenant](https://www.contributor-covenant.org/version/2/1/code_of_conduct/) is the expected
  standard of behavior for issues and pull requests.

### Good first contributions

1. Add `.nvmrc` and an `engines` field matching the Node floor above.
2. Extract the agent rules in [`AGENTS.md`](AGENTS.md) into a `CONTRIBUTING.md`, if you think the split helps.
3. Write the first `docs/architecture/` note explaining the core/UI separation.
4. Add GitHub Actions workflows for `format:check`, `lint` and `build`.
5. Extend the **Golden Test Document** with the edge cases you personally tripped over.
6. Start Phase 1: the reusable `MarkdownRenderer` and its centralized plugin configuration.

---

## Documentation map

| File                                                                               | Contents                                                                                                                       |
| ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| [`ROADMAP.md`](ROADMAP.md)                                                         | **Authoritative** design document: vision, phases 0–22, milestones, validation matrix, repository rules, future editor design. |
| [`README.md`](README.md)                                                           | This file: purpose, quick start, contribution guide, bootstrap history.                                                        |
| [`tests/fixtures/Golden-Test-Document.md`](tests/fixtures/Golden-Test-Document.md) | Rendering specification and regression fixture.                                                                                |
| [`tests/assets/README.md`](tests/assets/README.md)                                 | Fixture asset inventory and how to regenerate `example.png`.                                                                   |
| [`AGENTS.md`](AGENTS.md)                                                           | Rules for AI agents and human contributors: commands, architecture invariants, forbidden operations, commit style.             |
| `docs/architecture/`                                                               | Architecture decision notes — **planned**.                                                                                     |

If this README and the roadmap ever disagree, **the roadmap wins**; please open an issue so this file can be
corrected.

---

## Security

- The sanitization layer is part of the product's contract, not a hardening afterthought.
- Never commit secrets, tokens, keystores or signing material — `.gitignore` already covers the common cases, and
  CI will eventually scan for them.
- Untrusted Markdown must never be able to execute script, attach event handlers, or trigger `javascript:` URLs.
- If you find a vulnerability, **do not open a public issue containing a working exploit**. Use GitHub's private
  vulnerability reporting (Security → Advisories → _Report a vulnerability_) on the repository, and include a
  minimal reproducing Markdown snippet.

---

## License

MDHoriZon is released under the **GNU General Public License v3.0** — see [`LICENSE`](LICENSE).

In practice this means:

- You may use, study, modify and redistribute the project, including commercially.
- If you distribute a modified version (including a hosted derivative), it must remain under GPL-3.0 and its
  source must be made available, with the original copyright notices preserved.
- **Forks are explicitly welcome** — the license is what keeps the project and all its derivatives open. If you
  fork it to build something else, please keep the license intact and, if it helps, link back to this repository.

By submitting a pull request you agree to license your contribution under the same terms.
