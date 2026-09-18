import { useEffect, useRef, useState } from 'react'
import { youTubeThumbnail, youTubeVideoId } from '../core/content/media'

export type VideoEmbedProps = {
  /** The video URL exactly as the document wrote it. */
  href: string
  /**
   * The link's own text, used as the accessible name — and ignored when it is just the URL again, which
   * is what a bare autolinked URL gives us.
   */
  label?: string
}

/**
 * A video that waits to be asked.
 *
 * Loading YouTube's player on page load would mean a third party's scripts, cookies and requests running
 * on every article a reader opens — for a video most of them will not watch ([ADR 0010][adr]). So the
 * page shows the still image YouTube already publishes, and the player is created **only** when the
 * reader presses play. The same still image is what the content model uses as an entry's cover, so
 * nothing extra is downloaded for it.
 *
 * Details that are deliberate rather than incidental:
 *
 * - `youtube-nocookie.com` is the domain that does not set advertising cookies on load.
 * - The video id comes from `youTubeVideoId`, which only accepts YouTube's own id alphabet, so the URL
 *   built here cannot be talked into pointing somewhere else.
 * - The control is a real `<button>`, so it is reachable by keyboard and announced as a control; the
 *   poster image is decorative and carries no alt text, because the button is what has the name.
 * - Focus moves to the player once it exists. Otherwise a keyboard reader would activate a control and
 *   land back at the top of the document.
 * - The interface text is English, like the rest of the application chrome (`Contents`, `Copy`). The
 *   content it sits in may be Spanish or English; a language switcher is a separate concern.
 *
 * [adr]: ../../docs/architecture/0010-media-and-embeds.md
 */
export function VideoEmbed({ href, label }: VideoEmbedProps) {
  const videoId = youTubeVideoId(href)
  const [playing, setPlaying] = useState(false)
  const frame = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    if (playing) frame.current?.focus()
  }, [playing])

  // The paragraph decides whether this is a video; if it is not, there is nothing to show.
  if (videoId === undefined) return null

  const name = accessibleName(label)

  if (playing) {
    return (
      <div className="markdown-video">
        <iframe
          ref={frame}
          className="markdown-video-frame"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={name}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      </div>
    )
  }

  return (
    <div className="markdown-video">
      <button
        type="button"
        className="markdown-video-play"
        onClick={() => setPlaying(true)}
        aria-label={`Play video: ${name}`}
      >
        <img
          className="markdown-video-poster"
          src={youTubeThumbnail(videoId)}
          alt=""
          loading="lazy"
          decoding="async"
        />
        <span className="markdown-video-glyph" aria-hidden="true">
          {/* The service's own mark, in its own colours: a reader recognises it before reading a word. */}
          <svg viewBox="0 0 68 48" width="68" height="48" focusable="false">
            <path
              d="M66.52 7.74a8.4 8.4 0 0 0-5.9-5.9C55.5.4 34 .4 34 .4s-21.5 0-26.6 1.44a8.4 8.4 0 0 0-5.9 5.9C0 12.9 0 24 0 24s0 11.1 1.5 16.26a8.4 8.4 0 0 0 5.9 5.9C12.5 47.6 34 47.6 34 47.6s21.5 0 26.6-1.44a8.4 8.4 0 0 0 5.9-5.9C68 35.1 68 24 68 24s0-11.1-1.48-16.26z"
              fill="#f00"
            />
            <path d="M27 34.5 45 24 27 13.5z" fill="#fff" />
          </svg>
        </span>
      </button>
    </div>
  )
}

/**
 * What the control is called.
 *
 * A link whose text is the URL is how a bare address arrives, and reading an address aloud is not a
 * name; those get a plain description instead.
 */
function accessibleName(label: string | undefined): string {
  const text = label?.trim() ?? ''

  if (text === '' || /^https?:\/\//i.test(text)) return 'YouTube video'

  return text
}
