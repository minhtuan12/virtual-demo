import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LanguagePicker } from '../language/LanguagePicker'
import { SiteNavigation } from '../../app/SiteNavigation'
import { discoverDestinations } from './discoverData'
import { filterDestinations } from './filterDestinations'
import { useFavorites } from './useFavorites'
import { DiscoverFilters } from './DiscoverFilters'
import { DestinationCard } from './DestinationCard'
import { DestinationDetails } from './DestinationDetails'
import type { DiscoverDestination } from './discoverData'

export function DiscoverPage() {
  const { t, i18n } = useTranslation()
  const { favorites, toggle } = useFavorites()
  const [text, setText] = useState('')
  const [country, setCountry] = useState('all')
  const [category, setCategory] = useState('all')
  const [favoritesOnly, setFavoritesOnly] = useState(false)
  const [selected, setSelected] = useState<{ item: DiscoverDestination; trigger: HTMLButtonElement } | null>(null)
  const reset = () => { setText(''); setCountry('all'); setCategory('all'); setFavoritesOnly(false) }
  const searchable = useMemo(() => discoverDestinations.map((item) => ({ ...item, searchText: [t(`destinations.${item.destinationKey}.name`), t(`destinations.${item.destinationKey}.location`), t(`destinations.${item.destinationKey}.description`), t(`discover.countries.${item.country}`), t(`discover.categories.${item.category}`), ...item.tagKeys.map((key) => t(key))].join(' ') })), [i18n.language, t])
  const results = filterDestinations(searchable, { text, country, category, favoritesOnly, favorites })
  const toggleTheme = () => { const root = document.documentElement; const dark = root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches; root.dataset.theme = dark ? 'light' : 'dark' }
  return <main className="discover-page">
    <header className="discover-header"><a className="discover-brand" href="/"><span>360°</span><strong>Panorama 360°</strong></a><SiteNavigation /><div className="discover-header-actions"><button type="button" className="theme-button gl" aria-label={t('controls.theme')} onClick={toggleTheme}>◐</button><LanguagePicker /></div></header>
    <section className="discover-hero"><p className="eyebrow">{t('discover.hero.eyebrow')}</p><h1>{t('discover.hero.title')}</h1><p>{t('discover.hero.body')}</p></section>
    <DiscoverFilters text={text} country={country} category={category} favoritesOnly={favoritesOnly} onText={setText} onCountry={setCountry} onCategory={setCategory} onFavorites={setFavoritesOnly} onReset={reset} />
    <section className="discover-results"><div className="results-heading"><h2>{t('discover.results.title')}</h2><span aria-live="polite">{t('discover.results.count', { count: results.length })}</span></div>{results.length ? <div className="destination-grid">{results.map((item) => <DestinationCard key={item.id} item={item} favorite={favorites.has(item.id)} onFavorite={() => toggle(item.id)} onDetails={(trigger) => setSelected({ item, trigger })} />)}</div> : <div className="empty-state gl"><h2>{t('discover.empty.title')}</h2><p>{t('discover.empty.body')}</p><button type="button" onClick={reset}>{t('discover.filters.reset')}</button></div>}</section>
    {selected && <DestinationDetails item={selected.item} onClose={() => { selected.trigger.focus(); setSelected(null) }} />}
  </main>
}
