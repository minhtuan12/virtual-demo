import { describe, expect, it } from 'vitest'
import { discoverDestinations } from './discoverData'

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
})
