import { useTranslation } from 'react-i18next'

interface Props {
  text: string; country: string; category: string; favoritesOnly: boolean
  onText(value: string): void; onCountry(value: string): void; onCategory(value: string): void; onFavorites(value: boolean): void; onReset(): void
}

export function DiscoverFilters(props: Props) {
  const { t } = useTranslation()
  return <section className="discover-filters gl" aria-label={t('discover.filters.label')}>
    <label className="discover-search"><span>{t('discover.search.label')}</span><input type="search" value={props.text} placeholder={t('discover.search.placeholder')} onChange={(event) => props.onText(event.target.value)} /></label>
    <label><span>{t('discover.filters.country')}</span><select value={props.country} onChange={(event) => props.onCountry(event.target.value)}><option value="all">{t('discover.filters.allCountries')}</option><option value="latvia">{t('discover.countries.latvia')}</option><option value="netherlands">{t('discover.countries.netherlands')}</option><option value="germany">{t('discover.countries.germany')}</option></select></label>
    <label><span>{t('discover.filters.category')}</span><select value={props.category} onChange={(event) => props.onCategory(event.target.value)}><option value="all">{t('discover.filters.allCategories')}</option><option value="culture">{t('discover.categories.culture')}</option><option value="coast">{t('discover.categories.coast')}</option><option value="nature">{t('discover.categories.nature')}</option></select></label>
    <label className="favorites-check"><input type="checkbox" checked={props.favoritesOnly} onChange={(event) => props.onFavorites(event.target.checked)} />{t('discover.filters.favoritesOnly')}</label>
    <button type="button" className="reset-filter" onClick={props.onReset}>{t('discover.filters.reset')}</button>
  </section>
}
