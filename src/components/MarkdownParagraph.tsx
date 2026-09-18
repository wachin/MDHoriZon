import type { ComponentPropsWithoutRef } from 'react'
import type { ExtraProps } from 'react-markdown'
import { youTubeVideoId } from '../core/content/media'
import { VideoEmbed } from './VideoEmbed'

type ParagraphProps = ComponentPropsWithoutRef<'p'> & ExtraProps
type MarkdownNode = NonNullable<ExtraProps['node']>

/**
 * A paragraph — or a video.
 *
 * The rule ([ADR 0010](../../docs/architecture/0010-media-and-embeds.md)) is about the *paragraph*, not the
 * URL: a paragraph that is nothing but one video link becomes a player, and a video link inside a sentence
 * stays a link, because replacing it there would break the prose around it. The real content does both:
 * three entries link to a video on its own line, and others mention one mid-sentence.
 *
 * Nothing is added to the pipeline for this. `node` is the sanitized tree the renderer already hands every
 * component, so the decision is made from what the document actually contains after sanitization — the same
 * approach `CodeBlock` uses to read a fence's language.
 */
export function MarkdownParagraph({
  node,
  children,
  ...props
}: ParagraphProps) {
  const video = videoIn(node)

  if (video !== undefined) {
    return <VideoEmbed href={video.href} label={video.label} />
  }

  return <p {...props}>{children}</p>
}

/**
 * The video in a paragraph that holds nothing else, if there is one.
 *
 * "Nothing else" is meant strictly: the link must be the paragraph's own content, not wrapped in emphasis,
 * and the only other children may be whitespace. A paragraph with two links is a paragraph.
 */
function videoIn(
  node: MarkdownNode | undefined,
): { href: string; label: string } | undefined {
  const children = node?.children ?? []
  const elements = children.filter((child) => child.type === 'element')
  const words = children
    .filter((child) => child.type === 'text')
    .map((child) => child.value)
    .join('')
    .trim()

  if (elements.length !== 1 || words !== '') return undefined

  const [only] = elements

  if (only.type !== 'element' || only.tagName !== 'a') return undefined

  const href = only.properties?.href

  if (typeof href !== 'string' || youTubeVideoId(href) === undefined) {
    return undefined
  }

  return { href, label: textOf(only) }
}

function textOf(node: MarkdownNode): string {
  return node.children
    .map((child) => {
      if (child.type === 'text') return child.value
      if (child.type === 'element') return textOf(child)
      return ''
    })
    .join('')
}
