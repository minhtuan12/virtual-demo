import { render, screen } from '@testing-library/react'
import { App } from './App'

describe('App', () => {
  it('renders the panorama product name', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: 'Panorama 360°' })).toBeInTheDocument()
  })
})
