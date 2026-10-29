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
import { useNarration } from '../features/audio/useNarration'
import { useAmbience } from '../features/audio/useAmbience'
import { useAiGuide } from '../features/ai-guide/useAiGuide'
import { AiGuide } from '../features/ai-guide/AiGuide'
import type { Locale } from '../features/language/language'
import { destinationById } from '../data/tour'
import { destinationFromSearch } from './destinationQuery'

export function PanoramaExperience({ engineFactory }: { engineFactory?: PanoramaEngineFactory }) {
  const { t, i18n } = useTranslation()
  const initialDestinationId = useRef(destinationFromSearch(window.location.search)).current
  const initialViewpointId = initialDestinationId ? destinationById(initialDestinationId)?.viewpointIds[0] : undefined
  const tourState = useTour(initialViewpointId)
  const [ready, setReady] = useState(false)
  const [started, setStarted] = useState(false)
  const [autoRotate, setAutoRotateState] = useState(true)
  const [autoTour, setAutoTour] = useState(false)
  const [planet, setPlanetState] = useState(false)
  const [displayedViewpoint, setDisplayedViewpoint] = useState(tourState.viewpoint)
  const [fading, setFading] = useState(false)
  const [toast, setToast] = useState('')
  const previousViewpoint = useRef<string | undefined>(undefined)
  const pendingWalking = useRef(false)
  const firstTourStep = useRef(true)
  const hotspotLayer = useRef<HotspotLayerHandle>(null)
  const toastTimer = useRef<number | undefined>(undefined)
  const stableFactory = useRef(engineFactory).current
  const { canvasRef, engine } = usePanoramaEngine({
    onReady: () => setReady(true),
    onFrame: () => hotspotLayer.current?.update(),
    onInteraction: () => setAutoTour(false),
    onDismissCard: tourState.closeInfo,
    onPlanetChange: setPlanetState,
    onViewpointChange: (viewpoint) => {
      setDisplayedViewpoint(viewpoint)
      setFading(false)
      if (!pendingWalking.current) tourState.showDestinationCard(viewpoint.destinationId)
    },
  }, stableFactory)
  const displayedDestination = destinationById(displayedViewpoint.destinationId) ?? tourState.destination
  const english = i18n.getFixedT('en')
  const destinationKey = ({ 'jelgava-palace': 'jelgava', 'park-ruins': 'ruins', 'texel-beach': 'texel', 'rhine-riverbank': 'rhine' } as const)[displayedDestination.id as 'jelgava-palace' | 'park-ruins' | 'texel-beach' | 'rhine-riverbank']
  const narrationText = displayedDestination.viewpointIds.length > 1
    ? `${english(displayedViewpoint.titleKey)}. ${displayedViewpoint.info[0] ? english(displayedViewpoint.info[0].descriptionKey) : ''}`
    : english(`destinations.${destinationKey}.description`)
  const narration = useNarration(narrationText)
  const ambience = useAmbience(displayedDestination.id)
  const guide = useAiGuide({
    locale: i18n.language.slice(0, 2) as Locale,
    place: t(`destinations.${destinationKey}.name`),
    location: t(`destinations.${destinationKey}.location`),
    description: t(`destinations.${destinationKey}.description`),
    viewpoint: t(displayedViewpoint.titleKey),
    details: displayedViewpoint.info.map((item) => `${t(item.titleKey)} - ${t(item.descriptionKey)}`),
  })

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
    const transitioning = previousViewpoint.current !== undefined && displayedViewpoint.destinationId === tourState.viewpoint.destinationId
    pendingWalking.current = transitioning
    if (previousViewpoint.current !== undefined) setFading(true)
    void engine.goTo(tourState.viewpoint, transitioning)
    previousViewpoint.current = tourState.viewpoint.id
  }, [displayedViewpoint.destinationId, engine, tourState.viewpoint])

  const move = useCallback((backward: boolean) => {
    setAutoTour(false)
    if (!displayedViewpoint.navigation.length) { showToast(t('toasts.single')); return }
    const next = engine?.move(backward)
    if (next) tourState.goTo(next.to)
    else showToast(t('toasts.turn'))
  }, [displayedViewpoint.navigation.length, engine, showToast, t, tourState])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      if (target instanceof HTMLElement && target.matches('input, select, textarea, button, [contenteditable="true"]')) return
      const key = event.key.toLowerCase()
      if (key === 'w' || key === 'arrowup') move(false)
      else if (key === 's' || key === 'arrowdown') move(true)
      else if (key === 'a' || key === 'arrowleft') { setAutoTour(false); engine?.turn(-30) }
      else if (key === 'd' || key === 'arrowright') { setAutoTour(false); engine?.turn(30) }
      else return
      event.preventDefault()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [engine, move])

  useEffect(() => {
    if (!autoTour) return
    const onward = nextTourViewpoint(displayedViewpoint.id)
    if (!onward) {
      const first = displayedDestination.viewpointIds[0]
      if (first !== displayedViewpoint.id) tourState.goTo(first)
      return
    }
    const hotspot = displayedViewpoint.navigation.find((item) => item.to === onward)
    let travelTimer: number | undefined
    const faceDelay = firstTourStep.current ? 300 : 5200
    firstTourStep.current = false
    const faceTimer = window.setTimeout(() => {
      if (hotspot) engine?.face(hotspot.x)
      travelTimer = window.setTimeout(() => tourState.goTo(onward), 2200)
    }, faceDelay)
    return () => { window.clearTimeout(faceTimer); if (travelTimer) window.clearTimeout(travelTimer) }
  }, [autoTour, displayedDestination.viewpointIds, displayedViewpoint, engine, tourState])

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
    <Toolbar autoRotate={autoRotate} autoTour={autoTour} planet={planet} narration={narration.enabled} ambience={ambience.enabled} aiAvailable={guide.available} aiOpen={guide.open} onAi={guide.open ? guide.close : guide.show} onAutoRotate={toggleAutoRotate} onTheme={toggleTheme} onFullscreen={fullscreen} onAutoTour={() => { if (!displayedViewpoint.navigation.length) showToast(t('toasts.chooseRhine')); else { firstTourStep.current = true; setAutoTour((value) => !value); showToast(t('toasts.tourOn')) } }} onNarration={() => { const result = narration.toggle(); if (result === 'unsupported') showToast(t('toasts.narrationUnsupported')); else if (result === 'enabled') showToast(t('toasts.narrationOn')) }} onAmbience={() => { void ambience.toggle().then((enabled) => { if (enabled) showToast(t('toasts.ambienceDisclosure')) }) }} onPlanet={togglePlanet} />
    {guide.available && guide.open && <AiGuide guide={guide} />}
    <DestinationList selectedId={displayedDestination.id} onSelect={(id) => { setAutoTour(false); tourState.selectDestination(id) }} />
    <HotspotLayer ref={hotspotLayer} viewpoint={displayedViewpoint} controller={engine} onNavigate={(id) => { setAutoTour(false); tourState.goTo(id) }} onInfo={(index) => tourState.openInfo(displayedViewpoint.info[index])} />
    <InfoCard info={tourState.activeInfo} onClose={tourState.closeInfo} />
    <StatusOverlays destination={displayedDestination} viewpoint={displayedViewpoint} toast={toast} />
    <DirectionPad onForward={() => move(false)} onBackward={() => move(true)} onLeft={() => { setAutoTour(false); engine?.turn(-30) }} onRight={() => { setAutoTour(false); engine?.turn(30) }} />
    <div className={`fade ${fading ? 'on' : ''}`} aria-hidden="true" />
    <Intro ready={ready} hidden={started} onStart={() => setStarted(true)} />
  </main>
}
