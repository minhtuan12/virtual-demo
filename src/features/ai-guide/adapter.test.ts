import { afterEach, describe, expect, it, vi } from 'vitest'
import { loadSampleModel } from './adapter'

describe('Claude sample adapter', () => {
  afterEach(() => { delete window.claude })

  it('returns null when the runtime is absent', async () => {
    expect(await loadSampleModel()).toBeNull()
  })

  it('returns null when permission is rejected', async () => {
    window.claude = { use: vi.fn(async () => { throw Object.assign(new Error('denied'), { code: 'not_granted' }) }) }
    expect(await loadSampleModel()).toBeNull()
  })

  it('loads the optional sample capability', async () => {
    const model = vi.fn()
    window.claude = { use: vi.fn(async () => model) }
    expect(await loadSampleModel()).toBe(model)
    expect(window.claude.use).toHaveBeenCalledWith('sample')
  })
})
