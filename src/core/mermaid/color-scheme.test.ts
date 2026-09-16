import { afterEach, describe, expect, it, vi } from 'vitest'
import { currentColorScheme, subscribeToColorScheme } from './color-scheme'

/**
 * The scheme reader. Mermaid cannot inherit our CSS variables, so this value decides which theme the
 * diagram is painted with — and older WebViews only have the deprecated subscription API, which is
 * the case worth pinning.
 */

type Listener = (event: { matches: boolean }) => void

function stubMatchMedia(
  matches: boolean,
  list?: { legacy?: boolean },
): { listeners: Listener[]; removed: Listener[] } {
  const listeners: Listener[] = []
  const removed: Listener[] = []

  const mediaQueryList = {
    matches,
    media: '(prefers-color-scheme: dark)',
    ...(list?.legacy === true
      ? {
          addListener: (listener: Listener) => listeners.push(listener),
          removeListener: (listener: Listener) => removed.push(listener),
        }
      : {
          addEventListener: (_type: string, listener: Listener) =>
            listeners.push(listener),
          removeEventListener: (_type: string, listener: Listener) =>
            removed.push(listener),
        }),
  }

  vi.stubGlobal(
    'matchMedia',
    vi.fn(() => mediaQueryList),
  )

  return { listeners, removed }
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('the colour scheme reader', () => {
  it('reports light when the engine has no media query support', () => {
    vi.stubGlobal('matchMedia', undefined)

    expect(currentColorScheme()).toBe('light')
    expect(() => subscribeToColorScheme(() => undefined)()).not.toThrow()
  })

  it('reports dark when the reader prefers dark', () => {
    stubMatchMedia(true)

    expect(currentColorScheme()).toBe('dark')
  })

  it('subscribes and unsubscribes through addEventListener', () => {
    const { listeners, removed } = stubMatchMedia(false)
    const onChange = () => undefined

    const unsubscribe = subscribeToColorScheme(onChange)

    expect(listeners).toEqual([onChange])
    unsubscribe()
    expect(removed).toEqual([onChange])
  })

  it('falls back to the deprecated listener API older WebViews only have', () => {
    const { listeners, removed } = stubMatchMedia(false, { legacy: true })
    const onChange = () => undefined

    const unsubscribe = subscribeToColorScheme(onChange)

    expect(listeners).toEqual([onChange])
    unsubscribe()
    expect(removed).toEqual([onChange])
  })

  it('does nothing rather than throwing when the media query list supports neither API', () => {
    // A future or stripped-down engine: subscribing must not break the diagram.
    vi.stubGlobal(
      'matchMedia',
      vi.fn(() => ({ matches: false, media: '' })),
    )

    expect(() => subscribeToColorScheme(() => undefined)()).not.toThrow()
  })
})
