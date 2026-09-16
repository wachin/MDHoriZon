// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { remarkInlineMathDelimiterRule } from './remark-inline-math-rule'

/**
 * The guard against prices being parsed as formulas, tested on the tree directly.
 *
 * The component tests prove it works end to end; these cases pin the rule itself, including the
 * shapes a Markdown document can put an inline formula in.
 */
const run = (tree: unknown): unknown => {
  remarkInlineMathDelimiterRule()(tree as never)

  return tree
}

describe('the inline maths delimiter rule', () => {
  it('turns a formula whose TeX ends in whitespace back into the text it came from', () => {
    const tree = {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            { type: 'text', value: 'the item costs ' },
            { type: 'inlineMath', value: '5 and the other costs ' },
            { type: 'text', value: '10 today.' },
          ],
        },
      ],
    }

    run(tree)

    const children = (tree.children[0] as { children: unknown[] }).children

    // The restored node carries the delimiters, so the sentence renders exactly as written.
    expect(children[1]).toEqual({
      type: 'text',
      value: '$5 and the other costs $',
    })
    expect(children[0]).toEqual({ type: 'text', value: 'the item costs ' })
    expect(children[2]).toEqual({ type: 'text', value: '10 today.' })
    // The rest of the paragraph is untouched: the guard must not swallow what follows.
    expect(children).toHaveLength(3)
  })

  it('leaves real formulas alone', () => {
    for (const value of [
      'E = mc^2',
      'a^2 + b^2 = c^2',
      '\\frac{a}{b}',
      'x',
      '\\text{rate} = \\frac{\\Delta x}{\\Delta t}',
    ]) {
      const tree = {
        type: 'root',
        children: [
          { type: 'paragraph', children: [{ type: 'inlineMath', value }] },
        ],
      }

      run(tree)

      expect(
        (tree.children[0] as { children: unknown[] }).children[0],
        value,
      ).toEqual({ type: 'inlineMath', value })
    }
  })

  it('leaves display maths alone even when its delimiters are padded', () => {
    // Display delimiters *may* be surrounded by whitespace, so the inline rule must not apply.
    const node = { type: 'math', value: ' e = mc^2 ' }
    const tree = { type: 'root', children: [node] }

    run(tree)

    expect(tree.children[0]).toEqual(node)
  })

  it('applies inside every container a document can nest a formula in', () => {
    // The walk is recursive, so the containers themselves do not matter — but a document can wrap a
    // price in emphasis inside a list item, or in a table cell, and each must be reached.
    const priceIn = (
      wrapper: (child: unknown) => unknown,
    ): Record<string, unknown> => ({
      type: 'paragraph',
      children: [wrapper({ type: 'inlineMath', value: '5 and ' })],
    })
    const tree = {
      type: 'root',
      children: [
        {
          type: 'listItem',
          children: [priceIn((c) => ({ type: 'emphasis', children: [c] }))],
        },
        {
          type: 'tableCell',
          children: [priceIn((c) => ({ type: 'strong', children: [c] }))],
        },
        { type: 'blockquote', children: [priceIn((c) => c)] },
      ],
    }

    run(tree)

    const serialized = JSON.stringify(tree)

    // All three were restored, and no `inlineMath` node survived anywhere in the tree.
    expect(serialized.match(/"value":"\$5 and \$"/g)).toHaveLength(3)
    expect(serialized).not.toContain('inlineMath')
  })

  it('accepts an empty tree and leaves a value-less node alone', () => {
    const tree = { type: 'root', children: [{ type: 'text' }] }

    expect(() => run(tree)).not.toThrow()
    expect(tree.children[0]).toEqual({ type: 'text' })
  })
})
