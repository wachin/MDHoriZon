import { afterEach, describe, expect, it, vi } from 'vitest'
import { THEME_STORAGE_KEY } from './preference'
import {
  currentTheme,
  currentThemePreference,
  initialiseTheme,
  resetThemeStore,
  setThemePreference,
  subscribeToTheme,
} from './store'

/**
 * The theme store, which is what actually puts a theme on screen.
 *
 * It writes `data-theme` onto `<html>` — the attribute the stylesheet keys off — remembers the
 * reader's choice, and listens to the operating system **only while it matters**.
 */

type Listener = (event: { matches: boolean }) => void

/** A stubbed `matchMedia` that can be flipped, with the listeners it is holding. */
function stubSystem(dark: boolean): {
  listeners: Listener[]
  removed: Listener[]
  set: (dark: boolean) => void
} {
  const listeners: Listener[] = []
  const removed: Listener[] = []
  const state = { dark }

  vi.stubGlobal(
    'matchMedia',
    vi.fn(() => ({
      get matches() {
        return state.dark
      },
      media: '(prefers-color-scheme: dark)',
      addEventListener: (_type: string, listener: Listener) =>
        listeners.push(listener),
      removeEventListener: (_type: string, listener: Listener) => {
        removed.push(listener)
        const index = listeners.indexOf(listener)

        if (index >= 0) listeners.splice(index, 1)
      },
    })),
  )

  return {
    listeners,
    removed,
    set: (next) => {
      state.dark = next
      for (const listener of listeners) listener({ matches: next })
    },
  }
}

afterEach(() => {
  resetThemeStore()
  vi.unstubAllGlobals()
  localStorage.clear()
})

describe('the theme store', () => {
  it('puts the resolved theme on the document element', () => {
    stubSystem(true)
    initialiseTheme()

    expect(document.documentElement.dataset.theme).toBe('dark')
  })

  it('resolves a first visit from the system alone', () => {
    stubSystem(false)
    initialiseTheme()

    expect(currentTheme()).toBe('light')
    expect(currentThemePreference()).toBe('system')
  })

  it('applies and remembers an explicit choice', () => {
    stubSystem(true)
    initialiseTheme()
    setThemePreference('light')

    expect(currentTheme()).toBe('light')
    expect(document.documentElement.dataset.theme).toBe('light')
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('light')
  })

  it('reads a remembered choice on the next visit', () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'dark')
    stubSystem(false)

    initialiseTheme()

    expect(currentTheme()).toBe('dark')
    expect(document.documentElement.dataset.theme).toBe('dark')
  })

  it('repaints when the system changes while following it', () => {
    const system = stubSystem(false)
    initialiseTheme()

    expect(currentTheme()).toBe('light')

    system.set(true)

    expect(currentTheme()).toBe('dark')
    expect(document.documentElement.dataset.theme).toBe('dark')
  })

  it('stops following the system once the reader has chosen', () => {
    // A reader who chose light must not be repainted when their phone switches at sunset.
    const system = stubSystem(true)
    initialiseTheme()
    setThemePreference('dark')

    expect(system.removed.length).toBeGreaterThan(0)
    expect(system.listeners.length).toBe(0)

    system.set(false)

    expect(currentTheme()).toBe('dark')
    expect(document.documentElement.dataset.theme).toBe('dark')
  })

  it('tells subscribers when anything changes', () => {
    stubSystem(false)
    initialiseTheme()
    const listener = vi.fn()
    const unsubscribe = subscribeToTheme(listener)

    setThemePreference('dark')

    expect(listener).toHaveBeenCalledTimes(1)

    unsubscribe()
    setThemePreference('light')

    expect(listener).toHaveBeenCalledTimes(1)
  })

  it('returns the same value for the same state, which is what React needs', () => {
    // `useSyncExternalStore` compares snapshots by identity: a getter that built a new object each
    // call would re-render forever.
    stubSystem(true)
    initialiseTheme()

    expect(currentTheme()).toBe(currentTheme())
    expect(currentThemePreference()).toBe(currentThemePreference())
  })
})
