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

| Decision                                                                                     | Where    |
| -------------------------------------------------------------------------------------------- | -------- |
| Test runner and test layout (the roadmap shows both `src/tests/` and a top-level `tests/`)   | Phase 3  |
| Sanitization policy: allowlist, and `rehype-sanitize` versus an equivalent controlled policy | Phase 2  |
| Frontmatter parser and the supported metadata model                                          | Phase 9  |
| Content loading sources and their precedence                                                 | Phase 10 |
| Offline storage mechanism and integrity strategy                                             | Phase 11 |
| Mermaid lazy-loading strategy and its bundle budget                                          | Phase 6  |

## Existing records

None yet. This is the first file in the directory, and it is deliberately not a decision record itself.
