// @vitest-environment node
import { defaultSchema } from 'rehype-sanitize'
import { describe, expect, it } from 'vitest'
import { sanitizeSchema } from './sanitize-schema'

/**
 * The schema is the security boundary, so its contract is asserted rather than assumed: what the
 * renderer must be able to produce, and what a document must never be able to reach.
 */

/** Elements the renderer and remark-gfm must be able to produce. */
const REQUIRED_ELEMENTS = [
  'a',
  'blockquote',
  'br',
  'code',
  'del',
  'em',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'hr',
  'img',
  'input',
  'li',
  'ol',
  'p',
  'pre',
  'strong',
  'table',
  'tbody',
  'td',
  'th',
  'thead',
  'tr',
  'ul',
  // GFM footnotes.
  'section',
  'sup',
]

/** Elements that must never be reachable, whatever a future plugin wants. */
const FORBIDDEN_ELEMENTS = [
  'applet',
  'audio',
  'base',
  'button',
  'canvas',
  'dialog',
  'embed',
  'form',
  'frame',
  'frameset',
  'iframe',
  'link',
  'math',
  'meta',
  'object',
  'portal',
  'script',
  'select',
  'style',
  'svg',
  'template',
  'textarea',
  'video',
]

type AttributeEntry = string | [string, ...unknown[]]

const attributeNames = (): string[] =>
  Object.values(sanitizeSchema.attributes ?? {}).flatMap((entries) =>
    (entries as AttributeEntry[]).map((entry) =>
      Array.isArray(entry) ? entry[0] : entry,
    ),
  )

describe('sanitize schema', () => {
  it('allows every element the renderer relies on', () => {
    for (const tag of REQUIRED_ELEMENTS) {
      expect(sanitizeSchema.tagNames, tag).toContain(tag)
    }
  })

  it('never allows a dangerous element', () => {
    for (const tag of FORBIDDEN_ELEMENTS) {
      expect(sanitizeSchema.tagNames, tag).not.toContain(tag)
    }
  })

  it('has not been widened beyond the base allowlist', () => {
    // The list is inherited on purpose. The moment a phase adds a plugin that needs new elements,
    // this fails and the change has to be deliberate — which is the rule from ADR 0003.
    expect(sanitizeSchema.tagNames).toBe(defaultSchema.tagNames)
  })

  it('allows no event-handler attribute and no inline style', () => {
    const names = attributeNames()

    expect(names.filter((name) => /^on/i.test(name))).toEqual([])
    expect(names).not.toContain('style')
  })

  it('pins table alignment instead of allowing align everywhere with any value', () => {
    const global = sanitizeSchema.attributes?.['*'] as AttributeEntry[]
    const th = sanitizeSchema.attributes?.th as AttributeEntry[]
    const td = sanitizeSchema.attributes?.td as AttributeEntry[]

    // `align` becomes an inline `text-align` further down the pipeline, so an unbounded value there
    // would be unbounded CSS. It is global in the base schema; here it is not.
    expect(defaultSchema.attributes?.['*']).toContain('align')
    expect(global).not.toContain('align')
    expect(th).toContainEqual(['align', 'left', 'center', 'right', 'justify'])
    expect(td).toContainEqual(['align', 'left', 'center', 'right', 'justify'])
  })

  it('forces task-list inputs to be disabled checkboxes', () => {
    const input = sanitizeSchema.attributes?.input as AttributeEntry[]

    expect(input).toContainEqual(['disabled', true])
    expect(input).toContainEqual(['type', 'checkbox'])
  })

  it('restricts code block classes to a language prefix', () => {
    const code = sanitizeSchema.attributes?.code as AttributeEntry[]

    expect(code).toContainEqual(['className', /^language-./])
  })

  it('defines the URL schemes explicitly', () => {
    expect(sanitizeSchema.protocols?.href).toEqual(['http', 'https', 'mailto'])
    expect(sanitizeSchema.protocols?.src).toEqual(['http', 'https'])
  })

  it('lists no other scheme anywhere, so data: cannot slip through a different attribute', () => {
    const schemes = Object.values(sanitizeSchema.protocols ?? {}).flat()

    expect(schemes).not.toContain('javascript')
    expect(schemes).not.toContain('data')
    expect(schemes).not.toContain('file')
    expect([...new Set(schemes)].sort()).toEqual(['http', 'https', 'mailto'])
  })

  it('does not prefix ids, because that would break every in-page anchor', () => {
    expect(sanitizeSchema.clobberPrefix).toBe('')
    expect(defaultSchema.clobberPrefix).toBe('user-content-')
  })
})
