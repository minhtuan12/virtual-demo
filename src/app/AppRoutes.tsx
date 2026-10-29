import { Navigate, Route, Routes } from 'react-router-dom'
import type { PanoramaEngineFactory } from '../panorama/usePanoramaEngine'
import { PanoramaExperience } from './PanoramaExperience'
import { SiteNavigation } from './SiteNavigation'
import { DiscoverPage } from '../features/discover/DiscoverPage'

export function AppRoutes({ engineFactory }: { engineFactory?: PanoramaEngineFactory }) {
  return <Routes>
    <Route path="/" element={<><SiteNavigation /><PanoramaExperience engineFactory={engineFactory} /></>} />
    <Route path="/discover" element={<DiscoverPage />} />
    <Route path="*" element={<Navigate to="/discover" replace />} />
  </Routes>
}
