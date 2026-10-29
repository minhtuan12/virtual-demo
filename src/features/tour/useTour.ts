import { useMemo, useState } from 'react'
import { destinationById, tour, viewpointById, type InfoHotspot } from '../../data/tour'

export type CardContent = Pick<InfoHotspot, 'titleKey' | 'descriptionKey'>

const destinationCard = (id: string): CardContent | null => {
  const key = ({ 'jelgava-palace': 'jelgava', 'park-ruins': 'ruins', 'texel-beach': 'texel', 'rhine-riverbank': 'rhine' } as Record<string, string>)[id]
  return key ? { titleKey: `destinations.${key}.name`, descriptionKey: `destinations.${key}.description` } : null
}

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
  const [activeInfo, setActiveInfo] = useState<CardContent | null>(() => destinationCard(viewpointById(initialViewpointId)?.destinationId ?? tour.destinations[0].id))
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
    showDestinationCard: (id: string) => setActiveInfo(destinationCard(id)),
    closeInfo: () => setActiveInfo(null),
  }), [activeInfo, destination, viewpoint])
}
