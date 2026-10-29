import type { SampleModel } from '../features/ai-guide/adapter'

declare global {
  interface Window {
    claude?: {
      use(capability: 'sample'): Promise<SampleModel | null>
    }
  }
}

export {}
