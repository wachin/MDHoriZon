import { render, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { initialiseTheme, resetThemeStore } from '../core/theme/store'
import { MarkdownRenderer } from './MarkdownRenderer'

/**
 * Phase 6: diagrams, rendered by the real Mermaid.
 *
 * These tests run Mermaid for real. jsdom has no layout engine, so the measurements Mermaid asks for
 * (`getBBox`, `getComputedTextLength`, …) are stubbed below: the *structure* of the output is real
 * and is what is asserted — that a diagram becomes an `<svg>`, that a broken one becomes readable
 * feedback, and that nothing dangerous is inserted. Coordinates and pixel sizes in this environment
 * are meaningless, and the visual result on a device is Phase 20's validation, not this file's.
 */

/** Gives Mermaid the measurements jsdom does not implement. Values are arbitrary but stable. */
function stubLayoutMeasurements(): void {
  const svg = window.SVGElement.prototype as unknown as Record<string, unknown>

  svg.getBBox = () => ({ x: 0, y: 0, width: 120, height: 24 })
  svg.getComputedTextLength = () => 60
  svg.getSubStringLength = () => 60
  svg.getScreenCTM = () => ({ a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 })
  svg.createSVGPoint = () => ({
    x: 0,
    y: 0,
    matrixTransform: () => ({ x: 0, y: 0 }),
  })
  Object.defineProperty(window.HTMLElement.prototype, 'offsetWidth', {
    value: 800,
    configurable: true,
  })
  Object.defineProperty(window.HTMLElement.prototype, 'offsetHeight', {
    value: 600,
    configurable: true,
  })
}

stubLayoutMeasurements()

const renderMarkdown = (markdown: string): HTMLElement => {
  const { container } = render(<MarkdownRenderer>{markdown}</MarkdownRenderer>)
  const body = container.querySelector('.markdown-body')

  if (!(body instanceof HTMLElement)) {
    throw new Error('the renderer produced no .markdown-body element')
  }

  return body
}

const FENCE = (code: string): string => '```mermaid\n' + code + '\n```'

/**
 * Waits for a diagram to finish.
 *
 * The timeout is generous on purpose: the first diagram in this file pays the whole one-time cost —
 * importing Mermaid, importing DOMPurify, parsing and laying out — which exceeds the 1000 ms default
 * of `waitFor` in a jsdom with no layout engine.
 */
const readyDiagram = async (body: HTMLElement): Promise<Element> => {
  await waitFor(
    () => {
      expect(
        body.querySelector('[data-diagram-state="ready"]'),
        'diagram never became ready: ' + body.innerHTML.slice(0, 400),
      ).not.toBeNull()
    },
    { timeout: 10_000 },
  )

  const figure = body.querySelector('figure.markdown-diagram')

  if (figure === null) throw new Error('no diagram figure found')

  return figure
}

afterEach(() => {
  resetThemeStore()
  vi.unstubAllGlobals()
})

describe('mermaid diagrams', () => {
  // Measured, not assumed: Mermaid puts a class on the `<svg>` for some diagram types and none for
  // others (sequence and pie mark their content instead), and the state diagram's class is lowercased.
  const DIAGRAMS: Array<[string, string, string]> = [
    [
      'flowchart',
      'flowchart TD\n    A[Markdown file] --> B[Parser]\n    B --> C{Content type}\n    C -->|Normal Markdown| D[React renderer]',
      'svg.flowchart',
    ],
    [
      'sequence diagram',
      'sequenceDiagram\n    participant User\n    participant App\n    User->>App: Open article\n    App-->>User: Render article',
      'svg .actor',
    ],
    [
      'class diagram',
      'classDiagram\n    class MarkdownDocument {\n        +string title\n        +render()\n    }\n    class OfflineLibrary {\n        +downloadAll()\n    }\n    MarkdownDocument --> OfflineLibrary',
      'svg.classDiagram',
    ],
    [
      'state diagram',
      'stateDiagram-v2\n    [*] --> Reading\n    Reading --> Downloading: offline copy\n    Downloading --> AvailableOffline\n    AvailableOffline --> Reading',
      'svg.statediagram',
    ],
    [
      'pie chart',
      'pie title Content sources\n    "Network" : 45\n    "Bundled" : 25',
      'svg .pieCircle',
    ],
  ]

  it.each(DIAGRAMS)(
    'renders a %s as an SVG',
    async (_name, code, identifyingSelector) => {
      const body = renderMarkdown(FENCE(code))
      const figure = await readyDiagram(body)
      const svg = figure.querySelector('svg')

      expect(svg, body.innerHTML.slice(0, 300)).not.toBeNull()
      expect(
        figure.querySelector(identifyingSelector),
        `no ${identifyingSelector} in ${figure.innerHTML.slice(0, 200)}`,
      ).not.toBeNull()
      // The diagram carries Mermaid's own accessible role rather than being an anonymous image.
      // Measured, it is `graphics-document document`: a role plus an ARIA fallback token.
      expect(svg?.getAttribute('role')).toContain('graphics-document')
      // The source is replaced by the diagram once it is ready.
      expect(figure.querySelector('.markdown-diagram-source')).toBeNull()
    },
  )

  it('keeps the fence out of the code-block path', async () => {
    const body = renderMarkdown(FENCE('flowchart TD\n    A --> B'))

    await readyDiagram(body)

    // A diagram is not code: no copy button, no language toolbar, no `pre[data-language]` left behind.
    expect(body.querySelector('.markdown-code')).toBeNull()
    expect(body.querySelector('button.markdown-code-copy')).toBeNull()
    expect(body.querySelector('pre[data-language="mermaid"]')).toBeNull()
  })

  it('still renders every other language as a code block', () => {
    const body = renderMarkdown('```js\nconst a = 1\n```')

    expect(
      body.querySelector('.markdown-code button.markdown-code-copy'),
    ).not.toBeNull()
    expect(body.querySelector('[data-diagram-state]')).toBeNull()
  })

  it('shows the diagram source while the diagram is loading', () => {
    // No awaiting: this is the first paint, before the lazy import and render have resolved.
    const body = renderMarkdown(FENCE('flowchart TD\n    A --> B'))
    const figure = body.querySelector('figure.markdown-diagram')

    expect(figure?.getAttribute('data-diagram-state')).toBe('loading')
    expect(
      figure?.querySelector('.markdown-diagram-source')?.textContent,
    ).toContain('flowchart TD')
    expect(
      figure
        ?.querySelector('.markdown-diagram-canvas')
        ?.getAttribute('aria-busy'),
    ).toBe('true')
  })

  it('reports a malformed diagram without breaking the rest of the article', async () => {
    const body = renderMarkdown(
      'Before the diagram.\n\n' +
        FENCE('flowchart TD\n    A[Unclosed label --> B') +
        '\n\nAfter the diagram.\n',
    )

    await waitFor(() => {
      expect(body.querySelector('[data-diagram-state="error"]')).not.toBeNull()
    })

    const figure = body.querySelector('figure.markdown-diagram')

    // The reader gets a message and the source instead of an empty box…
    expect(
      figure?.querySelector('.markdown-diagram-error')?.textContent,
    ).toMatch(/could not be rendered/i)
    expect(
      figure?.querySelector('.markdown-diagram-error')?.getAttribute('role'),
    ).toBe('status')
    expect(
      figure?.querySelector('.markdown-diagram-source')?.textContent,
    ).toContain('Unclosed label')
    // …and the surrounding article is untouched.
    expect(body.textContent).toContain('Before the diagram.')
    expect(body.textContent).toContain('After the diagram.')
    expect(body.querySelector('p')).not.toBeNull()
  })

  it('reports a block that is not Mermaid at all the same way', async () => {
    const body = renderMarkdown(
      FENCE('this is not a valid mermaid diagram at all'),
    )

    await waitFor(() => {
      expect(body.querySelector('[data-diagram-state="error"]')).not.toBeNull()
    })
    expect(body.querySelector('.markdown-diagram-error')).not.toBeNull()
  })

  it('encodes markup in a label instead of letting it become markup', async () => {
    // Measured: Mermaid's `strict` security level plus `htmlLabels: false` turn a label's HTML into
    // text. That is Mermaid's boundary; the sanitizer tests cover ours.
    const body = renderMarkdown(
      FENCE(
        'flowchart TD\n    A["<b>bold</b>"] --> B["<script>alert(1)</script>"]',
      ),
    )
    const figure = await readyDiagram(body)

    expect(figure.querySelectorAll('script')).toHaveLength(0)
    expect(figure.querySelectorAll('b')).toHaveLength(0)
    expect(figure.querySelectorAll('foreignObject')).toHaveLength(0)
    expect(figure.innerHTML).not.toMatch(/\son[a-z]+\s*=/i)
    expect(figure.innerHTML).not.toMatch(/javascript:/i)
    // The literal characters appear as text rather than becoming elements.
    expect(figure.textContent).toContain('<b>')
  })

  it('inserts nothing dangerous from a real render', async () => {
    const body = renderMarkdown(
      FENCE('flowchart TD\n    A["<img src=x onerror=alert(1)>"] --> B'),
    )
    const figure = await readyDiagram(body)

    expect(figure.querySelectorAll('script')).toHaveLength(0)
    expect(figure.querySelectorAll('img')).toHaveLength(0)
    expect(figure.querySelectorAll('foreignObject')).toHaveLength(0)
    expect(figure.innerHTML).not.toMatch(/\son[a-z]+\s*=/i)
  })

  it('gives each diagram on a page its own ids', async () => {
    const body = renderMarkdown(
      FENCE('flowchart TD\n    A --> B') +
        '\n\n' +
        FENCE('flowchart TD\n    C --> D'),
    )

    await waitFor(() => {
      expect(
        body.querySelectorAll('[data-diagram-state="ready"]'),
      ).toHaveLength(2)
    })

    const ids = [...body.querySelectorAll('[id]')].map((element) => element.id)

    expect(ids.length).toBeGreaterThan(0)
    // Duplicate ids would make one diagram's `<marker>` references resolve to the other's.
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('re-renders the diagram when the reader switches colour scheme', async () => {
    let dark = false
    const listeners: Array<() => void> = []

    vi.stubGlobal(
      'matchMedia',
      vi.fn(() => ({
        get matches() {
          return dark
        },
        media: '(prefers-color-scheme: dark)',
        addEventListener: (_type: string, listener: () => void) =>
          listeners.push(listener),
        removeEventListener: () => undefined,
      })),
    )

    // The diagram follows the *effective* theme, which the store resolves; it must therefore be
    // listening to the system preference before the synthetic change below can reach it.
    initialiseTheme()

    const body = renderMarkdown(FENCE('flowchart TD\n    A --> B'))
    const figure = await readyDiagram(body)
    const lightSvg = figure.querySelector('svg')?.outerHTML ?? ''

    expect(lightSvg).not.toBe('')
    expect(listeners.length).toBeGreaterThan(0)

    dark = true
    listeners.forEach((listener) => listener())

    // Mermaid paints its own colours, so a scheme change has to produce a different drawing.
    await waitFor(() => {
      const current =
        body.querySelector('figure.markdown-diagram svg')?.outerHTML ?? ''

      expect(current).not.toBe(lightSvg)
    })
  })

  it('renders a diagram inside a list item and a blockquote', async () => {
    const list = renderMarkdown(
      '- Diagram:\n\n  ' +
        FENCE('flowchart TD\n    A --> B').replace(/\n/g, '\n  '),
    )
    const quote = renderMarkdown(
      '> ' + FENCE('flowchart TD\n    A --> B').replace(/\n/g, '\n> '),
    )

    await waitFor(() => {
      expect(
        list.querySelector('li [data-diagram-state="ready"]'),
      ).not.toBeNull()
      expect(
        quote.querySelector('blockquote [data-diagram-state="ready"]'),
      ).not.toBeNull()
    })
  })
})
