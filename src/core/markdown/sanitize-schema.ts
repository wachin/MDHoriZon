/**
 * Layer 2 of the sanitization policy: the sanitize schema.
 *
 * See `docs/architecture/0003-sanitization-policy.md` (the shape) and
 * `docs/architecture/0005-phase-2-security-policy.md` (the reviews behind these lists).
 *
 * ## What is allowed
 *
 * The base is GitHub's `defaultSchema`: an audited allowlist of 53 elements that already excludes
 * `script`, `iframe`, `object`, `embed`, `style`, `base`, `meta`, `form`, `svg` and `math`, and that
 * contains no event-handler attribute and no `style` attribute anywhere.
 *
 * We keep that base and only ever **narrow** it. `sanitize-schema.test.ts` pins both halves of the
 * contract — what must be allowed and what must never be — so a dependency upgrade cannot silently
 * widen what a document can reach.
 *
 * Elements the renderer relies on today, for reference (the test asserts them):
 * paragraphs, headings, lists, tables, code, quotes, emphasis, links, images, rules, line breaks,
 * task-list inputs, and the footnote elements remark-gfm emits.
 *
 * ## Two deliberate gaps, and who fills them
 *
 * - **`math` is not allowed.** Phase 5 must configure KaTeX with `output: 'html'`, which skips the
 *   MathML half of its output; otherwise the MathML elements would have to be allowed here on
 *   purpose. Choosing the first option keeps the allowlist smaller.
 * - **`svg` is not allowed.** Mermaid output (Phase 6) simply cannot be expressed today, so
 *   containing it is a Phase 6 decision, not something to widen in advance.
 *
 * Both are exactly the "adding a plugin is a security-relevant change" rule: the assertion in the
 * test suite fails the moment the element list changes, and that is the point.
 *
 * ## The two overrides
 *
 * 1. `clobberPrefix` is cleared. `defaultSchema` prefixes `id` and `name` with `user-content-` to
 *    blunt DOM clobbering, which would break every in-page anchor: `rehype-slug` writes
 *    `id="12-mermaid"` while the document links to `#12-mermaid`.
 * 2. `protocols.href` is narrowed to `http`, `https` and `mailto`; `protocols.src` stays limited to
 *    `http` and `https`.
 */
import { defaultSchema } from 'rehype-sanitize'
import type { Schema } from 'hast-util-sanitize'

export const sanitizeSchema: Schema = {
  ...defaultSchema,

  clobberPrefix: '',

  protocols: {
    ...defaultSchema.protocols,
    href: ['http', 'https', 'mailto'],
    src: ['http', 'https'],
  },
}
