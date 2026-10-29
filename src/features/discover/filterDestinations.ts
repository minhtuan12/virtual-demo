export interface SearchableDestination {
  id: string
  country: string
  category: string
  searchText: string
}

export interface DestinationFilter {
  text: string
  country: string
  category: string
  favoritesOnly: boolean
  favorites: ReadonlySet<string>
}

export const normalizeSearch = (value: string) => value.normalize('NFD').replace(/\p{M}/gu, '').trim().toLocaleLowerCase()

export function filterDestinations<T extends SearchableDestination>(items: T[], filter: DestinationFilter): T[] {
  const text = normalizeSearch(filter.text)
  return items.filter((item) => (!text || normalizeSearch(item.searchText).includes(text))
    && (filter.country === 'all' || item.country === filter.country)
    && (filter.category === 'all' || item.category === filter.category)
    && (!filter.favoritesOnly || filter.favorites.has(item.id)))
}
