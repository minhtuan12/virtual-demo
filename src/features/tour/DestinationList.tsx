import { useTranslation } from 'react-i18next'
import { tour } from '../../data/tour'

const keys = { 'jelgava-palace': 'jelgava', 'park-ruins': 'ruins', 'texel-beach': 'texel', 'rhine-riverbank': 'rhine' } as const

interface DestinationListProps {
  selectedId: string
  onSelect(id: string): void
}

export function DestinationList({ selectedId, onSelect }: DestinationListProps) {
  const { t } = useTranslation()
  return (
    <nav className="side gl" aria-label="Destinations">
      {tour.destinations.map((destination) => {
        const key = keys[destination.id as keyof typeof keys]
        return (
          <button key={destination.id} className={selectedId === destination.id ? 'on' : ''} onClick={() => onSelect(destination.id)} aria-current={selectedId === destination.id ? 'true' : undefined}>
            <img src={destination.thumbnail} alt="" />
            <span>{t(`destinations.${key}.name`)}<small>{t(`destinations.${key}.location`)}</small></span>
          </button>
        )
      })}
    </nav>
  )
}
