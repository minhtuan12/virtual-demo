import { describe, expect, it } from 'vitest'
import { de } from './de'
import { en } from './en'
import { ja } from './ja'
import { ko } from './ko'
import { vi } from './vi'

function leafKeys(value: unknown, prefix = ''): string[] {
  if (!value || typeof value !== 'object') return [prefix]
  return Object.entries(value).flatMap(([key, child]) => leafKeys(child, prefix ? `${prefix}.${key}` : key))
}

describe('locale resources', () => {
  it.each([
    ['vi', vi],
    ['de', de],
    ['ko', ko],
    ['ja', ja],
  ] as const)('%s has the complete English resource shape', (_locale, resource) => {
    expect(leafKeys(resource).sort()).toEqual(leafKeys(en).sort())
  })

  it('uses English product copy as the canonical default', () => {
    expect(en.brand.subtitle).toBe('Walk between places · Demo')
    expect(en.intro.start).toBe('Start exploring')
    expect(en.controls.narration).toBe('English narration')
  })
})
