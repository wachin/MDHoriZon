/**
 * Layer 2 of the sanitization policy: the sanitize schema.
 *
 * See `docs/architecture/0003-sanitization-policy.md`. It starts from GitHub's schema
 * (`defaultSchema`) and is **narrowed**, never widened for convenience: adding a plugin that emits
 * new markup means changing this file deliberately, which is a reviewed change.
 *
 * What `defaultSchema` already gives us, and is why nothing had to be added for GFM:
 * - `code` with a `language-*` class, so fenced code keeps its language.
 * - `input` restricted to `type="checkbox"` with `disabled` forced to true: task lists.
 * - `id`, `align`, `checked` and `className` among the allowed attributes.
 * - `src` limited to `http` and `https`, which is what blocks `data:` images.
 */
import { defaultSchema } from 'rehype-sanitize'
import type { Schema } from 'hast-util-sanitize'

export const sanitizeSchema: Schema = {
  ...defaultSchema,

  // `defaultSchema` prefixes `id` and `name` with `user-content-` to blunt DOM clobbering. That
  // would break every in-page anchor: `rehype-slug` writes `id="12-mermaid"` while the document
  // links to `#12-mermaid`. Anchors win here; whether to reintroduce the prefix and rewrite
  // fragments is one of the Phase 2 decisions.
  clobberPrefix: '',

  protocols: {
    ...defaultSchema.protocols,
    // Narrowed from the default (http, https, irc, ircs, mailto, xmpp).
    href: ['http', 'https', 'mailto'],
    // Kept as it is shipped. Stated explicitly so the policy is readable in one place.
    src: ['http', 'https'],
  },
}
