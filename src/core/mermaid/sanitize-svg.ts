/**
 * The Mermaid output boundary: layer 2 of the sanitization policy, applied to SVG.
 *
 * `docs/architecture/0003-sanitization-policy.md` layers the Markdown pipeline, and Mermaid needs the
 * same treatment for a different reason: its output is produced *in the browser*, so it never passes
 * through `rehype-sanitize` at all. [ADR 0006](../../../docs/architecture/0006-mermaid-svg-boundary.md)
 * records the decision; this module is the boundary.
 *
 * Three stages, in order:
 *
 * 1. **DOMPurify**, with its SVG and SVG-filter profiles. Chosen over a hand-written allowlist walk
 *    because it is the audited, standard implementation for exactly this job — and because it already
 *    ships inside Mermaid's dependency tree, so it costs no extra download.
 * 2. **Reference policy.** Measured on `mermaid@11.17.2`, DOMPurify lets two remote-loading constructs
 *    through: `<image xlink:href="http://…">` and `url(http://…)` inside CSS. Both are network fetches
 *    driven by document content, so both are removed here. The rule is deny-unless-proven-local: a URL
 *    survives only as a `#fragment` reference, which is what every arrowhead and gradient in Mermaid's
 *    own output uses.
 * 3. **Structure policy.** `foreignObject` is forbidden outright, because `htmlLabels: false` means
 *    legitimate output never contains it (measured on all five diagram types in the golden document).
 *
 * Rendering *anything* Mermaid produces is safe only after this function has returned it.
 */
/** Elements no diagram needs, whatever a future Mermaid version emits. */
const FORBIDDEN_TAGS = [
  'annotation-xml',
  'audio',
  'foreignObject',
  'iframe',
  'script',
  'video',
]

/** Attribute names that make the browser fetch something or navigate. */
const REFERENCE_ATTRIBUTE = /^(?:xlink:)?href$|^src$/

/** `url(...)` arguments that are allowed to stay: internal references only. */
const LOCAL_URL_ARGUMENT = /^['"]?\s*#/

/**
 * Finds every `url(…)` argument in a CSS string.
 *
 * The polarity matters more than the pattern: an argument is kept only when it *is* a fragment, so a
 * value this expression fails to understand is treated as remote and neutralised rather than trusted.
 * CSS escapes, quotes, comments and odd whitespace therefore all fail closed.
 */
function urlArguments(css: string): string[] {
  return [...css.matchAll(/url\(([^)]*)\)/gi)].map((match) => match[1])
}

/**
 * Neutralises remote loading inside a chunk of CSS.
 *
 * `@import` cannot be repaired — it is a remote stylesheet by definition — so its presence is
 * reported and the caller drops the whole declaration or element.
 */
function hasRemoteCss(css: string): boolean {
  return (
    /@import/i.test(css) ||
    urlArguments(css).some((argument) => !LOCAL_URL_ARGUMENT.test(argument))
  )
}

/** Rewrites a CSS string with every remote `url(…)` replaced by `none`, keeping local references. */
function neutraliseRemoteCss(css: string): string {
  return css.replace(/url\(([^)]*)\)/gi, (whole, argument: string) =>
    LOCAL_URL_ARGUMENT.test(argument) ? whole : 'none',
  )
}

/**
 * Applies the reference policy to one element.
 *
 * Two shapes can make a browser fetch something: a reference attribute (`href`, `xlink:href`, `src`)
 * and a `url(…)` inside any attribute value — `fill`, `stroke`, `marker-end`, `clip-path`, `mask`,
 * `filter` and `style` all accept a paint server or a file. Attribute names are matched loosely
 * because `xlink:href` arrives either namespaced or as a literal `xlink:href` depending on how the
 * string was parsed.
 */
function applyReferencePolicy(element: Element): void {
  for (const attribute of [...element.attributes]) {
    const name = attribute.name.toLowerCase()

    if (REFERENCE_ATTRIBUTE.test(name)) {
      if (!attribute.value.trimStart().startsWith('#')) {
        element.removeAttribute(attribute.name)
        element.removeAttributeNS('http://www.w3.org/1999/xlink', 'href')
      }
      continue
    }

    if (attribute.value.includes('url(') && hasRemoteCss(attribute.value)) {
      element.setAttribute(attribute.name, neutraliseRemoteCss(attribute.value))
    }
  }
}

/**
 * Sanitises one Mermaid SVG string and returns the element to insert.
 *
 * Async because DOMPurify is imported on demand: it is tens of kilobytes that only a document *with*
 * a diagram needs, and importing it at the top level put it in the initial bundle — measured, the
 * entry chunk grew by that amount as soon as this module imported it statically. It now travels with
 * Mermaid's own lazy chunk.
 *
 * Throws when the input does not contain an `<svg>` root, so a caller cannot silently insert
 * something that is not a diagram.
 */
export async function sanitizeMermaidSvg(svg: string): Promise<SVGElement> {
  const { default: DOMPurify } = await import('dompurify')

  const fragment = DOMPurify.sanitize(svg, {
    USE_PROFILES: { svg: true, svgFilters: true },
    FORBID_TAGS: FORBIDDEN_TAGS,
    // DOMPurify's SVG profile keeps `aria-*` but not `role`, and Mermaid marks its root with
    // `role="graphics-document"` plus `aria-roledescription="flowchart-v2"`. Dropping `role` would
    // turn every diagram into an anonymous graphic for assistive technology — a real regression for a
    // reading engine, and the reason these are allowed. A `role` cannot execute anything.
    ADD_ATTR: [
      'role',
      'aria-roledescription',
      'aria-label',
      'aria-labelledby',
      'aria-describedby',
    ],
    RETURN_DOM_FRAGMENT: true,
  }) as unknown as DocumentFragment

  const root = fragment.firstElementChild

  if (root === null || root.tagName.toLowerCase() !== 'svg') {
    throw new Error('Mermaid produced no <svg> element')
  }

  // `@import` is unrepairable, so an element that contains it goes; everything else is rewritten in
  // place. Mermaid's own stylesheet is generated from its theme and uses no remote references, so a
  // legitimate diagram never loses its styling here.
  for (const style of root.querySelectorAll('style')) {
    if (hasRemoteCss(style.textContent ?? '')) {
      style.remove()
    }
  }

  for (const element of root.querySelectorAll('*')) {
    applyReferencePolicy(element)
  }
  applyReferencePolicy(root)

  return root as unknown as SVGElement
}
