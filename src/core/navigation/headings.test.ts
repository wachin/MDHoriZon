import { describe, expect, it } from 'vitest'
import { buildHeadingTree, readHeadings } from './headings'

/**
 * Turning a rendered article into a table of contents.
 *
 * `readHeadings` reads the DOM rather than re-parsing the Markdown, so the ids it links to are the
 * ones `rehype-slug` actually wrote. The two cases that matter are headings that cannot be linked to
 * (no id) and the anchor link the renderer puts inside every heading, which must not become part of
 * its label.
 */

function article(html: string): HTMLElement {
  const root = document.createElement('div')

  root.innerHTML = html

  return root
}

describe('reading the headings', () => {
  it('lists every level in document order, with its id', () => {
    const headings = readHeadings(
      article(`
        <h1 id="title">Title</h1>
        <p>text</p>
        <h2 id="one">First</h2>
        <h3 id="one-one">First one</h3>
        <h2 id="two">Second</h2>
      `),
    )

    expect(headings).toEqual([
      { id: 'title', text: 'Title', level: 1 },
      { id: 'one', text: 'First', level: 2 },
      { id: 'one-one', text: 'First one', level: 3 },
      { id: 'two', text: 'Second', level: 2 },
    ])
  })

  it('ignores a heading that cannot be linked to', () => {
    // Rendering followed by an in-page link is the only thing that matters here.
    const headings = readHeadings(
      article('<h2>No id</h2><h2 id="has-id">Has id</h2>'),
    )

    expect(headings.map((heading) => heading.id)).toEqual(['has-id'])
  })

  it('leaves the heading anchor out of the label', () => {
    const headings = readHeadings(
      article(`
        <h2 id="section">
          Section
          <a class="markdown-heading-anchor" href="#section" aria-label="Link to section">#</a>
        </h2>
      `),
    )

    expect(headings[0].text).toBe('Section')
  })

  it('collapses the whitespace a multi-line heading brings with it', () => {
    const headings = readHeadings(
      article('<h2 id="x">\n  A   heading\n  that wraps\n</h2>'),
    )

    expect(headings[0].text).toBe('A heading that wraps')
  })

  it('handles a missing article without throwing', () => {
    expect(readHeadings(null)).toEqual([])
  })
})

describe('nesting the headings', () => {
  const heading = (id: string, level: number) => ({ id, text: id, level })

  it('nests by level', () => {
    const tree = buildHeadingTree([
      heading('a', 1),
      heading('b', 2),
      heading('c', 3),
      heading('d', 2),
      heading('e', 1),
    ])

    expect(tree.map((node) => node.heading.id)).toEqual(['a', 'e'])
    expect(tree[0].children.map((node) => node.heading.id)).toEqual(['b', 'd'])
    expect(tree[0].children[0].children.map((node) => node.heading.id)).toEqual(
      ['c'],
    )
  })

  it('tolerates a document that skips a level', () => {
    // `h2` straight to `h4` is common in real documents and must not produce an empty level.
    const tree = buildHeadingTree([heading('a', 2), heading('b', 4)])

    expect(tree).toHaveLength(1)
    expect(tree[0].children[0].heading.id).toBe('b')
  })

  it('starts a new branch when the document begins deeper than h1', () => {
    const tree = buildHeadingTree([heading('a', 3), heading('b', 3)])

    expect(tree.map((node) => node.heading.id)).toEqual(['a', 'b'])
  })

  it('returns nothing for an empty article', () => {
    expect(buildHeadingTree([])).toEqual([])
  })
})
