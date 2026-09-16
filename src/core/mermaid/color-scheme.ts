/**
 * Which colour scheme the reader is in, as a plain subscription.
 *
 * Kept free of React so it can be tested without a component, and consumed with
 * `useSyncExternalStore` in `MermaidDiagram`. Mermaid cannot inherit our CSS variables — it paints
 * its own SVG with its own theme — so the scheme has to be read here and handed to it.
 */

export type ColorScheme = 'light' | 'dark'

const DARK_QUERY = '(prefers-color-scheme: dark)'

function query(): MediaQueryList | null {
  if (
    typeof window === 'undefined' ||
    typeof window.matchMedia !== 'function'
  ) {
    return null
  }

  return window.matchMedia(DARK_QUERY)
}

/**
 * The current scheme. Falls back to `light` where the query is unsupported, which is also the
 * server-render value: a diagram drawn light and repainted dark is better than one drawn wrong.
 */
export function currentColorScheme(): ColorScheme {
  return query()?.matches === true ? 'dark' : 'light'
}

/**
 * Subscribes to scheme changes.
 *
 * `addEventListener` is guarded because older WebViews — the ones this project promises to support —
 * only have the deprecated `addListener`. Both are removed on unsubscribe, and neither is assumed to
 * exist: an engine with neither simply never repaints, rather than throwing.
 */
export function subscribeToColorScheme(onChange: () => void): () => void {
  const list = query()

  if (list === null) {
    return () => undefined
  }

  if (typeof list.addEventListener === 'function') {
    list.addEventListener('change', onChange)
    return () => list.removeEventListener('change', onChange)
  }

  const legacy = list as MediaQueryList & {
    addListener?: (listener: () => void) => void
    removeListener?: (listener: () => void) => void
  }

  legacy.addListener?.(onChange)

  return () => legacy.removeListener?.(onChange)
}
