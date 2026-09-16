import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import {
  currentColorScheme,
  subscribeToColorScheme,
} from '../core/mermaid/color-scheme'
import { renderMermaid } from '../core/mermaid/loader'
import { sanitizeMermaidSvg } from '../core/mermaid/sanitize-svg'

type DiagramState = 'loading' | 'ready' | 'error'

export type MermaidDiagramProps = {
  /** The diagram source, exactly as the fence contained it. */
  code: string
}

/**
 * Renders a `mermaid` fence as a diagram.
 *
 * Four things make this more than a wrapper around a library:
 *
 * 1. **The SVG is never inserted as a string.** Mermaid's output goes through
 *    `sanitizeMermaidSvg` and the resulting *nodes* are inserted, so this component never needs
 *    `dangerouslySetInnerHTML` — which the architecture rules forbid outright
 *    ([ADR 0003](../../docs/architecture/0003-sanitization-policy.md)), and which is the whole
 *    reason the boundary in [ADR 0006](../../docs/architecture/0006-mermaid-svg-boundary.md) exists.
 * 2. **The source stays visible until the diagram is ready**, and stays visible *instead* if it
 *    fails. A reader who is offline, on an old engine, or reading a broken diagram still gets the
 *    information rather than an empty box.
 * 3. **Failures are contained.** A malformed diagram shows a message and a readable fallback; the
 *    rest of the article is untouched. The golden document contains two deliberately invalid
 *    diagrams to pin this.
 * 4. **The theme follows the reader.** Mermaid paints its own colours, so the diagram is re-rendered
 *    when the colour scheme changes.
 */
export function MermaidDiagram({ code }: MermaidDiagramProps) {
  const scheme = useSyncExternalStore(
    subscribeToColorScheme,
    currentColorScheme,
    () => 'light' as const,
  )
  const [outcome, setOutcome] = useState<{
    key: string
    status: Exclude<DiagramState, 'loading'>
  } | null>(null)
  const canvas = useRef<HTMLDivElement>(null)

  /**
   * The identity of the diagram being drawn: its source plus the theme it is drawn for.
   *
   * The loading state is *derived* from this rather than assigned. Setting it inside the effect would
   * mean writing state during a render pass (`react-hooks/set-state-in-effect`), and would also let a
   * stale diagram stay on screen for a frame after a theme change. Here, a different key simply has no
   * outcome yet — which is what loading means.
   */
  const key = `${scheme}\u0000${code}`
  const state: DiagramState =
    outcome?.key === key ? outcome.status : 'loading'

  useEffect(() => {
    let cancelled = false

    renderMermaid(code, scheme)
      .then(async (svg) => {
        if (cancelled) return
        const element = await sanitizeMermaidSvg(svg)
        if (cancelled) return
        // `replaceChildren` takes nodes, not markup: the sanitised tree is already in this document.
        canvas.current?.replaceChildren(element)
        setOutcome({ key, status: 'ready' })
      })
      .catch(() => {
        // The message Mermaid throws is aimed at the diagram author; it is not shown here because
        // the reader cannot act on it, but the source below is.
        if (!cancelled) setOutcome({ key, status: 'error' })
      })

    return () => {
      cancelled = true
    }
  }, [code, scheme, key])

  return (
    <figure className="markdown-diagram" data-diagram-state={state}>
      {/* React owns this element's props, not its children: the sanitised SVG is inserted by hand. */}
      <div
        className="markdown-diagram-canvas"
        ref={canvas}
        aria-busy={state === 'loading'}
      />

      {state === 'ready' ? null : (
        <pre className="markdown-diagram-source" data-language="mermaid">
          {code}
        </pre>
      )}

      {state === 'error' ? (
        <p className="markdown-diagram-error" role="status">
          This diagram could not be rendered, so its source is shown instead.
        </p>
      ) : null}
    </figure>
  )
}
