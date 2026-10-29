import i18n from './i18n'
import { LANGUAGE_STORAGE_KEY, type Locale } from './locale'

export { LANGUAGE_STORAGE_KEY, resolveLocale, SUPPORTED_LOCALES, type Locale } from './locale'

export async function setLocale(locale: Locale): Promise<void> {
  localStorage.setItem(LANGUAGE_STORAGE_KEY, locale)
  await i18n.changeLanguage(locale)
  document.documentElement.lang = locale
}
