export const SUPPORTED_LOCALES = ['en', 'vi', 'de', 'ko', 'ja'] as const
export type Locale = (typeof SUPPORTED_LOCALES)[number]
export const LANGUAGE_STORAGE_KEY = 'panorama.locale'

export function resolveLocale(value: unknown): Locale {
  return typeof value === 'string' && SUPPORTED_LOCALES.includes(value as Locale) ? (value as Locale) : 'en'
}

export async function setLocale(locale: Locale): Promise<void> {
  const { default: i18n } = await import('./i18n')
  localStorage.setItem(LANGUAGE_STORAGE_KEY, locale)
  await i18n.changeLanguage(locale)
  document.documentElement.lang = locale
}
