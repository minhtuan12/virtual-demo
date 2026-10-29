import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { nextTourViewpoint, useTour } from './useTour'

describe('useTour', () => {
  it('starts at Jelgava and selects the first viewpoint of another destination', () => {
    const { result } = renderHook(() => useTour())
    expect(result.current.viewpoint.id).toBe('jelgava-palace')
    act(() => result.current.selectDestination('rhine-riverbank'))
    expect(result.current.viewpoint.id).toBe('rhine-sand')
  })

  it('moves through the exact directional graph', () => {
    const { result } = renderHook(() => useTour('rhine-sand'))
    act(() => result.current.goTo('rhine-river'))
    expect(result.current.viewpoint.id).toBe('rhine-river')
    act(() => result.current.goTo('rhine-canopy'))
    expect(result.current.viewpoint.id).toBe('rhine-canopy')
  })

  it('opens and closes an information hotspot', () => {
    const { result } = renderHook(() => useTour())
    act(() => result.current.openInfo(result.current.viewpoint.info[0]))
    expect(result.current.activeInfo?.titleKey).toBe('hotspots.jelgava.arch.title')
    act(() => result.current.closeInfo())
    expect(result.current.activeInfo).toBeNull()
  })

  it('progresses the automatic tour in viewpoint order and ends at the trail', () => {
    expect(nextTourViewpoint('rhine-sand')).toBe('rhine-river')
    expect(nextTourViewpoint('rhine-river')).toBe('rhine-canopy')
    expect(nextTourViewpoint('rhine-canopy')).toBe('rhine-trail')
    expect(nextTourViewpoint('rhine-trail')).toBeNull()
  })
})
