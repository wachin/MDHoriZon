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
import rehypeHighlight from 'rehype-highlight'
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

/**
 * Languages whose content is markup or prose, not code: highlighting them would be noise. Mermaid
 * source in particular is not code, and Phase 6 will render it as a diagram.
 */
const PLAIN_TEXT_LANGUAGES = ['mermaid', 'text', 'txt', 'plaintext']

/**
 * Rehype plugins: tree-side transformations, ending with the security boundary.
 *
 * Measured cost of syntax highlighting: the bundle goes from 413 kB to 581 kB (131 kB to 184 kB
 * gzipped). `rehype-highlight` imports lowlight's 37-grammar `common` set statically, so trimming
 * languages with its `subset` option changes nothing — verified by building both ways. The real win
 * is loading the highlighter on demand, which is the same mechanism Phase 6 needs for Mermaid, so it
 * belongs with that work rather than being bolted on here. Phase 18 owns the budget.
 */
export const rehypePlugins: PluginList = [
  // Deterministic, GitHub-compatible heading ids, with `-1`-style suffixes for duplicates.
  rehypeSlug,
  // Syntax highlighting. It runs before the sanitizer on purpose: the spans it generates go through
  // the same boundary as everything else.
  [
    rehypeHighlight,
    {
      plainText: PLAIN_TEXT_LANGUAGES,
      // Detection off deliberately: guessing a language for an unlabelled fence turns plain text
      // into a colour guessing game. In this project "language detection" means reading the fence's
      // own label, and an unknown label falls back to plain code.
      detect: false,
    },
  ],
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
