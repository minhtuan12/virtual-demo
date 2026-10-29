import { fireEvent, render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it } from 'vitest'
import i18n from '../language/i18n'
import { DiscoverPage } from './DiscoverPage'

describe('DestinationDetails', () => {
  beforeEach(async () => { localStorage.clear(); await i18n.changeLanguage('en') })

  it('opens an accessible dialog and restores focus after Escape', () => {
    render(<MemoryRouter initialEntries={['/discover']}><DiscoverPage /></MemoryRouter>)
    const details = screen.getAllByRole('button', { name: 'View details' })[0]
    fireEvent.click(details)

    const dialog = screen.getByRole('dialog', { name: 'Jelgava Palace' })
    expect(dialog).toBeInTheDocument()
    expect(screen.getByText('45–60 min')).toBeInTheDocument()
    expect(within(dialog).getByRole('link', { name: /Uldins Bardins.*CC BY-SA 4.0/ })).toHaveAttribute('href', 'https://commons.wikimedia.org/wiki/File:Jelgavas_pils.jpg')
    expect(within(dialog).getByRole('link', { name: 'Open 360°' })).toHaveAttribute('href', '/?destination=jelgava-palace')
    expect(screen.getByRole('button', { name: 'Close destination details' })).toHaveFocus()

    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(details).toHaveFocus()
  })
})
