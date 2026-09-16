import type { ComponentPropsWithoutRef } from 'react'
import type { ExtraProps } from 'react-markdown'

type TableProps = ComponentPropsWithoutRef<'table'> & ExtraProps

/**
 * Tables, wrapped so a wide one scrolls horizontally instead of stretching the layout.
 *
 * The wrapper is a focusable region with a name, which is what makes the scroll area usable from the
 * keyboard: a mouse wheel or a trackpad gesture must not be the only way to reach the last column.
 * Cell-level styling and the narrow-screen behaviour are Phase 4 and Phase 7 work.
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
