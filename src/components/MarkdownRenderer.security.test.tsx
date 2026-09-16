import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MarkdownRenderer } from './MarkdownRenderer'

/**
 * The malicious-input battery required by Phase 2 of the roadmap. The human-readable version of
 * these cases lives in section 14 of the Golden Test Document; this is the executable one.
 *
 * Every case must satisfy the same invariants, which are checked as a group rather than case by
 * case: no dangerous element, no event-handler attribute, no inline style, and no executable URL.
 */

const DANGEROUS_ELEMENTS = [
  'script',
  'iframe',
  'object',
  'embed',
  'style',
  'base',
  'meta',
  'link',
  'form',
  'textarea',
  'button',
  'select',
  'svg',
  'math',
]

const EXECUTABLE_URL = /^(javascript|vbscript|data):/

const normalize = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[\s\p{Cc}]+/gu, '')

/**
 * Renders and returns the Markdown body itself, not the wrapper that Testing Library adds.
 * Otherwise a selector like `div` matches our own `.markdown-body` element and reports a leak that
 * is not one.
 */
const renderMarkdown = (markdown: string): HTMLElement => {
  const { container } = render(<MarkdownRenderer>{markdown}</MarkdownRenderer>)
  const body = container.querySelector('.markdown-body')

  if (!(body instanceof HTMLElement))
    throw new Error('the renderer produced no .markdown-body element')

  return body
}

/** The invariants every malicious input has to hold to. */
function expectNothingDangerous(container: HTMLElement) {
  for (const tag of DANGEROUS_ELEMENTS) {
    expect(container.querySelectorAll(tag), `element <${tag}>`).toHaveLength(0)
  }

  for (const element of container.querySelectorAll('*')) {
    for (const attribute of element.attributes) {
      const where = `${element.tagName.toLowerCase()}[${attribute.name}]`

      expect(/^on/i.test(attribute.name), `event handler at ${where}`).toBe(
        false,
      )
      expect(attribute.name, `inline style at ${where}`).not.toBe('style')

      if (attribute.name === 'href' || attribute.name === 'src') {
        expect(
          EXECUTABLE_URL.test(normalize(attribute.value)),
          `executable URL at ${where}`,
        ).toBe(false)
      }
    }
  }
}

describe('malicious Markdown input', () => {
  it('rejects javascript: URLs', () => {
    const container = renderMarkdown(
      "[link](javascript:alert('x'))\n\n[obfuscated](JaVaScRiPt:alert('x'))\n\n![image](javascript:alert('x'))",
    )

    expectNothingDangerous(container)
    expect(container.querySelectorAll('[href], [src]')).toHaveLength(0)
    // The link text survives; only the destination is gone.
    expect(container).toHaveTextContent('link')
  })

  it('rejects HTML <script> attempts, inline and as a block', () => {
    const inline = renderMarkdown('Before <script>alert("x")</script> after')

    expectNothingDangerous(inline)
    // Inline HTML loses its tags and keeps the text around them, which is inert.
    expect(inline).toHaveTextContent('Before')
    expect(inline).toHaveTextContent('after')

    const block = renderMarkdown('<script>\nalert("block")\n</script>\n\nDone.')

    expectNothingDangerous(block)
    // A block of HTML is dropped with its content: the documented trade-off of layer 1.
    expect(block).not.toHaveTextContent('alert')
    expect(block).toHaveTextContent('Done.')
  })

  it('rejects onerror and other event-handler attributes', () => {
    const container = renderMarkdown(
      '<img src="x" onerror="alert(1)">\n\n<div onclick="alert(1)" onmouseover="alert(1)">text</div>\n\n<a href="#" onfocus="alert(1)">x</a>',
    )

    expectNothingDangerous(container)
    expect(container.querySelectorAll('img, div, a')).toHaveLength(0)
  })

  it('rejects malicious SVG', () => {
    const container = renderMarkdown(
      '<svg><script>alert(1)</script></svg>\n\n<svg onload="alert(1)"><circle r="10" /></svg>\n\n<svg><foreignObject><body xmlns="http://www.w3.org/1999/xhtml"><script>alert(1)</script></body></foreignObject></svg>',
    )

    expectNothingDangerous(container)
    expect(container.querySelectorAll('circle, foreignObject')).toHaveLength(0)
  })

  it('rejects unsafe iframe, embed and object elements', () => {
    const container = renderMarkdown(
      '<iframe src="https://example.com"></iframe>\n\n<embed src="https://example.com">\n\n<object data="https://example.com"></object>',
    )

    expectNothingDangerous(container)
    expect(container).not.toHaveTextContent('example.com')
  })

  it('survives malformed HTML without leaving anything behind', () => {
    const container = renderMarkdown(
      '<div><span>unclosed\n\n<img src=x onerror=alert(1)\n\n<p>text<//p>\n\n</div>',
    )

    expectNothingDangerous(container)

    // The unclosed `<img …>` is not a valid HTML block, so CommonMark treats it as text. That is
    // the best possible outcome: the markup is visible, escaped, and carries no attribute.
    expect(container.querySelectorAll('img')).toHaveLength(0)
    expect(container).toHaveTextContent('<img src=x onerror=alert(1)')

    // Whatever elements remain were produced by Markdown itself, and none of them carries an
    // executable attribute.
    for (const element of container.querySelectorAll('*')) {
      const executable = [...element.attributes].filter(
        (attribute) =>
          /^on/i.test(attribute.name) || attribute.name === 'style',
      )
      expect(executable, element.outerHTML).toEqual([])
    }
  })

  it('rejects URLs hidden behind HTML entities and character references', () => {
    const container = renderMarkdown(
      "[entity](&#106;avascript:alert('x'))\n\n[hex](&#x6a;avascript:alert('x'))\n\n[codepoint](&#106;&#97;vascript:alert('x'))",
    )

    expectNothingDangerous(container)

    // Whether the parser decodes the entity or not, the result must never be an executable URL.
    for (const anchor of container.querySelectorAll('a[href]')) {
      expect(
        EXECUTABLE_URL.test(normalize(anchor.getAttribute('href') ?? '')),
      ).toBe(false)
    }
  })

  it('rejects every unexpected URL scheme', () => {
    const container = renderMarkdown(
      [
        '[ftp](ftp://example.com/x)',
        '[file](file:///etc/passwd)',
        '[tel](tel:+541100000000)',
        '[vbscript](vbscript:msgbox(1))',
        '[data](data:text/html,<script>alert(1)</script>)',
        '[irc](irc://example.com)',
      ].join('\n\n'),
    )

    expectNothingDangerous(container)
    expect(container.querySelectorAll('[href], [src]')).toHaveLength(0)
  })

  it('rejects data: images', () => {
    const container = renderMarkdown(
      '![svg](data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cscript%3Ealert(1)%3C%2Fscript%3E%3C%2Fsvg%3E)\n\n![png](data:image/png;base64,iVBORw0KGgo=)',
    )

    expectNothingDangerous(container)
    expect(container.querySelectorAll('img[src]')).toHaveLength(0)
  })

  // The two verification tasks from Phase 2.
  it('renders code fences as text, never as executable HTML', () => {
    const container = renderMarkdown(
      '```html\n<script>alert("fenced")</script>\n<img src="x" onerror="alert(1)">\n```\n\n    <script>indented</script>',
    )

    expectNothingDangerous(container)
    // The markup is visible as characters, which is the point of a code block.
    expect(container.querySelector('pre')).toHaveTextContent(
      '<script>alert("fenced")</script>',
    )
  })

  it('keeps Mermaid content inert: source text in a code block, never a diagram', () => {
    const container = renderMarkdown(
      '```mermaid\nflowchart TD\n  A[Start] --> B[End]\n```\n\n```mermaid\nthis is not valid mermaid\n```',
    )

    expectNothingDangerous(container)
    expect(
      container.querySelectorAll('pre[data-language="mermaid"]'),
    ).toHaveLength(2)
    expect(container.querySelectorAll('svg, canvas')).toHaveLength(0)
  })
})
