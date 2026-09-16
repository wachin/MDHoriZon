# 0005. Phase 2 security policy: the explicit lists and the reviews

- **Status:** accepted
- **Date:** 2026-09-14
- **Context:** Phase 2 — Security Boundary. [ADR 0003](0003-sanitization-policy.md) fixed the _shape_ of the boundary and left the element, attribute and URL-scheme lists as deliverables of this phase.

## Context

ADR 0003 decided three layers and said explicitly that the lists would be filled in here. Phase 2 also asks for five
reviews (`data:` URLs, SVG, embedded HTML, external images, and links opened externally from the WebViews) and for a
malicious-input fixture.

This record closes the lists and the reviews. It records decisions, not implementation: the source of truth for the
policy is `src/core/markdown/sanitize-schema.ts`, and it is enforced by `src/core/markdown/sanitize-schema.test.ts`
and `src/components/MarkdownRenderer.security.test.tsx`.

## Decision

### The lists

- **Elements.** The base is GitHub's `defaultSchema`: an audited allowlist of 53 elements. We **narrow it and never
  widen it**, and a test asserts the element list is still identical to the base — so the day a plugin needs new
  markup, the suite fails and the change has to be deliberate.
- **Never allowed**, and asserted as such: `script`, `iframe`, `object`, `embed`, `style`, `base`, `meta`, `link`,
  `form`, `textarea`, `button`, `select`, `svg`, `math`, `audio`, `video`, `canvas`, `dialog`, `template`,
  `frame`/`frameset`, `applet`, `portal`.
- **Attributes.** No `on*` attribute and no `style` attribute exists anywhere in the schema. `input` is allowed only
  because task lists need it, and the schema forces `type="checkbox"` and `disabled: true`, so it cannot become a
  text field or a submit button. `code` classes are restricted to `/^language-./`, `img` keeps `src`/`alt`, and GFM
  footnotes keep the handful of `data-*` and `aria` attributes they need.
- **URL schemes.** `href`: `http`, `https`, `mailto`. `src`: `http`, `https`. `javascript:`, `data:` and `file:`
  appear nowhere in the schema, and obfuscated forms (`JaVaScRiPt:`, `java<TAB>script:`, leading whitespace) are
  rejected by normalisation before comparison rather than by string matching.

### Review: `data:` URLs — blocked

`data:image/svg+xml` can carry script and `data:text/html` is a whole document, so `data:` stays out of every
attribute. The one legitimate use we could imagine is embedding a small image in a document so it survives offline,
but the offline library stores real files, so the need is weak. If it ever becomes real, it arrives as a narrow
allowance for specific media types in a new record — never as a blanket protocol.

### Review: SVG — not allowed from documents, at all

Two different things share the name, and only one of them is a Phase 2 question:

1. **SVG written in a document**: impossible today. Raw HTML never reaches the tree, and `svg` is not in the
   allowlist, so there is no path from a document to an SVG element. Asserted by tests.
2. **The SVG Mermaid will generate** (Phase 6): that is _our_ markup, driven by text the author controls, and it
   needs its own containment decision — `securityLevel: 'strict'`, sanitising the generated SVG, or adding a narrow
   SVG subset to this schema. **Phase 2's checkbox for Mermaid stays open on purpose**: there is nothing to verify
   until Mermaid renders anything.

### Review: embedded HTML — dropped, and the trade-off is accepted

Layer 1 removes raw HTML. The measured behaviour, asserted in the security suite:

- **Inline HTML loses only its tags.** `Before <script>x</script> after` renders "Before" and "after" as inert text.
- **A block of HTML is removed with its content.** A document that wraps prose in `<div>` or `<details>` loses that
  prose.

The second half is a real loss and it is accepted deliberately: the alternative, showing the tags as literal text, is
worse for a reader. The fixture's section 18 already anticipates it ("if `<details>` is stripped, this case documents
that decision rather than failing").

### Review: external images — allowed, with the trade-off written down

`http`/`https` images stay allowed because they are part of Markdown. Three consequences are recorded rather than
assumed away:

- **No build-time fetching.** The renderer never downloads an image; there is no cache to poison and no build that
  depends on the network.
- **Privacy.** Loading a remote image tells a third party the reader's IP address and that the document was opened.
  A future "load images on request" preference is worth considering in Phase 7; it is not a blocker here.
- **Offline (Phase 11) must treat them as expected failures.** An article has to degrade gracefully when a remote
  image cannot be fetched, exactly like the fixture's deliberately missing image, which already pins the behaviour.

### Review: links opened externally from Android/iOS — marked now, implemented in Phase 14

External `http(s)` links get `target="_blank"` and `rel="noopener noreferrer"` today. In a Capacitor WebView,
`target="_blank"` is **not** a browser navigation: without help it either does nothing or opens inside the app's own
WebView, which is a worse experience and a bigger surface. Phase 14 must intercept external navigation and hand it to
the system browser (Capacitor's App Launcher or Browser plugin). The renderer's job is only to mark the link, which
it does; the review is what Phase 2 owed.

### Review: code is text, Mermaid is inert

Asserted in `MarkdownRenderer.security.test.tsx`: a fence containing `<script>` renders those characters, and a
`mermaid` fence renders as a code block with no `<svg>` anywhere in the tree.

## Alternatives considered

- **Start from an empty allowlist and add only what we need.** More auditable in principle, but it throws away an
  audited list and rebuilds it element by element, with a real risk of missing the footnote and GFM elements.
  Rejected in favour of inherit + narrow + pin with tests.
- **Allow `math` now, to prepare for KaTeX.** Rejected: KaTeX can emit HTML only, so Phase 5 can keep the allowlist
  smaller by choosing `output: 'html'` instead of allowing the MathML element tree in advance.
- **Allow a narrow SVG subset now, to prepare for Mermaid.** Rejected: allowlist entries for a feature that does not
  exist are surface with no user. Phase 6 decides with the schema in front of it.
- **Strip the surrounding text of inline HTML too**, for symmetry with HTML blocks. Rejected: it would mangle prose
  (`Before <script>x</script> after` would lose the sentence) to hide a string.

## Consequences

- Adding a plugin that needs new markup now has a mechanical consequence: a failing test that demands a deliberate
  change to one file, instead of a silent widening.
- Three phases inherit explicit obligations from this record: Phase 5 (KaTeX HTML output), Phase 6 (SVG containment,
  and the reason its Phase 2 checkbox is still open) and Phase 14 (external navigation in the WebViews).
- The privacy cost of remote images is documented, so the future "images on request" option is a decision someone
  can pick up rather than a discovery.
