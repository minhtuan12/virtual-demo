import { beforeEach, describe, expect, it } from 'vitest'
import i18n from './i18n'
import { LANGUAGE_STORAGE_KEY, resolveLocale, setLocale } from './language'

describe('language selection', () => {
  beforeEach(() => localStorage.clear())

  it('defaults invalid or missing values to English', () => {
    expect(resolveLocale(undefined)).toBe('en')
    expect(resolveLocale('fr')).toBe('en')
    expect(resolveLocale({ locale: 'vi' })).toBe('en')
  })

  it.each(['en', 'vi', 'de', 'ko', 'ja'] as const)('accepts supported locale %s', (locale) => {
    expect(resolveLocale(locale)).toBe(locale)
  })

  it('persists an explicit locale and updates i18next', async () => {
    await setLocale('de')
    expect(localStorage.getItem(LANGUAGE_STORAGE_KEY)).toBe('de')
    expect(i18n.language).toBe('de')
  })
})
