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
 * Failure handling (a missing file must not break the article) belongs to Phase 8; this component
 * already leaves the `alt` text in place, which is what that phase asserts.
 */
export function ResponsiveImage({ node: _node, alt, ...props }: ImageProps) {
  return <img alt={alt ?? ''} loading="lazy" decoding="async" {...props} />
}
