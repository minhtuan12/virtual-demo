import { forwardRef, useCallback, useImperativeHandle, useLayoutEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import type { Viewpoint } from '../../data/tour'
import type { PanoramaController } from '../../panorama/types'

interface HotspotLayerProps {
  viewpoint: Viewpoint
  controller: PanoramaController | null
  onNavigate(id: string): void
  onInfo(index: number): void
}

export interface HotspotLayerHandle { update(): void }

export const HotspotLayer = forwardRef<HotspotLayerHandle, HotspotLayerProps>(function HotspotLayer({ viewpoint, controller, onNavigate, onInfo }, ref) {
  const { t } = useTranslation()
  const navigationRefs = useRef<Array<HTMLButtonElement | null>>([])
  const infoRefs = useRef<Array<HTMLButtonElement | null>>([])
  const update = useCallback(() => {
    if (!controller) return
    const apply = (element: HTMLButtonElement | null, x: number, y: number) => {
      if (!element) return
      const projected = controller.projectHotspot(x, y)
      element.hidden = !projected.visible
      element.style.left = `${projected.x}px`
      element.style.top = `${projected.y}px`
    }
    viewpoint.navigation.forEach((hotspot, index) => apply(navigationRefs.current[index], hotspot.x, hotspot.y))
    viewpoint.info.forEach((hotspot, index) => apply(infoRefs.current[index], hotspot.x, hotspot.y))
  }, [controller, viewpoint])
  useImperativeHandle(ref, () => ({ update }), [update])
  useLayoutEffect(update, [update])
  return (
    <div className="hotspot-layer" aria-label="Panorama hotspots">
      {viewpoint.navigation.map((hotspot, index) => <button ref={(element) => { navigationRefs.current[index] = element }} key={`${viewpoint.id}-${hotspot.to}`} className="hotspot nav-hotspot" hidden onClick={() => onNavigate(hotspot.to)}><span className="nav-dot">↑</span><span>{t(hotspot.labelKey)}</span></button>)}
      {viewpoint.info.map((hotspot, index) => <button ref={(element) => { infoRefs.current[index] = element }} key={hotspot.titleKey} className="hotspot info-hotspot" hidden aria-label={t(hotspot.titleKey)} onClick={() => onInfo(index)}>i</button>)}
    </div>
  )
})
