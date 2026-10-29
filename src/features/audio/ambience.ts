export interface AmbienceProfile {
  filter: BiquadFilterType
  frequency: number
  gain: number
  modulationGain: number
  oscillatorFrequency: number
}

export function ambienceProfile(destinationId: string): AmbienceProfile {
  if (destinationId === 'texel-beach') return { filter: 'lowpass', frequency: 900, gain: 0.4, modulationGain: 0.3, oscillatorFrequency: 0.13 }
  if (destinationId === 'rhine-riverbank') return { filter: 'lowpass', frequency: 1500, gain: 0.22, modulationGain: 0.05, oscillatorFrequency: 0.3 }
  return { filter: 'bandpass', frequency: 500, gain: 0.16, modulationGain: 0.08, oscillatorFrequency: 0.08 }
}

export interface AmbienceGraph {
  readonly currentTime: number
  resume(): Promise<void>
  setProfile(profile: AmbienceProfile, at: number): void
  fadeOut(at: number): void
  close(): Promise<void>
}

class BrowserAmbienceGraph implements AmbienceGraph {
  private readonly context = new AudioContext()
  private readonly source = this.context.createBufferSource()
  private readonly filter = this.context.createBiquadFilter()
  private readonly gain = this.context.createGain()
  private readonly oscillator = this.context.createOscillator()
  private readonly modulationGain = this.context.createGain()

  constructor(random = Math.random) {
    const length = this.context.sampleRate * 3
    const buffer = this.context.createBuffer(1, length, this.context.sampleRate)
    const data = buffer.getChannelData(0)
    let level = 0
    for (let index = 0; index < length; index += 1) {
      level = (level + 0.02 * (random() * 2 - 1)) / 1.02
      data[index] = level * 3.5
    }
    this.source.buffer = buffer
    this.source.loop = true
    this.gain.gain.value = 0
    this.modulationGain.gain.value = 0
    this.source.connect(this.filter)
    this.filter.connect(this.gain)
    this.gain.connect(this.context.destination)
    this.oscillator.connect(this.modulationGain)
    this.modulationGain.connect(this.gain.gain)
    this.source.start()
    this.oscillator.start()
  }

  get currentTime() { return this.context.currentTime }
  resume() { return this.context.resume() }
  setProfile(profile: AmbienceProfile, at: number) {
    this.filter.type = profile.filter
    this.filter.frequency.setTargetAtTime(profile.frequency, at, 0.3)
    this.gain.gain.setTargetAtTime(profile.gain, at, 0.5)
    this.modulationGain.gain.setTargetAtTime(profile.modulationGain, at, 0.5)
    this.oscillator.frequency.value = profile.oscillatorFrequency
  }
  fadeOut(at: number) {
    this.gain.gain.setTargetAtTime(0, at, 0.2)
    this.modulationGain.gain.setTargetAtTime(0, at, 0.2)
  }
  async close() {
    this.source.stop()
    this.oscillator.stop()
    await this.context.close()
  }
}

export class AmbienceController {
  private graph: AmbienceGraph | null = null
  private active = false
  constructor(private readonly createGraph: () => AmbienceGraph = () => new BrowserAmbienceGraph()) {}
  async enable(destinationId: string) {
    this.graph ??= this.createGraph()
    this.active = true
    await this.graph.resume()
    this.graph.setProfile(ambienceProfile(destinationId), this.graph.currentTime)
  }
  setProfile(destinationId: string) {
    if (this.active && this.graph) this.graph.setProfile(ambienceProfile(destinationId), this.graph.currentTime)
  }
  disable() {
    this.active = false
    if (this.graph) this.graph.fadeOut(this.graph.currentTime)
  }
  async dispose() {
    this.active = false
    await this.graph?.close()
    this.graph = null
  }
}
