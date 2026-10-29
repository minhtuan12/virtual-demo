import { useTranslation } from 'react-i18next'
import { setLocale, SUPPORTED_LOCALES, type Locale } from './language'

const flags: Record<Locale, string> = { en: '🇬🇧', vi: '🇻🇳', de: '🇩🇪', ko: '🇰🇷', ja: '🇯🇵' }

export function LanguagePicker() {
  const { t, i18n } = useTranslation()
  return <label className="language-picker gl"><span className="sr-only">{t('controls.language')}</span><select aria-label={t('controls.language')} value={i18n.language.slice(0, 2)} onChange={(event) => void setLocale(event.target.value as Locale)}>{SUPPORTED_LOCALES.map((locale) => <option key={locale} value={locale}>{flags[locale]}</option>)}</select></label>
}
