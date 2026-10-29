import { useTranslation } from 'react-i18next'
import type { InfoHotspot } from '../../data/tour'

export function InfoCard({ info, onClose }: { info: InfoHotspot | null; onClose(): void }) {
  const { t } = useTranslation()
  return (
    <section className={`card gl ${info ? 'on' : ''}`} aria-hidden={!info}>
      {info && <><button className="close" aria-label={t('controls.close')} onClick={onClose}>×</button><h2>{t(info.titleKey)}</h2><p>{t(info.descriptionKey)}</p></>}
    </section>
  )
}
