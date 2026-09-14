import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// GitHub Pages serves this project from https://wachin.github.io/MDHoriZon/, so production
// assets must be requested relative to that base path. It stays overridable through the
// VITE_BASE environment variable because other targets need different values: the Capacitor
// builds (Phase 14) load from a local scheme, and previews/forks use their own repository name.
const githubPagesBase = '/MDHoriZon/'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  base:
    process.env.VITE_BASE ?? (mode === 'production' ? githubPagesBase : '/'),
  plugins: [react()],
}))
