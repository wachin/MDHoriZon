# MDHoriZon — ROADMAP

> **Project:** `wachin/MDHoriZon`
>
> **Goal:** Build a high-quality Markdown reading and publishing engine that works consistently on the web and inside Android/iOS applications, with an optional complete offline content library.
>
> **Status:** Planning / foundation
>
> **Last updated:** September 2026

---

## 1. Project Vision

MDHoriZon will begin as a **Markdown rendering and reading engine**, not as a blog CMS.

The first objective is to make Markdown render beautifully, predictably, securely, and responsively on:

- Desktop web browsers.
- Mobile web browsers.
- Android WebView through Capacitor.
- iOS WebView through Capacitor.
- Offline mode after the user explicitly downloads the content they want available offline.

The same Markdown-processing core must be reused across all targets. There should be no separate Markdown implementation for the website and the mobile applications.

The initial reading experience should support, at minimum:

- Standard Markdown.
- GitHub Flavored Markdown (GFM).
- Tables with horizontal touch scrolling.
- Headings and anchor links.
- Ordered and unordered lists.
- Task lists.
- Blockquotes.
- Links and images.
- Inline code and fenced code blocks.
- Syntax highlighting.
- Copy-to-clipboard for code blocks.
- Mathematical notation with KaTeX.
- Mermaid diagrams.
- Responsive typography.
- Light and dark themes.
- Relative links and relative images.
- Safe handling of HTML embedded in Markdown.
- Reliable rendering in mobile WebViews.

The Markdown **editor** is out of scope: it is not a deferred feature but a withdrawn ambition, recorded at the end of
this document.

---

## 2. Core Architectural Principle

The project must separate the **rendering core** from the **application UI**.

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

### Golden rule

> **No Markdown feature is considered complete until it works in the desktop browser, mobile browser, Android WebView, and has a reproducible automated or fixture-based test.**

---

## 3. What MDHoriZon Is — and Is Not

### 3.1 Initial scope

MDHoriZon is initially:

- A Markdown rendering engine.
- A responsive reading application.
- A Markdown-based publishing frontend.
- A web application deployable to GitHub Pages.
- A Capacitor application for Android/iOS.
- An optional offline content reader.

### 3.2 Explicitly deferred

The following should **not** distract the first implementation:

- User accounts.
- Authentication.
- Comments.
- Social networking.
- Payments.
- A full CMS.
- A cloud database.
- Server-side rendering.
- A complex authoring interface.
- A complete Markdown editor — **out of scope, not deferred**; see the end of this document.

Those may be considered only after the renderer and reading experience are solid.

---

## 4. Technology Strategy

The exact package versions should be determined by the project's `package.json` and lockfile, not hard-coded permanently in this roadmap.

| Layer | Planned technology | Policy |
|---|---|---|
| UI | React + TypeScript | Use current stable versions compatible with the project |
| Build | Vite | Current stable version |
| Markdown | `react-markdown` | Primary React Markdown renderer |
| Markdown extensions | `remark-gfm` | GFM tables, task lists, strikethrough, etc. |
| Math parsing | `remark-math` | Markdown math syntax |
| Math rendering | `rehype-katex` + `katex` | Fast local math rendering |
| Code highlighting | `rehype-highlight` + `highlight.js` | Syntax highlighting |
| Diagrams | Mermaid | Lazy-load when required |
| Sanitization | `rehype-sanitize` or an equivalent controlled policy | Security boundary; verify compatibility before adoption |
| Mobile | Capacitor | Shared web application packaged for Android/iOS |
| Android | Capacitor Android + Android Studio | Native packaging and testing |
| iOS | Capacitor iOS + Xcode | Requires macOS for native builds |
| Web publishing | GitHub Pages | Static deployment |
| CI/CD | GitHub Actions | Automated tests and builds |
| Offline web | Service Worker + Cache Storage / IndexedDB as appropriate | PWA/offline reading |
| Offline mobile | Local application storage with an explicit content-download system | User-controlled offline library |

### Dependency policy

- Do not upgrade dependencies blindly.
- Review breaking changes before upgrades.
- Keep `package-lock.json` committed.
- Prefer well-maintained, focused dependencies.
- Avoid adding a dependency when the platform or existing stack already provides the required functionality.
- Every significant dependency must have a clear reason to exist.

---

## 5. Repository Rules for AI Agents

Create `AGENTS.md` during the foundation phase.

It should require agents to follow these principles:

- Do not redesign the architecture without documenting the reason.
- Do not duplicate Markdown rendering logic.
- Do not create separate web and mobile renderers.
- Every supported Markdown feature gets a fixture/test.
- Do not bypass the security/sanitization layer.
- Do not introduce a heavy dependency without evaluating bundle impact.
- Keep components small and reusable.
- Keep the rendering core independent from page-level UI.
- Preserve Android WebView compatibility.
- Preserve iOS WebView compatibility.
- Test both online and offline paths whenever content loading is changed.
- Do not modify unrelated files.
- Prefer small, reversible commits.
- Run lint, tests, and build before declaring a phase complete.
- Never commit secrets, signing keys, API keys, or local machine configuration.
- Write documentation, code comments and commit messages in English, so international contributors can review the
  project. Translated documents are welcome as additional files (for example `README.es.md`), never as replacements.

Recommended commit style:

```text
chore: initialize vite react typescript project
feat: add markdown rendering pipeline
feat: add responsive markdown tables
feat: add code block copy button
feat: add offline content library
fix: handle relative markdown image paths
```

---

# Development Phases

## Phase 0 — Repository Foundation

### Objective

Create the minimum project structure without prematurely implementing application features.

### Tasks

- [x] Confirm the GitHub repository is `wachin/MDHoriZon`.
- [x] Initialize Vite + React + TypeScript.
- [x] Configure ESLint.
- [x] Configure Prettier.
- [x] Configure TypeScript with strict checking.
- [x] Configure `vite.config.ts` for GitHub Pages.
- [x] Determine the repository base path dynamically or configure it explicitly for the final repository name.
- [x] Add `public/.nojekyll` if required by the deployment strategy.
- [x] Add `AGENTS.md`.
- [x] Add the project `.gitignore`.
- [x] Add the Golden Test Document.
- [x] Commit the initial foundation.

Recommended command:

```bash
npm create vite@latest . -- --template react-ts
```

### Initial structure

```text
src/
├── core/
│   ├── markdown/
│   ├── security/
│   ├── code/
│   ├── math/
│   └── mermaid/
├── components/
├── content/
├── styles/
├── tests/
├── App.tsx
└── main.tsx
```

Do not create every directory merely for appearance. Create directories when the corresponding implementation begins.

---

## Phase 1 — Markdown Rendering Core

### Objective

Build a reusable renderer before building a complete publishing application.

### Base pipeline

```text
Markdown
  → remark parsing
  → remark-gfm
  → remark-math
  → rehype processing
  → security policy / sanitization
  → React rendering
```

### Tasks

- [x] Install the minimum Markdown dependencies.
- [x] Implement a reusable `MarkdownRenderer`.
- [x] Keep plugin configuration centralized.
- [x] Implement GFM support.
- [x] Implement headings.
- [x] Implement paragraphs.
- [x] Implement emphasis and strong text.
- [x] Implement links.
- [x] Implement ordered and unordered lists.
- [x] Implement task lists.
- [x] Implement blockquotes.
- [x] Implement horizontal rules.
- [x] Implement inline code.
- [x] Implement fenced code blocks.
- [x] Implement tables.
- [x] Implement images.
- [ ] Implement relative links.
- [ ] Implement relative images.
- [x] Implement heading anchors.
- [x] Add deterministic heading IDs.

### Component separation

The renderer should use specialized components where behavior or styling is non-trivial:

```text
MarkdownRenderer
├── CodeBlock
├── TableWrapper
├── MermaidDiagram
├── ResponsiveImage
├── Heading
└── Link
```

The Markdown parser configuration belongs in the core layer, not scattered throughout visual components.

---

## Phase 2 — Security Boundary

Security must be designed before accepting arbitrary Markdown content.

### HTML policy

Explicitly decide what happens when Markdown contains raw HTML.

Possible policy:

1. Raw HTML disabled by default.
2. If raw HTML is eventually allowed, sanitize it through an explicit allowlist.
3. Never assume Markdown is trusted merely because it is stored in a Git repository.

The **shape** of this boundary is decided in [`docs/architecture/0003-sanitization-policy.md`](docs/architecture/0003-sanitization-policy.md):
raw HTML from the document never reaches the DOM, a sanitization stage runs unconditionally to contain what the
plugins generate (KaTeX HTML, Mermaid SVG, highlighted markup), and the URL policy is enforced on both sides. The
element, attribute and URL-scheme lists below are the deliverables that fill it in.

### Tasks

- [x] Evaluate `rehype-sanitize` — recorded in [`docs/architecture/0003-sanitization-policy.md`](docs/architecture/0003-sanitization-policy.md).
- [x] Define allowed HTML elements.
- [x] Define allowed attributes.
- [x] Define allowed URL schemes.
- [x] Reject dangerous `javascript:` URLs.
- [x] Review `data:` URLs.
- [x] Review SVG handling.
- [x] Review embedded HTML.
- [x] Review external images.
- [x] Review links opened externally from Android/iOS.
- [x] Add malicious-input fixtures.
- [x] Verify Mermaid content cannot escape its intended rendering boundary.
- [x] Verify code blocks are rendered as text/code rather than executable HTML.

### Security test cases

At minimum test:

```text
javascript: URLs
HTML <script> attempts
onerror attributes
malicious SVG
unsafe iframe/embed/object elements
malformed HTML
HTML entities
unexpected URL schemes
```

Security is a release criterion, not a future enhancement.

---

## Phase 3 — Golden Test Suite

### Objective

Create a permanent rendering specification that makes regressions visible.

Create:

```text
tests/
├── assets/
└── fixtures/
    └── Golden-Test-Document.md
```

This document must contain representative examples of every supported Markdown feature.

### Tasks

- [x] Add the Golden Test Document.
- [x] Render it in the application.
- [x] Use it as the baseline for every renderer change.
- [x] Decide the test tooling and test layout. **Vitest**, with jsdom, Testing Library and jest-dom matchers, for
      unit/component tests colocated with the code (`src/**/*.test.ts(x)`), plus fixture and cross-cutting tests
      under `tests/` that run in Node. Recorded in `docs/architecture/0001-test-runner-and-test-layout.md`; the
      ambiguous `src/tests/` directory below is dropped.
- [x] Declare the supported Node.js baseline (`^20.19.0 || ^22.13.0 || >=24`) in `package.json#engines` and
      `.nvmrc`.
- [x] Add a CI workflow that runs `format:check`, `lint`, `typecheck`, `build` and the test suite on pull requests,
      using the declared Node.js version.
- [x] Add parser/component tests for important edge cases.
- [x] Add regression tests whenever a rendering bug is discovered.
- [ ] Test the same fixture in desktop web, mobile web, and Capacitor WebView.
- [ ] Add a mechanism for comparing expected behavior after intentional renderer changes.

### Golden test categories

The document should cover:

- Headings H1–H6.
- Paragraphs.
- Bold/italic/strikethrough.
- Inline code.
- Fenced code.
- Long code lines.
- Multiple programming languages.
- Links.
- Relative links.
- External links.
- Images.
- Missing images.
- Image alt text.
- Image links.
- Ordered lists.
- Unordered lists.
- Nested lists.
- Task lists.
- Blockquotes.
- Nested blockquotes.
- Tables.
- Wide tables.
- Tables containing formatting.
- Tables containing code.
- Tables containing links.
- Tables containing math where supported.
- Horizontal rules.
- Escaping.
- Special characters.
- Inline math.
- Display math.
- Matrices.
- Long mathematical expressions.
- Mermaid flowcharts.
- Mermaid sequence diagrams.
- Mermaid class/state examples where supported.
- Frontmatter example.
- Raw HTML behavior.
- Security test examples.

---

## Phase 4 — Code Blocks and Tables

### Code blocks

Implement:

- [x] Language detection.
- [x] Language label.
- [x] Syntax highlighting.
- [x] Copy button.
- [x] Copy success feedback.
- [x] Copy failure fallback.
- [x] Long-line horizontal scrolling.
- [x] Unknown-language fallback.
- [x] Plain-text code block support.
- [x] Accessible copy button.
- [x] Keyboard accessibility.
- [x] Mobile usability.

Do not use a fixed syntax-highlighting theme permanently. Define MDHoriZon's own light/dark code themes later.

### Tables

Implement:

- [x] Responsive table wrapper.
- [x] Horizontal touch scrolling.
- [x] Desktop overflow behavior.
- [x] Long cell handling.
- [x] Wide tables.
- [x] Formatted table content.
- [x] Accessible table semantics.

Test at least:

```text
2 columns
3 columns
5 columns
8 columns
12 columns
20 columns
```

Also test long text, links, code, bold, lists where supported, and mathematical expressions inside cells.

---

## Phase 5 — Mathematics with KaTeX

### Tasks

- [x] Configure `remark-math`.
- [x] Configure `rehype-katex`.
- [x] Include KaTeX CSS correctly.
- [x] Test inline math.
- [x] Test display math.
- [x] Test fractions.
- [x] Test superscripts/subscripts.
- [x] Test Greek letters.
- [x] Test integrals.
- [x] Test sums/products.
- [x] Test matrices.
- [x] Test aligned expressions where supported.
- [x] Test long formulas on narrow screens.
- [x] Test formulas in lists.
- [x] Test formulas in blockquotes.
- [x] Test formulas in tables where supported.
- [x] Test missing/invalid math gracefully.
- [x] Evaluate KaTeX font loading and bundle size.

Example fixture:

```markdown
Inline: $E = mc^2$

Display:

$$
\int_0^\infty e^{-x}\,dx = 1
$$
```

---

## Phase 6 — Mermaid Diagrams

Mermaid should be treated as a special Markdown code block.

```text
```mermaid
...
```
```

The renderer must distinguish:

```text
normal language code → CodeBlock
mermaid code         → MermaidDiagram
```

### Tasks

- [x] Detect `language-mermaid`.
- [x] Implement `MermaidDiagram`.
- [x] Lazy-load Mermaid.
- [x] Prevent Mermaid from unnecessarily increasing initial bundle size.
- [x] Support light/dark Mermaid themes.
- [x] Handle rendering errors gracefully.
- [x] Display useful error feedback without crashing the article.
- [x] Test flowcharts.
- [x] Test sequence diagrams.
- [x] Test additional supported diagram types.
- [x] Test diagrams on narrow screens.
- [ ] Test diagrams inside offline mode.
- [ ] Test diagrams inside Android WebView.

---

## Phase 7 — Reading Experience

### Typography

- [x] Establish readable body typography.
- [x] Establish heading hierarchy.
- [x] Establish line height.
- [x] Establish paragraph spacing.
- [x] Establish list spacing.
- [x] Establish blockquote styling.
- [x] Establish code typography.
- [x] Establish table typography.
- [x] Establish image sizing rules.
- [x] Establish maximum reading width.

### Themes

Use CSS variables for the visual system:

```text
--font-body
--font-mono
--text-primary
--text-secondary
--background
--surface
--border-color
--link-color
--code-background
--blockquote-background
```

- [x] Light theme.
- [x] Dark theme.
- [x] Follow system preference.
- [x] Manual theme selection.
- [x] Persist user preference.
- [x] Verify KaTeX readability in both themes.
- [x] Verify Mermaid readability in both themes.
- [x] Verify code readability in both themes.

### Navigation

- [x] Table of contents.
- [x] Heading anchors.
- [ ] Article navigation.
- [ ] Scroll position handling.
- [ ] Back navigation on mobile.

---

## Phase 8 — Images and Relative Assets

Images deserve their own validation because Markdown documents may reference local assets.

### Tasks

- [x] Support remote images.
- [x] Support relative images.
- [x] Support images next to Markdown files.
- [x] Make images responsive.
- [x] Preserve aspect ratio.
- [x] Handle very wide images.
- [x] Handle very tall images.
- [x] Handle missing images.
- [x] Display meaningful alt text.
- [x] Test image links.
- [x] Define how image assets are included in offline downloads.
- [ ] Prevent broken relative paths after content is copied to local storage.

The offline content system must know that a Markdown article and its referenced local assets form a content package.

---

## Phase 9 — Content Model and Frontmatter

Only after the renderer is stable should MDHoriZon become a multi-document reading application.

### Proposed document model

```yaml
---
title: Example article
description: Example description
date: 2026-09-13
tags:
  - linux
  - markdown
---
```

### Tasks

- [x] Choose frontmatter parser.
- [x] Define supported metadata.
- [x] Define required vs optional fields.
- [x] Build a content manifest.
- [x] Build article index.
- [x] Build categories/tags if useful.
- [x] Build previous/next navigation.
- [x] Build search.
- [x] Support deterministic article IDs/paths.

Avoid introducing a headless CMS at this stage.

---

## Phase 10 — Content Loading Architecture

The application should support several content sources without changing the Markdown renderer.

### Source A — Bundled content

Markdown files are included in the application build.

Advantages:

- Works immediately offline.
- Simple.
- Predictable.

Disadvantage:

- Updating content requires a new application build unless another source is added.

### Source B — Web-hosted Markdown

The web application fetches Markdown and assets from the deployed content source.

Requirements:

- [ ] Content manifest.
- [ ] Version identifier.
- [ ] Relative asset resolution.
- [ ] Error handling.

### Source C — Downloaded local content

The mobile application downloads the complete content collection when the user requests it.

This becomes the preferred path for user-controlled offline reading.

---

## Phase 11 — Offline Content Library

### Objective

A user must be able to choose an option such as:

> **Download all content for offline use**

After the download completes, the user must be able to open and read the downloaded content without an Internet connection.

The feature should not depend on a network connection after the download has completed.

### Important distinction

Offline mode is **not merely browser caching**.

The application needs an explicit content model that knows:

```text
content manifest
    ↓
articles
    ↓
Markdown files
    ↓
images/assets
    ↓
local storage
```

### Download process

```text
User selects "Download all"
            ↓
Fetch content manifest
            ↓
Determine content version
            ↓
Calculate files/assets required
            ↓
Download Markdown + assets
            ↓
Validate downloads
            ↓
Store locally
            ↓
Write local manifest
            ↓
Mark content version as complete
            ↓
Offline library becomes available
```

### Tasks

- [ ] Design a versioned content manifest.
- [ ] Define manifest format.
- [ ] Include article paths.
- [ ] Include asset paths.
- [ ] Include content version.
- [ ] Include file size where useful.
- [ ] Include integrity information where appropriate.
- [ ] Implement download-all operation.
- [ ] Show progress.
- [ ] Support pause/cancel if practical.
- [ ] Validate downloaded files.
- [ ] Avoid marking incomplete downloads as complete.
- [ ] Store content in application-controlled local storage.
- [ ] Store offline metadata separately from article content.
- [ ] Show downloaded size.
- [ ] Show current content version.
- [ ] Allow deleting the offline library.
- [ ] Allow re-downloading after deletion.
- [ ] Allow updating an existing offline library.
- [ ] Detect changed content.
- [ ] Download only changed files during updates.
- [ ] Handle failed downloads.
- [ ] Handle interrupted downloads.
- [ ] Handle insufficient storage gracefully.
- [ ] Test airplane mode.
- [ ] Test with Wi-Fi disabled.
- [ ] Test after application restart.
- [ ] Test after device restart.

### Storage technology

Do not decide the final storage implementation merely because a technology is popular.

Evaluate:

- IndexedDB.
- Cache Storage.
- Capacitor Filesystem.
- SQLite if metadata/query requirements eventually justify it.

The final choice must consider:

- Android.
- iOS.
- Web.
- Storage limits.
- Performance.
- Large content collections.
- Asset management.
- Atomic updates.
- Recovery after interrupted downloads.

### Offline reading rule

The renderer must receive content in exactly the same form regardless of whether it came from:

```text
network
bundled assets
local offline storage
```

The rendering layer must not know or care where the Markdown originated.

---

## Phase 12 — Progressive Web App / Web Offline

The web version should eventually support offline reading too, where practical.

### Tasks

- [ ] Evaluate PWA requirements.
- [ ] Add service worker.
- [ ] Cache application shell.
- [ ] Cache downloaded content.
- [ ] Define cache versioning.
- [ ] Define cache invalidation.
- [ ] Avoid stale content becoming silently permanent.
- [ ] Provide offline/online status when useful.
- [ ] Test reload while offline.
- [ ] Test navigation while offline.

The PWA offline mechanism and mobile offline library may share concepts, but they should not be artificially forced into the same storage implementation.

---

## Phase 13 — Web Publishing on GitHub Pages

### Tasks

- [ ] Configure GitHub Pages deployment.
- [ ] Build with GitHub Actions.
- [ ] Deploy the `dist` directory.
- [ ] Configure correct repository base path.
- [ ] Verify all static assets.
- [ ] Verify relative Markdown links.
- [ ] Verify relative images.
- [ ] Verify code blocks.
- [ ] Verify tables.
- [ ] Verify KaTeX.
- [ ] Verify Mermaid.
- [ ] Verify mobile browser rendering.
- [ ] Add SEO title.
- [ ] Add description.
- [ ] Add Open Graph metadata.
- [ ] Add appropriate favicon/app icons later.

### Bootstrap status

The deployment plumbing was wired up early, while the project is still in Phase 0, so that enabling Pages does not
leave the repository in a half-configured state:

- Repository setting: **Settings → Pages → Source = GitHub Actions**. With that source, Pages publishes nothing
  until a workflow uploads an artifact; without a workflow the site simply returns 404.
- `.github/workflows/deploy-pages.yml` installs with `npm ci`, runs `npm run build`, uploads `dist/` and deploys the
  resulting artifact.
- The build receives the base path reported by `actions/configure-pages` through `VITE_BASE`, so a fork or a renamed
  repository deploys correctly without editing `vite.config.ts`.

The remaining tasks below stay open for the phase itself: publishing the starter screen is not the same as
publishing a working reader, and the phase is not complete until they pass.

Recommended deployment principle:

```text
main
 ↓
GitHub Actions
 ↓
npm ci
 ↓
tests
 ↓
npm run build
 ↓
GitHub Pages
```

Deployment should fail if the test suite fails.

---

## Phase 14 — Mobile Packaging with Capacitor

Only begin this phase when the web renderer is mature.

### Entry criteria

Before adding Capacitor, verify:

- [ ] Markdown works.
- [ ] GFM works.
- [ ] Tables work.
- [ ] Code blocks work.
- [ ] Copy works.
- [ ] Math works.
- [ ] Mermaid works.
- [ ] Images work.
- [ ] Relative links work.
- [ ] Themes work.
- [ ] Security tests pass.
- [ ] Golden Test Document passes.
- [ ] Mobile browser tests pass.

### Android

- [ ] Install Capacitor packages.
- [ ] Add Android platform.
- [ ] Sync project.
- [ ] Open/build with Android Studio.
- [ ] Configure safe areas.
- [ ] Configure status bar if needed.
- [ ] Handle Android back navigation.
- [ ] Test external links.
- [ ] Test clipboard.
- [ ] Test local offline content.
- [ ] Test airplane mode.
- [ ] Test on a physical Android device.

### iOS

- [ ] Add iOS platform when macOS access is available.
- [ ] Configure Xcode project.
- [ ] Configure signing.
- [ ] Test WebView rendering.
- [ ] Test offline content.
- [ ] Test external links.
- [ ] Test navigation.

---

## Phase 15 — Android CI/CD

### Signing

- [ ] Generate a release keystore locally.
- [ ] Never commit the keystore.
- [ ] Store signing information only in GitHub Secrets.
- [ ] Document secure backup of the release key outside the repository.

### Workflow

The Android workflow should:

```text
checkout
  ↓
setup Node
  ↓
setup JDK
  ↓
npm ci
  ↓
tests
  ↓
npm run build
  ↓
Capacitor sync
  ↓
Gradle build
  ↓
sign release
  ↓
upload artifact
```

### Tasks

- [ ] Build debug APK locally.
- [ ] Build release APK locally.
- [ ] Configure GitHub Actions.
- [ ] Configure signing secrets.
- [ ] Build on tags/releases.
- [ ] Upload APK artifact.
- [ ] Optionally publish releases automatically later.
- [ ] Verify installation on a physical device.

Do not put passwords or signing material in workflow source files.

---

## Phase 16 — iOS CI/CD (Optional)

Requires macOS runners and Apple signing infrastructure.

- [ ] Evaluate whether CI is worthwhile.
- [ ] Configure macOS GitHub Actions runner.
- [ ] Configure certificates/profiles securely.
- [ ] Build archive.
- [ ] TestFlight distribution.
- [ ] Document signing recovery procedures.

---

## Phase 17 — Content Search and Application Navigation

Once the content model is stable:

- [ ] Article index.
- [ ] Search.
- [ ] Search result highlighting.
- [ ] Tags/categories if useful.
- [ ] Favorites/bookmarks if useful.
- [ ] Recently read articles.
- [ ] Reading position persistence.
- [ ] Previous/next article navigation.
- [ ] Table of contents.

Do not add these merely because they are common in note applications. Each feature should improve the reading experience.

---

## Phase 18 — Performance and Bundle Optimization

### Tasks

- [ ] Measure initial JavaScript bundle.
- [ ] Lazy-load Mermaid.
- [ ] Evaluate KaTeX loading cost.
- [ ] Avoid loading unused languages into highlight.js.
- [ ] Evaluate code splitting.
- [ ] Optimize images.
- [ ] Avoid duplicate Markdown parsing.
- [ ] Avoid re-rendering unchanged articles.
- [ ] Measure large documents.
- [ ] Measure large content collections.
- [ ] Measure offline library startup.
- [ ] Test low-end Android hardware.

Performance decisions should be based on measurements rather than assumptions.

---

## Phase 19 — Accessibility

Accessibility is part of the renderer, not a final cosmetic phase.

- [ ] Semantic headings.
- [ ] Logical heading hierarchy.
- [ ] Keyboard navigation.
- [ ] Accessible links.
- [ ] Accessible buttons.
- [ ] Accessible copy button.
- [ ] Meaningful image alt text.
- [ ] Sufficient color contrast.
- [ ] Visible focus states.
- [ ] Reduced-motion consideration.
- [ ] Screen-reader testing where practical.
- [ ] Accessible table semantics.
- [ ] Accessible Mermaid fallback/error state.

---

## Phase 20 — Cross-Platform Validation Matrix

Every release candidate should be checked against:

| Feature | Desktop Web | Mobile Web | Android | iOS | Offline |
|---|---:|---:|---:|---:|---:|
| Basic Markdown | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| GFM | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| Tables | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| Wide tables | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| Code blocks | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| Copy button | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| KaTeX | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| Mermaid | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| Images | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| Relative assets | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| Themes | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| Navigation | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| Security | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| Download all | — | — | ⬜ | ⬜ | ⬜ |
| Offline reading | ⬜* | ⬜* | ⬜ | ⬜ | ⬜ |

`*` depending on the final PWA implementation.

---

# Repository Structure — Target

```text
MDHoriZon/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.yml
│   │   ├── config.yml
│   │   └── feature_request.yml
│   ├── dependabot.yml
│   ├── pull_request_template.md
│   └── workflows/
│       ├── ci.yml
│       ├── deploy-pages.yml
│       ├── android-build.yml
│       └── ios-build.yml                 # optional
│
├── public/
│   ├── .nojekyll
│   └── assets/
│
├── src/
│   ├── core/
│   │   ├── markdown/
│   │   │   ├── plugins.ts
│   │   │   ├── render.ts
│   │   │   └── types.ts
│   │   ├── security/
│   │   │   └── sanitize.ts
│   │   ├── code/
│   │   ├── math/
│   │   └── mermaid/
│   │
│   ├── components/
│   │   ├── MarkdownRenderer.tsx
│   │   ├── CodeBlock.tsx
│   │   ├── TableWrapper.tsx
│   │   ├── MermaidDiagram.tsx
│   │   ├── ResponsiveImage.tsx
│   │   ├── TableOfContents.tsx
│   │   └── ArticleView.tsx
│   │
│   ├── content/
│   │   ├── manifest.ts
│   │   └── loaders/
│   │
│   ├── offline/
│   │   ├── downloadManager.ts
│   │   ├── storage.ts
│   │   ├── manifest.ts
│   │   └── integrity.ts
│   │
│   ├── styles/
│   │   ├── markdown.css
│   │   ├── themes.css
│   │   └── app.css
│   │
│   ├── App.tsx                           # unit/component tests are colocated: App.test.tsx
│   └── main.tsx
│
├── tests/
│   ├── articles/                         # relative-link targets used by the fixtures
│   │   └── example.md
│   ├── assets/                           # assets referenced by the fixtures
│   ├── fixtures/
│   │   └── Golden-Test-Document.md
│   ├── setup.ts                          # jest-dom matchers; Testing Library cleanup
│   └── *.test.ts                         # fixture and cross-cutting guards (node environment)
│
├── docs/
│   ├── architecture/                     # decision records (why, not what)
│   ├── continuing-development.md         # prompt for handing the project to an AI agent
│   └── references.md                     # curated sources, pinned revisions and findings
│
├── android/                              # generated by Capacitor
├── ios/                                   # generated by Capacitor
├── capacitor.config.ts
├── vite.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── tsconfig.test.json                    # type-checks tests with node + vite/client types
├── eslint.config.js
├── .editorconfig
├── .gitattributes                        # LF everywhere; binary assets never converted
├── .nvmrc                                # Node version pinned by engines
├── .prettierrc.json
├── .prettierignore
├── package.json
├── package-lock.json
├── AGENTS.md                             # rules for human and AI contributors
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md                       # entry point for new contributors
├── SECURITY.md                           # private vulnerability reporting
├── .gitignore
├── ROADMAP.md
└── README.md
```

The structure is a target, not a requirement to create empty directories immediately.

---

# Rendering Validation Checklist

The Golden Test Document must be rendered successfully before a renderer milestone can be marked complete.

## Markdown

- [ ] H1–H6.
- [ ] Paragraphs.
- [ ] Bold.
- [ ] Italic.
- [ ] Strikethrough.
- [ ] Inline code.
- [ ] Links.
- [ ] Images.
- [ ] Ordered lists.
- [ ] Unordered lists.
- [ ] Nested lists.
- [ ] Task lists.
- [ ] Blockquotes.
- [ ] Horizontal rules.

## GFM

- [ ] Tables.
- [ ] Wide tables.
- [ ] Task lists.
- [ ] Strikethrough.
- [ ] Autolinks and other selected GFM behavior.

## Code

- [ ] Bash.
- [ ] Python.
- [ ] JavaScript.
- [ ] TypeScript.
- [ ] JSON.
- [ ] HTML.
- [ ] CSS.
- [ ] Unknown language.
- [ ] Long lines.
- [ ] Copy button.

## Mathematics

- [ ] Inline formulas.
- [ ] Display formulas.
- [ ] Fractions.
- [ ] Matrices.
- [ ] Long formulas.

## Mermaid

- [ ] Flowchart.
- [ ] Sequence diagram.
- [ ] Error handling.
- [ ] Dark theme.
- [ ] Light theme.
- [ ] Mobile width.
- [ ] Offline rendering.

## Security

- [ ] Unsafe URL tests.
- [ ] HTML tests.
- [ ] SVG tests.
- [ ] Script injection tests.
- [ ] Attribute injection tests.

---

# Reference and Study Projects

The purpose of studying other projects is to understand architecture and implementation techniques, **not to copy code or design blindly**.

| Project | Why study it |
|---|---|
| MarkText / Muya-based projects | Markdown rendering architecture and editor/renderer separation |
| Noteriv | Web/mobile architecture ideas |
| `react-markdown` | React Markdown pipeline and custom components |
| `remark` / `rehype` ecosystem | AST-based Markdown processing |
| Mermaid | Diagram rendering and lazy loading |
| KaTeX | Mathematical rendering |
| DeepSeek Harness (MIT) | A mature renderer for untrusted, **streaming** Markdown on the same `micromark`/`mdast` core this roadmap chose. Its sanitization strategy, its WASM-free highlighter and its CJK emphasis extension are direct inputs for Phases 1, 2, 4 and 5 |

[`docs/references.md`](docs/references.md) holds the detail: what to read in each project, the pinned revision, what has been verified and what is still unread. Reference material is **not vendored** into this repository — see [ADR 0002](docs/architecture/0002-reference-material-lives-outside-the-repo.md).

During research, record useful discoveries in `docs/architecture/` instead of putting every observation into source code comments.

---

# Milestones

| Milestone | Description | Status |
|---|---|---|
| **M0** | Repository foundation, linting, formatting, agent rules | ✅ |
| **M1** | Core Markdown/GFM renderer | ⬜ |
| **M2** | Security boundary and sanitization | ⬜ |
| **M3** | Golden Test Suite | ⬜ |
| **M4** | Code blocks, tables, math, Mermaid | ⬜ |
| **M5** | Reading experience and themes | ⬜ |
| **M6** | Content model and article navigation | ⬜ |
| **M7** | GitHub Pages publishing | ⬜ |
| **M8** | Android Capacitor application | ⬜ |
| **M9** | Offline content download/library | ⬜ |
| **M10** | Android CI/CD and signed builds | ⬜ |
| **M11** | iOS application | ⬜ |
| **M12** | Search, performance, accessibility, release hardening | ⬜ |

`✅` complete · `🟡` in progress · `⬜` not started

---

# Definition of Done

A phase is not complete merely because the code compiles.

A phase is complete when:

- [ ] The implementation exists.
- [ ] The architecture remains consistent.
- [ ] Relevant tests exist.
- [ ] The Golden Test Document still behaves correctly.
- [ ] Security implications have been considered.
- [ ] Desktop web has been tested.
- [ ] Mobile web has been tested when relevant.
- [ ] Android WebView has been tested when relevant.
- [ ] iOS WebView has been tested when relevant.
- [ ] Offline behavior has been tested when relevant.
- [ ] `npm run build` succeeds.
- [ ] Lint succeeds.
- [ ] Tests succeed.
- [ ] Documentation has been updated.

---
# Out of Scope — the Markdown Editor

An early version of this roadmap planned a future **MDHoriZon Live Markdown Editor**: Phase 21 would research the
architecture and Phase 22 would build a prototype, with *"reading and writing the same document as two natural
states of one experience"* as the project's stated ambition.

**That ambition is withdrawn.** The decision and its reasoning are recorded in
[`docs/architecture/0004-editor-out-of-scope.md`](docs/architecture/0004-editor-out-of-scope.md). In short:

- The need is already met, and met well, by MIT-licensed software: MarkText, plus a Capacitor-based port of it for
  Android. An excellent reader is worth more than a mediocre editor.
- A live-preview editor needs its own parser and its own rendering model. The reference implementation carries
  both, so adopting it would put **two Markdown implementations** inside this project — exactly what
  [`AGENTS.md`](AGENTS.md) forbids — and reconciling that would cost more than the phases were worth.
- The remaining phases are the ones that make MDHoriZon distinctive: one core rendered identically on the web, in
  Android WebView and in iOS WebView, behind a security boundary, with a user-controlled offline library.

What this changes:

- **Phases 0–20 are the whole plan.** There is no Phase 21 and no Phase 22.
- Nothing in this document is "future research": every phase here is meant to be finished.
- The editor may return as a **separate project** with its own roadmap if the reader is ever stable enough to
  justify it. That would be a new decision, not a leftover of this one.

**Final principle.** MDHoriZon is a Markdown **reading and publishing engine**: one core, every target, offline when
the user asks for it, and untrusted content that cannot escape its rendering boundary. Success is that a document
looks and behaves the same everywhere it is opened — and that a reader can be trusted with anything they did not
write themselves.

