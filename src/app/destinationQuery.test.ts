import { describe, expect, it } from 'vitest'
import { destinationFromSearch } from './destinationQuery'

describe('destinationFromSearch', () => {
  it('returns only a known destination id', () => {
    expect(destinationFromSearch('?destination=rhine-riverbank')).toBe('rhine-riverbank')
    expect(destinationFromSearch('?destination=unknown')).toBeNull()
    expect(destinationFromSearch('?destination=%2Fdiscover')).toBeNull()
    expect(destinationFromSearch('')).toBeNull()
  })
})
