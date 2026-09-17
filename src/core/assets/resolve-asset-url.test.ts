import { describe, expect, it } from 'vitest'
import { resolveAssetUrl } from './resolve-asset-url'

/**
 * The resolver is small and easy to get subtly wrong, so the cases are spelled out: what counts as
 * relative, what must be left alone, and what happens when the document's own location is a path
 * rather than a full URL (which is what tests and the in-page preview supply).
 */

const DOC = 'https://example.test/articles/2026/reading.md'
const DOC_PATH = '/tests/fixtures/Golden-Test-Document.md'

describe('resolving relative asset paths', () => {
  it('resolves against the document’s own directory, not the page', () => {
    expect(resolveAssetUrl('diagram.png', DOC)).toBe(
      'https://example.test/articles/2026/diagram.png',
    )
  })

  it('walks up with `..`', () => {
    // Reaching out of the document's own folder must work too: the fixture does it for a link
    // (`../articles/example.md`), and an article that keeps its images elsewhere will do it for
    // images. The documents themselves keep their images in a folder beside them, which is the
    // "walks down" case below.
    expect(resolveAssetUrl('./../assets/example.png', DOC)).toBe(
      'https://example.test/articles/assets/example.png',
    )
    expect(resolveAssetUrl('./../assets/example.png', DOC_PATH)).toBe(
      '/tests/assets/example.png',
    )
  })

  it('walks down into a subdirectory', () => {
    expect(resolveAssetUrl('images/deep/x.png', DOC)).toBe(
      'https://example.test/articles/2026/images/deep/x.png',
    )
  })

  it('treats a leading `./` as the current directory', () => {
    expect(resolveAssetUrl('./x.png', DOC)).toBe(
      'https://example.test/articles/2026/x.png',
    )
  })

  it('never escapes above the site root', () => {
    expect(resolveAssetUrl('../../../../../../x.png', DOC)).toBe(
      'https://example.test/x.png',
    )
  })

  it('keeps the query and the fragment of the relative URL', () => {
    expect(resolveAssetUrl('x.png?v=2#frag', DOC)).toBe(
      'https://example.test/articles/2026/x.png?v=2#frag',
    )
  })

  it('resolves a query-only or fragment-only reference against the document itself', () => {
    // A link to `#section` belongs to the document, so it must not gain a directory.
    expect(resolveAssetUrl('#section', DOC)).toBe('#section')
    expect(resolveAssetUrl('?page=2', DOC)).toBe('?page=2')
  })

  it('works when the document URL is a path, which is what the preview supplies', () => {
    expect(resolveAssetUrl('example.png', DOC_PATH)).toBe(
      '/tests/fixtures/example.png',
    )
    expect(resolveAssetUrl('Golden-Test-Document.md', DOC_PATH)).toBe(
      '/tests/fixtures/Golden-Test-Document.md',
    )
  })

  it('survives a document URL with no filename at all', () => {
    expect(resolveAssetUrl('x.png', '/articles/')).toBe('/articles/x.png')
    expect(resolveAssetUrl('x.png', '/')).toBe('/x.png')
  })
})

describe('what the resolver leaves alone', () => {
  it('keeps absolute URLs', () => {
    for (const url of [
      'https://cdn.test/x.png',
      'http://cdn.test/x.png',
      'mailto:someone@example.test',
      'data:image/png;base64,AAAA',
    ]) {
      expect(resolveAssetUrl(url, DOC), url).toBe(url)
    }
  })

  it('keeps root-relative paths', () => {
    // `/assets/x.png` starts at the site root by definition.
    expect(resolveAssetUrl('/assets/x.png', DOC)).toBe('/assets/x.png')
  })

  it('keeps protocol-relative URLs', () => {
    expect(resolveAssetUrl('//cdn.test/x.png', DOC)).toBe('//cdn.test/x.png')
  })

  it('does nothing when the document’s location is unknown', () => {
    // Guessing a base would be worse than leaving the document’s own words in place.
    expect(resolveAssetUrl('x.png', undefined)).toBe('x.png')
    expect(resolveAssetUrl('x.png', '')).toBe('x.png')
  })

  it('leaves an empty URL empty', () => {
    expect(resolveAssetUrl('', DOC)).toBe('')
    expect(resolveAssetUrl('   ', DOC)).toBe('')
  })

  it('trims the URL it was given', () => {
    expect(resolveAssetUrl('  x.png  ', DOC)).toBe(
      'https://example.test/articles/2026/x.png',
    )
  })

  it('never invents a scheme for a relative path', () => {
    // The resolved value must still be something the URL policy can judge: a path stays a path.
    expect(resolveAssetUrl('x.png', DOC_PATH)).not.toMatch(/^[a-z]+:/i)
  })
})
