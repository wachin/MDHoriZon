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

A later phase may turn the same engine into a Markdown editor.

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
- A complete Markdown editor.

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

- [*] Confirm the GitHub repository is `wachin/MDHoriZon`.
- [ ] Initialize Vite + React + TypeScript.
- [ ] Configure ESLint.
- [ ] Configure Prettier.
- [ ] Configure TypeScript with strict checking.
- [ ] Configure `vite.config.ts` for GitHub Pages.
- [ ] Determine the repository base path dynamically or configure it explicitly for the final repository name.
- [ ] Add `public/.nojekyll` if required by the deployment strategy.
- [ ] Add `AGENTS.md`.
- [ ] Add the project `.gitignore`.
- [ ] Add the Golden Test Document.
- [ ] Commit the initial foundation.

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

- [ ] Install the minimum Markdown dependencies.
- [ ] Implement a reusable `MarkdownRenderer`.
- [ ] Keep plugin configuration centralized.
- [ ] Implement GFM support.
- [ ] Implement headings.
- [ ] Implement paragraphs.
- [ ] Implement emphasis and strong text.
- [ ] Implement links.
- [ ] Implement ordered and unordered lists.
- [ ] Implement task lists.
- [ ] Implement blockquotes.
- [ ] Implement horizontal rules.
- [ ] Implement inline code.
- [ ] Implement fenced code blocks.
- [ ] Implement tables.
- [ ] Implement images.
- [ ] Implement relative links.
- [ ] Implement relative images.
- [ ] Implement heading anchors.
- [ ] Add deterministic heading IDs.

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

### Tasks

- [ ] Evaluate `rehype-sanitize`.
- [ ] Define allowed HTML elements.
- [ ] Define allowed attributes.
- [ ] Define allowed URL schemes.
- [ ] Reject dangerous `javascript:` URLs.
- [ ] Review `data:` URLs.
- [ ] Review SVG handling.
- [ ] Review embedded HTML.
- [ ] Review external images.
- [ ] Review links opened externally from Android/iOS.
- [ ] Add malicious-input fixtures.
- [ ] Verify Mermaid content cannot escape its intended rendering boundary.
- [ ] Verify code blocks are rendered as text/code rather than executable HTML.

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
└── fixtures/
    └── Golden Test Document.md
```

This document must contain representative examples of every supported Markdown feature.

### Tasks

- [ ] Add the Golden Test Document.
- [ ] Render it in the application.
- [ ] Use it as the baseline for every renderer change.
- [ ] Add parser/component tests for important edge cases.
- [ ] Add regression tests whenever a rendering bug is discovered.
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

- [ ] Language detection.
- [ ] Language label.
- [ ] Syntax highlighting.
- [ ] Copy button.
- [ ] Copy success feedback.
- [ ] Copy failure fallback.
- [ ] Long-line horizontal scrolling.
- [ ] Unknown-language fallback.
- [ ] Plain-text code block support.
- [ ] Accessible copy button.
- [ ] Keyboard accessibility.
- [ ] Mobile usability.

Do not use a fixed syntax-highlighting theme permanently. Define MDHoriZon's own light/dark code themes later.

### Tables

Implement:

- [ ] Responsive table wrapper.
- [ ] Horizontal touch scrolling.
- [ ] Desktop overflow behavior.
- [ ] Long cell handling.
- [ ] Wide tables.
- [ ] Formatted table content.
- [ ] Accessible table semantics.

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

- [ ] Configure `remark-math`.
- [ ] Configure `rehype-katex`.
- [ ] Include KaTeX CSS correctly.
- [ ] Test inline math.
- [ ] Test display math.
- [ ] Test fractions.
- [ ] Test superscripts/subscripts.
- [ ] Test Greek letters.
- [ ] Test integrals.
- [ ] Test sums/products.
- [ ] Test matrices.
- [ ] Test aligned expressions where supported.
- [ ] Test long formulas on narrow screens.
- [ ] Test formulas in lists.
- [ ] Test formulas in blockquotes.
- [ ] Test formulas in tables where supported.
- [ ] Test missing/invalid math gracefully.
- [ ] Evaluate KaTeX font loading and bundle size.

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

- [ ] Detect `language-mermaid`.
- [ ] Implement `MermaidDiagram`.
- [ ] Lazy-load Mermaid.
- [ ] Prevent Mermaid from unnecessarily increasing initial bundle size.
- [ ] Support light/dark Mermaid themes.
- [ ] Handle rendering errors gracefully.
- [ ] Display useful error feedback without crashing the article.
- [ ] Test flowcharts.
- [ ] Test sequence diagrams.
- [ ] Test additional supported diagram types.
- [ ] Test diagrams on narrow screens.
- [ ] Test diagrams inside offline mode.
- [ ] Test diagrams inside Android WebView.

---

## Phase 7 — Reading Experience

### Typography

- [ ] Establish readable body typography.
- [ ] Establish heading hierarchy.
- [ ] Establish line height.
- [ ] Establish paragraph spacing.
- [ ] Establish list spacing.
- [ ] Establish blockquote styling.
- [ ] Establish code typography.
- [ ] Establish table typography.
- [ ] Establish image sizing rules.
- [ ] Establish maximum reading width.

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

- [ ] Light theme.
- [ ] Dark theme.
- [ ] Follow system preference.
- [ ] Manual theme selection.
- [ ] Persist user preference.
- [ ] Verify KaTeX readability in both themes.
- [ ] Verify Mermaid readability in both themes.
- [ ] Verify code readability in both themes.

### Navigation

- [ ] Table of contents.
- [ ] Heading anchors.
- [ ] Article navigation.
- [ ] Scroll position handling.
- [ ] Back navigation on mobile.

---

## Phase 8 — Images and Relative Assets

Images deserve their own validation because Markdown documents may reference local assets.

### Tasks

- [ ] Support remote images.
- [ ] Support relative images.
- [ ] Support images next to Markdown files.
- [ ] Make images responsive.
- [ ] Preserve aspect ratio.
- [ ] Handle very wide images.
- [ ] Handle very tall images.
- [ ] Handle missing images.
- [ ] Display meaningful alt text.
- [ ] Test image links.
- [ ] Define how image assets are included in offline downloads.
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

- [ ] Choose frontmatter parser.
- [ ] Define supported metadata.
- [ ] Define required vs optional fields.
- [ ] Build a content manifest.
- [ ] Build article index.
- [ ] Build categories/tags if useful.
- [ ] Build previous/next navigation.
- [ ] Build search.
- [ ] Support deterministic article IDs/paths.

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
│   └── workflows/
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
│   ├── tests/
│   ├── App.tsx
│   └── main.tsx
│
├── tests/
│   └── fixtures/
│       └── Golden Test Document.md
│
├── docs/
│   └── architecture/
│
├── android/                              # generated by Capacitor
├── ios/                                   # generated by Capacitor
├── capacitor.config.ts
├── vite.config.ts
├── tsconfig.json
├── eslint.config.js
├── package.json
├── package-lock.json
├── AGENTS.md
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

During research, record useful discoveries in `docs/architecture/` instead of putting every observation into source code comments.

---

# Milestones

| Milestone | Description | Status |
|---|---|---|
| **M0** | Repository foundation, linting, formatting, agent rules | ⬜ |
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

## Phase 21 — Future Research: MDHoriZon Live Markdown Editor

> **Status: FUTURE — DO NOT IMPLEMENT YET**
>
> This phase must not begin until Phases 0–20 have been completed and the MDHoriZon reader, Markdown renderer, offline system, web application, Android application, iOS application, security model, accessibility, performance, and cross-platform validation are considered stable.
>
> The purpose of this phase is research and architectural design. It must not introduce a production editor into the project.

### 21.1 Vision

The long-term goal of MDHoriZon is to evolve from a Markdown reader into a complete **Live Markdown Editor**.

The editor should allow the user to write and edit Markdown directly in the document while simultaneously displaying the formatted result.

The intended experience is inspired by the concepts found in modern Markdown editors such as Obsidian Live Preview, Typora, and VNote, but MDHoriZon must develop its own architecture, user experience, implementation, and visual identity.

The desired interaction is:

````text
                 MDHoriZon Markdown Document

     ┌─────────────────────────────────────────────┐
     │ # My Article                                │
     │                                             │
     │ This is **important** text.                 │
     │                                             │
     │ $$ E = mc^2 $$                              │
     │                                             │
     │ [Rendered / interactive representation]     │
     │                                             │
     │ ```python                                  │
     │ print("Hello")                              │
     │ ```                                         │
     └─────────────────────────────────────────────┘

                     ↑
              User edits here

        No separate preview pane required.
````

The editor should make Markdown feel as natural to edit as a rich-text document while preserving Markdown as the underlying source of truth.

### 21.2 Fundamental Principle

The Markdown source must remain authoritative.

The editor must not become a proprietary document format.

Conceptually:

```text
Markdown Source
      │
      ▼
Parser / AST
      │
      ├──────────────► Reading Renderer
      │
      └──────────────► Live Editor
```

The Live Editor should therefore reuse as much as reasonably possible from the mature MDHoriZon Markdown Core developed during Phases 1–20.

### 21.3 Research CodeMirror 6

Investigate CodeMirror 6 as a potential editor foundation.

Research must include:

* EditorState
* EditorView
* transactions
* extensions
* syntax highlighting
* Markdown language support
* syntax trees
* decorations
* widgets
* StateField
* ViewPlugin
* facets
* keymaps
* selections
* cursor handling
* document changes
* undo/redo
* history
* clipboard integration
* mobile keyboard behavior
* composition/IME handling
* accessibility
* performance with large documents
* incremental parsing
* viewport-based rendering

The research must determine which parts of CodeMirror 6 should be used directly and which functionality should belong to MDHoriZon.

Do not assume that CodeMirror 6 is automatically the final choice simply because it is used by other applications.

The final decision must be based on:

* technical suitability
* licensing
* performance
* extensibility
* web compatibility
* Android WebView compatibility
* iOS WebView compatibility
* mobile editing behavior
* Markdown integration
* long-term maintainability

### 21.4 Research Obsidian Live Preview

Study the publicly documented behavior and architecture of Obsidian's Live Preview system.

Investigate concepts such as:

* inline rendering
* Markdown syntax hiding
* cursor-sensitive source visibility
* formatted text while editing
* block-level rendering
* inline decorations
* embedded content
* images
* links
* code blocks
* tables
* mathematics
* callouts
* lists
* headings
* selection behavior
* cursor positioning
* source/rendered mapping

The objective is not to copy Obsidian.

The objective is to understand the engineering problems that a serious Live Markdown Editor must solve.

### 21.5 Markdown AST and Source Synchronization

Research how the editor can maintain synchronization between:

```text
Raw Markdown
      ↕
Markdown Parser
      ↕
AST / Syntax Tree
      ↕
Rendered Representation
      ↕
Editor Decorations / Widgets
```

Important questions:

* How is Markdown parsed incrementally?
* How are source offsets mapped to rendered positions?
* How does the editor know which Markdown syntax belongs to which rendered element?
* How can formatting be hidden without destroying the source?
* How can syntax become visible when the cursor enters a region?
* How can edits modify the source without corrupting surrounding Markdown?
* How can rendered widgets coexist with editable source text?
* How can the editor recover from temporarily invalid Markdown?
* How can partial documents be rendered while the user is typing?

### 21.6 Source ↔ Rendered Position Mapping

This is one of the most important research areas.

The editor must eventually support mappings such as:

```text
Markdown source position
        ↓
AST node
        ↓
Rendered element
        ↓
Screen position
```

and the reverse:

```text
Cursor / selection
        ↓
Rendered element
        ↓
AST node
        ↓
Markdown source position
```

Research must address:

* character offsets
* line/column positions
* UTF-16 offsets where relevant
* selections
* multi-line elements
* hidden Markdown syntax
* inline formatting
* links
* images
* code
* mathematics
* tables
* lists
* block elements

### 21.7 Inline Rendering Strategy

Determine how MDHoriZon should render Markdown constructs while editing.

Possible mechanisms to investigate:

* decorations
* replaced decorations
* widgets
* DOM overlays
* embedded editor widgets
* CSS-based hiding
* syntax-aware rendering
* hybrid source/rendered regions

Do not select an implementation prematurely.

Create small technical prototypes to determine which approach produces the best editing experience.

### 21.8 Markdown Feature Compatibility

The Live Editor must eventually support the Markdown capabilities already established by the MDHoriZon renderer.

Research editing behavior for:

* headings
* paragraphs
* emphasis
* strong emphasis
* strikethrough
* inline code
* fenced code blocks
* syntax highlighting
* ordered lists
* unordered lists
* nested lists
* task lists
* blockquotes
* links
* images
* tables
* horizontal rules
* footnotes if supported
* automatic links
* HTML according to MDHoriZon's security policy
* mathematical expressions
* display mathematics
* Mermaid
* frontmatter
* relative assets
* embedded/local content

The editor must not silently introduce Markdown syntax that the reader cannot render.

### 21.9 Mathematics Editing

Investigate a Live Preview experience for KaTeX-compatible mathematics.

Research:

* inline math
* display math
* cursor entry
* source visibility
* editing LaTeX
* rendered formula display
* malformed formulas
* escaping
* selection
* mobile editing

Example conceptual behavior:

```text
The equation is displayed as rendered mathematics.

When the cursor enters it:

The equation's LaTeX source becomes editable.
```

### 21.10 Mermaid Editing

Investigate how Mermaid diagrams should behave inside the Live Editor.

Possible model:

```text
             Mermaid block
                   │
        ┌──────────┴──────────┐
        │                     │
   normal editing        rendered diagram
        │                     │
        └──── cursor enters ──┘
```

Research:

* editing Mermaid source
* diagram preview
* rendering errors
* large diagrams
* cursor placement
* source visibility
* mobile editing
* security implications

### 21.11 Table Editing

Tables require special investigation because Markdown tables are source-oriented while users expect spreadsheet-like behavior.

Research:

* adding/removing rows
* adding/removing columns
* moving between cells
* alignment
* multiline content
* formatting inside cells
* links
* inline code
* mathematics
* long content
* horizontal scrolling
* mobile editing
* conversion between source and visual representation

Potential future experience:

```text
| Product | Price | Stock |
|---------|------:|------:|
| Mouse   | 10.00 |  25   |
| Keyboard| 25.00 |  12   |
```

could behave visually like an editable table while retaining valid Markdown underneath.

### 21.12 Image Editing

Research inline image behavior:

* image rendering
* image selection
* image replacement
* alt text
* dimensions
* relative paths
* local offline assets
* remote images
* drag-and-drop
* mobile image selection
* image resizing if eventually supported

The underlying Markdown must remain recoverable and editable.

### 21.13 Links and Navigation

Research:

* link rendering
* editing link destinations
* editing link labels
* internal document links
* external links
* relative links
* anchor links
* link validation
* cursor behavior
* Ctrl/Cmd-click behavior
* mobile interaction

The editor must clearly distinguish between editing a link and activating it.

### 21.14 Frontmatter and Metadata

Research how YAML/frontmatter should behave.

Possible behavior:

```yaml
---
title: My Article
author: Washington
tags:
  - markdown
  - linux
---
```

The editor may eventually provide a specialized metadata interface, but the original Markdown/YAML representation must remain available.

### 21.15 Large Documents

The editor must be designed for large Markdown documents.

Research:

* viewport rendering
* incremental parsing
* incremental DOM updates
* memory consumption
* large code blocks
* large tables
* many images
* many Mermaid diagrams
* documents with thousands of lines
* documents with hundreds of headings

The research should identify performance limits and establish measurable benchmarks.

### 21.16 Mobile Editing

Mobile is a first-class requirement.

Investigate:

* Android WebView
* iOS WKWebView
* virtual keyboards
* selection handles
* cursor movement
* autocorrect
* autocomplete
* Markdown shortcuts
* IME/composition
* hardware keyboards
* touch selection
* scrolling
* toolbar actions
* inserting links/images/code
* handling indentation
* list continuation
* code block editing

The desktop experience must not simply be scaled down to mobile.

### 21.17 Offline Editing

Because MDHoriZon is designed to support offline content, future editing must investigate:

```text
Local Markdown
      │
      ▼
Live Editor
      │
      ▼
Local Storage
      │
      ├── IndexedDB / filesystem / SQLite
      │
      └── synchronization strategy
```

Research:

* local persistence
* autosave
* crash recovery
* document versions
* conflict handling
* offline editing
* synchronization
* importing/exporting Markdown

No synchronization system should be implemented until its requirements are clearly defined.

### 21.18 Drag and Drop

Research drag-and-drop support for:

* Markdown files
* images
* folders
* links
* text selections

Possible future behavior:

```text
image.png
    ↓
drop into editor
    ↓
![image](relative/path/image.png)
```

The generated Markdown must respect MDHoriZon's content and asset architecture.

### 21.19 Accessibility

The future editor must investigate:

* keyboard navigation
* screen readers
* focus management
* semantic structure
* selection behavior
* high contrast
* reduced motion
* zoom
* touch accessibility
* ARIA where appropriate

Accessibility must not be added as an afterthought.

### 21.20 Security

The Live Editor must preserve the security model established during Phase 2.

Research must cover:

* raw HTML
* unsafe URLs
* JavaScript URLs
* SVG
* Mermaid
* pasted HTML
* pasted rich text
* external content
* embedded content
* local file access
* malicious Markdown
* sanitization

The editor must never become a security bypass for the reader.

### 21.21 Prototype Experiments

Before beginning Phase 22, create small isolated experiments rather than immediately modifying the production application.

Potential experiments:

1. CodeMirror 6 + Markdown.
2. Markdown syntax hiding.
3. Inline bold/italic rendering.
4. Cursor-sensitive source visibility.
5. Heading rendering.
6. Inline code.
7. Links.
8. Images.
9. Mathematics.
10. Mermaid.
11. Tables.
12. Large-document performance.
13. Mobile keyboard behavior.
14. Source ↔ rendered position mapping.

Each experiment should have a documented result.

### 21.22 Architecture Decision Record

At the end of Phase 21, create an architecture decision document answering:

* Should CodeMirror 6 be used?
* Which Markdown parser should be used?
* Can the existing MDHoriZon Markdown Core be reused?
* Which AST representation should be used?
* How will source/rendered synchronization work?
* How will decorations/widgets work?
* How will tables work?
* How will mathematics work?
* How will Mermaid work?
* How will images work?
* How will large documents work?
* How will mobile editing work?
* How will offline editing work?
* What functionality belongs in the core?
* What belongs in the UI?
* What belongs in platform-specific layers?

**Phase 21 is complete only when the architecture is understood well enough to justify starting Phase 22.**

---

## Phase 22 — Future Implementation: MDHoriZon Live Markdown Editor Prototype

> **Status: FUTURE — DO NOT IMPLEMENT YET**
>
> Phase 22 may begin only after Phase 21 has produced a satisfactory architecture decision and after Phases 0–20 are stable.
>
> This phase creates a controlled prototype. It does not immediately replace the production reader or attempt to build a complete Obsidian/Typora-class editor.

### 22.1 Prototype Goal

Build a functional proof-of-concept of the MDHoriZon Live Markdown Editor.

The prototype must demonstrate that a user can:

1. open a Markdown document;
2. edit its Markdown source;
3. see supported formatting rendered inline;
4. move the cursor through rendered content;
5. reveal Markdown syntax when appropriate;
6. continue editing naturally;
7. preserve valid Markdown source;
8. undo and redo changes;
9. save the resulting Markdown.

### 22.2 Prototype Architecture

The initial architecture should follow this conceptual model:

```text
                    ┌──────────────────────┐
                    │   Markdown Document  │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Markdown Core      │
                    │                      │
                    │ parser / AST         │
                    │ security             │
                    │ extensions            │
                    └──────────┬───────────┘
                               │
                    ┌──────────┴───────────┐
                    │                      │
                    ▼                      ▼
          ┌──────────────────┐   ┌──────────────────┐
          │ Reading Renderer │   │  Live Editor     │
          └──────────────────┘   └────────┬─────────┘
                                          │
                                          ▼
                                  ┌────────────────┐
                                  │ CodeMirror 6   │
                                  └────────────────┘
```

The exact implementation may differ after Phase 21 research.

### 22.3 Production Isolation

The prototype must be isolated from the stable reader.

Do not replace the production renderer simply to test editor concepts.

Prefer:

```text
src/
├── core/
├── components/
├── editor/
│   └── prototype/
└── ...
```

or another architecture justified by Phase 21.

The reader must continue working independently.

### 22.4 Minimum Supported Features

The first prototype should support only a deliberately limited subset:

* paragraphs
* headings
* bold
* italic
* strikethrough
* inline code
* links
* unordered lists
* ordered lists
* blockquotes
* fenced code blocks
* horizontal rules

Do not attempt to implement every Markdown feature immediately.

### 22.5 Prototype Editing Behavior

The prototype should demonstrate the fundamental Live Preview interaction.

For example:

```text
Normal state:

This is important text.

The Markdown markers may be visually minimized
while the rendered appearance remains visible.
```

When the cursor enters the formatted region:

```text
This is **important** text.
        ↑
    editable Markdown
```

The exact visual behavior should be determined experimentally.

### 22.6 Source Preservation

A critical requirement is:

> The editor must never sacrifice Markdown source fidelity merely to obtain a visually attractive editing experience.

The system must preserve:

* Markdown structure
* links
* formatting
* code blocks
* line breaks where semantically relevant
* frontmatter
* relative paths
* supported extensions

Any source transformation must be deliberate and tested.

### 22.7 Undo / Redo

Implement and test:

* undo
* redo
* typing
* deletion
* formatting changes
* multi-character edits
* paste
* drag/drop where supported

Undo/redo must behave like a real text editor, not like repeated full-document replacement.

### 22.8 Clipboard

Investigate and prototype:

* plain-text paste
* Markdown paste
* rich-text paste
* copying Markdown
* copying rendered text
* copying code
* copying links

The behavior must be documented rather than left to browser defaults.

### 22.9 Keyboard Shortcuts

Prototype common shortcuts:

* Ctrl/Cmd+B
* Ctrl/Cmd+I
* Ctrl/Cmd+K
* Ctrl/Cmd+Z
* Ctrl/Cmd+Shift+Z
* Ctrl/Cmd+S

The exact shortcut set should remain platform-aware.

### 22.10 Markdown Shortcuts

Investigate intelligent Markdown behaviors such as:

````text
# + Space       → heading
- + Space       → list
1. + Space      → ordered list
> + Space       → blockquote
``` + Enter     → code block
````

These must never generate invalid or surprising Markdown.

### 22.11 Rendering Updates

The editor must update incrementally where practical.

Avoid:

```text
Every keystroke
      ↓
Parse entire document
      ↓
Destroy entire DOM
      ↓
Rebuild entire document
```

Prefer an incremental architecture:

```text
User edit
   ↓
Editor transaction
   ↓
Affected syntax region
   ↓
Incremental parsing/update
   ↓
Affected rendering only
```

The actual implementation must be validated with benchmarks.

### 22.12 Testing

Create dedicated editor tests for:

* source preservation
* cursor movement
* selections
* decorations
* formatting
* links
* lists
* code
* tables
* math
* Mermaid
* undo/redo
* paste
* large documents
* malformed Markdown
* security
* accessibility

The Golden Test Document from Phase 3 should eventually become an important regression document for the editor.

### 22.13 Cross-Platform Prototype Validation

The prototype must eventually be tested on:

```text
Desktop browser
       │
       ├── Chromium
       ├── Firefox
       └── WebKit/Safari where practical

Mobile
       │
       ├── Android WebView
       └── iOS WKWebView
```

The prototype is not considered successful merely because it works in a desktop Chromium browser.

### 22.14 Mobile Editor Prototype

After the desktop prototype is stable, test the same architecture on mobile.

Validate:

* keyboard opening
* cursor movement
* selection
* scrolling
* typing
* Markdown shortcuts
* toolbar actions
* paste
* undo/redo
* orientation changes
* long documents

Do not create a completely separate editor implementation for mobile unless Phase 21 proves it necessary.

### 22.15 Performance Benchmarks

Establish reproducible benchmark documents:

```text
Small     ~100 lines
Medium    ~1,000 lines
Large     ~10,000 lines
Very Large ~100,000+ lines
```

Measure:

* initial load
* typing latency
* parsing latency
* rendering latency
* memory consumption
* scrolling
* selection
* undo/redo
* mobile responsiveness

The exact limits should be determined experimentally.

### 22.16 Security Validation

Run the same security test suite used by the reader and add editor-specific cases.

Test at minimum:

* `<script>`
* event-handler attributes
* `javascript:` URLs
* dangerous SVG
* malicious pasted HTML
* malformed Mermaid
* unsafe external resources

The Live Editor must not weaken the security guarantees of MDHoriZon.

### 22.17 Prototype User Experience

The prototype should eventually feel like:

```text
             WRITE + READ

        not

             WRITE
               ↓
             PREVIEW
```

The objective is a unified document experience.

However, a conventional Reading View should remain available.

The final product may therefore support:

```text
┌──────────────────────────────────────┐
│ Reading                              │
│                                      │
│ Pure rendered document               │
└──────────────────────────────────────┘

┌──────────────────────────────────────┐
│ Live Preview                         │
│                                      │
│ Editable rendered Markdown           │
└──────────────────────────────────────┘

┌──────────────────────────────────────┐
│ Source                               │
│                                      │
│ Raw Markdown                         │
└──────────────────────────────────────┘
```

The Live Preview mode should be the principal future innovation, not merely another preview panel.

### 22.18 No Premature Feature Explosion

Do not immediately attempt to reproduce every feature of Obsidian, Typora, VNote, or other editors.

The project should grow from validated requirements.

Avoid prematurely implementing:

* plugins
* themes marketplace
* synchronization services
* collaborative editing
* databases
* proprietary document formats
* complex WYSIWYG conversion
* AI writing assistants
* cloud accounts
* publishing platforms

These may be considered independently in the future.

### 22.19 Future Editor Roadmap

If the prototype succeeds, create a new roadmap specifically for:

**MDHoriZon Live Markdown Editor 1.0**

Possible future stages:

```text
Prototype
    ↓
Alpha
    ↓
Beta
    ↓
Desktop-ready
    ↓
Mobile-ready
    ↓
Production editor
    ↓
MDHoriZon Editor 1.0
```

Each stage must have its own definition of done.

### 22.20 Phase 22 Definition of Done

Phase 22 is complete when:

* [ ] Live Markdown editing works in the prototype.
* [ ] Markdown remains the source of truth.
* [ ] Inline rendering works for the supported feature set.
* [ ] Cursor and selection behavior is usable.
* [ ] Undo/redo works correctly.
* [ ] Source preservation is verified by automated tests.
* [ ] Security tests pass.
* [ ] Accessibility has been evaluated.
* [ ] Performance benchmarks have been established.
* [ ] Desktop browser testing succeeds.
* [ ] Android WebView testing has been performed.
* [ ] iOS WebView testing has been performed where available.
* [ ] The production reader remains unaffected.
* [ ] The architecture is documented.
* [ ] Known limitations are documented.
* [ ] A decision has been made about whether the prototype is mature enough to justify a production editor.

### 22.21 Final Principle

MDHoriZon should not attempt to become an editor simply because Markdown editing is possible.

It should become an editor only if it can provide an experience that is:

* fast
* reliable
* beautiful
* accessible
* secure
* cross-platform
* offline-capable
* faithful to Markdown
* pleasant on desktop
* pleasant on mobile

The ultimate ambition is not to make **another Markdown editor**.

The ambition is to make **MDHoriZon a first-class Markdown environment where reading and writing the same document feel like two natural states of one experience.**
