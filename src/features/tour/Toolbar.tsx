import { useTranslation } from 'react-i18next'

interface ToolbarProps {
  autoRotate: boolean
  autoTour: boolean
  planet: boolean
  narration: boolean
  ambience: boolean
  aiAvailable: boolean
  aiOpen: boolean
  onAutoRotate(): void
  onTheme(): void
  onFullscreen(): void
  onAutoTour(): void
  onPlanet(): void
  onNarration(): void
  onAmbience(): void
  onAi(): void
}

export function Toolbar(props: ToolbarProps) {
  const { t } = useTranslation()
  return <>
    <div className="tools"><button className={`gl ${props.autoRotate ? 'on' : ''}`} title={t('controls.autoRotate')} aria-label={t('controls.autoRotate')} onClick={props.onAutoRotate}>↻</button><button className="gl" title={t('controls.theme')} aria-label={t('controls.theme')} onClick={props.onTheme}>◐</button><button className="gl" title={t('controls.fullscreen')} aria-label={t('controls.fullscreen')} onClick={props.onFullscreen}>⛶</button></div>
    <div className="tools-secondary">{props.aiAvailable && <button className={`gl ${props.aiOpen ? 'on' : ''}`} title={t('controls.ai')} aria-label={t('controls.ai')} onClick={props.onAi}>💬</button>}<button className={`gl ${props.autoTour ? 'on' : ''}`} title={t('controls.autoTour')} aria-label={t('controls.autoTour')} onClick={props.onAutoTour}>▶</button><button className={`gl ${props.narration ? 'on' : ''}`} title={t('controls.narration')} aria-label={t('controls.narration')} onClick={props.onNarration}>🔊</button><button className={`gl ${props.ambience ? 'on' : ''}`} title={t('controls.ambience')} aria-label={t('controls.ambience')} onClick={props.onAmbience}>🎧</button><button className={`gl ${props.planet ? 'on' : ''}`} title={t('controls.planet')} aria-label={t('controls.planet')} onClick={props.onPlanet}>◉</button></div>
  </>
}
