import '../features/language/i18n'
import '../styles/tokens.css'
import '../styles/panorama.css'
import { PanoramaExperience } from './PanoramaExperience'
import type { PanoramaEngineFactory } from '../panorama/usePanoramaEngine'

export function App({ engineFactory }: { engineFactory?: PanoramaEngineFactory } = {}) {
  return <PanoramaExperience engineFactory={engineFactory} />
}
