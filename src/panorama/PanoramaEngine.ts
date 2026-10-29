import {
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  SphereGeometry,
  Texture,
  TextureLoader,
  Vector3,
  WebGLRenderer,
} from 'three'
import type { Viewpoint } from '../data/tour'
import { arrivalLongitude, clampFov, hotspotDirection, normalizedXToDegrees, wrapDegrees } from './math'
import type { PanoramaCallbacks, PanoramaController, ProjectedHotspot } from './types'

interface RendererLike {
  capabilities: { getMaxAnisotropy(): number }
  setPixelRatio(value: number): void
  setSize(width: number, height: number, updateStyle: boolean): void
  render(scene: Scene, camera: PerspectiveCamera): void
  dispose(): void
}

export interface PanoramaEngineDependencies {
  createRenderer(canvas: HTMLCanvasElement): RendererLike
  loadTexture(url: string, onLoad: (texture: Texture) => void, onError: (error: unknown) => void): void
  requestFrame(callback: FrameRequestCallback): number
  cancelFrame(id: number): void
  now(): number
}

const defaults: PanoramaEngineDependencies = {
  createRenderer: (canvas) => new WebGLRenderer({ canvas, antialias: true }),
  loadTexture: (url, onLoad, onError) => { new TextureLoader().load(url, onLoad, undefined, onError) },
  requestFrame: (callback) => requestAnimationFrame(callback),
  cancelFrame: (id) => cancelAnimationFrame(id),
  now: () => performance.now(),
}

export class PanoramaEngine implements PanoramaController {
  readonly scene = new Scene()
  readonly camera = new PerspectiveCamera(75, 1, 0.1, 200)
  readonly geometry = new SphereGeometry(50, 72, 48)
  readonly material = new MeshBasicMaterial({ color: 0xffffff })
  readonly mesh = new Mesh(this.geometry, this.material)

  currentTexture: Texture | null = null
  currentViewpoint: Viewpoint | null = null

  private readonly renderer: RendererLike
  private readonly dependencies: PanoramaEngineDependencies
  private readonly callbacks: PanoramaCallbacks
  private frameId = 0
  private loadGeneration = 0
  private disposed = false
  private autoRotate = true
  private planet = false
  private dragging = false
  private pointerX = 0
  private pointerY = 0
  private idleAt = 0
  private longitude = 0
  private latitude = 0
  private targetLongitude: number | null = null
  private targetLatitude: number | null = null
  private fov = 75
  private targetFov = 75
  private viewportWidth = 1
  private viewportHeight = 1
  private readonly projected = new Vector3()

  constructor(
    private readonly canvas: HTMLCanvasElement,
    dependencies: PanoramaEngineDependencies = defaults,
    callbacks: PanoramaCallbacks = {},
  ) {
    this.dependencies = dependencies
    this.callbacks = callbacks
    this.renderer = dependencies.createRenderer(canvas)
    this.geometry.scale(-1, 1, 1)
    this.mesh.rotation.y = -Math.PI / 2
    this.scene.add(this.mesh)
    this.idleAt = dependencies.now()
    this.attachListeners()
    this.frameId = dependencies.requestFrame(this.tick)
  }

  async loadPanorama(url: string): Promise<void> {
    const generation = ++this.loadGeneration
    return new Promise((resolve, reject) => {
      this.dependencies.loadTexture(url, (texture) => {
        if (this.disposed || generation !== this.loadGeneration) {
          texture.dispose()
          resolve()
          return
        }
        texture.anisotropy = this.renderer.capabilities.getMaxAnisotropy()
        texture.needsUpdate = true
        this.currentTexture?.dispose()
        this.currentTexture = texture
        this.material.map = texture
        this.material.needsUpdate = true
        this.callbacks.onReady?.()
        resolve()
      }, reject)
    })
  }

  async goTo(viewpoint: Viewpoint, transition = false): Promise<void> {
    const from = this.currentViewpoint?.id
    await this.loadPanorama(viewpoint.panorama)
    if (this.disposed) return
    this.currentViewpoint = viewpoint
    this.longitude = transition && from ? arrivalLongitude(from, viewpoint) : viewpoint.initialLongitude
    this.latitude = 0
    this.targetLongitude = null
    this.targetLatitude = null
    this.fov = transition ? 102 : 75
    this.targetFov = 75
    this.planet = false
    this.callbacks.onViewpointChange?.(viewpoint)
  }

  move(backward = false) {
    if (!this.currentViewpoint?.navigation.length) return null
    const reference = this.longitude + (backward ? 180 : 0)
    let best = this.currentViewpoint.navigation[0]
    let distance = Number.POSITIVE_INFINITY
    for (const hotspot of this.currentViewpoint.navigation) {
      const candidate = Math.abs(wrapDegrees(normalizedXToDegrees(hotspot.x) - reference))
      if (candidate < distance) { distance = candidate; best = hotspot }
    }
    if (distance > 100) {
      this.targetLongitude = normalizedXToDegrees(best.x) + (backward ? 180 : 0)
      return null
    }
    return best
  }

  turn(delta: number) {
    this.targetLongitude = this.longitude + delta
    this.idleAt = this.dependencies.now()
  }

  setAutoRotate(enabled: boolean) { this.autoRotate = enabled }

  setPlanet(enabled: boolean) {
    this.planet = enabled
    this.targetLatitude = enabled ? -90 : 0
    this.targetFov = enabled ? 125 : 75
  }

  setFov(value: number) { this.targetFov = clampFov(value) }

  projectHotspot(x: number, y: number): ProjectedHotspot {
    this.projected.copy(hotspotDirection(x, y)).project(this.camera)
    return {
      x: (this.projected.x * 0.5 + 0.5) * this.viewportWidth,
      y: (-this.projected.y * 0.5 + 0.5) * this.viewportHeight,
      visible: this.projected.z < 1 && Math.abs(this.projected.x) < 1.1 && Math.abs(this.projected.y) < 1.1,
    }
  }

  resize(width = window.innerWidth, height = window.innerHeight, pixelRatio = window.devicePixelRatio) {
    this.viewportWidth = Math.max(1, width)
    this.viewportHeight = Math.max(1, height)
    this.renderer.setPixelRatio(Math.min(pixelRatio, 2))
    this.renderer.setSize(this.viewportWidth, this.viewportHeight, false)
    this.camera.aspect = this.viewportWidth / this.viewportHeight
    this.camera.updateProjectionMatrix()
  }

  dispose() {
    if (this.disposed) return
    this.disposed = true
    this.loadGeneration += 1
    this.dependencies.cancelFrame(this.frameId)
    this.detachListeners()
    this.currentTexture?.dispose()
    this.geometry.dispose()
    this.material.dispose()
    this.renderer.dispose()
  }

  private readonly tick: FrameRequestCallback = () => {
    if (this.disposed) return
    if (this.targetLongitude !== null) {
      const delta = wrapDegrees(this.targetLongitude - this.longitude)
      this.longitude += delta * 0.14
      if (Math.abs(delta) < 0.3) this.targetLongitude = null
    } else if (this.autoRotate && !this.dragging && this.dependencies.now() - this.idleAt > 3500) {
      this.longitude += 0.03
    }
    if (this.targetLatitude !== null) {
      this.latitude += (this.targetLatitude - this.latitude) * 0.08
      if (Math.abs(this.targetLatitude - this.latitude) < 0.2) {
        this.latitude = this.targetLatitude
        if (!this.planet) this.targetLatitude = null
      }
    }
    if (this.planet && !this.dragging) this.longitude += 0.25
    if (Math.abs(this.targetFov - this.fov) > 0.05) {
      this.fov += (this.targetFov - this.fov) * 0.16
      this.camera.fov = this.fov
      this.camera.updateProjectionMatrix()
    }
    const latitude = this.latitude * Math.PI / 180
    const longitude = this.longitude * Math.PI / 180
    this.camera.lookAt(
      Math.cos(latitude) * Math.sin(longitude),
      Math.sin(latitude),
      -Math.cos(latitude) * Math.cos(longitude),
    )
    this.renderer.render(this.scene, this.camera)
    this.callbacks.onFrame?.()
    this.frameId = this.dependencies.requestFrame(this.tick)
  }

  private readonly onPointerDown = (event: PointerEvent) => {
    this.dragging = true
    this.targetLongitude = null
    if (this.planet) this.setPlanet(false)
    else this.targetLatitude = null
    this.pointerX = event.clientX
    this.pointerY = event.clientY
    this.canvas.setPointerCapture?.(event.pointerId)
    this.canvas.classList.add('is-grabbing')
  }

  private readonly onPointerMove = (event: PointerEvent) => {
    if (!this.dragging) return
    const scale = this.fov / 75 * 0.18
    this.longitude -= (event.clientX - this.pointerX) * scale
    this.latitude = Math.max(-85, Math.min(85, this.latitude + (event.clientY - this.pointerY) * scale))
    this.pointerX = event.clientX
    this.pointerY = event.clientY
    this.idleAt = this.dependencies.now()
  }

  private readonly onPointerUp = () => {
    this.dragging = false
    this.canvas.classList.remove('is-grabbing')
  }

  private readonly onWheel = (event: WheelEvent) => {
    event.preventDefault()
    this.targetFov = clampFov(this.targetFov + event.deltaY * 0.04)
    this.idleAt = this.dependencies.now()
  }

  private readonly onResize = () => this.resize()

  private attachListeners() {
    this.canvas.addEventListener('pointerdown', this.onPointerDown)
    this.canvas.addEventListener('pointermove', this.onPointerMove)
    this.canvas.addEventListener('wheel', this.onWheel, { passive: false })
    window.addEventListener('pointerup', this.onPointerUp)
    window.addEventListener('resize', this.onResize)
  }

  private detachListeners() {
    this.canvas.removeEventListener('pointerdown', this.onPointerDown)
    this.canvas.removeEventListener('pointermove', this.onPointerMove)
    this.canvas.removeEventListener('wheel', this.onWheel)
    window.removeEventListener('pointerup', this.onPointerUp)
    window.removeEventListener('resize', this.onResize)
  }
}
