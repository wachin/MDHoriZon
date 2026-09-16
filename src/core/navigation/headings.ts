/**
 * Reading a rendered article's headings, and shaping them into a table of contents.
 *
 * The ids come from the rendered DOM rather than from a second pass over the Markdown: `rehype-slug`
 * already produced them, and re-deriving them with a copy of the slug algorithm is how a table of
 * contents ends up pointing at anchors that do not exist.
 */

export type ArticleHeading = {
  /** The element id, which is also the anchor target. */
  id: string
  /** The heading's text, with the anchor decoration removed. */
  text: string
  /** 1 for `h1`, 2 for `h2`, … */
  level: number
}

export type HeadingTree = {
  heading: ArticleHeading
  children: HeadingTree[]
}

/**
 * Every heading inside `root` that can be linked to, in document order.
 *
 * A heading whose id is missing cannot be linked to, so it is skipped rather than rendered as a link
 * that goes nowhere.
 */
export function readHeadings(root: ParentNode | null): ArticleHeading[] {
  if (root === null) return []

  return [
    ...root.querySelectorAll('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]'),
  ].map((element) => ({
    id: element.id,
    text: headingText(element),
    level: Number(element.tagName.slice(1)),
  }))
}

/**
 * The heading's own words.
 *
 * `Heading` appends an anchor link inside every heading, so its text would otherwise end up in the
 * table of contents; the copy is trimmed of those anchors before its text is read.
 */
function headingText(element: Element): string {
  const copy = element.cloneNode(true) as Element

  for (const anchor of copy.querySelectorAll('.markdown-heading-anchor')) {
    anchor.remove()
  }

  return (copy.textContent ?? '').replace(/\s+/g, ' ').trim()
}

/**
 * Nests a flat heading list by level, tolerating gaps.
 *
 * A document that jumps from `h2` to `h4` is common and must not produce an empty level or throw:
 * the deeper heading simply becomes a child of the deepest heading seen so far.
 */
export function buildHeadingTree(headings: ArticleHeading[]): HeadingTree[] {
  const roots: HeadingTree[] = []
  const stack: HeadingTree[] = []

  for (const heading of headings) {
    while (
      stack.length > 0 &&
      stack[stack.length - 1].heading.level >= heading.level
    ) {
      stack.pop()
    }

    const node: HeadingTree = { heading, children: [] }
    const parent = stack[stack.length - 1]

    if (parent === undefined) {
      roots.push(node)
    } else {
      parent.children.push(node)
    }

    stack.push(node)
  }

  return roots
}
