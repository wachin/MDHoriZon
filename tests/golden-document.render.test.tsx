import { readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { MarkdownRenderer } from '../src/components/MarkdownRenderer'

/**
 * Mermaid is mocked in this file, and the reason is worth stating: `mermaid.render` asks the engine
 * for layout measurements (`getBBox` and friends) that jsdom does not implement, so rendering the
 * fixture here would exercise the failure path instead of the diagram path.
 *
 * This file pins the *document* contract — a `mermaid` fence becomes a diagram, the source stays
 * readable while it is not drawn, and the rest of the document is untouched. Real diagrams are
 * rendered in `src/components/MermaidDiagram.test.tsx` (with the layout measurements stubbed) and
 * every diagram in the document is parsed in `tests/mermaid-fixture.test.ts`.
 *
 * The promise never settles on purpose: the diagrams stay in their loading state, which makes the
 * snapshot deterministic and keeps state updates from escaping the test.
 */
vi.mock('../src/core/mermaid/loader', () => ({
  renderMermaid: () => new Promise(() => undefined),
  parseMermaid: () => Promise.resolve(),
}))

/**
 * The Golden Test Document is the rendering contract, and this is its baseline: the whole fixture,
 * rendered through the real renderer, in the same jsdom that CI runs.
 *
 * These assertions are deliberately structural — they check that the document still renders and that
 * the invariants its sections document still hold. As phases add features (KaTeX, Mermaid, code
 * highlighting), this file grows with them.
 */
const repoRoot = resolve(import.meta.dirname, '..')
const fixture = readFileSync(
  join(repoRoot, 'tests/fixtures/Golden-Test-Document.md'),
  'utf8',
)

describe('Golden Test Document', () => {
  let container: HTMLElement

  /**
   * Section ids start with a digit (`# 1. Headings` → `1-headings`), and a CSS identifier cannot
   * start with one, so `#1-headings` is an invalid selector. The attribute form always works.
   */
  const byId = (id: string) => container.querySelector(`[id="${id}"]`)

  beforeEach(() => {
    container = render(<MarkdownRenderer>{fixture}</MarkdownRenderer>).container
  })

  it('renders the whole document without throwing', () => {
    expect(container.querySelectorAll('*').length).toBeGreaterThan(500)
  })

  it('matches the stored rendering, so an intentional change shows up as a diff', () => {
    // The comparison mechanism Phase 3 asks for. This is a golden file: when a renderer change is
    // deliberate, run `npm test -- -u` and the change appears as a reviewable diff in the commit.
    // An unintentional change fails here before anyone reads the output.
    const body = container.querySelector('.markdown-body')

    expect(body?.innerHTML).toMatchSnapshot('rendered document')
  })

  it('renders every numbered section', () => {
    for (const id of [
      '1-headings',
      '4-images',
      '8-tables',
      '12-mermaid',
      '19-final-regression-checklist',
    ]) {
      expect(byId(id), id).not.toBeNull()
    }
  })

  describe('anchors', () => {
    it('resolves the document’s own in-page link', () => {
      expect(container.querySelector('a[href="#12-mermaid"]')).not.toBeNull()
      expect(byId('12-mermaid')).not.toBeNull()
    })

    it('keeps duplicate headings distinct', () => {
      expect(byId('duplicate-heading')).not.toBeNull()
      expect(byId('duplicate-heading-1')).not.toBeNull()
    })
  })

  describe('GFM structures', () => {
    it('renders the tables, including the 20-column one', () => {
      expect(container.querySelectorAll('table').length).toBeGreaterThanOrEqual(
        11,
      )
      const widest = [...container.querySelectorAll('tr')].reduce(
        (most, row) => Math.max(most, row.querySelectorAll('th, td').length),
        0,
      )
      expect(widest).toBe(20)
    })

    it('renders task lists as disabled checkboxes', () => {
      const checkboxes = screen.getAllByRole('checkbox')
      expect(checkboxes.length).toBeGreaterThanOrEqual(3)
      expect(
        checkboxes.every((box) => (box as HTMLInputElement).disabled),
      ).toBe(true)
    })

    it('covers every table width the roadmap asks to test', () => {
      const widths = new Set(
        [...container.querySelectorAll('table')].map(
          (table) => table.querySelectorAll('thead th').length,
        ),
      )

      for (const expected of [2, 3, 5, 8, 12, 20]) {
        expect([...widths], `a ${expected}-column table`).toContain(expected)
      }
    })

    it('renders code blocks and keeps their declared language', () => {
      const blocks = container.querySelectorAll('pre[data-language]')
      expect(blocks.length).toBeGreaterThanOrEqual(8)
      const languages = [...blocks].map((block) =>
        block.getAttribute('data-language'),
      )
      expect(languages).toContain('typescript')
      expect(languages).toContain('not-a-real-language')
    })
  })

  describe('images', () => {
    it('keeps alternative text, including for the image that cannot be resolved', () => {
      expect(
        screen.getByAltText('This image intentionally does not exist'),
      ).toBeInTheDocument()
      expect(
        screen.getByAltText('This image intentionally does not exist'),
      ).toHaveAttribute('src', '../assets/does-not-exist.png')
    })

    it('keeps relative sources untouched, so Phase 8 can resolve them', () => {
      expect(
        container.querySelector('img[src="../assets/wide.png"]'),
      ).not.toBeNull()
      expect(
        container.querySelector('img[src="./../assets/example.png"]'),
      ).not.toBeNull()
    })

    it('renders a decorative image with an empty alt', () => {
      expect(
        [...container.querySelectorAll('img')].some(
          (img) => img.getAttribute('alt') === '',
        ),
      ).toBe(true)
    })
  })

  describe('CJK emphasis, pinned on purpose', () => {
    it('renders the punctuation-adjacent case literally, as CommonMark specifies', () => {
      // If a parser extension is ever adopted this expectation changes deliberately — see
      // docs/references.md and section 10 of the fixture.
      expect(container.textContent).toContain('**「重要」**中文')
    })

    it('bolds the case that CommonMark accepts', () => {
      expect(screen.getByText('强调').tagName).toBe('STRONG')
    })
  })

  describe('sanitization', () => {
    it('creates no elements from the document’s raw HTML', () => {
      for (const selector of [
        'script',
        'iframe',
        'object',
        'embed',
        'style',
        'base',
        'form',
        'details',
      ]) {
        expect(container.querySelectorAll(selector), selector).toHaveLength(0)
      }

      // Phase 5 changed the shape of this guarantee rather than weakening it. The document now
      // legitimately contains SVG (`KaTeX` draws radicals with a `<path>`) and MathML, so "no `svg`
      // anywhere" stopped being the invariant. The invariant is that none of it came from the
      // document: every such element must belong to a formula.
      for (const selector of [
        'svg',
        'path',
        'line',
        'math',
        'semantics',
        'annotation',
        'mi',
        'mrow',
      ]) {
        const fromTheDocument = [
          ...container.querySelectorAll(selector),
        ].filter((element) => element.closest('.katex') === null)

        expect(fromTheDocument, selector).toHaveLength(0)
      }
    })

    it('has no executable or data URL left on a link or an image', () => {
      for (const anchor of container.querySelectorAll('a[href]')) {
        const href = anchor.getAttribute('href') ?? ''
        expect(href.toLowerCase().replace(/[\s\p{Cc}]+/gu, '')).not.toMatch(
          /^(javascript|vbscript|data):/,
        )
      }
      for (const image of container.querySelectorAll('img[src]')) {
        const src = image.getAttribute('src') ?? ''
        expect(src.toLowerCase().replace(/[\s\p{Cc}]+/gu, '')).not.toMatch(
          /^data:/,
        )
      }
    })
  })

  describe('mathematics', () => {
    it('renders the document’s formulas with KaTeX, inline and display', () => {
      // Phase 5. Until it landed, this section asserted the opposite — that the TeX source was still
      // readable because nothing rendered it.
      expect(container.querySelectorAll('.katex').length).toBeGreaterThan(0)
      expect(
        container.querySelectorAll('.katex-display').length,
      ).toBeGreaterThan(0)
      expect(container.querySelectorAll('math').length).toBeGreaterThan(0)
    })

    it('paints glyphs in the visual layer and keeps the source for assistive technology', () => {
      const visual = [...container.querySelectorAll('.katex-html')]
        .map((span) => span.textContent ?? '')
        .join('')

      // An integral is an operator glyph in the visual layer…
      expect(visual).toContain('∫')
      expect(visual).not.toContain('\\int')
      // …and the TeX source survives in the MathML annotation, which is where a screen reader finds
      // it. Both halves of KaTeX's output are load-bearing.
      const annotations = [...container.querySelectorAll('annotation')]

      expect(annotations.length).toBeGreaterThan(0)
      expect(annotations.some((a) => a.textContent?.includes('\\int'))).toBe(
        true,
      )
    })

    it('keeps the currency sentence out of the maths pipeline', () => {
      // The fixture states this requirement in words; this is the assertion behind it. Without the
      // delimiter rule in `remark-inline-math-rule.ts` this sentence renders `$5 and the other costs $`
      // as a formula.
      expect(container).toHaveTextContent(
        'the item costs $5 and the other costs $10 today',
      )
    })
  })

  describe('diagrams', () => {
    it('turns every mermaid fence into a diagram, not a code block', () => {
      // Phase 6. Until it landed, this section asserted the opposite — that the source was still
      // shown as a code block because nothing rendered it.
      //
      // Mermaid is mocked in this file (see `vi.mock` at the top): the loader's render needs a layout
      // engine jsdom does not have, and this test is about the document contract. Real Mermaid
      // rendering has its own tests in `src/components/MermaidDiagram.test.tsx` and
      // `tests/mermaid-fixture.test.ts`.
      expect(
        container.querySelectorAll('figure.markdown-diagram'),
      ).toHaveLength(7)
      // The diagram never takes the code-block path: no toolbar, no copy button. (The document has
      // plenty of real code blocks with copy buttons — none of them may be a diagram.)
      expect(
        container.querySelectorAll('.markdown-code [data-language="mermaid"]'),
      ).toHaveLength(0)
      expect(
        container.querySelectorAll('figure.markdown-diagram .markdown-code'),
      ).toHaveLength(0)
    })

    it('keeps a diagram’s source readable while it is not rendered', () => {
      // A reader on an engine that cannot draw the diagram still gets the information rather than an
      // empty box — and the document's two deliberately broken diagrams pin that requirement.
      const sources = [
        ...container.querySelectorAll('.markdown-diagram-source'),
      ]

      expect(sources).toHaveLength(7)
      expect(
        sources.some((source) => source.textContent?.includes('flowchart TD')),
      ).toBe(true)
      expect(
        sources.some((source) =>
          source.textContent?.includes('Unclosed label'),
        ),
      ).toBe(true)
    })

    it('still renders every other language as a code block', () => {
      const languages = [
        ...container.querySelectorAll('pre[data-language]'),
      ].map((block) => block.getAttribute('data-language'))

      // The Phase 4 code blocks are untouched by the fork.
      expect(languages).toContain('bash')
      expect(languages).toContain('json')
      // The only `mermaid` left in a `pre` is the diagram fallback, not a code block.
      expect(
        container.querySelector('.markdown-code pre[data-language="mermaid"]'),
      ).toBeNull()
    })
  })
})
