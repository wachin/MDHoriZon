import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MarkdownRenderer } from './MarkdownRenderer'

/**
 * Phase 8: a document's own assets.
 *
 * The fixture states the requirement in words — a relative image "must resolve relative to this
 * document, not relative to the application or the page URL" — and this is what proves it, together
 * with the cases the resolution must *not* touch.
 */

const DOCUMENT_URL =
  'https://example.test/articles/2026/reading/Golden-Test-Document.md'

const renderMarkdown = (
  markdown: string,
  documentUrl?: string,
): HTMLElement => {
  const { container } = render(
    <MarkdownRenderer documentUrl={documentUrl}>{markdown}</MarkdownRenderer>,
  )
  const body = container.querySelector('.markdown-body')

  if (!(body instanceof HTMLElement)) {
    throw new Error('the renderer produced no .markdown-body element')
  }

  return body
}

describe('a document’s relative assets', () => {
  it('resolves a relative image against the document, not the page', () => {
    const body = renderMarkdown('![x](../assets/example.png)', DOCUMENT_URL)

    expect(body.querySelector('img')?.getAttribute('src')).toBe(
      'https://example.test/articles/2026/assets/example.png',
    )
  })

  it('normalizes redundant segments instead of treating them as a literal path', () => {
    const body = renderMarkdown('![x](./../assets/example.png)', DOCUMENT_URL)

    expect(body.querySelector('img')?.getAttribute('src')).toBe(
      'https://example.test/articles/2026/assets/example.png',
    )
  })

  it('resolves a relative link the same way', () => {
    const body = renderMarkdown('[next](./sibling.md)', DOCUMENT_URL)

    expect(body.querySelector('a')?.getAttribute('href')).toBe(
      'https://example.test/articles/2026/reading/sibling.md',
    )
  })

  it('resolves against a path-only document location, which is what the preview supplies', () => {
    const body = renderMarkdown(
      '![x](../assets/example.png)',
      '/tests/fixtures/Golden-Test-Document.md',
    )

    expect(body.querySelector('img')?.getAttribute('src')).toBe(
      '/tests/assets/example.png',
    )
  })

  it('leaves a remote image alone', () => {
    const body = renderMarkdown(
      '![x](https://placehold.co/640x240/png)',
      DOCUMENT_URL,
    )

    expect(body.querySelector('img')?.getAttribute('src')).toBe(
      'https://placehold.co/640x240/png',
    )
  })

  it('leaves a root-relative image alone', () => {
    const body = renderMarkdown('![x](/assets/example.png)', DOCUMENT_URL)

    expect(body.querySelector('img')?.getAttribute('src')).toBe(
      '/assets/example.png',
    )
  })

  it('keeps a relative source exactly as written when the document’s location is unknown', () => {
    // The rendering core must stay usable without a content loader; guessing a base would be worse.
    const body = renderMarkdown('![x](../assets/example.png)')

    expect(body.querySelector('img')?.getAttribute('src')).toBe(
      '../assets/example.png',
    )
  })

  it('still refuses an executable URL after resolving', () => {
    // Resolution happens first, so this is the order that matters: a relative-looking value must not
    // be able to smuggle a scheme past the policy.
    const body = renderMarkdown(
      '[a](javascript:alert(1)) ![b](data:image/png;base64,AAAA)',
      DOCUMENT_URL,
    )

    expect(body.querySelector('a')?.getAttribute('href')).toBeNull()
    expect(body.querySelector('img')?.getAttribute('src')).toBeNull()
  })

  it('keeps an in-page fragment inside the document', () => {
    const body = renderMarkdown('[a](#section)', DOCUMENT_URL)

    expect(body.querySelector('a')?.getAttribute('href')).toBe('#section')
  })
})
