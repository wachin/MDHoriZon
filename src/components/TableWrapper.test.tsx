import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MarkdownRenderer } from './MarkdownRenderer'

/**
 * Tables, Phase 4: the scroll region, accessible header semantics, and the widths the roadmap asks
 * to cover. Touch behaviour itself is CSS and belongs to Phase 20's device validation.
 */
const renderMarkdown = (markdown: string): HTMLElement => {
  const { container } = render(<MarkdownRenderer>{markdown}</MarkdownRenderer>)
  const body = container.querySelector('.markdown-body')

  if (!(body instanceof HTMLElement))
    throw new Error('the renderer produced no .markdown-body element')

  return body
}

const tableOf = (columns: number) =>
  [
    `| ${Array.from({ length: columns }, (_, index) => `C${index + 1}`).join(' | ')} |`,
    `|${'---|'.repeat(columns)}`,
    `| ${Array.from({ length: columns }, (_, index) => `A${index + 1}`).join(' | ')} |`,
  ].join('\n')

describe('table widths', () => {
  for (const columns of [2, 3, 5, 8, 12, 20]) {
    it(`renders a ${columns}-column table with every cell`, () => {
      const body = renderMarkdown(tableOf(columns))

      expect(body.querySelectorAll('th')).toHaveLength(columns)
      expect(body.querySelectorAll('tbody td')).toHaveLength(columns)
    })
  }

  it('wraps every table in a scrollable region reachable from the keyboard', () => {
    const body = renderMarkdown(tableOf(20))

    const region = body.querySelector('.markdown-table-scroll')
    expect(region).not.toBeNull()
    expect(region).toHaveAttribute('tabindex', '0')
    expect(region).toHaveAttribute('role', 'region')
    expect(region?.getAttribute('aria-label')).toBeTruthy()
  })
})

describe('accessible table semantics', () => {
  it('tells a screen reader what each header cell heads', () => {
    const body = renderMarkdown(tableOf(3))

    for (const header of body.querySelectorAll('th')) {
      expect(header).toHaveAttribute('scope', 'col')
    }
  })
})

describe('cell content', () => {
  it('renders formatting inside cells: bold, inline code and links', () => {
    const body = renderMarkdown(
      '| Feature | Example |\n|---|---|\n| Bold | **important** |\n| Code | `npm install` |\n| Link | [GitHub](https://github.com/) |',
    )

    const cells = [...body.querySelectorAll('tbody td')]
    expect(cells[1].querySelector('strong')).toHaveTextContent('important')
    expect(cells[3].querySelector('code')).toHaveTextContent('npm install')
    expect(cells[5].querySelector('a')).toHaveAttribute(
      'href',
      'https://github.com/',
    )
  })

  it('keeps a long cell readable instead of leaving the table to stretch', () => {
    const long = 'a'.repeat(400)
    const body = renderMarkdown(`| Long |\n|---|\n| ${long} |`)

    // The cell keeps the whole value; wrapping is CSS.
    expect(body.querySelector('td')).toHaveTextContent(long)
  })

  it('keeps a pipe that a cell escapes', () => {
    const body = renderMarkdown(
      '| Case | Rendered |\n|---|---|\n| Escaped pipe | a \\| b |',
    )

    expect(body.querySelectorAll('td')[1]).toHaveTextContent('a | b')
  })

  it('renders an empty cell as an empty cell rather than dropping the column', () => {
    const body = renderMarkdown('| A | B | C |\n|---|---|---|\n| 1 |  | 3 |')

    const cells = [...body.querySelectorAll('tbody td')]
    expect(cells).toHaveLength(3)
    expect(cells[1]).toHaveTextContent('')
  })
})
