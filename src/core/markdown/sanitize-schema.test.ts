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
  'annotation-xml',
  'applet',
  'audio',
  'base',
  'button',
  'canvas',
  'dialog',
  'embed',
  'foreignObject',
  'form',
  'frame',
  'frameset',
  'iframe',
  'image',
  'link',
  'maction',
  'meta',
  'object',
  'portal',
  'script',
  'select',
  'style',
  'template',
  'textarea',
  'use',
  'video',
]

/**
 * The exact widening Phases 4 and 5 asked for, written out here so the two lists cannot drift.
 *
 * This duplicates `sanitize-schema.ts` on purpose: a test that imports the list it checks would pass
 * no matter how the list changed, which is precisely the failure this needs to catch.
 */
const PHASE_5_ELEMENTS = [
  'annotation',
  'line',
  'math',
  'menclose',
  'mfrac',
  'mi',
  'mn',
  'mo',
  'mover',
  'mpadded',
  'mphantom',
  'mrow',
  'ms',
  'mspace',
  'msqrt',
  'mstyle',
  'msub',
  'msubsup',
  'msup',
  'mtable',
  'mtd',
  'mtext',
  'mtr',
  'munder',
  'munderover',
  'mroot',
  'path',
  'semantics',
  'svg',
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

  it('has been widened by exactly the elements Phase 5 asked for, and no more', () => {
    // Phase 2 asserted `tagNames` was still identical to the base schema. Phase 5 made that false:
    // KaTeX's MathML and SVG halves need elements the base schema never had. The guarantee changes
    // shape rather than disappearing — the delta is now pinned to the reviewed list.
    const inherited = new Set(defaultSchema.tagNames ?? [])
    const added = (sanitizeSchema.tagNames ?? []).filter(
      (tag) => !inherited.has(tag),
    )

    expect([...added].sort()).toEqual([...PHASE_5_ELEMENTS].sort())
  })

  it('allows no event-handler attribute, and no unbounded inline style', () => {
    const names = attributeNames()

    expect(names.filter((name) => /^on/i.test(name))).toEqual([])
    // `style` is no longer absent: KaTeX lays formulas out with it. It is allowed only as a bounded
    // pattern on the two elements that need it, never as a bare permission — the difference between
    // `style` and `['style', /…/]` is the difference between bounded CSS and arbitrary CSS.
    const styleEntries = Object.entries(sanitizeSchema.attributes ?? {})
      .filter(([, entries]) =>
        (entries as AttributeEntry[]).some(
          (entry) => Array.isArray(entry) && entry[0] === 'style',
        ),
      )
      .map(([tag]) => tag)

    expect(names).toContain('style')
    expect(styleEntries.sort()).toEqual(['span', 'svg'])
    for (const [, entries] of Object.entries(sanitizeSchema.attributes ?? {})) {
      expect(entries as AttributeEntry[]).not.toContain('style')
    }
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

  it('allows syntax highlighting and KaTeX classes on spans, but not arbitrary ones', () => {
    const span = sanitizeSchema.attributes?.span as AttributeEntry[]
    const code = sanitizeSchema.attributes?.code as AttributeEntry[]
    const allowed = span.find(
      (entry) => Array.isArray(entry) && entry[0] === 'className',
    ) as [string, RegExp]

    // The highlighter wraps tokens in `<span class="hljs-…">` and KaTeX wraps formula parts in its
    // own layout vocabulary. Allowing `className` broadly here would let any class through, so the
    // permission is one bounded pattern.
    expect(allowed[0]).toBe('className')
    expect(span).not.toContain('className')
    for (const name of [
      'hljs-keyword',
      'katex',
      'katex-html',
      'katex-display',
      'mord',
      'mop',
      'mspace',
      'vlist-t2',
      'pstrut',
      'frac-line',
      'hide-tail',
      'svg-align',
      'overline-line',
      'accent-body',
      'delimsizing',
      'vertical-separator',
      'fbox',
      'boxpad',
      'reset-size6',
      'size3',
      'mtight',
      'col-align-c',
      'arraycolsep',
      'mathbb',
      'mathnormal',
      'text',
    ]) {
      expect(allowed[1].test(name), name).toBe(true)
    }
    // Shaped, not open: a class that is not one of ours does not pass.
    expect(allowed[1].test('markdown-body')).toBe(false)
    expect(allowed[1].test('hljs')).toBe(false)
    expect(allowed[1].test('evil')).toBe(false)
    // Anchored: a matching prefix must not smuggle a suffix or another class.
    expect(allowed[1].test('mord evil')).toBe(false)
    expect(allowed[1].test('katex"><script>')).toBe(false)

    expect(code).toContainEqual(['className', 'hljs'])
    expect(code).toContainEqual(['className', /^language-./])
  })

  it('allows the MathML presentation vocabulary KaTeX emits', () => {
    for (const tag of ['math', 'mi', 'mo', 'mrow', 'mfrac', 'annotation']) {
      expect(sanitizeSchema.tagNames, tag).toContain(tag)
    }
    // Measured on a 42-formula battery. These are presentation-only: no `href`, no `xlink:*`, no
    // `on*` anywhere in the vocabulary.
    for (const name of [
      'mathvariant',
      'stretchy',
      'fence',
      'accent',
      'accentunder',
      'displaystyle',
      'scriptlevel',
      'mathcolor',
      'columnalign',
      'columnspacing',
      'rowspacing',
      'notation',
      'encoding',
    ]) {
      expect(attributeNames(), name).toContain(name)
    }
    // `href` is legitimate elsewhere (`<a>`), so this is scoped to the Phase 5 vocabulary: none of
    // these elements may carry anything that navigates or fetches.
    for (const tag of PHASE_5_ELEMENTS) {
      const entries = (sanitizeSchema.attributes?.[tag] ??
        []) as AttributeEntry[]
      const navigational = entries.filter((entry) =>
        /href|xlink|^on/i.test(Array.isArray(entry) ? entry[0] : entry),
      )

      expect(navigational, tag).toEqual([])
    }
  })

  it('allows only the SVG attributes the measured KaTeX output uses', () => {
    expect(sanitizeSchema.attributes?.svg).toEqual([
      'xmlns',
      'width',
      'height',
      'viewBox',
      'preserveAspectRatio',
      ['style', expect.any(RegExp)],
    ])
    expect(sanitizeSchema.attributes?.path).toEqual(['d'])
    expect(sanitizeSchema.attributes?.line).toEqual([
      'x1',
      'y1',
      'x2',
      'y2',
      'strokeWidth',
    ])
    for (const tag of ['svg', 'path', 'line']) {
      expect(sanitizeSchema.attributes?.[tag], tag).not.toContain('href')
    }
  })

  it('bounds the inline style KaTeX needs to its own layout declarations', () => {
    const span = sanitizeSchema.attributes?.span as AttributeEntry[]
    const [, style] = span.find(
      (entry) => Array.isArray(entry) && entry[0] === 'style',
    ) as [string, RegExp]

    for (const value of [
      'height: 0.6833em;',
      'height: 1.7936em; vertical-align: -0.686em;',
      'top: -3.063em; margin-right: 0.05em;',
      'border-bottom-width: 0.04em;',
      'min-width: 0.853em; height: 1.08em;',
      'color: red;',
      'position: relative;',
      'width: 0.471em',
    ]) {
      expect(style.test(value), value).toBe(true)
    }

    // Properties outside the measured list fail, so a declaration cannot become arbitrary CSS.
    for (const value of [
      'background-image: url(http://evil.test/x.png)',
      'background: red',
      'display: none',
      'position-x: absolute',
      'z-index: 9999',
      'content: "x"',
      'behavior: url(x.htc)',
    ]) {
      expect(style.test(value), value).toBe(false)
    }

    // A value cannot close its declaration and open another one: `[^;:]` forbids both `;` and `:`,
    // so a disallowed property cannot be smuggled in behind an allowed one.
    expect(style.test('height: 1em; background: red')).toBe(false)
    expect(
      style.test('height: 1em;background-image:url(http://evil.test)'),
    ).toBe(false)
    expect(style.test('width: url(http://evil.test/x)')).toBe(false)
    // Anchored, so a valid declaration cannot be prefixed or suffixed with anything.
    expect(style.test('x height: 1em')).toBe(false)
    expect(style.test('height: 1em; x')).toBe(false)
    // The two shapes the same declarations arrive in: KaTeX's own, and React's re-serialization.
    expect(style.test('height:1.7936em;vertical-align:-0.686em;')).toBe(true)
    expect(style.test('border-bottom-width:0.04em;')).toBe(true)
  })

  it('marks the KaTeX visual layer hidden only with the exact value KaTeX uses', () => {
    const span = sanitizeSchema.attributes?.span as AttributeEntry[]

    expect(span).toContainEqual(['ariaHidden', 'true'])
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
