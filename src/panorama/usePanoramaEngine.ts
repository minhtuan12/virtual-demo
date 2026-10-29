import { useEffect, useRef, useState } from 'react'
import { PanoramaEngine } from './PanoramaEngine'
import type { PanoramaCallbacks } from './types'

export function usePanoramaEngine(callbacks: PanoramaCallbacks = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const callbacksRef = useRef(callbacks)
  const [engine, setEngine] = useState<PanoramaEngine | null>(null)
  callbacksRef.current = callbacks

  useEffect(() => {
    if (!canvasRef.current) return
    const instance = new PanoramaEngine(canvasRef.current, undefined, {
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
  }, [])

  return { canvasRef, engine }
}
