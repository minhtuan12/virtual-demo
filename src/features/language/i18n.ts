import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { de } from '../../locales/de'
import { en } from '../../locales/en'
import { ja } from '../../locales/ja'
import { ko } from '../../locales/ko'
import { vi } from '../../locales/vi'
import { LANGUAGE_STORAGE_KEY, resolveLocale } from './language'

const stored = typeof localStorage === 'undefined' ? undefined : localStorage.getItem(LANGUAGE_STORAGE_KEY)

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en }, vi: { translation: vi }, de: { translation: de }, ko: { translation: ko }, ja: { translation: ja },
  },
  lng: resolveLocale(stored),
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
  returnNull: false,
})

export default i18n
