import { readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { MarkdownRenderer } from '../src/components/MarkdownRenderer'

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
        'svg',
      ]) {
        expect(container.querySelectorAll(selector), selector).toHaveLength(0)
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

  describe('features that belong to later phases still render as readable text', () => {
    it('shows maths source rather than breaking, until Phase 5 adds KaTeX', () => {
      expect(container).toHaveTextContent('\\int_0^\\infty')
    })

    it('shows Mermaid source as a code block, including the deliberately invalid ones, until Phase 6', () => {
      const languages = [
        ...container.querySelectorAll('pre[data-language]'),
      ].map((block) => block.getAttribute('data-language'))
      expect(languages).toContain('mermaid')
    })
  })
})
