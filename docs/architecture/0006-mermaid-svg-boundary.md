# 0006. Mermaid diagrams and the SVG boundary

- **Status:** accepted
- **Date:** 2026-09-16
- **Context:** Phase 6; follows [ADR 0003](0003-sanitization-policy.md) and closes the SVG question left open by
  [ADR 0005](0005-phase-2-security-policy.md)

## Context

Mermaid is the first feature whose markup is produced **in the browser**, after the Markdown pipeline has finished.
It therefore never passes through `rehype-sanitize` — the boundary ADR 0003 relies on for everything else — while
the architecture rules forbid `dangerouslySetInnerHTML` outright and forbid widening the sanitize schema without a
review. Phase 2 left a checkbox open for exactly this: _"Verify Mermaid content cannot escape its intended rendering
boundary."_

The constraints are the project's usual ones plus one: the input is **untrusted**. This is a reading and publishing
engine, so a diagram arrives from whoever wrote the document. It must also work offline, on older WebViews, without
inflating the initial bundle, and in both colour schemes.

## Decision

1. **Loaded on demand.** Mermaid is reached through a dynamic `import()`, so a document with no diagram downloads
   none of it. DOMPurify is loaded the same way, for the same reason.
2. **Configured defensively.** `securityLevel: 'strict'`, `htmlLabels: false`, `suppressErrorRendering: true`,
   `startOnLoad: false`, with `maxTextSize` and `maxEdges` bounding the work a document can request. Mermaid's
   returned `bindFunctions` is never called, so no click handler from a diagram is ever attached.
3. **Sanitised in three stages** by `sanitizeMermaidSvg`, and inserted as an **element**:
   1. DOMPurify with its SVG and SVG-filter profiles — the audited implementation, chosen over a hand-written
      allowlist walk, and already in Mermaid's dependency tree.
   2. A **reference policy** that keeps only `#fragment` URLs, in reference attributes and in `url(…)` anywhere.
   3. A **structure policy** that forbids `foreignObject`, `script`, `iframe`, `audio`, `video` and
      `annotation-xml`.
4. **The source is the fallback.** It stays visible while the diagram loads and stays visible instead of the
   diagram when rendering fails, so a reader on an engine that cannot draw it still gets the information.

## Alternatives considered

- **Hand-written SVG allowlist walk.** Rejected: writing a sanitiser by hand is how XSS gets shipped. DOMPurify is
  the audited answer and costs no extra download, because Mermaid already depends on it.
- **Trust Mermaid's own sanitisation** (`securityLevel: 'strict'` alone). Rejected: that is a library's internal
  boundary, not ours, and ADR 0003 requires an unconditional stage for plugin-generated markup.
- **Inject Mermaid's SVG string** with `dangerouslySetInnerHTML`. Forbidden by the architecture rules, and the
  reason stage 3 returns nodes instead of markup.
- **A hand-written allowlist for CSS too.** Rejected in favour of one deny-unless-local rule, which fails closed
  on constructs it does not understand.
- **Allow external references inside a diagram.** Rejected: a diagram is not a navigation surface, and a remote
  reference is a beacon that reports the reader's address to whoever wrote the document.
- **Keep the source as a plain code block** (do nothing). Rejected by the roadmap, but it is why the fallback is
  the source rather than an empty box.

## Measurements behind the decision

| Question                                | Measurement                                                                                                                                                                                                                            |
| --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Does DOMPurify alone contain Mermaid?   | Almost: it strips `script`, `on*`, `javascript:`, `foreignObject`, SMIL and `data:`, but it **keeps** `<image xlink:href="http://…">` and remote `url(…)` inside `<style>`. Both are network fetches, and both are why stage 2 exists. |
| Does it damage legitimate output?       | No. On all five diagram types in the golden document it preserves the stylesheet, `<text>`, markers, patterns, clips, filters and internal `url(#…)` references, shrinking the SVG by 1–2 %.                                           |
| Does `htmlLabels: false` cost anything? | It removes `<foreignObject>` from all five diagram types, which is what makes stage 3's ban free. Labels no longer wrap the way HTML labels do — the visible cost.                                                                     |
| Is the initial bundle affected?         | Entry chunk 856 kB → 861 kB (266 kB → 268 kB gzipped). Mermaid lands in `mermaid.core-*.js` (94 kB) with Dagre and friends in their own chunks; DOMPurify in `purify.es-*.js`.                                                         |
| Does `role` survive?                    | No — DOMPurify's SVG profile keeps `aria-*` but drops `role`. It is re-allowed explicitly, otherwise every diagram becomes an anonymous graphic to assistive technology.                                                               |

## Consequences

- A new phase obligation: any future diagram type that _needs_ HTML labels would require revisiting stage 3, with
  a measurement, rather than a config change.
- `mermaid@11.17.2` is pinned rather than `12.0.0`: version 12 pulls a `chevrotain → lodash-es` chain with two high
  advisories (code injection through `_.template`, prototype pollution) that cannot be resolved without pinning a
  transitive dependency by force. The reason is recorded in [`docs/references.md`](../references.md), so the next
  contributor reopening that upgrade knows what to check.
- Verification is split deliberately: `mermaid.parse` runs the real parser and covers a document's diagram syntax
  (`tests/mermaid-fixture.test.ts`); real diagram rendering is covered with the layout measurements stubbed
  (`src/components/MermaidDiagram.test.tsx`); the boundary has its own security tests
  (`src/core/mermaid/sanitize-svg.test.ts`). The **visual** result — sizes, wrapping, touch scrolling, WebView
  behaviour — is Phase 20's validation and is not claimed here.
- Revisit: rendering diagrams at build time would remove the runtime dependency altogether. That is a content
  pipeline decision (Phase 10 owns where content comes from), not a change to this record.
