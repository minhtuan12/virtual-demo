import { useTranslation } from 'react-i18next'

interface DirectionPadProps { onForward(): void; onBackward(): void; onLeft(): void; onRight(): void }

export function DirectionPad({ onForward, onBackward, onLeft, onRight }: DirectionPadProps) {
  const { t } = useTranslation()
  return <div className="dpad"><button className="gl up" aria-label={t('controls.forward')} onClick={onForward}>▲</button><button className="gl left" aria-label={t('controls.left')} onClick={onLeft}>◀</button><button className="gl down" aria-label={t('controls.backward')} onClick={onBackward}>▼</button><button className="gl right" aria-label={t('controls.right')} onClick={onRight}>▶</button></div>
}
