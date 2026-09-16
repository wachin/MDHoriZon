import { describe, expect, it, vi } from 'vitest'
import {
  THEME_STORAGE_KEY,
  isThemePreference,
  readThemePreference,
  resolveTheme,
  storeThemePreference,
} from './preference'

/**
 * The pure half of theming: what the reader sees, and whether their choice survives a reload.
 * Storage is stubbed rather than faked with a real `localStorage` so the failure modes — no store,
 * blocked store, junk in the store — are the ones under test.
 */

describe('resolving the theme', () => {
  it('follows the system while the reader has not chosen', () => {
    expect(resolveTheme('system', true)).toBe('dark')
    expect(resolveTheme('system', false)).toBe('light')
  })

  it('lets an explicit choice win over the system', () => {
    // The whole reason the control exists: a dark phone must not force a dark article.
    expect(resolveTheme('light', true)).toBe('light')
    expect(resolveTheme('dark', false)).toBe('dark')
  })
})

describe('recognising a stored preference', () => {
  it('accepts only the three preferences', () => {
    expect(isThemePreference('system')).toBe(true)
    expect(isThemePreference('light')).toBe(true)
    expect(isThemePreference('dark')).toBe(true)
    expect(isThemePreference('sepia')).toBe(false)
    expect(isThemePreference(undefined)).toBe(false)
    expect(isThemePreference(null)).toBe(false)
    expect(isThemePreference(7)).toBe(false)
  })
})

describe('reading the preference back', () => {
  it('returns a stored preference', () => {
    const storage = { getItem: vi.fn(() => 'dark') }

    expect(readThemePreference(storage)).toBe('dark')
    expect(storage.getItem).toHaveBeenCalledWith(THEME_STORAGE_KEY)
  })

  it('falls back to the system when nothing is stored', () => {
    expect(readThemePreference({ getItem: () => null })).toBe('system')
  })

  it('falls back to the system when the store holds junk', () => {
    // A value written by another version of the app, or by hand: it must not reach the stylesheet.
    expect(readThemePreference({ getItem: () => 'blue' })).toBe('system')
  })

  it('falls back to the system when the store throws', () => {
    // Private modes and blocked storage throw on access, which must not break the article.
    expect(
      readThemePreference({
        getItem: () => {
          throw new Error('blocked')
        },
      }),
    ).toBe('system')
    expect(readThemePreference(null)).toBe('system')
  })
})

describe('remembering the preference', () => {
  it('writes the preference under the versioned key', () => {
    const storage = { setItem: vi.fn() }

    storeThemePreference('dark', storage)

    expect(storage.setItem).toHaveBeenCalledWith(THEME_STORAGE_KEY, 'dark')
  })

  it('survives a store that refuses to write', () => {
    expect(() =>
      storeThemePreference('dark', {
        setItem: () => {
          throw new Error('quota')
        },
      }),
    ).not.toThrow()
    expect(() => storeThemePreference('dark', null)).not.toThrow()
  })
})
