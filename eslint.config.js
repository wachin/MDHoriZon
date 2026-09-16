import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  // `8vo/` holds local reference checkouts (gitignored; see docs/references.md). ESLint must not
  // walk into it: those projects ship their own nested `eslint.config.js`, and loading one fails
  // when its plugins are not installed here — which broke `npm run lint` locally while CI, where
  // the directory does not exist, stayed green.
  globalIgnores(['dist', '8vo']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
  },
])
