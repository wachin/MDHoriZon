/**
 * The Markdown pipeline, in one place.
 *
 * The architecture rules forbid spreading plugin configuration across components, so this module is
 * the single place where the pipeline is assembled and the single place to change when a plugin is
 * added. It is deliberately free of React: the rendering core must stay usable and testable without
 * page components.
 *
 * Order matters. The sanitizer runs **last**, so nothing a plugin generates can bypass it.
 */
import type {
  Options as ReactMarkdownOptions,
  UrlTransform,
} from 'react-markdown'
import rehypeSanitize from 'rehype-sanitize'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import {
  ALLOWED_IMAGE_PROTOCOLS,
  ALLOWED_LINK_PROTOCOLS,
  applyUrlPolicy,
} from './url-policy'
import { sanitizeSchema } from './sanitize-schema'

type PluginList = NonNullable<ReactMarkdownOptions['remarkPlugins']>

/**
 * Remark plugins: parse-side extensions.
 *
 * GFM brings tables, task lists, strikethrough and autolinks. `singleTilde` is turned **off**
 * deliberately: it defaults to on, which turns `~text~` into strikethrough, and a lone tilde is the
 * home-directory character in prose (`~/Descargas`). A pair of tildes still works, because that is
 * what the GFM specification defines.
 */
export const remarkPlugins: PluginList = [[remarkGfm, { singleTilde: false }]]

/** Rehype plugins: tree-side transformations, ending with the security boundary. */
export const rehypePlugins: PluginList = [
  // Deterministic, GitHub-compatible heading ids, with `-1`-style suffixes for duplicates.
  rehypeSlug,
  // The security boundary. Always last, and never optional.
  [rehypeSanitize, sanitizeSchema],
]

/**
 * The URL policy applied by the renderer to every `href` and `src`.
 *
 * Returning `null` removes the attribute, which is what happens to `javascript:` links, `data:`
 * images and any other scheme the policy does not allow.
 */
export const urlTransform: UrlTransform = (url, key) => {
  const allowed =
    key === 'src' ? ALLOWED_IMAGE_PROTOCOLS : ALLOWED_LINK_PROTOCOLS
  return applyUrlPolicy(url, allowed)
}
