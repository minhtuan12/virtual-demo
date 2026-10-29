import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { setLocale, SUPPORTED_LOCALES, type Locale } from './language'

const countries: Record<Locale, { code: string; name: string }> = {
  en: { code: 'gb', name: 'English' },
  vi: { code: 'vn', name: 'Tiếng Việt' },
  de: { code: 'de', name: 'Deutsch' },
  ko: { code: 'kr', name: '한국어' },
  ja: { code: 'jp', name: '日本語' },
}

const flagUrl = (locale: Locale) => `https://flagcdn.com/w40/${countries[locale].code}.png`

export function LanguagePicker() {
  const { t, i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const current = i18n.language.slice(0, 2) as Locale
  return <div className="language-picker">
    <button className="gl language-trigger" type="button" aria-label={t('controls.language')} aria-expanded={open} onClick={() => setOpen((value) => !value)}><img src={flagUrl(current)} alt="" /></button>
    {open && <div className="language-menu gl">{SUPPORTED_LOCALES.map((locale) => <button key={locale} type="button" aria-label={countries[locale].name} aria-current={locale === current ? 'true' : undefined} onClick={() => { setOpen(false); void setLocale(locale) }}><img src={flagUrl(locale)} alt="" /></button>)}</div>}
  </div>
}
