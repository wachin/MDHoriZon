import goldenDocument from '../tests/fixtures/Golden-Test-Document.md?raw'
import { MarkdownRenderer } from './components/MarkdownRenderer'

/**
 * Development preview of the rendering core.
 *
 * The application renders the **Golden Test Document itself**: the rendering specification that
 * every phase has to keep working, shown live in a browser so a regression is visible and not only
 * caught by a test. Loading real content, navigation and the reading experience are Phases 7 to 10.
 *
 * Importing the fixture as a raw string is deliberate and belongs to this development preview. Once
 * the content loader exists (Phase 10), documents come from the content layer and this import goes
 * away with the preview.
 */
function App() {
  return (
    <main>
      <header>
        <h1>MDHoriZon</h1>
        <p>
          The rendering specification, rendered live: this is{' '}
          <code>tests/fixtures/Golden-Test-Document.md</code> going through the
          same core the web, Android WebView and iOS WebView builds will use.
          Maths (KaTeX) and diagrams (Mermaid) are Phases 5 and 6; until then
          their source is shown as readable text, which is what the document
          expects.
        </p>
      </header>

      <MarkdownRenderer>{goldenDocument}</MarkdownRenderer>
    </main>
  )
}

export default App
