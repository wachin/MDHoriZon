import Markdown from 'react-markdown'
import type { Components } from 'react-markdown'
import {
  rehypePlugins,
  remarkPlugins,
  urlTransform,
} from '../core/markdown/plugins'
import { CodeBlock } from './CodeBlock'
import { headings } from './Heading'
import { Link } from './Link'
import { ResponsiveImage } from './ResponsiveImage'
import { TableWrapper } from './TableWrapper'
import '../styles/markdown.css'

/**
 * Component overrides. The pipeline itself lives in `src/core/markdown`, so this map only decides
 * *how* things look, never *what* is allowed through.
 */
const components: Components = {
  ...headings,
  a: Link,
  img: ResponsiveImage,
  pre: CodeBlock,
  table: TableWrapper,
}

export type MarkdownRendererProps = {
  /** Markdown source. */
  children: string
  /** Extra class names for the wrapper element. */
  className?: string
}

/**
 * The reusable Markdown renderer: the one place where every target (web, Android WebView, iOS
 * WebView) turns Markdown into a document.
 *
 * `skipHtml` is layer 1 of the sanitization policy
 * ([ADR 0003](../../docs/architecture/0003-sanitization-policy.md)): raw HTML is removed from the
 * tree instead of being parsed into elements, so the document cannot create nodes at all. Allowing a
 * narrow subset later would be a new decision record, not a quiet change here.
 */
export function MarkdownRenderer({
  children,
  className,
}: MarkdownRendererProps) {
  return (
    <div
      className={
        className === undefined ? 'markdown-body' : `markdown-body ${className}`
      }
    >
      <Markdown
        remarkPlugins={remarkPlugins}
        rehypePlugins={rehypePlugins}
        urlTransform={urlTransform}
        skipHtml
        components={components}
      >
        {children}
      </Markdown>
    </div>
  )
}
