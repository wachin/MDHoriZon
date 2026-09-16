# 0007. Theming: one palette, the reader's choice, and a measurable contrast floor

- **Status:** accepted
- **Date:** 2026-09-16
- **Context:** Phase 7

## Context

By Phase 6 the project had grown **two palettes that did not know about each other**: the page shell owned
`--text`, `--bg` and `--border`, and the rendered Markdown owned a separate `--md-*` set, each with its own
`prefers-color-scheme` block. Nothing could choose a theme, and a rule that predated the variables had already
shipped a real bug — the table cell lines were a literal black hairline, invisible in dark mode until a reader
reported it from a phone.

Phase 7 also asks for a manual theme choice with persistence, for verified readability in both schemes, and for a
named variable system. The roadmap fixes the names, so the palette had to be reorganised around them.

## Decision

1. **One file owns every colour and font** (`src/styles/theme.css`), using the variable names the roadmap lists
   verbatim. Every other stylesheet consumes variables and never names a colour.
2. **The theme is resolved in JavaScript and written onto `<html>` as `data-theme`**, from the reader's stored
   preference or, while they have not chosen, from the system. `main.tsx` applies it before the first render, so
   there is no flash of the wrong theme.
3. **The dark palette is written twice** — once inside the media query for "the system is dark and the reader has
   not chosen light", once for `[data-theme='dark']` — because CSS cannot share a declaration block between two
   selectors. `src/styles/theme.test.ts` compares the two blocks and fails if they drift.
4. **The effective theme, not the system's, drives the diagram renderer.** Mermaid paints its own colours and
   cannot inherit the variables, so it is given the resolved theme and re-renders when it changes.
5. **Contrast is a test, not a comment.** WCAG AA (4.5:1) is asserted for every text pair and every syntax
   token in both schemes, which is what "verify readability in both themes" means for the part a machine can
   check. The light comment colour was changed from `#6e7781` (4.27:1) to `#65707c` (4.74:1) because of it.
6. **The choice is remembered under a versioned key** (`mdhorizon:theme`), and every read or write is guarded:
   a blocked or full store must not break the article.

## Alternatives considered

- **Follow the system only** (no manual choice). Rejected: the roadmap asks for the choice, and a reader on a
  dark phone may still want a light article.
- **An inline script in `index.html` that sets the attribute before the bundle runs**, which would allow a single
  dark block. Rejected: an inline script is untestable in this suite and is exactly the kind of thing a Content
  Security Policy would later have to carve out. A duplicated block held together by a test is the cheaper
  liability.
- **Let Mermaid read `prefers-color-scheme` itself.** Rejected: a reader who chooses light on a dark phone would
  get light text beside dark diagrams.
- **`color-scheme` alone, with no palette of our own.** Insufficient: it selects the engine's colours, not ours.
- **A CSS preprocessor for the shared dark block.** Rejected: it adds toolchain weight to solve one duplication.

## Consequences

- Changing a colour is a one-line edit in one file, and the guard tests fail if a consumer reintroduces a literal.
- `color-scheme` is set per theme, so scrollbars and form controls follow the page rather than the system.
- The duplicate dark block is the cost of the no-inline-script decision; it is guarded, not trusted.
- The code token palette stays **provisional**: the roadmap says not to settle a fixed syntax-highlighting theme
  permanently, so Phase 18 inherits the decision along with the bundle budget.
- Phase 19 inherits a contrast floor with tests behind it rather than an intention.
- Not decided here, and deliberately left to the phases that own the data: article navigation, scroll-position
  handling and back navigation, all of which need the content model (Phase 9) and the content loader (Phase 10).
