# 0001. Test runner and test layout

- **Status:** accepted
- **Date:** 2026-09-14
- **Context:** Phase 1 (Markdown Rendering Core) and Phase 3 (Golden Test Suite)

## Context

The roadmap's golden rule is explicit:

> No Markdown feature is considered complete until it works in the desktop browser, mobile browser, Android
> WebView, and has a reproducible automated or fixture-based test.

But the roadmap never named a test runner, and its target structure showed tests in two places at once — `src/tests/`
_and_ a top-level `tests/`. Both gaps had to be closed before the first renderer code could be written, because
"reproducible automated test" is otherwise unachievable for a contributor.

Constraints that shaped the decision:

- The build already uses Vite 8, and duplicating its resolution rules in a second tool is a known source of drift
  (path aliases, asset imports, JSX transform, ESM handling).
- Component tests will need a DOM, because the renderer's components — `CodeBlock`, `TableWrapper`,
  `ResponsiveImage`, `MermaidDiagram` — carry the behavior.
- Some tests are pure filesystem checks over the fixtures and must run in Node, without a DOM.
- Tests must be type-checked, but the **application** code must not see Node globals: it runs inside a WebView.

## Decision

**Vitest** is the test runner, with **jsdom**, **Testing Library** and **jest-dom** matchers.

It shares `vite.config.ts` through `defineConfig` from `vitest/config`, so the test run and the production build use
one configuration instead of two that can drift.

The test layout is split by purpose:

| Kind of test                         | Location                                       | Environment                                           |
| ------------------------------------ | ---------------------------------------------- | ----------------------------------------------------- |
| Unit and component tests             | colocated with the code: `src/**/*.test.ts(x)` | jsdom (default)                                       |
| Cross-cutting and fixture invariants | `tests/**/*.test.ts`                           | opted out per file with `// @vitest-environment node` |

`src/tests/` from the roadmap's target tree is therefore **dropped**: colocated tests are how the unit tests stay
next to the code they protect, and a second tree would invite the same duplication the architecture rules forbid.

Supporting pieces:

- `tests/setup.ts` registers the jest-dom matchers and calls Testing Library's `cleanup()` after each test. Cleanup
  is explicit because this project imports `describe`/`it`/`expect` from `vitest` instead of enabling globals — so
  no test global leaks into application code.
- `tsconfig.test.json` type-checks the test files with both `node` and `vite/client` types, and `tsconfig.app.json`
  excludes `*.test.ts(x)` so application code keeps its browser-only types.

## Alternatives considered

- **Jest.** Mature and familiar, but it needs its own transform pipeline for TypeScript and JSX, resolves modules
  differently from Vite, and duplicates configuration that already exists. It buys nothing here.
- **`node:test`.** Zero dependencies, but no DOM, no JSX, and no Vite module resolution — it cannot test the
  components that hold most of the project's behavior.
- **Playwright only.** The right tool for the cross-platform checks the roadmap requires on real Android/iOS
  WebViews, but far too heavy as the only way to assert how a component renders. It is expected later, in Phase 20.
- **A separate `vitest.config.ts`.** Avoids the `test` key in the Vite config, but creates two configs that must be
  kept in sync by hand. Rejected: the roadmap asks for centralized configuration.

## Consequences

- `npm test` runs the whole suite once; `npm run test:watch` watches. CI (`.github/workflows/ci.yml`) runs
  `format:check`, `lint`, `typecheck`, `test` and `build` on every pull request.
- The `test` block lives in `vite.config.ts`; Vite ignores it during builds, verified by running `npm run build`.
- `jsdom`, Testing Library and jest-dom are development dependencies. They add no bytes to the shipped bundle.
- A `.test.ts(x)` file placed under `src/` is automatically excluded from the application type-check and included in
  the test one. Adding a test in a new directory means checking `include` in `vite.config.ts` and
  `tsconfig.test.json`.
- End-to-end and WebView verification is still uncovered. Phase 20 must decide whether that becomes Playwright,
  manual checklists, or a combination.
