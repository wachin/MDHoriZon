# 0004. The Markdown editor is out of scope

- **Status:** accepted
- **Date:** 2026-09-14
- **Context:** Phases 21 and 22 of the roadmap (now removed), the final ambition that roadmap stated, and the prior-art survey in [`docs/references.md`](../references.md)

## Context

The roadmap planned an editor in two future phases: Phase 21 would research the architecture of a "Live Markdown
Editor" and Phase 22 would build a prototype. The roadmap ended with that as the project's ambition: _"a first-class
Markdown environment where reading and writing the same document feel like two natural states of one experience"_.

Two things then changed.

1. **The need is met elsewhere.** MarkText (MIT) is a fast live-preview editor in daily use on Linux, and
   `Renakoni/marktext-android` (MIT) packages a browser-based editor core for Android using **Capacitor** — the same
   packaging technology this roadmap plans for Phase 14. Both are surveyed in [`docs/references.md`](../references.md).
2. **The cost of building it here became clear.** A live-preview editor needs its own parser and rendering model.
   The reference implementation carries its own (`@muyajs/core`, and the legacy `@marktext/muyajs`), so adopting it
   would put **two Markdown implementations** in the project — the one thing the architecture rules forbid, and the
   thing the whole "one core, every target" design exists to prevent.

## Decision

**MDHoriZon is a Markdown reading and publishing engine. The editor is out of scope.**

- Phases 21 and 22 are removed. Phases 0–20 are the complete plan, and no phase is "future research" any more.
- No editor code and no editor dependency is added to this project.
- Muya and MarkText stay recorded as prior art in `docs/references.md`, so the reading is not lost.
- If an editor ever returns, it arrives as a **separate project with its own roadmap**, and that is a new decision.

## Alternatives considered

- **Keep the phases as they were** (research now, implement later). Rejected: they promise work nobody intends to
  do, contributors plan around them, and every guard written against starting them early protects a plan that no
  longer exists.
- **Adopt Muya as the editor engine.** Rejected: it brings its own parser, so the reader's rendering and the
  editor's rendering would have to agree forever, by hand — and the user would get two differently-behaving
  Markdown implementations inside one product. Worth revisiting only if someone is willing to own that problem.
- **Build our own editor on our own core** (the original plan). Rejected: the most expensive option for the least
  differentiation, when the need is already met by mature MIT software.
- **Park the phases in a "someday" section.** Rejected: a holding area rots and gets read as a commitment. A
  decision with reasons is more useful to the next contributor than a maybe.

## Consequences

- The roadmap now ends with its definition of done and this boundary. Its closing principle is about reading well,
  not about reading and writing.
- The editor guards are removed from the places that enforced them: the pull-request template, the issue form, the
  agent rules, the ready-to-paste prompt in `docs/continuing-development.md`, and the test that asserted the
  roadmap kept its decision gates closed. The rule that replaces them is narrower and easier to check: **no editor
  code, no editor dependency**.
- [ADR 0003](0003-sanitization-policy.md) chose a layered sanitization policy because _we_ render untrusted
  Markdown. That reasoning is untouched by this decision; its note about a renderer of our own is now motivated by
  maintenance and control rather than by a future editor.
- Nothing is lost for a future editor: the MarkText / Muya / Capacitor survey, the CJK emphasis finding and the
  rendering research all remain in `docs/`, and a new project can start from them instead of from a blank page.
