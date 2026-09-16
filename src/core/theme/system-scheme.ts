/**
 * Reading the system's colour-scheme preference.
 *
 * Kept separate from the reader's own choice (`preference.ts`): the system only decides until the
 * reader decides, and both are needed to work out what is actually on screen.
 */

/** Whether the operating system currently asks for a dark interface. */
export function systemPrefersDark(): boolean {
  const list = query()

  return list?.matches === true
}

function query(): MediaQueryList | null {
  if (
    typeof window === 'undefined' ||
    typeof window.matchMedia !== 'function'
  ) {
    return null
  }

  return window.matchMedia('(prefers-color-scheme: dark)')
}

/**
 * Subscribes to the system preference changing.
 *
 * `addEventListener` is guarded because older WebViews — the ones this project promises to support —
 * only have the deprecated `addListener`. Neither is assumed to exist: an engine with neither simply
 * never repaints, rather than throwing.
 */
export function subscribeToSystemScheme(onChange: () => void): () => void {
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
