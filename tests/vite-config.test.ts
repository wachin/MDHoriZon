// @vitest-environment node
//
// The base path is the difference between a working GitHub Pages site and a page whose
// assets 404. It was verified by hand once; these tests keep it that way.
import { afterEach, describe, expect, it } from 'vitest'
import viteConfig from '../vite.config'

type ConfigFactory = (env: { command: string; mode: string }) => {
  base?: string
}

const resolveBase = (mode: string) =>
  (viteConfig as unknown as ConfigFactory)({ command: 'build', mode }).base

afterEach(() => {
  delete process.env.VITE_BASE
})

describe('vite base path', () => {
  it('defaults to the repository base for production builds', () => {
    expect(resolveBase('production')).toBe('/MDHoriZon/')
  })

  it('uses the root base for the dev server', () => {
    expect(resolveBase('development')).toBe('/')
  })

  it('accepts the base path GitHub Pages reports for a project site', () => {
    // `actions/configure-pages` reports "/MDHoriZon" (no trailing slash).
    process.env.VITE_BASE = '/MDHoriZon'
    expect(resolveBase('production')).toBe('/MDHoriZon/')
  })

  it('accepts the root base reported for a user site', () => {
    process.env.VITE_BASE = '/'
    expect(resolveBase('production')).toBe('/')
  })

  it('normalizes a fork base path and ignores surrounding whitespace', () => {
    process.env.VITE_BASE = '  /my-fork/  '
    expect(resolveBase('production')).toBe('/my-fork/')
  })

  it('falls back to the default when the variable is empty', () => {
    process.env.VITE_BASE = '   '
    expect(resolveBase('production')).toBe('/MDHoriZon/')
  })
})
