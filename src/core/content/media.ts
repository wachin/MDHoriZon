/**
 * What an article shows first: its cover image, or its video.
 *
 * ## The Blogger rule, with one change
 *
 * Blogger takes the first image — or the first embedded video — in an entry and uses it as the entry's
 * cover. That is the rule this module implements, with the change the author asked for: the image's
 * `alt` text is irrelevant. `![](images/Portada.jpg)` is the common shape in the real content, and an
 * image without alt text is still a cover.
 *
 * ## Videos are covers too, and no iframe is needed to be one
 *
 * A YouTube video has a thumbnail at a predictable address, so an entry whose first media is a video
 * still gets a cover image without loading anything from YouTube. Whether the video is also *played*
 * in place is a rendering decision, and a separate one — see
 * `docs/architecture/0010-media-and-embeds.md`.
 *
 * ## Legacy embeds are rescued as links
 *
 * The older entries in the real content embed videos the Blogger way:
 *
 * ```html
 * <iframe src="https://www.youtube.com/embed/kN_jFjBW21U" …></iframe>
 * ```
 *
 * Layer 1 of the sanitization policy removes raw HTML from the tree, so that iframe would leave nothing
 * behind — the video would simply vanish from the page. `rescueLegacyEmbeds` rewrites the *source text*
 * into the Markdown link an author would write today, before the renderer ever sees it. The policy is
 * untouched; what changes is that the content layer understands an older way of writing the same thing.
 */

/** A video service this project understands. */
export type MediaKind = 'image' | 'video'

export type Cover = {
  kind: MediaKind
  /**
   * As written in the document. Relative paths stay relative so the caller can resolve them against
   * the document (ADR 0008); for a video this is the watch URL, and `thumbnail` is what to display.
   */
  src: string
  /** The image's alt text, when it had one. Empty string is a legitimate value. */
  alt?: string
  /** For a video: the still image YouTube publishes for it. */
  thumbnail?: string
  /** For a video: its id, which the player and the URL are built from. */
  videoId?: string
}

/**
 * The id of a YouTube video, from any of the shapes a person might paste or an export might contain.
 *
 * Returns `undefined` for anything else — including other video hosts, which are left as ordinary
 * links rather than guessed at.
 */
export function youTubeVideoId(url: string): string | undefined {
  const patterns = [
    /youtube\.com\/watch\?(?:[^#]*&)?v=([A-Za-z0-9_-]{6,})/,
    /youtube\.com\/embed\/([A-Za-z0-9_-]{6,})/,
    /youtube\.com\/shorts\/([A-Za-z0-9_-]{6,})/,
    /youtu\.be\/([A-Za-z0-9_-]{6,})/,
  ]

  for (const pattern of patterns) {
    const match = pattern.exec(url)

    if (match !== null) return match[1]
  }

  return undefined
}

/** The still image YouTube publishes for a video, which is what a cover can point at. */
export function youTubeThumbnail(videoId: string): string {
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
}

/** Builds a cover for a video URL, or `undefined` when it is not a video this project understands. */
export function videoCover(url: string): Cover | undefined {
  const videoId = youTubeVideoId(url)

  if (videoId === undefined) return undefined

  return {
    kind: 'video',
    src: url,
    videoId,
    thumbnail: youTubeThumbnail(videoId),
  }
}

/**
 * The document's prose, with the parts that only *show* Markdown syntax removed.
 *
 * Code is where an author writes an example of an image or a URL — the real library documents
 * `![...](images/arrow_bc.png)` inside backticks, and a configuration guide quotes a URL in code — so a
 * cover taken from code would be a cover taken from documentation about covers. Fenced blocks go first,
 * then inline spans; what is left is what the page will actually show.
 */
export function visibleMarkdown(body: string): string {
  return body
    .replace(/^[ \t]*(`{3,}|~{3,})[^\n]*\n[\s\S]*?^[ \t]*\1[ \t]*$/gm, '\n')
    .replace(/(`+)[^`]*?\1/g, ' ')
}

/**
 * The first media in a document: the first image, or the first video link, whichever comes first.
 *
 * Order is the whole point — "the first image or video" — so images and video links are searched
 * together and the earliest one wins.
 */
export function firstMedia(body: string): Cover | undefined {
  const prose = visibleMarkdown(body)
  const candidates: Array<{ index: number; cover: Cover }> = []

  // Images, including the empty-alt form (`![](images/Portada.jpg)`).
  for (const match of prose.matchAll(
    /!\[([^\]]*)\]\(\s*<?([^)\s>]+)>?(?:\s+"[^"]*")?\s*\)/g,
  )) {
    candidates.push({
      index: match.index,
      cover: { kind: 'image', src: match[2], alt: match[1] },
    })
  }

  // Links to a video. A link's *text* does not matter: an author who writes a sentence and points it
  // at a video means the video.
  for (const match of prose.matchAll(
    /(?<!!)\[[^\]]*\]\(\s*<?(https?:\/\/[^)\s>]+)>?[^)]*\)/g,
  )) {
    const cover = videoCover(match[1])

    if (cover !== undefined) candidates.push({ index: match.index, cover })
  }

  // Bare URLs, which Markdown turns into links by itself (GFM autolinks).
  for (const match of prose.matchAll(/(?<![([<])\bhttps?:\/\/[^\s<>)\]]+/g)) {
    const cover = videoCover(match[0])

    if (cover !== undefined) candidates.push({ index: match.index, cover })
  }

  candidates.sort((left, right) => left.index - right.index)

  return candidates[0]?.cover
}

/**
 * Drops Blogger's size hint from an image destination.
 *
 * The export writes `![alt](https://…/photo.jpg =650x)`: a space, then the width Blogger was asked to
 * serve. Markdown does not allow a space in a bare destination, so the whole thing stops being an image
 * and the reader sees the Markdown source instead — measured on the real library, this silently breaks
 * every image written that way. The URL before the space is the image, so the hint is removed and the
 * image comes back.
 *
 * Only a space followed by a size token is touched: `…jpg=s1600`, which some entries also use, is a
 * valid destination and is left alone.
 */
export function rescueLegacyImageSizes(markdown: string): string {
  return markdown.replace(
    /(!\[[^\]]*\]\(\s*<?)([^\s)>]+)(\s+=(?:s|w|h)?\d+(?:x\d*)?(?:-[a-z0-9]+)*)(>?\s*\))/g,
    '$1$2$4',
  )
}

/**
 * Rewrites the older ways of writing media into the Markdown an author would write today.
 *
 * This runs in the content layer, before rendering, and it is what keeps the sanitization policy intact:
 * the alternatives — allowing raw HTML through, or letting a mangled destination render as source — both
 * mean a reader sees something other than the article the author wrote.
 */
export function rescueLegacyMarkup(markdown: string): string {
  return rescueLegacyImageSizes(rescueLegacyEmbeds(markdown))
}

/** One legacy `<iframe>` pointing at a video service. */
const LEGACY_IFRAME =
  /<iframe\b[^>]*\bsrc\s*=\s*["']([^"']+)["'][^>]*>(?:[\s\S]*?<\/iframe>)?/gi

/**
 * Rewrites legacy embedded players into ordinary Markdown links.
 *
 * Only the video services this project understands are touched; any other raw HTML is left exactly as
 * it was, for the sanitization policy to deal with. The link text is the video's own watch URL, which
 * is what an author would have written by hand.
 */
export function rescueLegacyEmbeds(markdown: string): string {
  return markdown.replace(LEGACY_IFRAME, (whole, src: string) => {
    const videoId = youTubeVideoId(src)

    if (videoId === undefined) return whole

    const watch = `https://www.youtube.com/watch?v=${videoId}`

    return `[${watch}](${watch})`
  })
}
