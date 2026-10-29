import type { NavigationHotspot, Viewpoint } from '../data/tour'

export interface ProjectedHotspot {
  x: number
  y: number
  visible: boolean
}

export interface PanoramaController {
  goTo(viewpoint: Viewpoint, transition?: boolean): Promise<void>
  move(backward?: boolean): NavigationHotspot | null
  turn(delta: number): void
  setAutoRotate(enabled: boolean): void
  setPlanet(enabled: boolean): void
  setFov(value: number): void
  projectHotspot(x: number, y: number): ProjectedHotspot
  resize(width?: number, height?: number, pixelRatio?: number): void
  dispose(): void
}

export interface PanoramaCallbacks {
  onReady?: () => void
  onViewpointChange?: (viewpoint: Viewpoint) => void
  onFrame?: () => void
}
