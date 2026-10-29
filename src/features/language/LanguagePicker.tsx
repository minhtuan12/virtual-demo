import { useTranslation } from 'react-i18next'
import { setLocale, SUPPORTED_LOCALES, type Locale } from './language'

const labels: Record<Locale, string> = { en: 'EN', vi: 'VI', de: 'DE', ko: 'KO', ja: 'JA' }

export function LanguagePicker() {
  const { t, i18n } = useTranslation()
  return <label className="language-picker gl"><span className="sr-only">{t('controls.language')}</span><select aria-label={t('controls.language')} value={i18n.language.slice(0, 2)} onChange={(event) => void setLocale(event.target.value as Locale)}>{SUPPORTED_LOCALES.map((locale) => <option key={locale} value={locale}>{labels[locale]}</option>)}</select></label>
}
