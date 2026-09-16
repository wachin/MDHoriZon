import { afterEach, describe, expect, it, vi } from 'vitest'
import { systemPrefersDark, subscribeToSystemScheme } from './system-scheme'

/**
 * The system preference reader. It is only half of the theme decision — the reader's own choice wins
 * over it — but it is the half that depends on the engine, including the deprecated subscription API
 * that older WebViews only have.
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
  it('reports no dark preference when the engine has no media query support', () => {
    vi.stubGlobal('matchMedia', undefined)

    expect(systemPrefersDark()).toBe(false)
    expect(() => subscribeToSystemScheme(() => undefined)()).not.toThrow()
  })

  it('reports dark when the operating system asks for it', () => {
    stubMatchMedia(true)

    expect(systemPrefersDark()).toBe(true)
  })

  it('subscribes and unsubscribes through addEventListener', () => {
    const { listeners, removed } = stubMatchMedia(false)
    const onChange = () => undefined

    const unsubscribe = subscribeToSystemScheme(onChange)

    expect(listeners).toEqual([onChange])
    unsubscribe()
    expect(removed).toEqual([onChange])
  })

  it('falls back to the deprecated listener API older WebViews only have', () => {
    const { listeners, removed } = stubMatchMedia(false, { legacy: true })
    const onChange = () => undefined

    const unsubscribe = subscribeToSystemScheme(onChange)

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

    expect(() => subscribeToSystemScheme(() => undefined)()).not.toThrow()
  })
})
