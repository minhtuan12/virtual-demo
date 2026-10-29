import { useTranslation } from 'react-i18next'
import type { DiscoverDestination } from './discoverData'

export function DestinationCard({ item, favorite, onFavorite, onDetails }: { item: DiscoverDestination; favorite: boolean; onFavorite(): void; onDetails(trigger: HTMLButtonElement): void }) {
  const { t } = useTranslation()
  const name = t(`destinations.${item.destinationKey}.name`)
  return <article className="destination-card gl">
    <div className="destination-image"><img src={item.thumbnail} alt={t(`discover.imageAlt.${item.destinationKey}`)} /><button type="button" className="favorite-button" aria-pressed={favorite} aria-label={t(favorite ? 'discover.actions.removeFavorite' : 'discover.actions.addFavorite', { name })} onClick={onFavorite}>{favorite ? '♥' : '♡'}</button></div>
    <div className="destination-card-body"><div className="card-kicker"><span>{t(`discover.categories.${item.category}`)}</span><span>{t(`discover.countries.${item.country}`)}</span></div><h2>{name}</h2><p className="destination-location">{t(`destinations.${item.destinationKey}.location`)}</p><p>{t(`destinations.${item.destinationKey}.description`)}</p><div className="tag-list">{item.tagKeys.map((key) => <span key={key}>{t(key)}</span>)}</div><div className="card-actions"><button type="button" onClick={(event) => onDetails(event.currentTarget)}>{t('discover.actions.details')}</button><a href={`/?destination=${item.id}`}>{t('discover.actions.open360')}</a></div></div>
  </article>
}
