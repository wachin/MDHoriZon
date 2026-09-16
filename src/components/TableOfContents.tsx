import { buildHeadingTree } from '../core/navigation/headings'
import type { ArticleHeading, HeadingTree } from '../core/navigation/headings'

export type TableOfContentsProps = {
  headings: ArticleHeading[]
}

/**
 * The table of contents, as a `<details>` list.
 *
 * Collapsed by default and built from the headings themselves: on a phone — where this project is
 * actually read — a permanently open list of twenty sections would push the article off the screen,
 * while a collapsed one is a single tap away and needs no layout special-casing between phone and
 * desktop.
 *
 * The links are ordinary in-page links, so the browser's own history and back button handle them; no
 * JavaScript scrolling is involved, which is also why it keeps working in an older WebView.
 */
export function TableOfContents({ headings }: TableOfContentsProps) {
  // A "contents" list of one entry is noise, and of none is a broken control.
  if (headings.length < 2) return null

  return (
    <nav className="markdown-toc" aria-label="Table of contents">
      <details>
        <summary>Contents</summary>
        <HeadingList nodes={buildHeadingTree(headings)} />
      </details>
    </nav>
  )
}

function HeadingList({ nodes }: { nodes: HeadingTree[] }) {
  return (
    <ol>
      {nodes.map((node) => (
        <li key={node.heading.id}>
          <a href={`#${node.heading.id}`}>{node.heading.text}</a>
          {node.children.length > 0 ? (
            <HeadingList nodes={node.children} />
          ) : null}
        </li>
      ))}
    </ol>
  )
}
