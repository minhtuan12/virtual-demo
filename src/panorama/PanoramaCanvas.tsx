import type { RefObject } from 'react'

interface PanoramaCanvasProps {
  canvasRef: RefObject<HTMLCanvasElement | null>
}

export function PanoramaCanvas({ canvasRef }: PanoramaCanvasProps) {
  return <canvas id="panorama-canvas" ref={canvasRef} aria-label="360° panorama" />
}
