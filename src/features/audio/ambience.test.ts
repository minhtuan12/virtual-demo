import { describe, expect, it, vi } from 'vitest'
import { AmbienceController, ambienceProfile } from './ambience'

describe('ambient sound', () => {
  it('preserves the beach, Rhine, and other profiles', () => {
    expect(ambienceProfile('texel-beach')).toEqual({ filter: 'lowpass', frequency: 900, gain: 0.4, modulationGain: 0.3, oscillatorFrequency: 0.13 })
    expect(ambienceProfile('rhine-riverbank')).toEqual({ filter: 'lowpass', frequency: 1500, gain: 0.22, modulationGain: 0.05, oscillatorFrequency: 0.3 })
    expect(ambienceProfile('jelgava-palace')).toEqual({ filter: 'bandpass', frequency: 500, gain: 0.16, modulationGain: 0.08, oscillatorFrequency: 0.08 })
  })

  it('creates audio lazily, applies profiles, and releases owned nodes', async () => {
    const context = {
      currentTime: 3,
      resume: vi.fn(async () => {}),
      close: vi.fn(async () => {}),
      setProfile: vi.fn(),
      fadeOut: vi.fn(),
    }
    const controller = new AmbienceController(() => context)
    expect(context.resume).not.toHaveBeenCalled()
    await controller.enable('texel-beach')
    expect(context.resume).toHaveBeenCalledOnce()
    expect(context.setProfile).toHaveBeenCalledWith(ambienceProfile('texel-beach'), 3)
    controller.disable()
    expect(context.fadeOut).toHaveBeenCalledWith(3)
    await controller.dispose()
    expect(context.close).toHaveBeenCalledOnce()
  })
})
