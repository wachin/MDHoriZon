# 0008. A document's assets, and the content package

- **Status:** accepted
- **Date:** 2026-09-16
- **Context:** Phase 8; binds the content loader (Phase 10) and the offline library (Phase 11)

## Context

A Markdown file references its assets by relative path — `![diagram](../assets/diagram.png)` — which means
"next to me". Nothing in a browser knows what "next to me" means: a relative URL is resolved against the **page**
URL, so the golden document's image was looked for beside `index.html` and the preview showed a broken image.

Two more problems follow from the same root, and neither can be fixed by patching the renderer alone:

- **How offline downloads carry assets.** The offline library (Phase 11) has to store an article _and_ the files
  it references, and has to know which those are.
- **What happens when content is copied.** If a document's paths are rewritten when it is stored — to an absolute
  device path, a `blob:` URL, or a data URI — the copy breaks the moment the content moves to another device or
  the browser clears its storage. That is the failure the roadmap asks to prevent.

## Decision

1. **Relative URLs are resolved at render time against the document's own location**, which the caller supplies
   (`MarkdownRenderer`'s `documentUrl`). With no location, the document's words are left exactly as written: the
   rendering core stays usable without a content loader, and guessing a base would be worse than doing nothing.
2. **Resolution happens before the URL policy**, never after, so the policy judges the resolved URL. Otherwise a
   relative-looking value could be resolved into a scheme the policy would have rejected.
3. **The document is never rewritten.** Paths stay as the author wrote them; the base is supplied fresh on every
   render. A copy of a document therefore keeps working, because nothing about it was ever tied to a location.
4. **A content package is the document plus the assets reachable from it by relative path**, rooted at the
   directory the loader treats as the document's home. Absolute and remote URLs are not part of the package, and
   are never required for a document to render.
5. **Offline storage keeps package-relative keys** (Phase 11): the package is downloaded as a unit, each asset is
   stored under its package-relative path, and the package root becomes the `documentUrl` when the stored copy is
   rendered. No absolute path, no `blob:` URL and no data URI is ever persisted into content.
6. **A missing asset is a rendered placeholder, not a failed article**: the `alt` text stays, the image is marked
   `data-image-state="missing"` and gets a legible box. A broken path must be visible, because a silent one is how
   a wrong base goes unnoticed.
7. **Intrinsic dimensions are not emitted.** The renderer is synchronous and has no filesystem, so it cannot know
   an image's real size; `width`/`height` attributes and `srcset` are therefore absent, and the aspect ratio is
   preserved by CSS (`max-width: 100%; height: auto`). This costs the layout-shift benefit of known dimensions;
   revisit it in a performance pass, not by guessing sizes here.

## Alternatives considered

- **Resolve against the page URL** (the browser default). Rejected: it is what produced the bug, and the fixture
  states the opposite requirement in words.
- **Rewrite paths when content is loaded or stored** into absolute or `blob:` URLs. Rejected: it is precisely how
  copied content breaks, it leaks the origin into the document, and it makes an asset's identity depend on where
  it happened to be stored.
- **Inline assets as `data:` URIs.** Rejected: the URL policy deliberately refuses `data:` in `src`, and inlining
  would bloat documents and destroy caching.
- **Discover dimensions or `srcset` candidates by reading the asset at render time.** Rejected: not possible in a
  browser without a request per image, which is what lazy loading exists to avoid.
- **A separate "asset map" the document must declare.** Rejected: it would make an author maintain a manifest the
  paths already imply, and the package is derivable from the document.

## Consequences

- The content loader (Phase 10) owes `MarkdownRenderer` a `documentUrl`; the offline library (Phase 11) owes the
  package-relative storage scheme and must render stored packages through the package root.
- The roadmap task _"Prevent broken relative paths after content is copied to local storage"_ stays open until
  Phase 11 can demonstrate it: the design above is what will make it work, and a checkbox that claims behaviour
  nobody has exercised yet is worse than an open one.
- Remote images remain allowed on purpose and are never required: offline they fail exactly like a missing file,
  which the fixture pins.
- The scheme decision still belongs to the URL policy alone ([ADR 0003](0003-sanitization-policy.md)); this record
  only fixes the _order_ — resolve, then judge.
