import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MarkdownRenderer } from './MarkdownRenderer'

/**
 * The edge cases that separate a correct renderer from a naive one.
 *
 * They are the tricky corners of CommonMark and GFM that produce visibly wrong output while looking
 * perfectly reasonable in source: intraword underscores, emphasis that cannot close, escaped
 * punctuation, tight versus loose lists, list interruption rules, setext headings, lazy blockquote
 * continuation. A curated subset, not the full conformance suite: the complete CommonMark and GFM
 * suites are a larger task, noted in `docs/references.md`.
 */
const renderMarkdown = (markdown: string): HTMLElement => {
  const { container } = render(<MarkdownRenderer>{markdown}</MarkdownRenderer>)
  const body = container.querySelector('.markdown-body')

  if (!(body instanceof HTMLElement))
    throw new Error('the renderer produced no .markdown-body element')

  return body
}

const text = (markdown: string) => renderMarkdown(markdown).textContent ?? ''

describe('emphasis corner cases', () => {
  it('does not emphasise underscores inside a word', () => {
    const body = renderMarkdown('foo_bar_baz')

    expect(body.querySelector('em')).toBeNull()
    expect(body).toHaveTextContent('foo_bar_baz')
  })

  it('does emphasise asterisks inside a word', () => {
    expect(renderMarkdown('foo*bar*baz').querySelector('em')).toHaveTextContent(
      'bar',
    )
  })

  it('nests emphasis inside strong emphasis', () => {
    const body = renderMarkdown('**bold *and italic* inside**')

    expect(body.querySelector('strong > em')).toHaveTextContent('and italic')
  })

  it('honours escaped punctuation instead of treating it as markup', () => {
    const body = renderMarkdown('\\*not emphasis\\* and \\_not either\\_')

    expect(body.querySelector('em')).toBeNull()
    expect(body).toHaveTextContent('*not emphasis* and _not either_')
  })

  it('keeps a backslash literal inside a code span', () => {
    expect(renderMarkdown('`\\*`').querySelector('code')).toHaveTextContent(
      '\\*',
    )
  })

  it('only treats a pair of tildes as strikethrough', () => {
    // `singleTilde` is off in the plugin configuration: a lone tilde is the home-directory
    // character in prose, and turning `~/Descargas … ~/Documentos` into strikethrough would be a
    // rendering bug in any article that mentions paths.
    const body = renderMarkdown('~not strikethrough~ and ~~strikethrough~~')

    const deleted = body.querySelectorAll('del')
    expect(deleted).toHaveLength(1)
    expect(deleted[0]).toHaveTextContent('strikethrough')
    expect(body).toHaveTextContent('~not strikethrough~')
  })

  it('supports a code span that contains a backtick', () => {
    expect(renderMarkdown('``a ` b``').querySelector('code')).toHaveTextContent(
      'a ` b',
    )
  })
})

describe('links and entities', () => {
  it('decodes HTML entities in text', () => {
    expect(text('&amp; &lt; &gt; &quot;')).toBe('& < > "')
  })

  it('links an angle-bracketed URL', () => {
    const body = renderMarkdown('<https://example.com>')

    expect(body.querySelector('a')).toHaveAttribute(
      'href',
      'https://example.com',
    )
    expect(body.querySelector('a')).toHaveTextContent('https://example.com')
  })

  it('links a bare www host and an email, without turning them into code', () => {
    const body = renderMarkdown(
      'Visit www.example.com or write to <someone@example.com>',
    )

    expect(body.querySelector('a[href^="http"]')).not.toBeNull()
    expect(body.querySelector('a[href^="mailto:"]')).not.toBeNull()
  })

  it('renders an image inside a link as one unit', () => {
    const body = renderMarkdown(
      '[![alt text](image.png)](https://example.com/)',
    )

    const link = body.querySelector('a')
    expect(link).toHaveAttribute('href', 'https://example.com/')
    expect(link?.querySelector('img')).toHaveAttribute('alt', 'alt text')
  })
})

describe('headings', () => {
  it('renders setext headings', () => {
    const body = renderMarkdown('Title\n=====\n\nSubtitle\n--------')

    expect(body.querySelector('h1')).toHaveTextContent('Title')
    expect(body.querySelector('h2')).toHaveTextContent('Subtitle')
  })

  it('builds the id from the heading text, ignoring inline formatting', () => {
    expect(
      renderMarkdown('## Hello **world**').querySelector('h2'),
    ).toHaveAttribute('id', 'hello-world')
  })
})

describe('lists', () => {
  it('distinguishes tight from loose lists', () => {
    expect(renderMarkdown('- one\n- two').querySelector('li > p')).toBeNull()
    expect(
      renderMarkdown('- one\n\n- two').querySelector('li > p'),
    ).not.toBeNull()
  })

  it('lets an ordered list that starts with 1 interrupt a paragraph', () => {
    expect(renderMarkdown('Text\n1. item').querySelector('ol')).not.toBeNull()
  })

  it('does not let an ordered list that starts higher interrupt a paragraph', () => {
    // CommonMark only allows the interruption when the number is 1, so this stays prose.
    expect(renderMarkdown('Text\n2. item').querySelector('ol')).toBeNull()
  })

  it('keeps a four-space indented block inside a list item as code, not as a new item', () => {
    const body = renderMarkdown('- item\n\n      indented code')

    expect(body.querySelectorAll('li')).toHaveLength(1)
    expect(body.querySelector('pre code')).toHaveTextContent('indented code')
  })
})

describe('tables and breaks', () => {
  it('keeps the alignment GFM declares', () => {
    const body = renderMarkdown('| a | b |\n|:--|--:|\n| 1 | 2 |')

    // The serializer (hast-util-to-jsx-runtime) turns the `align` attribute into an inline style,
    // which is why the schema pins `align` to four values and to th/td only.
    const cells = [...body.querySelectorAll('th, td')]
    expect(cells.map((cell) => cell.getAttribute('style'))).toEqual([
      'text-align: left;',
      'text-align: right;',
      'text-align: left;',
      'text-align: right;',
    ])
  })

  it('honours a two-space hard line break inside one paragraph', () => {
    const body = renderMarkdown('first  \nsecond')

    expect(body.querySelector('br')).not.toBeNull()
    expect(body.querySelectorAll('p')).toHaveLength(1)
  })

  it('treats a single newline as a soft break, not a line break', () => {
    expect(renderMarkdown('first\nsecond').querySelector('br')).toBeNull()
  })
})

describe('blockquotes', () => {
  it('continues a lazy paragraph inside a quote', () => {
    const body = renderMarkdown('> first line\nsecond line')

    expect(body.querySelector('blockquote')).toHaveTextContent('first line')
    expect(body.querySelector('blockquote')).toHaveTextContent('second line')
    expect(body.querySelectorAll('blockquote')).toHaveLength(1)
  })
})
