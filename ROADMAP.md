# ROADMAP.md

Repository for the development of a Markdown rendering engine with web publishing (GitHub Pages) and mobile packaging (Android/iOS) via Capacitor.

---

## 🎯 Project Vision

Build a Markdown rendering system that replicates the reading experience of assistants like DeepSeek Chat: tables with horizontal touch scrolling, code blocks with syntax highlighting and a copy button, mathematical formulas (KaTeX), Mermaid diagrams, and polished typography. The same rendering core must work in a web browser and within a native Android/iOS app without duplicating logic.

**Target Architecture:**

```
Markdown (.md)
  → unified / remark / rehype
    → HTML + CSS (KaTeX, highlight.js, Mermaid)
      → React (Web)
        → Capacitor → Android / iOS
```

---

## 📦 Tech Stack

| Layer | Technology | Reference Version |
|---|---|---|
| UI | React + TypeScript | React 19 |
| Build | Vite | Latest stable |
| Markdown | `react-markdown` | 10.1.0 |
| GFM (tables, strikethrough, tasklists) | `remark-gfm` | 4.0.1 |
| Math | `remark-math` + `rehype-katex` + `katex` | 6.0.0 / 7.0.1 |
| Code Highlighting | `rehype-highlight` + `highlight.js` | 7.0.2 |
| Diagrams | `mermaid` (lazy load) | Latest stable |
| Mobile | Capacitor | 7 (requires JDK 21) |
| CI/CD | GitHub Actions | — |
| Web Deploy | GitHub Pages | — |

**Version Notes:** `react-markdown` has reached version 10.1.0 in 2026. `remark-gfm` remains at 4.0.1. `rehype-katex` is at 7.0.1. `rehype-highlight` at 7.0.2. Capacitor 7 requires JDK 21 to compile Android.

---

## 🗺️ Development Phases

### Phase 0 — Repository Foundation

- [ ] Create repository on GitHub
- [ ] Initialize project with Vite + React + TypeScript
  ```bash
  npm create vite@latest . -- --template react-ts
  ```
- [ ] Configure ESLint + Prettier
- [ ] Configure `vite.config.ts` with correct `base` for GitHub Pages
  - For project repository (`username.github.io/my-repo/`): `base: '/my-repo/'`
  - For root repository (`username.github.io`): `base: '/'`
- [ ] Add `.nojekyll` in the `public/` folder to prevent Jekyll processing
- [ ] Create initial folder structure:
  ```
  src/
  ├── components/
  │   ├── MarkdownRenderer.tsx
  │   ├── CodeBlock.tsx
  │   ├── TableWrapper.tsx
  │   └── MermaidDiagram.tsx
  ├── styles/
  │   └── markdown.css
  └── content/
  ```

---

### Phase 1 — Core Rendering Engine

**Goal:** A `MarkdownRenderer` component that transforms any Markdown (including GFM, math, code, and Mermaid) into faithful and readable HTML.

- [ ] Install base dependencies:
  ```bash
  npm install react-markdown remark-gfm remark-math rehype-katex rehype-highlight katex
  npm install -D @types/react @types/react-dom
  ```
- [ ] Implement `MarkdownRenderer.tsx` with the plugin pipeline:
  ```tsx
  import ReactMarkdown from 'react-markdown';
  import remarkGfm from 'remark-gfm';
  import remarkMath from 'remark-math';
  import rehypeKatex from 'rehype-katex';
  import rehypeHighlight from 'rehype-highlight';
  import 'katex/dist/katex.min.css';
  import 'highlight.js/styles/github-dark.css';

  const MarkdownRenderer = ({ content }: { content: string }) => (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex, rehypeHighlight]}
      components={{
        table: ({ node, ...props }) => (
          <div className="table-wrapper"><table {...props} /></div>
        ),
        code: CodeBlock,
      }}
    >
      {content}
    </ReactMarkdown>
  );
  ```
- [ ] Implement `TableWrapper` with horizontal touch scroll CSS:
  ```css
  .table-wrapper {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    margin: 1rem 0;
  }
  .table-wrapper table {
    min-width: 100%;
    border-collapse: collapse;
  }
  .table-wrapper th,
  .table-wrapper td {
    padding: 0.5rem 0.75rem;
    border: 1px solid var(--border-color);
    white-space: nowrap;
  }
  ```
- [ ] Implement `CodeBlock` with:
  - Language detection
  - Copy to clipboard button
  - Header with language name
  - Horizontal scroll for long lines (`pre { overflow-x: auto }`)
- [ ] Rendering tests with the document `Paquetes esenciales de Linux para que funcione Freebuff AppImage.md`:
  - [ ] Headers, links, tables
  - [ ] Bash code blocks
  - [ ] Notes (`>`) and multi-column tables
- [ ] Tests with edge cases:
  - [ ] Inline formulas: `$E = mc^2$`
  - [ ] Display formulas: `$$ \int_0^\infty e^{-x} dx = 1 $$`
  - [ ] Mermaid diagram: ` ```mermaid graph TD ... ``` `
  - [ ] Table with 8+ columns (verify horizontal scroll)

---

### Phase 2 — Reading Experience and Visual Polish

- [ ] Light/dark theme system using CSS variables:
  - `--font-body`, `--font-mono`, `--border-color`, `--bg-code`
- [ ] Polished typography: heading sizes, line-height, vertical margins
- [ ] Mermaid lazy loading to reduce initial bundle:
  ```tsx
  const MermaidDiagram = React.lazy(() => import('./MermaidDiagram'));
  ```
  Mermaid weighs approximately 2.8 MB and should only load when a diagram appears.
- [ ] KaTeX lazy loading (optional, if bundle size justifies it)
- [ ] Add table of contents (TOC) generated from headers
- [ ] Add anchor links on headers
- [ ] Optimize KaTeX font loading
- [ ] Tests on real mobile browsers (touch scroll on tables)

---

### Phase 3 — Web Publishing on GitHub Pages

- [ ] Configure GitHub Actions workflow for automatic deployment:

  **`.github/workflows/deploy-pages.yml`**
  ```yaml
  name: Deploy to GitHub Pages
  on:
    push:
      branches: [main]
    workflow_dispatch:

  permissions:
    contents: read
    pages: write
    id-token: write

  jobs:
    build:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v4
        - uses: actions/setup-node@v4
          with:
            node-version: 20
            cache: npm
        - run: npm ci
        - run: npm run build
        - uses: actions/upload-pages-artifact@v3
          with:
            path: ./dist

    deploy:
      needs: build
      runs-on: ubuntu-latest
      environment:
        name: github-pages
        url: ${{ steps.deployment.outputs.page_url }}
      steps:
        - id: deployment
          uses: actions/deploy-pages@v4
  ```
- [ ] Verify deployment at `https://username.github.io/repo/`
- [ ] Test on mobile: open the URL, verify scroll on tables and code
- [ ] Add basic SEO metadata (`title`, `description`, `og:image`)

---

### Phase 4 — Mobile Packaging with Capacitor

- [ ] Install Capacitor:
  ```bash
  npm install @capacitor/core @capacitor/cli @capacitor/android @capacitor/ios
  npx cap init "My Blog" "com.myblog.app" --web-dir=dist
  ```
- [ ] Add Android platform:
  ```bash
  npm run build
  npx cap add android
  npx cap sync android
  ```
- [ ] Add iOS platform (if macOS access is available):
  ```bash
  npx cap add ios
  npx cap sync ios
  ```
- [ ] Configure `capacitor.config.ts`:
  - `webDir: 'dist'`
  - `server.androidScheme: 'https'`
  - `android.allowMixedContent: false`
- [ ] Android-specific adjustments:
  - Safe areas (`env(safe-area-inset-*)` in CSS)
  - Status bar (install `@capacitor/status-bar` if needed)
  - Back button (handle navigation)
- [ ] Verify that tables, code, KaTeX, and Mermaid render correctly in the WebView
- [ ] Test touch scroll on tables within the app

---

### Phase 5 — CI/CD for Android (Signed APK)

- [ ] Generate local keystore:
  ```bash
  keytool -genkey -v -keystore release.jks -alias my-alias -keyalg RSA -keysize 2048 -validity 10000
  ```
- [ ] Encode keystore in base64 and save as GitHub secret:
  ```bash
  base64 release.jks > keystore.b64
  ```
- [ ] Configure secrets in GitHub:
  - `KEYSTORE` (base64 of `.jks`)
  - `KEYSTORE_PASS`
  - `KEYSTORE_ALIAS`
  - `KEYSTORE_ALIAS_PASS`
- [ ] Create Android build workflow:

  **`.github/workflows/android-build.yml`**
  ```yaml
  name: Build Android APK
  on:
    push:
      tags: ['v*']
    workflow_dispatch:

  jobs:
    build:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v4
        - uses: actions/setup-node@v4
          with:
            node-version: 20
            cache: npm
        - uses: actions/setup-java@v4
          with:
            distribution: temurin
            java-version: '21'   # Capacitor 7 requires JDK 21
        - name: Install dependencies
          run: npm ci
        - name: Build web
          run: npm run build
        - name: Sync Capacitor
          run: npx cap sync android
        - name: Decode keystore
          env:
            KEYSTORE: ${{ secrets.KEYSTORE }}
          run: echo "$KEYSTORE" | base64 --decode > android/release.jks
        - name: Build signed APK
          run: |
            cd android
            ./gradlew assembleRelease \
              -Pandroid.injected.signing.store.file=$PWD/release.jks \
              -Pandroid.injected.signing.store.password=${{ secrets.KEYSTORE_PASS }} \
              -Pandroid.injected.signing.key.alias=${{ secrets.KEYSTORE_ALIAS }} \
              -Pandroid.injected.signing.key.password=${{ secrets.KEYSTORE_ALIAS_PASS }}
        - name: Upload APK
          uses: actions/upload-artifact@v4
          with:
            name: app-release
            path: android/app/build/outputs/apk/release/app-release.apk
  ```
- [ ] Test local build before pushing to CI:
  ```bash
  cd android && ./gradlew assembleDebug
  ```
- [ ] Verify that the APK is generated and can be installed on a real device

---

### Phase 6 — iOS (Optional, Requires macOS)

- [ ] Add iOS platform:
  ```bash
  npx cap add ios
  npx cap sync ios
  ```
- [ ] Configure signing in Xcode (requires Apple Developer account)
- [ ] GitHub Actions workflow for iOS (requires macOS runner):
  ```yaml
  runs-on: macos-latest
  ```
- [ ] Generate IPA and distribute via TestFlight or Ad Hoc

---

### Phase 7 — Content and Scalability

- [ ] Content loading system:
  - [ ] Option A: `.md` files in `src/docs/guides/` imported as strings
  - [ ] Option B: fetch `.md` files from `docs/guides/` folder
  - [ ] Option C: headless CMS (Sanity, Contentful) or GitHub as CMS
- [ ] Article index and navigation
- [ ] Search (optional, with `fuse.js` or similar)
- [ ] PWA: service worker for offline functionality
- [ ] Bundle optimization: code splitting per article
- [ ] Add frontmatter support (title, date, tags) via `gray-matter`

---

## 📁 Repository Structure (Final Goal)

```
/
├── .github/
│   └── workflows/
│       ├── deploy-pages.yml
│       └── android-build.yml
├── src/
│   ├── components/
│   │   ├── MarkdownRenderer.tsx
│   │   ├── CodeBlock.tsx
│   │   ├── TableWrapper.tsx
│   │   ├── MermaidDiagram.tsx
│   │   └── TableOfContents.tsx
│   ├── styles/
│   │   ├── markdown.css
│   │   └── themes.css
│   ├── docs/guides/
│   ├── App.tsx
│   └── main.tsx
├── public/
│   └── .nojekyll
├── android/          # generated by Capacitor
├── ios/              # generated by Capacitor
├── capacitor.config.ts
├── vite.config.ts
├── package.json
└── ROADMAP.md        # this file
```

---

## 🧪 Rendering Tests (Validation Checklist)

Use the document `Paquetes esenciales de Linux para que funcione Freebuff AppImage.md` as the main test case. Verify:

- [ ] Headers `#`, `##`, `###` with clear visual hierarchy
- [ ] Bold, italic, inline code text
- [ ] Links that open correctly
- [ ] Bash code blocks with syntax highlighting
- [ ] Copy button on code blocks
- [ ] 2-column table (Git and GitHub)
- [ ] 3-column table (summary)
- [ ] Notes with `>` (blockquotes)
- [ ] Ordered and unordered lists
- [ ] Horizontal scroll on tables (test on mobile)
- [ ] KaTeX formulas (add to test document)
- [ ] Mermaid diagram (add to test document)

---

## 📚 References and Study Projects

| Project | Technology | What to Study |
| --- | --- | --- |
| **MarkText for Android** | Vue + Vite + Capacitor + Muya | WebView rendering, Capacitor integration |
| **Noteriv** | React + React Native | Shared web/mobile code architecture |
| **react-markdown** | React + unified | Plugin pipeline, custom components |
| **@ootc/markdown** | React + Mermaid + KaTeX | Lazy loading of heavy dependencies |

---

## 🔗 Useful Links

- [react-markdown on GitHub](https://github.com/remarkjs/react-markdown)
- [remark-gfm](https://github.com/remarkjs/remark-gfm)
- [rehype-katex](https://github.com/remarkjs/remark-math/tree/main/packages/rehype-katex)
- [rehype-highlight](https://github.com/rehypejs/rehype-highlight)
- [Capacitor documentation](https://capacitorjs.com/docs)
- [GitHub Actions for Pages](https://vite.dev/guide/static-deploy.html#github-pages)
- [Capacitor Android build from CI](https://stackoverflow.com/questions/79418936)

---

## ✅ Milestones

| Milestone | Description | Status |
|---|---|---|
| **M1** | Functional web rendering with GFM, KaTeX, highlight, and Mermaid | ⬜ |
| **M2** | Automatic deployment on GitHub Pages | ⬜ |
| **M3** | Signed Android APK generated by GitHub Actions | ⬜ |
| **M4** | iOS app (requires macOS) | ⬜ |
| **M5** | Content dynamically loaded from `.md` files | ⬜ |

---

*Last updated: September 2026*
