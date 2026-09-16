import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

// Smoke test for the application shell and the toolchain: jsdom, Testing Library and the jest-dom
// matchers are wired up, and the application really renders the golden fixture through the core.
describe('App', () => {
  it('mounts and renders a single top-level heading', () => {
    render(<App />)

    const headings = screen.getAllByRole('heading', { level: 1 })
    expect(headings.length).toBeGreaterThanOrEqual(1)
    expect(headings[0]).toHaveTextContent('MDHoriZon')
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
