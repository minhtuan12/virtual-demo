import { discoverIds } from './discoverData'

export const FAVORITES_KEY = 'panorama.discover.favorites.v1'

export function readFavorites(storage: Pick<Storage, 'getItem'>): Set<string> {
  try {
    const value: unknown = JSON.parse(storage.getItem(FAVORITES_KEY) ?? '[]')
    if (!Array.isArray(value)) return new Set()
    return new Set(value.filter((id): id is string => typeof id === 'string' && discoverIds.has(id)))
  } catch {
    return new Set()
  }
}

export function writeFavorites(storage: Pick<Storage, 'setItem'>, ids: ReadonlySet<string>): void {
  const valid = [...ids].filter((id) => discoverIds.has(id)).sort()
  storage.setItem(FAVORITES_KEY, JSON.stringify(valid))
}
