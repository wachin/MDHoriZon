import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { ArticleHeading } from '../core/navigation/headings'
import { TableOfContents } from './TableOfContents'

/**
 * The table of contents. It is built from the headings the renderer produced, so the only things to
 * assert are that it nests them correctly, that its links are the real anchors, and that it stays out
 * of the way when there is nothing to list.
 */

const heading = (id: string, text: string, level: number): ArticleHeading => ({
  id,
  text,
  level,
})

describe('the table of contents', () => {
  it('links to every heading, in a nested list', () => {
    render(
      <TableOfContents
        headings={[
          heading('intro', 'Introduction', 1),
          heading('details', 'Details', 2),
          heading('deeper', 'Deeper', 3),
          heading('end', 'End', 1),
        ]}
      />,
    )

    const links = screen.getAllByRole('link')

    expect(links.map((link) => link.getAttribute('href'))).toEqual([
      '#intro',
      '#details',
      '#deeper',
      '#end',
    ])
    // The nesting follows the levels, so a reader can see the structure.
    const nested = screen.getByRole('link', { name: 'Deeper' })

    expect(nested.closest('ol')?.closest('li')?.textContent).toContain(
      'Details',
    )
  })

  it('is a labelled navigation landmark', () => {
    render(
      <TableOfContents
        headings={[heading('a', 'A', 1), heading('b', 'B', 1)]}
      />,
    )

    expect(
      screen.getByRole('navigation', { name: /table of contents/i }),
    ).toBeDefined()
  })

  it('stays collapsed, so it does not push the article off a phone screen', () => {
    const { container } = render(
      <TableOfContents
        headings={[heading('a', 'A', 1), heading('b', 'B', 1)]}
      />,
    )

    expect(container.querySelector('details')?.open).toBe(false)
    expect(screen.getByText('Contents')).toBeDefined()
  })

  it('renders nothing when there is nothing worth listing', () => {
    // One entry is noise; none is a broken control.
    const { container: empty } = render(<TableOfContents headings={[]} />)
    const { container: single } = render(
      <TableOfContents headings={[heading('only', 'Only', 1)]} />,
    )

    expect(empty.innerHTML).toBe('')
    expect(single.innerHTML).toBe('')
  })
})
