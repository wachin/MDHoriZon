import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import App from './App'

/**
 * Mermaid is mocked here for the same reason as in the golden document test: `mermaid.render` needs
 * layout measurements jsdom does not have, so rendering the fixture for real would exercise the
 * failure path seven times and make this smoke test slow enough to time out under load. Diagrams have
 * their own tests.
 */
vi.mock('./core/mermaid/loader', () => ({
  renderMermaid: () => new Promise(() => undefined),
  parseMermaid: () => Promise.resolve(),
}))

// Smoke test for the application shell and the toolchain: jsdom, Testing Library and the jest-dom
// matchers are wired up, and the application really renders the golden fixture through the core.
//
// The timeout is raised because every case here renders the whole contract document — 900 lines with
// tables, formulas and code — which takes a couple of seconds on its own and more than the 5 s default
// when the suite is running its files in parallel.
describe('App', { timeout: 30_000 }, () => {
  it('mounts and renders a single top-level heading', () => {
    render(<App />)

    const headings = screen.getAllByRole('heading', { level: 1 })
    expect(headings.length).toBeGreaterThanOrEqual(1)
    expect(headings[0]).toHaveTextContent('MDHoriZon')
  })

  it('offers the theme control', () => {
    render(<App />)

    expect(
      screen.getByRole('group', { name: /colour theme/i }),
    ).toBeInTheDocument()
  })

  it('builds a table of contents whose every link resolves to a heading', () => {
    render(<App />)

    const contents = screen.getByRole('navigation', {
      name: /table of contents/i,
    })
    const links = [...contents.querySelectorAll('a')]

    expect(links.length).toBeGreaterThan(10)
    // The point of reading the headings back out of the DOM: an anchor that does not exist would be
    // a table of contents that silently goes nowhere.
    for (const link of links) {
      const id = (link.getAttribute('href') ?? '').slice(1)

      expect(id, link.textContent ?? '').not.toBe('')
      expect(document.getElementById(id), id).not.toBeNull()
    }
  })

  it('renders the golden fixture, not a sample', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { level: 1, name: /Golden Test Document/ }),
    ).toBeInTheDocument()
    expect(screen.getAllByRole('table').length).toBeGreaterThanOrEqual(11)
  })

  it('keeps the fixture’s unsafe links from being followed', () => {
    const { container } = render(<App />)

    expect(container.querySelector('a[href^="javascript:"]')).toBeNull()
    expect(container.querySelector('a[href^="data:"]')).toBeNull()
  })

  it('shows the image that cannot be resolved by its alternative text', () => {
    render(<App />)

    expect(
      screen.getByAltText('This image intentionally does not exist'),
    ).toBeInTheDocument()
  })
})
