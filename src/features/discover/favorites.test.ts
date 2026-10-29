import { describe, expect, it, vi } from 'vitest'
import { FAVORITES_KEY, readFavorites, writeFavorites } from './favorites'

describe('discover favorites', () => {
  it('recovers from missing, corrupt, and obsolete values', () => {
    expect(readFavorites({ getItem: () => null })).toEqual(new Set())
    expect(readFavorites({ getItem: () => '{bad json' })).toEqual(new Set())
    expect(readFavorites({ getItem: () => JSON.stringify(['rhine-riverbank', 'removed-place', 7]) })).toEqual(new Set(['rhine-riverbank']))
  })

  it('writes a stable validated array', () => {
    const setItem = vi.fn()
    writeFavorites({ setItem }, new Set(['texel-beach', 'unknown', 'jelgava-palace']))
    expect(setItem).toHaveBeenCalledWith(FAVORITES_KEY, JSON.stringify(['jelgava-palace', 'texel-beach']))
  })
})
