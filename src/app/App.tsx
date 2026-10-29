import '../features/language/i18n'
import '../styles/tokens.css'
import '../styles/panorama.css'
import { BrowserRouter } from 'react-router-dom'
import type { PanoramaEngineFactory } from '../panorama/usePanoramaEngine'
import { AppRoutes } from './AppRoutes'

export function App({ engineFactory }: { engineFactory?: PanoramaEngineFactory } = {}) {
  return <BrowserRouter><AppRoutes engineFactory={engineFactory} /></BrowserRouter>
}
