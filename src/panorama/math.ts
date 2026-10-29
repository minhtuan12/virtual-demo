import { Vector3 } from 'three'
import type { Viewpoint } from '../data/tour'

export const normalizedXToDegrees = (x: number) => (x - 0.5) * 360

export function wrapDegrees(value: number): number {
  return ((value + 540) % 360 + 360) % 360 - 180
}

export function clampFov(value: number): number {
  return Math.max(30, Math.min(95, value))
}

export function hotspotDirection(x: number, y: number, radius = 20): Vector3 {
  const longitude = (x - 0.5) * Math.PI * 2
  const latitude = (0.5 - y) * Math.PI
  return new Vector3(
    Math.cos(latitude) * Math.sin(longitude),
    Math.sin(latitude),
    -Math.cos(latitude) * Math.cos(longitude),
  ).multiplyScalar(radius)
}

export function arrivalLongitude(fromViewpointId: string, target: Viewpoint): number {
  const onward = target.navigation.find((hotspot) => hotspot.to !== fromViewpointId)
  return onward ? normalizedXToDegrees(onward.x) : target.initialLongitude
}
