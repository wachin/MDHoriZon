import { useMemo } from 'react'
import Markdown from 'react-markdown'
import type { Components } from 'react-markdown'
import {
  createUrlTransform,
  rehypePlugins,
  remarkPlugins,
} from '../core/markdown/plugins'
import { CodeBlock } from './CodeBlock'
import { headings } from './Heading'
import { Link } from './Link'
import { ResponsiveImage } from './ResponsiveImage'
import { TableHeaderCell, TableWrapper } from './TableWrapper'
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
  th: TableHeaderCell,
}

export type MarkdownRendererProps = {
  /** Markdown source. */
  children: string
  /** Extra class names for the wrapper element. */
  className?: string
  /**
   * Where this document lives, so its own relative assets resolve against it rather than against the
   * page. The content loader supplies it (Phase 10); without it, relative paths are left as written.
   */
  documentUrl?: string
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
  documentUrl,
}: MarkdownRendererProps) {
  // Kept stable across renders so react-markdown's own memoisation is not defeated by a new closure.
  const urlTransform = useMemo(
    () => createUrlTransform(documentUrl),
    [documentUrl],
  )

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
