import { act, fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { PanoramaEngineFactory } from '../panorama/usePanoramaEngine'
import type { PanoramaController } from '../panorama/types'
import i18n from '../features/language/i18n'
import { PanoramaExperience } from './PanoramaExperience'

function setup() {
  let ready: (() => void) | undefined
  const controller: PanoramaController = {
    goTo: vi.fn(async () => {}), move: vi.fn(() => null), turn: vi.fn(), setAutoRotate: vi.fn(), setPlanet: vi.fn(), setFov: vi.fn(),
    projectHotspot: vi.fn(() => ({ x: 400, y: 300, visible: true })), resize: vi.fn(), dispose: vi.fn(),
  }
  const factory: PanoramaEngineFactory = (_canvas, callbacks) => {
    ready = callbacks.onReady
    return controller
  }
  render(<PanoramaExperience engineFactory={factory} />)
  return { controller, markReady: () => act(() => ready?.()) }
}

describe('PanoramaExperience', () => {
  beforeEach(async () => {
    localStorage.clear()
    await i18n.changeLanguage('en')
  })
  it('keeps the intro disabled until the first panorama is ready', async () => {
    const { markReady } = setup()
    const start = screen.getByRole('button', { name: 'Loading images…' })
    expect(start).toBeDisabled()
    markReady()
    expect(await screen.findByRole('button', { name: 'Start exploring' })).toBeEnabled()
  })

  it('switches destination and opens an information hotspot', async () => {
    const { markReady } = setup()
    markReady()
    fireEvent.click(await screen.findByRole('button', { name: /Rhine riverbank/ }))
    expect(screen.getByText(/Sandy bank and large tree/)).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Large riverside tree' }))
    expect(screen.getByRole('heading', { name: 'Large riverside tree' })).toBeInTheDocument()
  })

  it('handles keyboard movement but ignores shortcuts from an input', async () => {
    const { controller, markReady } = setup()
    markReady()
    fireEvent.keyDown(window, { key: 'a' })
    expect(controller.turn).toHaveBeenCalledWith(-30)
    const input = document.createElement('input')
    document.body.append(input)
    fireEvent.keyDown(input, { key: 'd' })
    expect(controller.turn).not.toHaveBeenCalledWith(30)
    input.remove()
  })

  it('changes and persists the selected language', async () => {
    const { markReady } = setup()
    markReady()
    fireEvent.change(screen.getByRole('combobox', { name: 'Language' }), { target: { value: 'vi' } })
    expect(await screen.findByText('Đi bộ giữa các điểm · Bản demo')).toBeInTheDocument()
    expect(localStorage.getItem('panorama.locale')).toBe('vi')
  })

  it('toggles auto rotation, planet view, and explicit theme', () => {
    const { controller } = setup()
    fireEvent.click(screen.getByRole('button', { name: 'Auto rotate' }))
    expect(controller.setAutoRotate).toHaveBeenCalledWith(false)
    fireEvent.click(screen.getByRole('button', { name: 'Little planet view' }))
    expect(controller.setPlanet).toHaveBeenCalledWith(true)
    document.documentElement.dataset.theme = 'dark'
    fireEvent.click(screen.getByRole('button', { name: 'Toggle light or dark theme' }))
    expect(document.documentElement.dataset.theme).toBe('light')
  })
})
