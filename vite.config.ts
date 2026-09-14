import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

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

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  base:
    normalizeBase(process.env.VITE_BASE) ??
    (mode === 'production' ? githubPagesBase : '/'),
  plugins: [react()],
}))
