import { useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'
import type { DiscoverDestination } from './discoverData'

export function DestinationDetails({ item, onClose }: { item: DiscoverDestination; onClose(): void }) {
  const { t } = useTranslation()
  const titleId = useId()
  const closeRef = useRef<HTMLButtonElement>(null)
  const name = t(`destinations.${item.destinationKey}.name`)

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'Tab') {
        const dialog = closeRef.current?.closest('[role="dialog"]')
        const focusable = dialog?.querySelectorAll<HTMLElement>('button, a[href]')
        if (!focusable?.length) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener('keydown', onKeyDown) }
  }, [onClose])

  return createPortal(<div className="destination-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
    <section className="destination-modal gl" role="dialog" aria-modal="true" aria-labelledby={titleId}>
      <button ref={closeRef} type="button" className="modal-close" aria-label={t('discover.modal.close')} onClick={onClose}>×</button>
      <img src={item.coverImage} alt={t(`discover.imageAlt.${item.destinationKey}`)} />
      <div className="destination-modal-content">
        <p className="modal-kicker">{t(`discover.categories.${item.category}`)} · {t(`discover.countries.${item.country}`)}</p>
        <h2 id={titleId}>{name}</h2>
        <p className="destination-location">{t(`destinations.${item.destinationKey}.location`)}</p>
        <p>{t(`destinations.${item.destinationKey}.description`)}</p>
        <h3>{t('discover.modal.practical')}</h3>
        <dl className="destination-facts">
          <div><dt>{t('discover.modal.duration')}</dt><dd>{t(item.durationKey)}</dd></div>
          <div><dt>{t('discover.modal.season')}</dt><dd>{t(item.seasonKey)}</dd></div>
          <div><dt>{t('discover.modal.terrain')}</dt><dd>{t(item.terrainKey)}</dd></div>
        </dl>
        <p className="destination-attribution"><span>{t('discover.modal.attribution')}</span><a href={item.credit.source} target="_blank" rel="noreferrer">{item.credit.author} · {item.credit.license}</a></p>
        <a className="modal-open-360" href={`/?destination=${item.id}`}>{t('discover.actions.open360')}</a>
      </div>
    </section>
  </div>, document.body)
}
