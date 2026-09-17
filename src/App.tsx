import { useEffect, useRef, useState } from 'react'
import goldenDocument from '../tests/fixtures/Golden-Test-Document.md?raw'
import { MarkdownRenderer } from './components/MarkdownRenderer'
import { TableOfContents } from './components/TableOfContents'
import { ThemeSwitcher } from './components/ThemeSwitcher'
import { readHeadings } from './core/navigation/headings'
import type { ArticleHeading } from './core/navigation/headings'

/**
 * Development preview of the rendering core.
 *
 * The application renders the **Golden Test Document itself**: the rendering specification that every
 * phase has to keep working, shown live in a browser so a regression is visible and not only caught by
 * a test. Loading real content, article navigation and the content model are Phases 9 and 10.
 *
 * Importing the fixture as a raw string is deliberate and belongs to this development preview. Once
 * the content loader exists (Phase 10), documents come from the content layer and this import goes
 * away with the preview.
 */
function App() {
  const document = goldenDocument
  const article = useRef<HTMLElement>(null)
  const [headings, setHeadings] = useState<ArticleHeading[]>([])

  /**
   * Where this document lives, so its own relative assets resolve against it (Phase 8).
   *
   * In the dev server this points at the file in the repository, and the fixture's images load. In
   * the built preview the test assets are deliberately not part of the application bundle, so those
   * images fail — which is the fixture's own missing-image case, and the reason a broken source now
   * renders a legible placeholder instead of the engine's broken-image glyph.
   */
  const documentUrl = `${import.meta.env.BASE_URL}tests/fixtures/Golden-Test-Document.md`

  /**
   * The table of contents is read from the rendered document, after React has committed it: the ids
   * `rehype-slug` generated are the only correct anchors, and reading them is cheaper and safer than
   * parsing the Markdown a second time.
   */
  useEffect(() => {
    setHeadings(readHeadings(article.current))
  }, [document])

  return (
    <main>
      <header className="page-header">
        <h1>MDHoriZon</h1>
        <ThemeSwitcher />
        <p>
          The rendering specification, rendered live: this is{' '}
          <code>tests/fixtures/Golden-Test-Document.md</code> going through the
          same core the web, Android WebView and iOS WebView builds will use.
        </p>
      </header>

      <TableOfContents headings={headings} />

      <article ref={article}>
        <MarkdownRenderer documentUrl={documentUrl}>
          {document}
        </MarkdownRenderer>
      </article>
    </main>
  )
}

export default App
