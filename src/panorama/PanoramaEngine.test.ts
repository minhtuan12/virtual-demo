import { describe, expect, it, vi } from 'vitest'
import type { Texture } from 'three'
import { PanoramaEngine, type PanoramaEngineDependencies } from './PanoramaEngine'

function harness() {
  const pending = new Map<string, (texture: Texture) => void>()
  const renderer = {
    capabilities: { getMaxAnisotropy: () => 8 },
    setPixelRatio: vi.fn(), setSize: vi.fn(), render: vi.fn(), dispose: vi.fn(),
  }
  const dependencies: PanoramaEngineDependencies = {
    createRenderer: () => renderer,
    loadTexture: (url, onLoad) => pending.set(url, onLoad),
    requestFrame: () => 42,
    cancelFrame: vi.fn(),
    now: () => 0,
  }
  return { dependencies, pending, renderer }
}

function texture() {
  return { dispose: vi.fn(), anisotropy: 0, needsUpdate: false } as unknown as Texture
}

describe('PanoramaEngine', () => {
  it('caps renderer pixel ratio at two and resizes the camera', () => {
    const { dependencies, renderer } = harness()
    const engine = new PanoramaEngine(document.createElement('canvas'), dependencies)
    engine.resize(1200, 600, 3)
    expect(renderer.setPixelRatio).toHaveBeenCalledWith(2)
    expect(renderer.setSize).toHaveBeenCalledWith(1200, 600, false)
    expect(engine.camera.aspect).toBe(2)
    engine.dispose()
  })

  it('disposes a stale texture when a later request wins', async () => {
    const { dependencies, pending } = harness()
    const engine = new PanoramaEngine(document.createElement('canvas'), dependencies)
    const first = engine.loadPanorama('first.jpg')
    const second = engine.loadPanorama('second.jpg')
    const stale = texture()
    const current = texture()
    pending.get('second.jpg')!(current)
    pending.get('first.jpg')!(stale)
    await Promise.all([first, second])
    expect(stale.dispose).toHaveBeenCalledOnce()
    expect(engine.currentTexture).toBe(current)
    engine.dispose()
  })

  it('releases rendering resources and cancels animation on dispose', () => {
    const { dependencies, renderer } = harness()
    const engine = new PanoramaEngine(document.createElement('canvas'), dependencies)
    const geometryDispose = vi.spyOn(engine.geometry, 'dispose')
    const materialDispose = vi.spyOn(engine.material, 'dispose')
    engine.dispose()
    expect(dependencies.cancelFrame).toHaveBeenCalledWith(42)
    expect(geometryDispose).toHaveBeenCalledOnce()
    expect(materialDispose).toHaveBeenCalledOnce()
    expect(renderer.dispose).toHaveBeenCalledOnce()
  })
})
