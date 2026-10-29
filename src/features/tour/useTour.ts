import { useMemo, useState } from 'react'
import { destinationById, tour, viewpointById, type InfoHotspot } from '../../data/tour'

export function nextTourViewpoint(viewpointId: string): string | null {
  const viewpoint = viewpointById(viewpointId)
  if (!viewpoint) return null
  const destination = destinationById(viewpoint.destinationId)
  if (!destination) return null
  const index = destination.viewpointIds.indexOf(viewpointId)
  return destination.viewpointIds[index + 1] ?? null
}

export function useTour(initialViewpointId = tour.viewpoints[0].id) {
  const [viewpointId, setViewpointId] = useState(initialViewpointId)
  const [activeInfo, setActiveInfo] = useState<InfoHotspot | null>(null)
  const viewpoint = viewpointById(viewpointId) ?? tour.viewpoints[0]
  const destination = destinationById(viewpoint.destinationId) ?? tour.destinations[0]

  return useMemo(() => ({
    viewpoint,
    destination,
    activeInfo,
    goTo: (id: string) => {
      if (!viewpointById(id)) return
      setActiveInfo(null)
      setViewpointId(id)
    },
    selectDestination: (id: string) => {
      const selected = destinationById(id)
      if (!selected) return
      setActiveInfo(null)
      setViewpointId(selected.viewpointIds[0])
    },
    openInfo: setActiveInfo,
    closeInfo: () => setActiveInfo(null),
  }), [activeInfo, destination, viewpoint])
}
