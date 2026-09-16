/**
 * The reader's theme preference: what they chose, and where it is remembered.
 *
 * Pure decisions live here so they can be tested without a DOM: `resolveTheme` answers "given the
 * reader's choice and what the system says, what is actually on screen", and the storage helpers
 * never throw — a WebView with a disabled or full `localStorage` must not break the article.
 */

export type ThemePreference = 'system' | 'light' | 'dark'
export type ResolvedTheme = 'light' | 'dark'

export const THEME_STORAGE_KEY = 'mdhorizon:theme'

const PREFERENCES: readonly string[] = ['system', 'light', 'dark']

export function isThemePreference(value: unknown): value is ThemePreference {
  return typeof value === 'string' && PREFERENCES.includes(value)
}

/**
 * What the reader sees.
 *
 * `system` defers to the operating system; an explicit choice always wins over it, which is the whole
 * point of offering the choice.
 */
export function resolveTheme(
  preference: ThemePreference,
  prefersDark: boolean,
): ResolvedTheme {
  if (preference === 'system') return prefersDark ? 'dark' : 'light'

  return preference
}

/** The stored preference, or `system` when there is none or the store is unusable. */
export function readThemePreference(
  storage: Pick<Storage, 'getItem'> | null = safeStorage(),
): ThemePreference {
  try {
    const stored = storage?.getItem(THEME_STORAGE_KEY)

    return isThemePreference(stored) ? stored : 'system'
  } catch {
    // A blocked or full store is not an error the reader can act on: fall back to the system.
    return 'system'
  }
}

/** Remembers the preference. Failing to write is survivable and must not throw. */
export function storeThemePreference(
  preference: ThemePreference,
  storage: Pick<Storage, 'setItem'> | null = safeStorage(),
): void {
  try {
    storage?.setItem(THEME_STORAGE_KEY, preference)
  } catch {
    // Storage may be unavailable in private modes; the choice still applies to this page.
  }
}

function safeStorage(): Storage | null {
  try {
    return typeof localStorage === 'undefined' ? null : localStorage
  } catch {
    // Reading `localStorage` itself throws when storage is blocked by policy.
    return null
  }
}
