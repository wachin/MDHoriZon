import type { ComponentPropsWithoutRef } from 'react'
import type { ExtraProps } from 'react-markdown'

type PreProps = ComponentPropsWithoutRef<'pre'> & ExtraProps
type MarkdownNode = NonNullable<ExtraProps['node']>

/** Reads the fence language from the `code` child that remark produced. */
function findLanguage(node: MarkdownNode | undefined): string | undefined {
  const code = node?.children.find(
    (child): child is MarkdownNode =>
      child.type === 'element' && child.tagName === 'code',
  )
  if (code === undefined) return undefined

  const className = code.properties?.className
  const classes = Array.isArray(className)
    ? className
    : typeof className === 'string'
      ? [className]
      : []

  const language = classes.find(
    (value): value is string =>
      typeof value === 'string' && value.startsWith('language-'),
  )

  return language?.slice('language-'.length)
}

/**
 * Fenced code blocks.
 *
 * Phase 1 renders the block and exposes its language to CSS. Syntax highlighting, the language
 * label, the copy button and its keyboard accessibility are Phase 4 work, which is why this
 * component exists already: that is where they will land.
 */
export function CodeBlock({ node, children, ...props }: PreProps) {
  const language = findLanguage(node)

  return (
    <pre {...props} data-language={language}>
      {children}
    </pre>
  )
}
