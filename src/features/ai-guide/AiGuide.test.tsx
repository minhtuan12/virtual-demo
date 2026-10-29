import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import i18n from '../language/i18n'
import { AiGuide } from './AiGuide'
import { useAiGuide, type GuideContext } from './useAiGuide'
import type { SampleModel } from './adapter'

const context: GuideContext = { locale: 'en', place: 'Jelgava Palace', location: 'Jelgava, Latvia', description: 'A palace', viewpoint: 'Main view', details: ['Main arch'] }

function Harness({ model }: { model: SampleModel }) {
  const guide = useAiGuide(context, async () => model)
  return <AiGuide guide={guide} />
}

describe('AiGuide', () => {
  beforeEach(async () => { await i18n.changeLanguage('en') })

  it('submits with Enter, streams text, and blocks no-longer-busy state after completion', async () => {
    const model: SampleModel = vi.fn(async (_prompt, options) => { options.onText({ text: 'Streaming answer' }); return { text: 'Final answer' } })
    render(<Harness model={model} />)
    await screen.findByText(/Hello! I am your AI guide/)
    const input = screen.getByPlaceholderText('Ask about the place you are viewing…')
    fireEvent.change(input, { target: { value: 'Tell me more' } })
    fireEvent.keyDown(input, { key: 'Enter' })
    expect(await screen.findByText('Final answer')).toBeInTheDocument()
    expect(model).toHaveBeenCalledOnce()
  })

  it('shows localized rate-limit errors', async () => {
    const model: SampleModel = vi.fn(async () => { throw Object.assign(new Error('slow down'), { code: 'rate_limited' }) })
    render(<Harness model={model} />)
    await screen.findByText(/Hello! I am your AI guide/)
    fireEvent.click(screen.getByRole('button', { name: 'What is special about this place?' }))
    await waitFor(() => expect(screen.getByText('You are asking quickly. Please try again in a few seconds.')).toBeInTheDocument())
  })
})
