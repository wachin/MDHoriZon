import type { ComponentPropsWithoutRef } from 'react'
import type { ExtraProps } from 'react-markdown'

type TableProps = ComponentPropsWithoutRef<'table'> & ExtraProps
type CellProps = ComponentPropsWithoutRef<'th'> & ExtraProps

/**
 * Tables, wrapped so a wide one scrolls horizontally instead of stretching the layout.
 *
 * The wrapper is a focusable region with a name, which is what makes the scroll area usable from the
 * keyboard: a mouse wheel or a trackpad gesture must not be the only way to reach the last column.
 */
export function TableWrapper({ node: _node, children, ...props }: TableProps) {
  return (
    <div
      className="markdown-table-scroll"
      role="region"
      aria-label="Table, scrollable horizontally"
      tabIndex={0}
    >
      <table {...props}>{children}</table>
    </div>
  )
}

/**
 * Header cells declare what they head.
 *
 * GFM produces a header row but no `scope`, which leaves a screen reader to guess the relationship
 * between a cell and its column — a guess that gets worse as the table gets wider. `scope="col"` is
 * added here, by our own component, so it needs no schema allowance and cannot come from a document.
 */
export function TableHeaderCell({
  node: _node,
  children,
  ...props
}: CellProps) {
  return (
    <th scope="col" {...props}>
      {children}
    </th>
  )
}
