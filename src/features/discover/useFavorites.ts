import { useCallback, useState } from 'react'
import { readFavorites, writeFavorites } from './favorites'

export function useFavorites() {
  const [favorites, setFavorites] = useState<Set<string>>(() => readFavorites(localStorage))
  const update = useCallback((next: Set<string>) => { writeFavorites(localStorage, next); setFavorites(next) }, [])
  return {
    favorites,
    toggle: useCallback((id: string) => {
      const next = new Set(favorites)
      if (next.has(id)) next.delete(id); else next.add(id)
      update(next)
    }, [favorites, update]),
    clear: useCallback(() => update(new Set()), [update]),
  }
}
