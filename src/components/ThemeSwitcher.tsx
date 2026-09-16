import { useSyncExternalStore } from 'react'
import type { ThemePreference } from '../core/theme/preference'
import {
  currentThemePreference,
  setThemePreference,
  subscribeToTheme,
} from '../core/theme/store'

const OPTIONS: ReadonlyArray<{ value: ThemePreference; label: string }> = [
  { value: 'system', label: 'System' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
]

/**
 * The theme control: system, light or dark, remembered for the next visit.
 *
 * Radios in a fieldset rather than buttons, because this is a choice of one from three and that is
 * exactly what a radio group means — assistive technology announces it that way, and the arrow keys
 * work without any code. The radios are visually hidden (not `display: none`, which would remove
 * them from the keyboard) and the pill around each is styled from the checked state.
 */
export function ThemeSwitcher() {
  const preference = useSyncExternalStore(
    subscribeToTheme,
    currentThemePreference,
    () => 'system' as const,
  )

  return (
    <fieldset className="theme-switcher">
      <legend>Colour theme</legend>

      {OPTIONS.map((option) => (
        <label key={option.value}>
          <input
            type="radio"
            name="theme"
            value={option.value}
            checked={preference === option.value}
            onChange={() => setThemePreference(option.value)}
          />
          <span>{option.label}</span>
        </label>
      ))}
    </fieldset>
  )
}
