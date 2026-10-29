export interface SpeechSynthesizer {
  cancel(): void
  speak(utterance: SpeechSynthesisUtterance): void
  getVoices(): SpeechSynthesisVoice[]
}

export function selectEnglishVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | undefined {
  return voices.find((voice) => voice.lang.toLowerCase() === 'en-us')
    ?? voices.find((voice) => voice.lang.toLowerCase().startsWith('en'))
}

export class Narrator {
  constructor(
    private readonly synth: SpeechSynthesizer,
    private readonly createUtterance: (text: string) => SpeechSynthesisUtterance = (text) => new SpeechSynthesisUtterance(text),
  ) {}

  speak(text: string) {
    this.synth.cancel()
    const utterance = this.createUtterance(text)
    utterance.lang = 'en-US'
    const voice = selectEnglishVoice(this.synth.getVoices())
    if (voice) utterance.voice = voice
    this.synth.speak(utterance)
  }

  stop() { this.synth.cancel() }
}
