import { useEffect, useRef, useState } from 'react'
import { PanoramaEngine } from './PanoramaEngine'
import type { PanoramaCallbacks, PanoramaController } from './types'

export type PanoramaEngineFactory = (canvas: HTMLCanvasElement, callbacks: PanoramaCallbacks) => PanoramaController

const defaultFactory: PanoramaEngineFactory = (canvas, callbacks) => new PanoramaEngine(canvas, undefined, callbacks)

export function usePanoramaEngine(callbacks: PanoramaCallbacks = {}, factory: PanoramaEngineFactory = defaultFactory) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const callbacksRef = useRef(callbacks)
  const [engine, setEngine] = useState<PanoramaController | null>(null)
  callbacksRef.current = callbacks

  useEffect(() => {
    if (!canvasRef.current) return
    const instance = factory(canvasRef.current, {
      onReady: () => callbacksRef.current.onReady?.(),
      onViewpointChange: (viewpoint) => callbacksRef.current.onViewpointChange?.(viewpoint),
      onFrame: () => callbacksRef.current.onFrame?.(),
    })
    instance.resize()
    setEngine(instance)
    return () => {
      instance.dispose()
      setEngine(null)
    }
  }, [factory])

  return { canvasRef, engine }
}
