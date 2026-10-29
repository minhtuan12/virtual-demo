import { destinationById } from '../data/tour'

export function destinationFromSearch(search: string): string | null {
  const id = new URLSearchParams(search).get('destination')
  return id && destinationById(id) ? id : null
}
