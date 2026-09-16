import type { ComponentPropsWithoutRef } from 'react'
import type { ExtraProps } from 'react-markdown'

type AnchorProps = ComponentPropsWithoutRef<'a'> & ExtraProps

const EXTERNAL = /^https?:/i

/**
 * Links.
 *
 * External links open in a new tab and carry `rel="noopener noreferrer"`, so the destination cannot
 * take control of the reader's tab. In-page anchors and relative links are left exactly as the
 * document wrote them: resolving the latter against the document is content-loading work
 * (Phases 8 and 10), not a rendering concern.
 */
export function Link({ node: _node, href, children, ...props }: AnchorProps) {
  const external = typeof href === 'string' && EXTERNAL.test(href)

  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...props}
    >
      {children}
    </a>
  )
}
