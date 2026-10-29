import { render, screen } from '@testing-library/react'
import type { PanoramaEngineFactory } from '../panorama/usePanoramaEngine'
import type { PanoramaController } from '../panorama/types'
import { App } from './App'

const controller: PanoramaController = {
  goTo: async () => {}, move: () => null, turn: () => {}, face: () => {}, setAutoRotate: () => {}, setPlanet: () => {}, setFov: () => {},
  projectHotspot: () => ({ x: 0, y: 0, visible: false }), resize: () => {}, dispose: () => {},
}
const engineFactory: PanoramaEngineFactory = () => controller

describe('App', () => {
  it('renders the panorama product name', () => {
    window.history.replaceState({}, '', '/')
    render(<App engineFactory={engineFactory} />)
    expect(screen.getByRole('heading', { name: 'Panorama 360°' })).toBeInTheDocument()
  })

  it('renders the discover route', () => {
    window.history.replaceState({}, '', '/discover')
    render(<App engineFactory={engineFactory} />)
    expect(screen.getByRole('heading', { name: 'Discover' })).toBeInTheDocument()
  })
})
