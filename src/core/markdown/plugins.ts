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
import rehypeKatex from 'rehype-katex'
import rehypeSanitize from 'rehype-sanitize'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import { resolveAssetUrl } from '../assets/resolve-asset-url'
import { remarkInlineMathDelimiterRule } from './remark-inline-math-rule'
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
export const remarkPlugins: PluginList = [
  [remarkGfm, { singleTilde: false }],
  // `$inline$` and `$$display$$`.
  remarkMath,
  // Restores the closing-delimiter half of the GFM maths rule, which micromark does not implement:
  // without it `the item costs $5 and the other costs $10` renders as a formula. Must follow
  // `remarkMath`. See the plugin for the measurement and the specification reference.
  remarkInlineMathDelimiterRule,
]

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
 *
 * Measured cost of mathematics (Phase 5): the bundle goes from 583 kB to 856 kB (185 kB to 266 kB
 * gzipped), the KaTeX stylesheet adds 34.6 kB (9.4 kB gzipped), and the build emits KaTeX's 59 font
 * files (1.2 MB across `.woff2`, `.woff` and `.ttf`; a browser fetches only the `.woff2` faces the
 * page actually uses). The font URLs are rewritten with the deployed base path, so they resolve
 * under `/MDHoriZon/`. Both figures belong to the Phase 18 budget: KaTeX is not tree-shakeable, so
 * the only structural lever is loading it on demand, which is Phase 6's mechanism.
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
  // Maths, with KaTeX rendering locally: no external service, so it works offline.
  [
    rehypeKatex,
    {
      // KaTeX's default output: an HTML layer that paints the formula, plus a MathML layer that
      // assistive technology reads. Phase 2 chose `output: 'html'` to keep the schema smaller; that
      // was measured to be wrong on both counts (HTML still needs classes, inline styles and
      // `svg`/`path`) and it left the only emitted layer `aria-hidden="true"`, so the formula was
      // invisible to screen readers. See `sanitize-schema.ts` and ADR 0005.
      output: 'htmlAndMathml',
      // KaTeX's `trust` option gates `\href` and `\includegraphics` inside formulas. It stays off:
      // a formula must never be able to introduce a link or reach the network.
      trust: false,
      // A malformed formula becomes a visible `.katex-error` instead of throwing during render and
      // taking the whole document down. A reading engine must degrade, not fail.
      throwOnError: false,
    },
  ],
  // The security boundary. Always last, and never optional.
  [rehypeSanitize, sanitizeSchema],
]

/**
 * The URL policy applied by the renderer to every `href` and `src`.
 *
 * Order matters: the document's own relative paths are resolved first, and the policy judges the
 * *resolved* URL. Doing it the other way round would let a resolved path bypass the scheme check.
 *
 * Returning `null` removes the attribute, which is what happens to `javascript:` links, `data:`
 * images and any other scheme the policy does not allow.
 *
 * @param documentUrl Where the document lives, so `../assets/x.png` means the right thing. Without
 *   it, relative URLs are left exactly as the document wrote them.
 */
export function createUrlTransform(documentUrl?: string): UrlTransform {
  return (url, key) => {
    const allowed =
      key === 'src' ? ALLOWED_IMAGE_PROTOCOLS : ALLOWED_LINK_PROTOCOLS

    return applyUrlPolicy(resolveAssetUrl(url, documentUrl), allowed)
  }
}

/** The policy with no document base: for a document whose location is not known. */
export const urlTransform: UrlTransform = createUrlTransform()
