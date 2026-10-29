import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import '../features/language/i18n'
import { PanoramaCanvas } from '../panorama/PanoramaCanvas'
import { usePanoramaEngine, type PanoramaEngineFactory } from '../panorama/usePanoramaEngine'
import { DestinationList } from '../features/tour/DestinationList'
import { DirectionPad } from '../features/tour/DirectionPad'
import { HotspotLayer, type HotspotLayerHandle } from '../features/tour/HotspotLayer'
import { InfoCard } from '../features/tour/InfoCard'
import { Intro } from '../features/tour/Intro'
import { StatusOverlays } from '../features/tour/StatusOverlays'
import { Toolbar } from '../features/tour/Toolbar'
import { nextTourViewpoint, useTour } from '../features/tour/useTour'
import { LanguagePicker } from '../features/language/LanguagePicker'

export function PanoramaExperience({ engineFactory }: { engineFactory?: PanoramaEngineFactory }) {
  const { t, i18n } = useTranslation()
  const tourState = useTour()
  const [ready, setReady] = useState(false)
  const [started, setStarted] = useState(false)
  const [autoRotate, setAutoRotateState] = useState(true)
  const [autoTour, setAutoTour] = useState(false)
  const [planet, setPlanetState] = useState(false)
  const [toast, setToast] = useState('')
  const previousViewpoint = useRef<string | undefined>(undefined)
  const hotspotLayer = useRef<HotspotLayerHandle>(null)
  const toastTimer = useRef<number | undefined>(undefined)
  const stableFactory = useRef(engineFactory).current
  const { canvasRef, engine } = usePanoramaEngine({ onReady: () => setReady(true), onFrame: () => hotspotLayer.current?.update() }, stableFactory)

  const showToast = useCallback((message: string) => {
    setToast(message)
    if (toastTimer.current) window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToast(''), 2200)
  }, [])

  useEffect(() => () => { if (toastTimer.current) window.clearTimeout(toastTimer.current) }, [])

  useEffect(() => {
    document.title = t('meta.title')
  }, [i18n.language, t])

  useEffect(() => {
    if (!engine) return
    const transitioning = previousViewpoint.current !== undefined
    void engine.goTo(tourState.viewpoint, transitioning)
    previousViewpoint.current = tourState.viewpoint.id
  }, [engine, tourState.viewpoint])

  const move = useCallback((backward: boolean) => {
    if (!tourState.viewpoint.navigation.length) { showToast(t('toasts.single')); return }
    const next = engine?.move(backward)
    if (next) tourState.goTo(next.to)
    else showToast(t('toasts.turn'))
  }, [engine, showToast, t, tourState])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.target as HTMLElement | null)?.tagName === 'INPUT') return
      const key = event.key.toLowerCase()
      if (key === 'w' || key === 'arrowup') move(false)
      else if (key === 's' || key === 'arrowdown') move(true)
      else if (key === 'a' || key === 'arrowleft') engine?.turn(-30)
      else if (key === 'd' || key === 'arrowright') engine?.turn(30)
      else return
      event.preventDefault()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [engine, move])

  useEffect(() => {
    if (!autoTour) return
    const onward = nextTourViewpoint(tourState.viewpoint.id)
    if (!onward) { setAutoTour(false); showToast(t('toasts.tourEnd')); return }
    const timer = window.setTimeout(() => tourState.goTo(onward), 5200)
    return () => window.clearTimeout(timer)
  }, [autoTour, showToast, t, tourState])

  const toggleTheme = () => {
    const root = document.documentElement
    const dark = root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches
    root.dataset.theme = dark ? 'light' : 'dark'
  }
  const toggleAutoRotate = () => { const next = !autoRotate; setAutoRotateState(next); engine?.setAutoRotate(next) }
  const togglePlanet = () => { const next = !planet; setPlanetState(next); engine?.setPlanet(next) }
  const fullscreen = () => document.fullscreenElement ? void document.exitFullscreen() : void document.documentElement.requestFullscreen?.()

  return <main className="experience">
    <PanoramaCanvas canvasRef={canvasRef} />
    <div className="brand gl"><div className="logo">360°</div><div><h1>{t('brand.title')}</h1><small>{t('brand.subtitle')}</small></div></div>
    <LanguagePicker />
    <Toolbar autoRotate={autoRotate} autoTour={autoTour} planet={planet} onAutoRotate={toggleAutoRotate} onTheme={toggleTheme} onFullscreen={fullscreen} onAutoTour={() => { if (!tourState.viewpoint.navigation.length) showToast(t('toasts.chooseRhine')); else { setAutoTour((value) => !value); showToast(t('toasts.tourOn')) } }} onPlanet={togglePlanet} />
    <DestinationList selectedId={tourState.destination.id} onSelect={tourState.selectDestination} />
    <HotspotLayer ref={hotspotLayer} viewpoint={tourState.viewpoint} controller={engine} onNavigate={tourState.goTo} onInfo={(index) => tourState.openInfo(tourState.viewpoint.info[index])} />
    <InfoCard info={tourState.activeInfo} onClose={tourState.closeInfo} />
    <StatusOverlays destination={tourState.destination} viewpoint={tourState.viewpoint} toast={toast} />
    <DirectionPad onForward={() => move(false)} onBackward={() => move(true)} onLeft={() => engine?.turn(-30)} onRight={() => engine?.turn(30)} />
    <Intro ready={ready} hidden={started} onStart={() => setStarted(true)} />
  </main>
}
