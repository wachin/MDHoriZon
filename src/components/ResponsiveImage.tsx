import { useState } from 'react'
import type { ComponentPropsWithoutRef } from 'react'
import type { ExtraProps } from 'react-markdown'

type ImageProps = ComponentPropsWithoutRef<'img'> & ExtraProps

/**
 * Images.
 *
 * `alt` is always present, even when the document omits it: an empty `alt` is what tells assistive
 * technology that the image is decorative, and it is also the visible fallback when a source cannot
 * be resolved. Lazy loading and async decoding keep long documents cheap.
 *
 * A source that fails to load marks the image as missing, which the stylesheet turns into a legible
 * placeholder around the alt text. Without that, a broken relative path shows the engine's broken
 * image glyph and nothing else — and a wrong path after content has moved is exactly the failure
 * Phase 8 has to make visible rather than silent.
 *
 * Sizing is left to CSS (`max-width: 100%; height: auto`), which is what keeps the aspect ratio and
 * stops a small image being stretched, a wide one widening the column, and a tall one distorting.
 */
export function ResponsiveImage({ node: _node, alt, ...props }: ImageProps) {
  const [missing, setMissing] = useState(false)

  return (
    <img
      {...props}
      alt={alt ?? ''}
      loading="lazy"
      decoding="async"
      data-image-state={missing ? 'missing' : undefined}
      onError={() => setMissing(true)}
    />
  )
}
