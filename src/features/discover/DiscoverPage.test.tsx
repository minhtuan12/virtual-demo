import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it } from 'vitest'
import i18n from '../language/i18n'
import { DiscoverPage } from './DiscoverPage'

describe('DiscoverPage', () => {
  beforeEach(async () => { localStorage.clear(); await i18n.changeLanguage('en') })

  it('shows and filters the four localized destinations', () => {
    render(<MemoryRouter initialEntries={['/discover']}><DiscoverPage /></MemoryRouter>)
    expect(screen.getAllByRole('article')).toHaveLength(4)
    fireEvent.change(screen.getByRole('searchbox', { name: 'Search destinations' }), { target: { value: 'Texel' } })
    expect(screen.getAllByRole('article')).toHaveLength(1)
    expect(screen.getByRole('heading', { name: 'Texel Beach' })).toBeInTheDocument()
  })

  it('toggles a favorite and can show favorites only', () => {
    render(<MemoryRouter initialEntries={['/discover']}><DiscoverPage /></MemoryRouter>)
    fireEvent.click(screen.getByRole('button', { name: 'Add Jelgava Palace to favorites' }))
    fireEvent.click(screen.getByRole('checkbox', { name: 'Favorites only' }))
    expect(screen.getAllByRole('article')).toHaveLength(1)
  })
})
