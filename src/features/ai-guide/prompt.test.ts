import { describe, expect, it } from 'vitest'
import { buildGuidePrompt } from './prompt'
import type { GuideHistoryMessage } from './prompt'

describe('AI guide prompt', () => {
  it('requests the selected locale, current context, plain text, and a 90-word limit', () => {
    const prompt = buildGuidePrompt({ locale: 'de', place: 'Schloss Jelgava', location: 'Jelgava', description: 'Barockpalast', viewpoint: 'Hauptansicht', details: ['Haupttor'], history: [] })
    expect(prompt).toContain('Respond in German')
    expect(prompt).toContain('Schloss Jelgava (Jelgava)')
    expect(prompt).toContain('at most 90 words')
    expect(prompt).toContain('plain text')
  })

  it('includes only the last eight history messages', () => {
    const history: GuideHistoryMessage[] = Array.from({ length: 10 }, (_, index) => ({ role: index % 2 ? 'Guide' : 'Guest', content: `message-${index}` }))
    const prompt = buildGuidePrompt({ locale: 'en', place: 'Texel', location: 'Netherlands', description: 'Beach', viewpoint: 'Beach', details: [], history })
    expect(prompt).not.toContain('message-0')
    expect(prompt).not.toContain('message-1')
    expect(prompt).toContain('message-2')
    expect(prompt).toContain('message-9')
  })
})
