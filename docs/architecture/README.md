# Architecture decisions

This directory holds **decision records**: the notes that explain _why_ the project is built the way it is. The
roadmap says what gets built; these notes say how and why, so that a contributor (or a future maintainer) does not
have to reverse-engineer the reasoning from the code.

Tooling discoveries belong here too. `ROADMAP.md` asks for exactly that: _"During research, record useful
discoveries in `docs/architecture/` instead of putting every observation into source code comments."_

## When a note is required

Write one when you:

- choose or replace a library (test runner, sanitizer, diagram renderer, content loader…);
- change the boundary between the Markdown core and the UI;
- decide a policy that affects untrusted input (sanitization allowlist, URL handling, raw HTML);
- introduce a cross-cutting pattern (lazy loading, offline storage, error boundaries);
- resolve an ambiguity that the roadmap left open.

Small, local implementation choices do **not** need a record. If in doubt: would a reviewer ask "why this way?".

## How to write one

Copy the template below into `docs/architecture/NNNN-short-kebab-title.md`, using the next free number
(`0001`, `0002`, …). Keep it short — one page is usually enough. Then reference it from the pull request.

```markdown
# NNNN. Short title

- **Status:** proposed | accepted | superseded by NNNN
- **Date:** YYYY-MM-DD
- **Context:** roadmap phase/milestone, if any

## Context

What problem forced a decision, and what constraints apply (offline, WebView, bundle size, security, accessibility).

## Decision

What was decided, in one or two sentences, in the active voice.

## Alternatives considered

What else was on the table, and why it lost. Include "do nothing" when it was a real option.

## Consequences

What becomes easier, what becomes harder, and what is now committed. Note anything that will need revisiting.
```

## Open decisions

These are already recorded as tasks in [`ROADMAP.md`](../../ROADMAP.md) and are waiting for the first contributor who
wants to own them:

| Decision                                                                                              | Where    |
| ----------------------------------------------------------------------------------------------------- | -------- |
| Test runner and test layout — **decided**, see 0001                                                   | Phase 3  |
| Sanitization policy — **shape decided**, see 0003; the element, attribute and URL-scheme lists remain | Phase 2  |
| Frontmatter parser and the supported metadata model                                                   | Phase 9  |
| Content loading sources and their precedence                                                          | Phase 10 |
| Offline storage mechanism and integrity strategy                                                      | Phase 11 |

## Existing records

| Record                                                    | Decision                                                                                                                                                                                          |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [0001](0001-test-runner-and-test-layout.md)               | Vitest, and where each kind of test lives (colocated unit/component tests vs `tests/` for fixtures)                                                                                               |
| [0002](0002-reference-material-lives-outside-the-repo.md) | Third-party projects are not vendored into this repository; references are pinned in [`docs/references.md`](../references.md)                                                                     |
| [0003](0003-sanitization-policy.md)                       | The sanitization policy is layered and none of its layers is optional: no raw HTML from the document, an unconditional sanitization stage for plugin-generated markup, and an explicit URL policy |
| [0004](0004-editor-out-of-scope.md)                       | The Markdown editor is out of scope: Phases 21–22 removed, no editor code or editor dependency, and a returning editor would be a separate project                                                |
| [0005](0005-phase-2-security-policy.md)                   | The explicit element, attribute and URL-scheme lists, plus the reviews of `data:` URLs, SVG, embedded HTML, external images and links opened from the WebViews                                    |
| [0006](0006-mermaid-svg-boundary.md)                      | Mermaid's SVG boundary: lazy loading, defensive configuration, three sanitisation stages that insert an element rather than markup, and the source as the reader's fallback                       |
