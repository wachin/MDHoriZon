/**
 * The missing half of the inline-maths rule: a closing `$` must not be preceded by whitespace.
 *
 * The GFM maths specification — as implemented by GitHub, comrak and commonmark-hs, and recorded in
 * `docs/references.md` — has two delimiter rules for inline maths:
 *
 * > the opening `$` must not be followed by whitespace, and the closing `$` must not be preceded by
 * > whitespace.
 *
 * `micromark-extension-math@3.1.0`, which `remark-math` uses, implements the first rule only.
 * Measured on this pipeline, `the item costs $5 and the other costs $10 today.` parses as inline
 * maths whose TeX is `5 and the other costs ` — so prices render as formulas, which the golden
 * document explicitly forbids ("Currency must not be mistaken for mathematics", section 15).
 *
 * The specification's own answer for a genuine currency pair is to escape it (`\$10 and 30$`), which
 * `micromark` handles; this plugin restores the rule that makes the unescaped form behave sanely.
 *
 * A rejected node is turned back into the **literal text it came from**, delimiters included, so the
 * sentence renders exactly as written.
 *
 * Deliberately not implemented: the "embedded maths" rule (skipping balanced curly braces when
 * looking for the closing delimiter). It is marked *disabled* in comrak's own fixture and no test
 * document in this repository depends on it; inventing it here would be guessing at behaviour.
 */

/**
 * The part of the mdast shape this plugin touches.
 *
 * Declared locally rather than imported from `@types/mdast`: that package arrives transitively and
 * is not a declared dependency, and this plugin needs three fields from it. `Root` and every node
 * type it contains satisfy this interface structurally, so the plugin still fits `remarkPlugins`.
 */
interface Node {
  type?: string
  value?: string
  children?: Node[]
}

/** A maths node whose TeX ends in whitespace — which the specification says is not maths at all. */
const TRAILING_WHITESPACE = /\s$/

function guard(node: Node): void {
  const children = node.children

  if (children === undefined) {
    return
  }

  for (let index = 0; index < children.length; index += 1) {
    const child = children[index]

    if (
      child.type === 'inlineMath' &&
      typeof child.value === 'string' &&
      TRAILING_WHITESPACE.test(child.value)
    ) {
      children[index] = { type: 'text', value: `$${child.value}$` }
      continue
    }

    guard(child)
  }
}

/**
 * Remark plugin. Must be placed after `remarkMath`, which is what creates `inlineMath` nodes.
 */
export function remarkInlineMathDelimiterRule() {
  return (tree: Node): undefined => {
    guard(tree)

    return undefined
  }
}
