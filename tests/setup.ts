// Global test setup.
//
// `@testing-library/jest-dom/vitest` extends Vitest's `expect` with the DOM matchers
// (`toBeInTheDocument`, `toHaveAttribute`, …) and registers the types for them.
//
// Testing Library's automatic cleanup relies on a global `afterEach`, which this project
// does not enable (tests import `describe`/`it`/`expect` from `vitest` explicitly, so no
// globals leak into application code). Cleanup is therefore wired up by hand.
import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

afterEach(() => {
  cleanup()
})
