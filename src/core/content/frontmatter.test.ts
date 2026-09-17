// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { parseFrontmatter } from './frontmatter'
import { readMetadata } from './metadata'

/**
 * The document envelope, and the fields that may appear in it.
 *
 * The library this engine actually reads has **no frontmatter at all**, so the first thing to pin is
 * that its absence is normal: a document without one is valid, and its body is untouched.
 */

const document = (frontmatter: string, body = '# Title\n\nText.\n') =>
  `---\n${frontmatter}\n---\n\n${body}`

describe('splitting the envelope off a document', () => {
  it('leaves a document with no frontmatter exactly as it was', () => {
    const result = parseFrontmatter('# Title\n\nText.\n')

    expect(result.found).toBe(false)
    expect(result.data).toEqual({})
    expect(result.body).toBe('# Title\n\nText.\n')
    expect(result.issues).toEqual([])
  })

  it('reads the metadata and keeps only the body', () => {
    const result = parseFrontmatter(document('title: Hola\ntags: [linux]'))

    expect(result.found).toBe(true)
    expect(result.data).toEqual({ title: 'Hola', tags: ['linux'] })
    expect(result.body).toBe('# Title\n\nText.\n')
  })

  it('recognises a block only at the very start', () => {
    // A `---` further down is a thematic break, which is what Markdown says it is.
    const text = '# Title\n\n---\ntitle: not metadata\n---\n'
    const result = parseFrontmatter(text)

    expect(result.found).toBe(false)
    expect(result.body).toBe(text)
  })

  it('ignores a byte-order mark, which an editor may have written', () => {
    const result = parseFrontmatter('\uFEFF' + document('title: Hola'))

    expect(result.found).toBe(true)
    expect(result.data.title).toBe('Hola')
  })

  it('works with Windows line endings', () => {
    const result = parseFrontmatter(
      '---\r\ntitle: Hola\r\n---\r\n\r\n# Title\r\n',
    )

    expect(result.found).toBe(true)
    expect(result.data.title).toBe('Hola')
    expect(result.body).toBe('# Title\r\n')
  })

  it('does not swallow the document when the block is never closed', () => {
    // The worst possible outcome would be treating the rest of the article as metadata.
    const text = '---\ntitle: Hola\n\n# Title\n\nText.\n'
    const result = parseFrontmatter(text)

    expect(result.found).toBe(false)
    expect(result.body).toBe(text)
    expect(result.issues).toHaveLength(1)
    expect(result.issues[0].message).toMatch(/never closed/i)
  })

  it('reports YAML that cannot be parsed instead of guessing', () => {
    const result = parseFrontmatter(document('title: [unclosed'))

    expect(result.found).toBe(true)
    expect(result.data).toEqual({})
    expect(result.issues[0].severity).toBe('error')
    expect(result.issues[0].message).toMatch(/not valid YAML/i)
  })

  it('rejects a block that is not a set of key/value pairs', () => {
    const result = parseFrontmatter(document('- one\n- two'))

    expect(result.data).toEqual({})
    expect(result.issues[0].message).toMatch(/must be a set/i)
  })

  it('accepts an empty block', () => {
    const result = parseFrontmatter('---\n---\n\n# Title\n')

    expect(result.found).toBe(true)
    expect(result.data).toEqual({})
    expect(result.body).toBe('# Title\n')
  })
})

describe('reading the fields', () => {
  it('reads every field it supports', () => {
    const { metadata, issues } = readMetadata({
      title: 'Hola',
      description: 'Una descripción',
      date: '2026-09-13',
      tags: ['linux', 'markdown'],
      order: 3,
      draft: true,
    })

    expect(metadata).toEqual({
      title: 'Hola',
      description: 'Una descripción',
      date: '2026-09-13',
      tags: ['linux', 'markdown'],
      order: 3,
      draft: true,
    })
    expect(issues).toEqual([])
  })

  it('defaults everything when the document declares nothing', () => {
    expect(readMetadata({}).metadata).toEqual({
      title: undefined,
      description: undefined,
      date: undefined,
      tags: [],
      draft: false,
    })
  })

  it('reports a key it does not know, because that is how a typo is found', () => {
    const { metadata, issues } = readMetadata({ tag: 'linux' })

    expect(metadata.tags).toEqual([])
    expect(issues[0].severity).toBe('warning')
    expect(issues[0].message).toMatch(/`tag` is not a known frontmatter field/)
    expect(issues[0].field).toBe('tag')
  })

  it('accepts a single tag written as text', () => {
    expect(readMetadata({ tags: 'linux' }).metadata.tags).toEqual(['linux'])
  })

  it('trims tags and collapses duplicates, keeping the spelling the author used', () => {
    const { metadata } = readMetadata({
      tags: [' Linux ', 'linux', '', 'Linux'],
    })

    expect(metadata.tags).toEqual(['Linux'])
  })

  it('keeps a date as text, so no time zone is invented', () => {
    expect(readMetadata({ date: '2026-09-13' }).metadata.date).toBe(
      '2026-09-13',
    )
  })

  it('warns about a date that will not sort', () => {
    const { metadata, issues } = readMetadata({ date: '13/09/2026' })

    expect(metadata.date).toBe('13/09/2026')
    expect(issues[0].message).toMatch(/should look like/)
  })

  it('coerces a number or a boolean written as text, and says so', () => {
    const { metadata, issues } = readMetadata({ order: '3', draft: 'true' })

    expect(metadata).toEqual({ tags: [], order: 3, draft: true })
    expect(issues).toHaveLength(2)
    expect(issues.every((issue) => issue.severity === 'warning')).toBe(true)
  })

  it('ignores a value of the wrong type rather than guessing', () => {
    const { metadata, issues } = readMetadata({
      title: 42,
      description: { text: 'no' },
      date: false,
      tags: 7,
      order: 'first',
      draft: 'yes',
    })

    expect(metadata).toEqual({ tags: [], draft: false })
    expect(issues).toHaveLength(6)
    for (const issue of issues) expect(issue.severity).toBe('warning')
  })

  it('treats an empty title as absent', () => {
    expect(readMetadata({ title: '   ' }).metadata.title).toBeUndefined()
  })
})
