import { useCallback, useEffect, useRef, useState } from 'react'
import type { ComponentPropsWithoutRef } from 'react'
import type { ExtraProps } from 'react-markdown'

type PreProps = ComponentPropsWithoutRef<'pre'> & ExtraProps
type MarkdownNode = NonNullable<ExtraProps['node']>
type CopyState = 'idle' | 'copied' | 'failed'

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

/** The raw text of every descendant, which is what gets copied. */
function textOf(node: MarkdownNode | undefined): string {
  if (node === undefined) return ''

  return node.children
    .map((child) => {
      if (child.type === 'text') return child.value
      if (child.type === 'element') return textOf(child)
      return ''
    })
    .join('')
}

/**
 * Asks the clipboard to take the text.
 *
 * `navigator.clipboard` is missing in some WebViews and rejects outside a secure context, so the
 * caller has to be able to tell the user something useful rather than fail silently. The fallback is
 * to select the code, which leaves the text one keystroke away instead of lost.
 */
async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText === undefined) return false
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}

function selectElementText(element: HTMLElement | null): void {
  if (element === null) return

  const selection = window.getSelection()
  if (selection === null) return

  const range = document.createRange()
  range.selectNodeContents(element)
  selection.removeAllRanges()
  selection.addRange(range)
}

/**
 * A fenced code block: language label, highlighted content and a copy button.
 *
 * Highlighting is a pipeline concern (`src/core/markdown/plugins.ts`); this component only presents
 * what the pipeline produced. The button is a real `<button>`, so it is reachable from the keyboard
 * and announced as a button, and its feedback is exposed through a live region rather than only
 * changing colour.
 */
export function CodeBlock({ node, children, ...props }: PreProps) {
  const language = findLanguage(node)
  const [state, setState] = useState<CopyState>('idle')
  const preRef = useRef<HTMLPreElement>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(
    () => () => {
      if (timer.current !== null) clearTimeout(timer.current)
    },
    [],
  )

  const onCopy = useCallback(async () => {
    const copied = await copyToClipboard(textOf(node))

    if (!copied) selectElementText(preRef.current)
    setState(copied ? 'copied' : 'failed')

    if (timer.current !== null) clearTimeout(timer.current)
    timer.current = setTimeout(() => setState('idle'), 2000)
  }, [node])

  return (
    <div className="markdown-code">
      <div className="markdown-code-toolbar">
        <span className="markdown-code-language">{language ?? 'text'}</span>
        <button
          type="button"
          className="markdown-code-copy"
          onClick={onCopy}
          aria-label={
            language === undefined ? 'Copy code' : `Copy ${language} code`
          }
        >
          {state === 'copied'
            ? 'Copied'
            : state === 'failed'
              ? 'Copy manually'
              : 'Copy'}
        </button>
      </div>

      <pre {...props} ref={preRef} data-language={language}>
        {children}
      </pre>

      <span className="markdown-code-status" role="status" aria-live="polite">
        {state === 'copied'
          ? 'Code copied to the clipboard'
          : state === 'failed'
            ? 'The clipboard is unavailable: the code is selected, copy it with the keyboard'
            : ''}
      </span>
    </div>
  )
}
