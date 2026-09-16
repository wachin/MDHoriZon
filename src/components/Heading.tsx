import type { ComponentPropsWithoutRef } from 'react'
import type { ExtraProps } from 'react-markdown'

type Level = 1 | 2 | 3 | 4 | 5 | 6
type HeadingProps = ComponentPropsWithoutRef<'h2'> & ExtraProps

const HEADING_TAGS = {
  1: 'h1',
  2: 'h2',
  3: 'h3',
  4: 'h4',
  5: 'h5',
  6: 'h6',
} as const

/**
 * Headings carry the deterministic ids `rehype-slug` generates and a visible anchor, so a reader can
 * link to a section and the document's own `#fragment` links resolve.
 *
 * The anchor is produced by this component — after sanitization — so it needs no schema allowance
 * and can never come from the document itself.
 */
function createHeading(level: Level) {
  const Tag = HEADING_TAGS[level]

  return function Heading({ node: _node, children, ...props }: HeadingProps) {
    const id = typeof props.id === 'string' ? props.id : undefined

    return (
      <Tag {...props} id={id}>
        {children}
        {id === undefined ? null : (
          <a
            className="markdown-heading-anchor"
            href={`#${id}`}
            aria-label="Link to this section"
          >
            <span aria-hidden="true">#</span>
          </a>
        )}
      </Tag>
    )
  }
}

export const headings = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
}
