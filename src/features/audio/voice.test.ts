import { describe, expect, it, vi } from 'vitest'
import { Narrator, selectEnglishVoice } from './voice'

const voice = (lang: string) => ({ lang } as SpeechSynthesisVoice)

describe('English narration', () => {
  it('prefers en-US, then another English voice, then browser default', () => {
    const british = voice('en-GB')
    const american = voice('en-US')
    expect(selectEnglishVoice([voice('vi-VN'), british, american])).toBe(american)
    expect(selectEnglishVoice([voice('de-DE'), british])).toBe(british)
    expect(selectEnglishVoice([voice('ja-JP')])).toBeUndefined()
  })

  it.each(['en', 'vi', 'de', 'ko', 'ja'])('always creates an en-US utterance while UI locale is %s', (_locale) => {
    const spoken: SpeechSynthesisUtterance[] = []
    const synth = { cancel: vi.fn(), speak: (utterance: SpeechSynthesisUtterance) => spoken.push(utterance), getVoices: () => [] }
    const narrator = new Narrator(synth, (text) => ({ text } as SpeechSynthesisUtterance))
    narrator.speak('Canonical English narration')
    expect(spoken[0].lang).toBe('en-US')
    expect(spoken[0].text).toBe('Canonical English narration')
  })

  it('cancels existing speech before speaking and when stopped', () => {
    const synth = { cancel: vi.fn(), speak: vi.fn(), getVoices: () => [] }
    const narrator = new Narrator(synth, (text) => ({ text } as SpeechSynthesisUtterance))
    narrator.speak('Hello')
    narrator.stop()
    expect(synth.cancel).toHaveBeenCalledTimes(2)
  })
})
