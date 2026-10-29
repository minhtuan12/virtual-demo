import { describe, expect, it } from 'vitest'
import { tour } from './tour'

describe('canonical tour graph', () => {
  it('preserves the four destinations and seven viewpoints', () => {
    expect(tour.destinations).toHaveLength(4)
    expect(tour.viewpoints).toHaveLength(7)
    expect(tour.destinations.map((destination) => destination.id)).toEqual([
      'jelgava-palace',
      'park-ruins',
      'texel-beach',
      'rhine-riverbank',
    ])
  })

  it('preserves the Rhine walking graph', () => {
    const edges = tour.viewpoints.flatMap((viewpoint) =>
      viewpoint.navigation.map((hotspot) => `${viewpoint.id}->${hotspot.to}`),
    )
    expect(edges).toEqual([
      'rhine-sand->rhine-river',
      'rhine-river->rhine-sand',
      'rhine-river->rhine-canopy',
      'rhine-canopy->rhine-river',
      'rhine-canopy->rhine-trail',
      'rhine-trail->rhine-canopy',
    ])
  })

  it('preserves hotspot coordinates and attribution', () => {
    expect(tour.viewpoints[0].info[0]).toMatchObject({ x: 0.43, y: 0.47 })
    expect(tour.viewpoints[3].navigation[0]).toMatchObject({ x: 0.72, y: 0.64 })
    expect(tour.destinations[0].credit).toEqual({
      author: 'Uldins Bardins (2011)',
      license: 'CC BY-SA 4.0',
      source: 'https://commons.wikimedia.org/wiki/File:Jelgavas_pils.jpg',
    })
  })
})
