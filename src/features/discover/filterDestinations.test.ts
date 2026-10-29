import { describe, expect, it } from 'vitest'
import { filterDestinations, normalizeSearch, type SearchableDestination } from './filterDestinations'

const items = [
  { id: 'palace', country: 'latvia', category: 'culture', searchText: 'Jelgava Pils Latvija' },
  { id: 'beach', country: 'netherlands', category: 'coast', searchText: 'Téxel Beach Netherlands' },
] as SearchableDestination[]

describe('filterDestinations', () => {
  it('normalizes case and accents', () => {
    expect(normalizeSearch('  TÉXEL  ')).toBe('texel')
  })

  it('combines text, country, category, and favorite filters', () => {
    expect(filterDestinations(items, { text: 'texel', country: 'netherlands', category: 'coast', favoritesOnly: true, favorites: new Set(['beach']) }).map(({ id }) => id)).toEqual(['beach'])
    expect(filterDestinations(items, { text: '', country: 'all', category: 'culture', favoritesOnly: false, favorites: new Set() }).map(({ id }) => id)).toEqual(['palace'])
  })
})
