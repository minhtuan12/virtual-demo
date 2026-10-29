import { describe, expect, it } from 'vitest'
import { discoverDestinations } from './discoverData'
import { destinationById, viewpointById } from '../../data/tour'

describe('discoverDestinations', () => {
  it('maps the four approved destinations and categories', () => {
    expect(discoverDestinations.map(({ id, category }) => [id, category])).toEqual([
      ['jelgava-palace', 'culture'],
      ['park-ruins', 'culture'],
      ['texel-beach', 'coast'],
      ['rhine-riverbank', 'nature'],
    ])
    expect(discoverDestinations.every((item) => item.thumbnail && item.destinationKey)).toBe(true)
  })

  it('uses the high-resolution panorama as the Discover cover image', () => {
    for (const item of discoverDestinations) {
      const destination = destinationById(item.id)
      const firstViewpoint = viewpointById(destination?.viewpointIds[0] ?? '')
      expect(item.coverImage).toBe(firstViewpoint?.panorama)
      expect(item.coverImage).not.toBe(destination?.thumbnail)
    }
  })
})
