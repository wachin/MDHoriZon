import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

// Toolchain smoke test: it proves jsdom, Testing Library and the jest-dom matchers are
// wired up, and that the application mounts at all.
//
// Phase 1 replaces the starter screen with the Markdown reader. When that happens, replace
// this with tests for the renderer rather than deleting it: the golden rule requires every
// Markdown feature to have an automated test.
describe('App', () => {
  it('mounts and renders a single top-level heading', () => {
    render(<App />)

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Get started',
    )
  })
})
