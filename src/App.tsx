import { MarkdownRenderer } from './components/MarkdownRenderer'

/**
 * Phase 1 demo.
 *
 * The rendering core is the deliverable of this phase, not the reading application, so this page
 * exists only to make the core visible and checkable in a real browser. The content model, article
 * navigation and the reading experience are Phases 7 to 10.
 */
const SAMPLE = [
  '## What this page is',
  '',
  'The Markdown below is rendered by `src/components/MarkdownRenderer.tsx`, the same core the web,',
  'Android WebView and iOS WebView builds will use. Headings get deterministic ids and a link you',
  'can copy: hover the heading and look at the **#**.',
  '',
  '### GitHub Flavored Markdown',
  '',
  '| Layer | What it does | State |',
  '| --- | --- | --- |',
  '| Core | Parse and render, no React | done |',
  '| Sanitizer | Contain what the plugins generate | done |',
  '| URLs | `http`, `https`, `mailto` only | done |',
  '',
  '- [x] Render GFM: tables, task lists, strikethrough, autolinks',
  '- [x] Anchor links and duplicate-heading ids',
  '- [ ] Syntax highlighting, maths and diagrams — Phases 4, 5 and 6',
  '',
  '```ts',
  "const policy = ['http:', 'https:', 'mailto:']",
  '',
  '// Anything else is dropped, not rendered.',
  'function applyUrlPolicy(url: string): string | null {',
  '  return policy.some((scheme) => url.startsWith(scheme)) ? url : null',
  '}',
  '```',
  '',
  '> Untrusted Markdown cannot create elements: an embedded `<script>` is removed before it can',
  '> become a node, and an unsafe link loses its `href` instead of being followed.',
  '',
  'A [safe external link](https://github.com/wachin/MDHoriZon) opens with',
  '`rel="noopener noreferrer"`, while an [unsafe one](javascript:alert(1)) keeps its text and loses',
  'its destination. An [in-page link](#what-this-page-is) still works.',
  '',
  '---',
  '',
  'Not here yet, by design: maths, Mermaid diagrams, syntax highlighting, themes, the offline',
  'library and the reading interface.',
].join('\n')

function App() {
  return (
    <main>
      <header>
        <h1>MDHoriZon</h1>
        <p>
          Rendering core, phase 1. This page is a development preview of the
          renderer, not the reading application.
        </p>
      </header>

      <MarkdownRenderer>{SAMPLE}</MarkdownRenderer>
    </main>
  )
}

export default App
