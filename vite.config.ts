import { cpSync } from 'node:fs'
import { join } from 'node:path'
import react from '@vitejs/plugin-react'
import type { Plugin } from 'vite'
import { defineConfig } from 'vitest/config'

// GitHub Pages serves this project from https://wachin.github.io/MDHoriZon/, so production
// assets must be requested relative to that base path. It stays overridable through the
// VITE_BASE environment variable because other targets need different values: the deploy
// workflow passes the base path reported by GitHub Pages (so forks work without editing this
// file), the Capacitor builds (Phase 14) load from a local scheme, and the dev server uses '/'.
const githubPagesBase = '/MDHoriZon/'

/**
 * Normalizes an explicit base path so it always has exactly one trailing slash.
 * `configure-pages` reports `/MDHoriZon` for a project site and `/` for a user site;
 * Vite needs `/MDHoriZon/` and `/` respectively.
 */
function normalizeBase(value: string | undefined): string | undefined {
  const trimmed = value?.trim()
  if (!trimmed) return undefined
  return `${trimmed.replace(/\/+$/, '')}/`
}

/**
 * Copies the preview's fixture images into the built site.
 *
 * The preview renders `tests/fixtures/Golden-Test-Document.md`, and that document references its
 * images the way real content will: relative to itself, in its own `images/` folder. The dev server
 * serves those files from the repository, but a build only emits what the bundle imports — so without
 * this the deployed preview would show placeholders where the images should be, and the phone check
 * would be worthless.
 *
 * Copying them to the same path the document asks for keeps dev and production identical. This is a
 * **preview convenience**, not a content pipeline: Phase 10 owns loading real content, and this goes
 * with the preview when it does.
 */
function previewFixtureImages(): Plugin {
  let root = process.cwd()
  let outDir = 'dist'

  return {
    name: 'mdhorizon-preview-fixture-images',
    apply: 'build',
    configResolved(config) {
      root = config.root
      outDir = config.build.outDir
    },
    closeBundle() {
      cpSync(
        join(root, 'tests/fixtures/images'),
        join(root, outDir, 'tests/fixtures/images'),
        {
          recursive: true,
          // The images, not the folder's README: a deployed site has no use for it.
          filter: (source) => !source.endsWith('.md'),
        },
      )
    },
  }
}

// `vitest/config` re-exports Vite's `defineConfig` with the `test` block typed, so the test
// runner and the build share one configuration file instead of two that can drift apart.
// https://vite.dev/config/ and https://vitest.dev/config/
export default defineConfig(({ mode }) => ({
  base:
    normalizeBase(process.env.VITE_BASE) ??
    (mode === 'production' ? githubPagesBase : '/'),
  plugins: [react(), previewFixtureImages()],
  test: {
    // jsdom matches the browsers the renderer targets and is what React component tests
    // need. Node-only tests opt out per file with `// @vitest-environment node`.
    environment: 'jsdom',
    include: ['tests/**/*.test.{ts,tsx}', 'src/**/*.test.{ts,tsx}'],
    setupFiles: ['tests/setup.ts'],
    restoreMocks: true,
    // A run that finds no tests is a broken run, not a passing one.
    passWithNoTests: false,
  },
}))
