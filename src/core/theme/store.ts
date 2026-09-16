/**
 * The theme store: one place that knows the reader's choice, writes the resolved theme onto the
 * document, and tells React when anything changed.
 *
 * `main.tsx` calls `initialiseTheme()` before rendering, so the first paint is already correct —
 * resolving it inside a component would show the wrong theme for a frame.
 *
 * Consumers read it with `useSyncExternalStore(subscribeToTheme, currentTheme)`, which is why the
 * getters return plain strings rather than objects: a new object on every call would re-render
 * forever.
 */
import {
  readThemePreference,
  resolveTheme,
  storeThemePreference,
} from './preference'
import type { ResolvedTheme, ThemePreference } from './preference'
import { subscribeToSystemScheme, systemPrefersDark } from './system-scheme'

const listeners = new Set<() => void>()

let preference: ThemePreference = 'system'
let unsubscribeFromSystem: (() => void) | null = null

function notify(): void {
  for (const listener of listeners) listener()
}

/** Writes the resolved theme onto `<html>`, which is what the stylesheet keys off. */
function apply(): void {
  if (typeof document === 'undefined') return

  document.documentElement.dataset.theme = currentTheme()
}

/**
 * Watches the system preference only while it matters.
 *
 * A reader who chose light or dark must not be repainted when their phone changes at sunset, and an
 * idle listener is a leak; so the subscription follows the preference.
 */
function syncSystemSubscription(): void {
  const wanted = preference === 'system'

  if (wanted && unsubscribeFromSystem === null) {
    unsubscribeFromSystem = subscribeToSystemScheme(() => {
      apply()
      notify()
    })
  } else if (!wanted && unsubscribeFromSystem !== null) {
    unsubscribeFromSystem()
    unsubscribeFromSystem = null
  }
}

/** The theme actually on screen. */
export function currentTheme(): ResolvedTheme {
  return resolveTheme(preference, systemPrefersDark())
}

/** What the reader chose, which is what a theme control has to display. */
export function currentThemePreference(): ThemePreference {
  return preference
}

export function setThemePreference(next: ThemePreference): void {
  preference = next
  storeThemePreference(next)
  syncSystemSubscription()
  apply()
  notify()
}

export function subscribeToTheme(listener: () => void): () => void {
  listeners.add(listener)

  return () => {
    listeners.delete(listener)
  }
}

/**
 * Reads the stored preference and applies it. Idempotent, so tests and a remount can call it again.
 */
export function initialiseTheme(): void {
  preference = readThemePreference()
  syncSystemSubscription()
  apply()
}

/** Test seam: returns the store to its startup state so cases cannot leak into each other. */
export function resetThemeStore(): void {
  preference = 'system'
  unsubscribeFromSystem?.()
  unsubscribeFromSystem = null
  listeners.clear()
}
