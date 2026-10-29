export interface SampleOptions {
  cache: false
  modelTier: 'quick'
  onText(output: { text?: string }): void
}

export interface SampleModel {
  (prompt: string, options: SampleOptions): Promise<{ text: string }>
}

export async function loadSampleModel(): Promise<SampleModel | null> {
  if (!window.claude?.use) return null
  try {
    return await window.claude.use('sample')
  } catch {
    return null
  }
}
