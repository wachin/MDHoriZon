# Security Policy

MDHoriZon renders **untrusted Markdown** on the web, inside Android WebView and inside iOS WebView, so the
sanitization boundary is part of the product's contract rather than an afterthought. Reports about it are treated
as high priority.

## Supported versions

The project has not published a release yet. Only the latest commit on `main` is supported.

## Reporting a vulnerability

**Do not open a public issue containing a working exploit.**

Use GitHub's private vulnerability reporting for this repository:
**[Security → Advisories → Report a vulnerability](https://github.com/wachin/MDHoriZon/security/advisories/new)**

Please include:

- the affected commit (or the date you tested `main`);
- a **minimal reproducing Markdown snippet** or a URL;
- what happens, and what you expected instead;
- the platform: desktop browser, mobile browser, Android WebView, or iOS WebView;
- if you can, why the current sanitization policy does not cover it.

We aim to acknowledge within **7 days**. This is a volunteer project, so please allow reasonable time for a fix and
coordinate disclosure with the maintainer before publishing details.

## In scope

- Script execution or HTML injection through rendered Markdown or embedded HTML.
- Unsafe URL schemes — `javascript:`, `vbscript:`, `data:` — including obfuscated forms (mixed case, HTML entities,
  leading whitespace).
- Event-handler attributes, dangerous SVG (`<script>`, `onload`, `<foreignObject>`),
  `<iframe>`/`<object>`/`<embed>`, `<style>`, `<base>` and meta refresh injection.
- Escapes from the sanitization boundary through KaTeX or Mermaid rendering.
- Leakage of local data (offline content, storage) through rendered content.
- Supply-chain problems in the dependency tree that reach the shipped bundle.

## Out of scope

- The `javascript:` and `data:` samples inside
  [`tests/fixtures/Golden-Test-Document.md`](tests/fixtures/Golden-Test-Document.md). They are **inert test data**
  whose entire purpose is to be sanitized; they are never executed in this repository.
- Remote images in the test fixtures failing without network. That behavior is intentional and documented in
  [`tests/assets/README.md`](tests/assets/README.md).
- Third-party placeholder-image services used only by tests.
- Anything that requires physical access to the device, or an already-compromised browser.

## How fixes are handled

- The sanitizer is a **mandatory stage**, never an optional plugin, and a fix must not weaken it to make a feature
  pass.
- Security-relevant behavior gets a fixture under `tests/` before the fix is considered complete, in line with the
  project's golden rule.
- The advisory stays private until a fix is available and the maintainer agrees to disclose.
