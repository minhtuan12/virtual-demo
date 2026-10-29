import { useTranslation } from 'react-i18next'
import type { Destination, Viewpoint } from '../../data/tour'

export function StatusOverlays({ destination, viewpoint, toast }: { destination: Destination; viewpoint: Viewpoint; toast: string }) {
  const { t } = useTranslation()
  const index = destination.viewpointIds.indexOf(viewpoint.id)
  const key = viewpoint.titleKey
  return <><div className="credit gl">{t('status.photo')}: {destination.credit.author} · {destination.credit.license} · <a href={destination.credit.source} target="_blank" rel="noreferrer">{t('status.source')}</a></div><div className="step-label gl">{destination.viewpointIds.length > 1 ? `${t(key)} · ${t('status.point', { current: index + 1, total: destination.viewpointIds.length })}` : t('status.single')}</div><div className={`toast gl ${toast ? 'on' : ''}`} role="status">{toast}</div></>
}
