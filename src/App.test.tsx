import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

// Smoke test for the application shell and the toolchain: jsdom, Testing Library and the jest-dom
// matchers are wired up, the app mounts, and the phase 1 rendering core is actually used by it.
describe('App', () => {
  it('mounts and renders a single top-level heading', () => {
    render(<App />)

    const headings = screen.getAllByRole('heading', { level: 1 })
    expect(headings).toHaveLength(1)
    expect(headings[0]).toHaveTextContent('MDHoriZon')
  })

  it('renders the sample document through the Markdown renderer', () => {
    render(<App />)

    expect(screen.getByRole('table')).toBeInTheDocument()

    const checkboxes = screen.getAllByRole('checkbox')
    expect(checkboxes.length).toBeGreaterThanOrEqual(3)
    for (const checkbox of checkboxes) expect(checkbox).toBeDisabled()

    expect(
      screen.getByRole('link', { name: 'safe external link' }),
    ).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('drops the unsafe link in the sample instead of following it', () => {
    const { container } = render(<App />)

    expect(container.querySelector('a[href^="javascript:"]')).toBeNull()
    expect(screen.getByText('unsafe one')).toBeInTheDocument()
  })
})
