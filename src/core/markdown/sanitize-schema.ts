/**
 * Layer 2 of the sanitization policy: the sanitize schema.
 *
 * See `docs/architecture/0003-sanitization-policy.md` (the shape) and
 * `docs/architecture/0005-phase-2-security-policy.md` (the reviews behind these lists).
 *
 * ## What is allowed
 *
 * The base is GitHub's `defaultSchema`: an audited allowlist of 53 elements that already excludes
 * `script`, `iframe`, `object`, `embed`, `style`, `base`, `meta`, `form`, `svg` and `math`, and that
 * contains no event-handler attribute and no `style` attribute anywhere.
 *
 * We keep that base and only ever **narrow** it. `sanitize-schema.test.ts` pins both halves of the
 * contract — what must be allowed and what must never be — so a dependency upgrade cannot silently
 * widen what a document can reach.
 *
 * Elements the renderer relies on today, for reference (the test asserts them):
 * paragraphs, headings, lists, tables, code, quotes, emphasis, links, images, rules, line breaks,
 * task-list inputs, the footnote elements remark-gfm emits, and the mathematics vocabulary below.
 *
 * ## Widening, and why it is not reachable from a document
 *
 * Phases 4 and 5 each needed elements and attributes the base schema does not allow, because our own
 * plugins generate markup the base schema was never asked about:
 *
 * - `span` gains a class pattern and a bounded inline `style` (syntax highlighting, then KaTeX).
 * - The MathML element tree, `svg`, `path` and `line` are allowed (KaTeX).
 *
 * None of this is reachable from Markdown. Layer 1 keeps raw HTML out of the tree entirely
 * (`skipHtml`), so a document cannot create a `span`, an `svg` or an `math` element at all — verified
 * by `MarkdownRenderer.security.test.tsx`. What this schema bounds is therefore **plugin output**,
 * and each widening below is derived from a measurement of that output rather than from an assumption
 * about it.
 *
 * ## The Phase 5 correction
 *
 * Phase 2 predicted that KaTeX could be kept out of the schema by rendering with `output: 'html'`.
 * That was wrong in both halves, and the measurement is in `docs/architecture/0005-phase-2-security-policy.md`:
 *
 * - HTML output still needs `class` and inline `style` on `span`, so it is not schema-neutral.
 * - HTML output *still* emits `svg`/`path` for stretchy radicals and delimiters, so it does not even
 *   avoid SVG.
 * - HTML output marks its only layer `aria-hidden="true"` and ships no MathML sibling, which would
 *   make every formula invisible to assistive technology.
 *
 * The pipeline therefore uses KaTeX's default `htmlAndMathml`: the HTML layer still does the visual
 * painting (on every engine, including old WebViews, because `katex.css` hides the MathML layer), and
 * the MathML layer is what screen readers read.
 *
 * ## The three overrides
 *
 * 1. `clobberPrefix` is cleared. `defaultSchema` prefixes `id` and `name` with `user-content-` to
 *    blunt DOM clobbering, which would break every in-page anchor: `rehype-slug` writes
 *    `id="12-mermaid"` while the document links to `#12-mermaid`.
 * 2. `protocols.href` is narrowed to `http`, `https` and `mailto`; `protocols.src` stays limited to
 *    `http` and `https`.
 * 3. `align` is removed from the global attributes and pinned, for `th` and `td` only, to the four
 *    values GFM table alignment uses. See `ALIGN_ATTRIBUTE` below for why an unbounded `align`
 *    would become unbounded CSS.
 */
import { defaultSchema } from 'rehype-sanitize'
import type { Schema } from 'hast-util-sanitize'

type AttributeValue =
  | string
  | [string, ...Array<string | number | boolean | RegExp | null | undefined>]

/**
 * The only values `align` may take.
 *
 * This is not cosmetic. `hast-util-to-jsx-runtime` — the serializer react-markdown uses — turns an
 * `align` attribute into an inline `style="text-align: …"`. So an `align` with an unbounded value
 * would become unbounded CSS, and the base schema allows `align` on *any* element with *any* value.
 * Pinning it to these four values, and to the two elements GFM alignment actually uses, keeps the
 * only inline style in the output bounded and derived from our own pipeline.
 */
const ALIGN_ATTRIBUTE: AttributeValue = [
  'align',
  'left',
  'center',
  'right',
  'justify',
]

/** Drops any inherited permission for `align`, so the pinned tuple above is the only one left. */
function withoutAlign(entries: AttributeValue[] | undefined): AttributeValue[] {
  return (entries ?? []).filter(
    (entry) => (Array.isArray(entry) ? entry[0] : entry) !== 'align',
  )
}

/**
 * The classes a `span` may carry: highlight.js tokens (Phase 4) and KaTeX's layout vocabulary.
 *
 * Measured, not guessed: a battery of 42 formulas rendered through KaTeX emits 66 distinct classes
 * covering `mord`/`mop`/`mbin`/`mrel`/… (atom types), `vlist`/`vlist-t2`/`pstrut` (vertical lists),
 * `sqrt`/`hide-tail`/`frac-line`/`overline-line`/`accent-body` (glyph assembly), `size1`–`size4` and
 * `reset-size6` (script sizes), `mtight`, `col-align-c`, `delimsizing`, `boxpad`/`fbox`,
 * `vertical-separator`, `katex-*` and the `math*`/`m*` families.
 *
 * A `class` cannot execute anything, and the stylesheets are ours, so the risk here is not injection:
 * it is the opposite. Without this pattern the sanitizer *strips* the classes, and both the code and
 * the formulas render uncoloured or laid out wrong while the tests still see spans — which is exactly
 * the silent failure `sanitize-schema.test.ts` exists to catch. The pattern stays shaped (it is not
 * "any class") so a future dependency cannot start emitting arbitrary class names unnoticed.
 */
const CODE_OR_MATH_CLASS =
  /^(?:hljs-[\w-]+|katex[\w-]*|(?:accent|arraycolsep|base|boxpad|brace|col-align|delim|fbox|frac-line|hide-tail|large-op|ldots|m(?:ath[\w-]*|bin|close|enclose|error|frac|inner|op|open|ord|over|padded|phantom|punct|rel|oot|size[0-9]*|space|sqrt|style|sub|subsup|supsub|sup|table|td|text|tight|tr|under|underover)|nulldelimiter|op-limits|op-symbol|overline-line|pstrut|reset-size|size[1-9]|small-op|sqrt|strut|svg-align|text|vertical|vlist)[\w-]*)$/

/**
 * The inline style properties KaTeX needs, and only those.
 *
 * KaTeX positions fraction bars, radicals, accents and script sizes with inline styles, including
 * `position` for the `hide-tail` overlay — so dropping `style` does not degrade gracefully, it breaks
 * the layout. The list is the union of what a 42-formula battery actually emitted:
 * `border-bottom-width`, `border-right-style`, `border-right-width`, `border-style`, `border-width`,
 * `color` (`\color{red}`), `height`, `left`, `margin`, `margin-left`, `margin-right`, `min-width`,
 * `padding-left`, `position`, `top`, `vertical-align`, `width`.
 *
 * Each declaration's value is `[^;:]+`, which cannot contain `;` or `:`, so a value cannot close its
 * declaration and open another one. A property outside the list — `background-image`, say — fails the
 * match and the whole attribute is dropped, which the tests assert.
 */
const MATH_STYLE_PROPERTIES = [
  'border-bottom-width',
  'border-right-style',
  'border-right-width',
  'border-style',
  'border-width',
  'color',
  'height',
  'left',
  'margin',
  'margin-left',
  'margin-right',
  'min-width',
  'padding-left',
  'position',
  'top',
  'vertical-align',
  'width',
]

const MATH_DECLARATION = `(?:${MATH_STYLE_PROPERTIES.join('|')}):[^;:]+`

/**
 * One or more allowed declarations, with KaTeX's trailing semicolon tolerated.
 *
 * Whitespace is tolerated after a `;` and around the trailing `;` because the same declaration string
 * reaches this pattern in two shapes: KaTeX emits `height:1em;vertical-align:-0.2em;` and React
 * re-serializes the surviving declarations as `height: 1em; vertical-align: -0.2em;`. Both are the
 * same bounded CSS; only whitespace differs.
 */
const MATH_STYLE_ATTRIBUTE: AttributeValue = [
  'style',
  new RegExp(
    `^(?:${MATH_DECLARATION})(?:;\\s*${MATH_DECLARATION})*\\s*;?\\s*$`,
  ),
]

/**
 * The MathML elements KaTeX emits for the same battery, listed explicitly.
 *
 * `maction` (which can run something on click) and `annotation-xml` (which can carry foreign markup)
 * are deliberately **not** here, and neither is any `href`/`xlink:*` attribute: `trust: false` on the
 * plugin already stops `\href` inside a formula, and the schema is the second lock on the same door.
 */
const MATHML_ELEMENTS = [
  'annotation',
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
  'semantics',
]

/** Presentation-only MathML attributes. `notation` is `\cancel`/`\boxed`; the rest is layout. */
const MATHML_ATTRIBUTES: AttributeValue[] = [
  'accent',
  'accentunder',
  'columnalign',
  'columnlines',
  'columnspacing',
  'depth',
  'displaystyle',
  'display',
  'encoding',
  'fence',
  'height',
  'largeop',
  'linebreak',
  'lspace',
  'mathbackground',
  'mathcolor',
  'mathsize',
  'mathvariant',
  'maxsize',
  'minsize',
  'movablelimits',
  'notation',
  'rowalign',
  'rowlines',
  'rowspacing',
  'rspace',
  'scriptlevel',
  'separator',
  'stretchy',
  'symmetric',
  'width',
  'xmlns',
]

/**
 * The SVG KaTeX emits. Its HTML layer is not SVG-free: radicals, `\overline`, accents and stretchy
 * delimiters are drawn as a `path`, and `\cancel` as a `line`.
 *
 * Honest scope note: this makes SVG reachable from our pipeline, which is a Phase 6 input. Mermaid
 * needs a much larger SVG vocabulary, and containing *that* — size, no foreignObject, no scripts, no
 * links — is Phase 6's decision. What is allowed here is only what the measurement above required.
 */
const SVG_ATTRIBUTES: Record<string, AttributeValue[]> = {
  svg: [
    'xmlns',
    'width',
    'height',
    'viewBox',
    'preserveAspectRatio',
    MATH_STYLE_ATTRIBUTE,
  ],
  path: ['d'],
  line: ['x1', 'y1', 'x2', 'y2', 'strokeWidth'],
}

/**
 * The element allowlist, extended with the vocabulary the two measurements produced.
 *
 * `hast-util-sanitize` has two locks, not one: `tagNames` decides which elements exist at all, and
 * `attributes` decides what they may carry. Missing this list while extending `attributes` is a
 * silent failure of a particularly nasty kind — the elements are dropped but their **text** is kept,
 * so a formula renders as `E=mc2E = mc^2` (the concatenated MathML text plus the TeX annotation)
 * instead of an error, which is how this was found.
 *
 * `script`, `style`, `iframe`, `foreignObject`, `annotation-xml` and `maction` stay out, as do all
 * `on*` attributes.
 */
const tagNames: string[] = [
  ...(defaultSchema.tagNames ?? []),
  ...MATHML_ELEMENTS,
  ...Object.keys(SVG_ATTRIBUTES),
]

const attributes: NonNullable<Schema['attributes']> = {
  ...defaultSchema.attributes,
  // `align` is global in the base schema; here it only survives where GFM needs it.
  '*': withoutAlign(defaultSchema.attributes?.['*']),
  th: [...withoutAlign(defaultSchema.attributes?.th), ALIGN_ATTRIBUTE],
  td: [...withoutAlign(defaultSchema.attributes?.td), ALIGN_ATTRIBUTE],
  // Syntax highlighting (Phase 4) and KaTeX (Phase 5). `ariaHidden` is here because KaTeX marks its
  // visual HTML layer `aria-hidden="true"`, so assistive technology reads the MathML sibling once
  // instead of reading the positioning markup as gibberish.
  span: [
    ...(defaultSchema.attributes?.span ?? []),
    ['className', CODE_OR_MATH_CLASS],
    ['ariaHidden', 'true'],
    MATH_STYLE_ATTRIBUTE,
  ],
  code: [...(defaultSchema.attributes?.code ?? []), ['className', 'hljs']],
}

for (const name of MATHML_ELEMENTS) {
  attributes[name] = [...(attributes[name] ?? []), ...MATHML_ATTRIBUTES]
}

for (const [name, allowed] of Object.entries(SVG_ATTRIBUTES)) {
  attributes[name] = [...(attributes[name] ?? []), ...allowed]
}

export const sanitizeSchema: Schema = {
  ...defaultSchema,

  clobberPrefix: '',

  tagNames,

  protocols: {
    ...defaultSchema.protocols,
    href: ['http', 'https', 'mailto'],
    src: ['http', 'https'],
  },

  attributes,
}
