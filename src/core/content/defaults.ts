/**
 * The cover every entry gets when it shows no image and no video of its own.
 *
 * Most of the real library is like that — 56 of its 122 entries — so the default is not an edge case,
 * it is the common case, and it lives here rather than in a component so the index and an article
 * cannot disagree about it.
 *
 * The path is relative to the site root, because that is what `public/` is: the file is served from
 * `public/images/default-cover.webp`, and the caller prepends its own base path (the Pages build adds
 * `/MDHoriZon/`). Keeping the base out of the model is what lets the same model serve a WebView
 * loading from a local scheme.
 */

import type { Article } from './article'
import type { Cover } from './media'

export const DEFAULT_COVER_PATH = 'images/default-cover.webp'

/**
 * The cover to show for an entry: its own, or the default.
 *
 * The default is marked as the author's fallback rather than as the entry's own image, so a caller can
 * tell them apart — an index may want to omit a placeholder it cannot credit.
 */
export const DEFAULT_COVER: Cover = {
  kind: 'image',
  src: DEFAULT_COVER_PATH,
  alt: '',
}

export function coverFor(article: Article): Cover {
  return article.cover ?? DEFAULT_COVER
}
