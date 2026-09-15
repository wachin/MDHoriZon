# References

Curated sources for the decisions MDHoriZon has to make. The roadmap lists _which_ projects are worth studying; this
file records **what to look for in each one** and what has already been verified, so nobody has to redo the survey.

**How to use this list.** Read for **ideas and trade-offs**, never to copy code. If code is ever reused from a
permissive project, the licence notice travels with it, the provenance is stated in the pull request, and the
dependency policy in the roadmap applies: a clear reason and a bundle-impact evaluation.

Reference material is **not vendored into this repository**. See
[ADR 0002](architecture/0002-reference-material-lives-outside-the-repo.md) for why and for how to keep a local copy.

---

## DeepSeek Harness (MIT)

|                  |                                                                                                                                                                                                                                                                  |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Repository       | <https://github.com/deepseek-ai/deepseek-harness>                                                                                                                                                                                                                |
| Licence          | **MIT** (verified in `LICENSE`: _Copyright (c) 2026 DeepSeek_)                                                                                                                                                                                                   |
| Revision studied | `c291e7961a` on `master` (`c291e7961a` is _v0.1.5_ era)                                                                                                                                                                                                          |
| Why it matters   | It is a mature Markdown renderer for **untrusted, streaming** input, and it builds on the **same core stack the roadmap already chose** (`micromark` / `mdast`; `mdast-util-from-markdown`, `mdast-util-gfm`, `micromark-extension-gfm`, plus Mermaid and KaTeX) |

That last row is the headline: it is independent confirmation that the ecosystem choice in `ROADMAP.md` §4 is what
current tooling actually uses. There is no exotic stack to discover.

### The module to read

`packages/client/ui-primitives/src/markdown/` — 12 files, ~2,700 lines. The interesting ones:

| File                         | Lines | Why it is worth reading                                                                                                                                                                                                                                      |
| ---------------------------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `render.tsx`                 | 685   | A **direct mdast → React** renderer. Its header states it _replaces the `react-markdown` / `remark-rehype` pipeline_ with a switch over parsed nodes so that streaming can work. Contains the URL protocol allowlist (`sanitizeUrl`, remote-image allowlist) |
| `highlight.ts`               | 487   | The syntax highlighter: a **synchronous Shiki core on the JavaScript regex engine — no Oniguruma WASM**, with an explicit grammar allowlist, chosen for bundle size                                                                                          |
| `incremental.ts`             | 360   | Incremental block-level parsing for an append-only text stream                                                                                                                                                                                               |
| `mathCompatibility.ts`       | 349   | Extends dollar-only math syntax with **TeX delimiters**, reusing the upstream token vocabulary                                                                                                                                                               |
| `CodeBlock.tsx`              | 196   | Code block UI: labels, and `dangerouslySetInnerHTML` fed **only** by the highlighter's own escaped output                                                                                                                                                    |
| `MarkdownText.tsx`           | 188   | The entry component; its own documentation calls it the _"untrusted assistant-Markdown renderer"_                                                                                                                                                            |
| `plain-text.ts`              | 121   | A Markdown → plain-text projection for summaries and labels, sharing the renderer's grammar (one parser, no duplication)                                                                                                                                     |
| `parse.ts`                   | 44    | Defines **two grammars** (`parseGfm`, `parseGfmWithMath`), one per rendering arm                                                                                                                                                                             |
| `cjkFriendlyStrong.ts`       | 83    | A micromark syntax extension so `**strong**` can close after punctuation in CJK prose                                                                                                                                                                        |
| `useViewportHighlighting.ts` | 72    | Highlights only what is in the viewport — a performance technique for long documents                                                                                                                                                                         |
| `katex.tsx`                  | 90    | KaTeX integration and its error handling                                                                                                                                                                                                                     |

### Decisions this informs

1. **Sanitization strategy (Phase 2) — the big one.** DeepSeek Harness does **not** use `rehype-sanitize`,
   `react-markdown` or `remark-gfm` anywhere (verified: no match in its manifests or sources). Because it renders
   mdast itself, it is safe **by construction**: it only emits elements it knows, plus a URL protocol allowlist.
   That is a genuinely different design from the roadmap's plan (_render, then sanitize_), with a different
   trade-off: whitelist-by-construction removes a class of bugs but means owning a renderer; render-then-scrub
   reuses a maintained sanitizer but has a larger surface. **Phase 2 must choose one deliberately and record it.**
2. **Syntax highlighting (Phase 4).** The roadmap plans `rehype-highlight` + `highlight.js`. DSH uses **Shiki on the
   JS regex engine specifically to avoid shipping WASM** — relevant to bundle size and, more importantly, to old
   Android/iOS WebViews where WASM support is a risk. Worth an explicit comparison before committing.
3. **CJK emphasis (Phase 1).** See below — this is the highest-value single lesson in the whole list.
4. **Math delimiters (Phase 5).** `remark-math` is dollar-only; DSH extends it to TeX delimiters. Decide whether the
   fixture should cover `\(…\)` and `\[…\]`.
5. **Plain-text projection and viewport highlighting (Phases 17–18).** Both are reusable ideas for search, TOC, alt
   text and long-document performance — and both are examples of _reusing one parser_ instead of writing a second.

### The CJK lesson, in detail

CommonMark decides whether `**` can close by _flanking_ rules. Roughly: a closing run must not be preceded by
whitespace, and if it **is** preceded by punctuation it must be followed by whitespace or punctuation. Chinese and
Japanese prose has no spaces, so a very common construction — bold around a quoted phrase, immediately followed by
more text, as in bold-wrapping `「…」` — fails that test. The result is that the `**` renders literally instead of
bolding: not a crash, just wrong output that nobody notices until a Chinese-speaking reader complains.

Their fix is a **micromark syntax extension**: when the run is `**` or longer, the preceding character is Unicode
punctuation and the following character is a CJK script character (Han, Hiragana, Katakana, Hangul, Bopomofo,
matched with Unicode property escapes rather than a hand-written range table), allow it to close. They plug it into
the parser, **not** into a React component and **not** as an AST post-process.

Why this matters here: our golden fixture already has CJK text, but **no case that exercises this**. It is exactly
the class of bug that a conformance suite does not catch and a real user does. It belongs in the fixture, and if we
want it fixed, it belongs in `src/core/markdown/plugins.ts` — the centralised plugin configuration the architecture
rules require.

### What is verified and what is not

Verified: the licence, the revision, the files and their sizes, the libraries in use, the absence of
`rehype-sanitize`/`react-markdown`/`remark-gfm`, the URL-allowlist functions, and the CJK extension's approach
(read in full).

**Not verified:** the quality or completeness of their sanitization policy, their test coverage, and whether the
direct-renderer approach would suit a _reader_ (they need streaming; we do not). Treat every "decision this informs"
item above as an input to a decision, never as a recommendation to copy.

### Local copy, outside this repository

```bash
git clone --depth 1 https://github.com/deepseek-ai/deepseek-harness /tmp/deepseek-harness-reference
# or, to keep it inside the project without it ever touching git (`.cache/` is ignored):
git clone --depth 1 https://github.com/deepseek-ai/deepseek-harness .cache/reference/deepseek-harness
```

Pin the revision you studied when you take notes from it — a moving `main` is not a citable source.

---

## Specifications and conformance suites

The actual industry standard, and the highest-value material for Phases 1 and 3 — hundreds of conformance cases
that no application repository can give you:

| Source                                                                         | Use                                                                    |
| ------------------------------------------------------------------------------ | ---------------------------------------------------------------------- |
| [CommonMark spec](https://spec.commonmark.org/) and its `spec.json` test suite | The baseline every parser must pass; ideal for turning into test cases |
| [GitHub Flavored Markdown spec](https://github.github.com/gfm/)                | Tables, task lists, strikethrough, autolinks — and its own examples    |
| [KaTeX supported functions](https://katex.org/docs/supported)                  | What the maths fixture may legitimately contain                        |
| [Mermaid documentation](https://mermaid.js.org/)                               | Supported diagram types, and what a syntax error looks like            |
| [WCAG 2.2](https://www.w3.org/TR/WCAG22/)                                      | Phase 19 accessibility expectations                                    |

## Other implementations worth reading

| Project                           | Licence  | Why                                                                                   |
| --------------------------------- | -------- | ------------------------------------------------------------------------------------- |
| `remark` / `rehype` / `micromark` | MIT      | The ecosystem itself: plugin architecture, AST contracts, extension points            |
| `react-markdown`                  | MIT      | The pipeline the roadmap plans; read its component-override model before replacing it |
| MarkText / Muya                   | MIT      | Renderer/editor separation, for Phase 21                                              |
| Zettlr                            | GPL-3.0  | A mature reading/writing experience, themes and citation handling                     |
| Joplin, HedgeDoc, Outline         | AGPL/MIT | Content loading, offline behaviour, publishing                                        |
| Shiki, `highlight.js`             | MIT      | The two realistic syntax-highlighting choices                                         |
