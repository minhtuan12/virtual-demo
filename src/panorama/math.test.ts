import { describe, expect, it } from 'vitest'
import { arrivalLongitude, clampFov, hotspotDirection, wrapDegrees } from './math'
import { tour } from '../data/tour'

describe('panorama math', () => {
  it.each([
    [540, -180],
    [-540, -180],
    [181, -179],
    [-181, 179],
    [45, 45],
  ])('wraps %s degrees to %s', (input, expected) => {
    expect(wrapDegrees(input)).toBe(expected)
  })

  it('maps normalized hotspot coordinates to the original sphere direction', () => {
    const direction = hotspotDirection(0.5, 0.5, 20)
    expect(direction.x).toBeCloseTo(0, 8)
    expect(direction.y).toBeCloseTo(0, 8)
    expect(direction.z).toBeCloseTo(-20, 8)
  })

  it('faces the onward path when arriving at a connected viewpoint', () => {
    const target = tour.viewpoints.find((item) => item.id === 'rhine-river')!
    expect(arrivalLongitude('rhine-sand', target)).toBeCloseTo(36)
  })

  it('clamps field of view to the baseline limits', () => {
    expect(clampFov(5)).toBe(30)
    expect(clampFov(75)).toBe(75)
    expect(clampFov(120)).toBe(95)
  })
})
