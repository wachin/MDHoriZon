import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { THEME_STORAGE_KEY } from '../core/theme/preference'
import {
  initialiseTheme,
  resetThemeStore,
  setThemePreference,
} from '../core/theme/store'
import { ThemeSwitcher } from './ThemeSwitcher'

/**
 * The theme control. What matters is not that three pills appear but that the choice reaches the
 * document — the attribute the stylesheet keys off — and survives a reload.
 */

/** A system that always says light, so a failure cannot be blamed on the environment. */
function stubLightSystem(): void {
  vi.stubGlobal(
    'matchMedia',
    vi.fn(() => ({
      matches: false,
      media: '(prefers-color-scheme: dark)',
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
    })),
  )
}

afterEach(() => {
  resetThemeStore()
  vi.unstubAllGlobals()
  localStorage.clear()
  delete document.documentElement.dataset.theme
})

describe('the theme switcher', () => {
  it('offers system, light and dark as one labelled group', () => {
    stubLightSystem()
    initialiseTheme()
    render(<ThemeSwitcher />)

    // A radio group is what this is, so that is what assistive technology must be told.
    expect(screen.getByRole('group', { name: /colour theme/i })).toBeDefined()
    expect(screen.getAllByRole('radio')).toHaveLength(3)
    for (const name of ['System', 'Light', 'Dark']) {
      expect(screen.getByRole('radio', { name })).toBeDefined()
    }
  })

  it('shows the preference that is in force', () => {
    stubLightSystem()
    localStorage.setItem(THEME_STORAGE_KEY, 'dark')
    initialiseTheme()
    render(<ThemeSwitcher />)

    expect(
      (screen.getByRole('radio', { name: 'Dark' }) as HTMLInputElement).checked,
    ).toBe(true)
    expect(
      (screen.getByRole('radio', { name: 'Light' }) as HTMLInputElement)
        .checked,
    ).toBe(false)
  })

  it('applies and remembers the chosen theme', () => {
    stubLightSystem()
    initialiseTheme()
    render(<ThemeSwitcher />)

    fireEvent.click(screen.getByRole('radio', { name: 'Dark' }))

    expect(document.documentElement.dataset.theme).toBe('dark')
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark')
  })

  it('keeps the control in step with the theme when it changes from outside', () => {
    // The store is a module singleton, so another part of the app can change the theme too; the
    // control must follow rather than show a stale choice.
    stubLightSystem()
    initialiseTheme()
    render(<ThemeSwitcher />)

    // A state change from outside React has to be flushed before it can be asserted.
    act(() => setThemePreference('dark'))

    expect(
      (screen.getByRole('radio', { name: 'Dark' }) as HTMLInputElement).checked,
    ).toBe(true)
  })

  it('lets the reader go back to following the system', () => {
    stubLightSystem()
    localStorage.setItem(THEME_STORAGE_KEY, 'dark')
    initialiseTheme()
    render(<ThemeSwitcher />)

    fireEvent.click(screen.getByRole('radio', { name: 'System' }))

    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('system')
    // The system here is light, so the page follows it again.
    expect(document.documentElement.dataset.theme).toBe('light')
  })
})
