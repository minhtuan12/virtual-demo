import { Navigate, Route, Routes } from 'react-router-dom'
import type { PanoramaEngineFactory } from '../panorama/usePanoramaEngine'
import { PanoramaExperience } from './PanoramaExperience'
import { SiteNavigation } from './SiteNavigation'

function DiscoverPlaceholder() {
  return <main><SiteNavigation /><h1>Discover</h1></main>
}

export function AppRoutes({ engineFactory }: { engineFactory?: PanoramaEngineFactory }) {
  return <Routes>
    <Route path="/" element={<><SiteNavigation /><PanoramaExperience engineFactory={engineFactory} /></>} />
    <Route path="/discover" element={<DiscoverPlaceholder />} />
    <Route path="*" element={<Navigate to="/discover" replace />} />
  </Routes>
}
