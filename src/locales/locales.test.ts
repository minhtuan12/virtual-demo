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
    expect(en.brand.subtitle).toBe('Walk between places')
    expect(en.intro.start).toBe('Start exploring')
    expect(en.controls.narration).toBe('English narration')
  })

  it('does not describe the experience as a demo or claim places and recordings are real', () => {
    for (const resource of [en, vi, de, ko, ja]) {
      expect(JSON.stringify(resource)).not.toMatch(/demo|real places|real recording|có thật|thu âm thật|echte Orte|echte Aufnahme|실제 장소|실제 녹음|데모|実在|実録|デモ/i)
    }
  })
})
