import { destinationById } from '../../data/tour'

export type DiscoverCategory = 'culture' | 'nature' | 'coast'

export interface DiscoverDestination {
  id: string
  destinationKey: 'jelgava' | 'ruins' | 'texel' | 'rhine'
  country: 'latvia' | 'netherlands' | 'germany'
  category: DiscoverCategory
  thumbnail: string
  durationKey: string
  seasonKey: string
  terrainKey: string
  tagKeys: string[]
}

function item(id: string, destinationKey: DiscoverDestination['destinationKey'], country: DiscoverDestination['country'], category: DiscoverCategory, fact: string, tags: string[]): DiscoverDestination {
  const destination = destinationById(id)
  if (!destination) throw new Error(`Unknown discover destination: ${id}`)
  return { id, destinationKey, country, category, thumbnail: destination.thumbnail, durationKey: `discover.facts.${fact}.duration`, seasonKey: `discover.facts.${fact}.season`, terrainKey: `discover.facts.${fact}.terrain`, tagKeys: tags.map((tag) => `discover.tags.${tag}`) }
}

export const discoverDestinations: DiscoverDestination[] = [
  item('jelgava-palace', 'jelgava', 'latvia', 'culture', 'jelgava', ['architecture', 'history']),
  item('park-ruins', 'ruins', 'latvia', 'culture', 'ruins', ['heritage', 'woodland']),
  item('texel-beach', 'texel', 'netherlands', 'coast', 'texel', ['beach', 'walking']),
  item('rhine-riverbank', 'rhine', 'germany', 'nature', 'rhine', ['river', 'walking']),
]

export const discoverIds = new Set(discoverDestinations.map(({ id }) => id))
