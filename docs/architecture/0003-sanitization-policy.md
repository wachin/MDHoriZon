# 0003. Sanitization policy: layered, not optional

- **Status:** accepted
- **Date:** 2026-09-14
- **Context:** Phase 2 — Security Boundary (and every phase that adds a plugin)

## Context

MDHoriZon renders Markdown it does not control: content fetched from the network, content a user downloaded into the
offline library (which then persists on their device), and eventually content in a fork's repository. The roadmap
already fixes the principle — _"security must be designed before accepting arbitrary Markdown content"_ — and states
the HTML policy: **raw HTML disabled by default**, sanitized through an explicit allowlist if it is ever allowed, and
never trusted merely because it lives in a Git repository.

What the roadmap leaves open is the _mechanism_: which pipeline shape enforces that, and where the sanitizer sits.

The decisive observation is that the danger is **not only** the HTML an author writes. Every plugin we plan to add
generates markup of its own from untrusted input:

| Plugin (roadmap phase)       | What it emits                                         |
| ---------------------------- | ----------------------------------------------------- |
| `rehype-katex` (Phase 5)     | HTML and CSS for the formula                          |
| `rehype-highlight` (Phase 4) | Nested `<span>` elements for tokens                   |
| Mermaid (Phase 6)            | **SVG**, driven by a text grammar the author controls |

SVG and HTML generated from attacker-controlled text is exactly the surface that has produced real vulnerabilities in
diagram renderers. So "the input has no raw HTML" is necessary but not sufficient.

## Decision

**Three layers, each with one job. The policy is layered and none of the layers is optional.**

### Layer 1 — Raw HTML from the document never reaches the DOM

`rehype-raw` is **not** installed, and no component may undo this. HTML written inside a Markdown document is never
parsed into real elements.

This is a statement about _our pipeline_, not a claim about a library default: Phase 1 must **pin it with a test**
using the `<script>`, `onerror` and `<iframe>` cases already present in section 14 of the Golden Test Document, so the
behavior is verified rather than assumed.

### Layer 2 — A sanitization stage that always runs

A sanitization stage (`rehype-sanitize` with an **explicit schema**, started from GitHub's schema and **narrowed**,
never widened for convenience) runs unconditionally on every render, including inside reusable components. Its job is
to contain what the **plugins** generate and to enforce attribute and URL rules in one place.

Rules that make this a boundary rather than a suggestion:

- It is never optional, never skippable, and never bypassed by a component, for performance or convenience.
- Elements and attributes are declared in **one** place; a plugin that needs a new one changes that declaration,
  which is a reviewed change, not a component detail.
- Adding a plugin is a **security-relevant** change: what markup can it emit, and does the schema already cover it?

### Layer 3 — An explicit URL policy, applied on both sides

Only `http`, `https` and `mailto` are allowed; images are restricted to `http` and `https`. The policy is enforced by
the sanitizer schema **and** by the components that build links and images, so a component cannot quietly accept what
the schema would reject.

- URLs are parsed and normalized **before** the allowlist check, so obfuscated forms (`JaVaScRiPt:`,
  `java&#x73;cript:`, leading whitespace) fail as a side effect of normalization instead of being string-matched.
- External links receive `rel="noopener noreferrer"`.
- `data:` URLs are treated as disallowed unless a future decision record allows a specific, narrow use.

### Cross-cutting rules

- **`dangerouslySetInnerHTML` is forbidden** except for markup produced by our own code from already-escaped input, or
  by a generator whose dangerous options are off. Every such use requires a test that proves escaping, and is
  documented at the call site.
- **Plugin escape hatches stay closed.** KaTeX's `trust` option must remain `false` (it is what allows `\href` and
  `\includegraphics` inside formulas). Mermaid must be initialized with `securityLevel: 'strict'` when Phase 6 adds
  it, and its output stays inside the Phase 6 containment decision.
- The malicious examples in section 14 of the Golden Test Document become **tests with expected results** — the
  roadmap already lists the seven required cases.

## Alternatives considered

- **Render raw HTML, then sanitize (single layer).** Rejected: the roadmap's own HTML policy disables raw HTML by
  default, and this shape depends on never forgetting to clean, with the failure already published by the time it is
  noticed.
- **Safe by construction: our own `mdast`→React renderer, no sanitizer** (the approach DeepSeek Harness takes, and a
  legitimate one). Rejected for now, not on principle: it is stronger, but we would own and test a renderer — roughly
  700 lines in the reference implementation — and we do not have the constraint that pushed them there (streaming
  Markdown). It stays available if Phases 21–22 need it; Layers 1 and 3 remain reusable if we switch.
- **Layer 1 only** (rely on raw HTML being off, no sanitizer). Rejected: it leaves the plugin-generated markup — the
  SVG and the HTML built from untrusted text — with no gate at all.
- **Widening GitHub's schema as features need it.** Rejected: the schema is narrowed deliberately. A feature that
  cannot be expressed within it is a design discussion, not a one-line exception.

## Consequences

- Phase 2's open tasks (element list, attribute list, URL schemes, SVG and `data:` review) become concrete work
  against one schema, and the acceptance criterion is already written: the seven malicious cases plus the fixture's
  section 14.
- The sanitizer sits on the render path. If it ever shows up in a performance budget (Phase 18), the fix is caching
  or memoization — never removing the stage.
- Reviewers gain a rule they can enforce: a pull request that introduces `dangerouslySetInnerHTML`, a widened schema,
  or a new plugin without a markup review is incomplete.
- A future decision to allow a narrow subset of raw HTML is possible, but it must arrive as a new record that states
  what is allowed and why, and it must keep Layer 2 in place.
- The exact element and attribute lists are deliberately **not** in this record: they are the Phase 2 deliverables.
  This record fixes the shape; Phase 2 fills it in.
