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
    rules: {
      // `react-markdown` passes the source `node` to every custom component, and the idiomatic way
      // to keep it off the DOM is to drop it with a rest pattern: `({ node, ...props })`. That
      // leaves an intentionally unused binding. TypeScript's `noUnusedLocals` already catches real
      // unused variables, so relaxing this one option does not lose coverage.
      '@typescript-eslint/no-unused-vars': [
        'error',
        { ignoreRestSiblings: true, argsIgnorePattern: '^_' },
      ],
    },
  },
])
