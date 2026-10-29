import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { loadSampleModel, type SampleModel } from './adapter'
import { buildGuidePrompt, type GuideHistoryMessage } from './prompt'
import type { Locale } from '../language/language'

export interface GuideContext {
  locale: Locale
  place: string
  location: string
  description: string
  viewpoint: string
  details: string[]
}

export interface ChatMessage { id: number; role: 'assistant' | 'user'; content: string }

export interface AiGuideState {
  available: boolean
  open: boolean
  messages: ChatMessage[]
  busy: boolean
  ask(question: string): Promise<void>
  show(): void
  close(): void
}

export function useAiGuide(context: GuideContext, loader: () => Promise<SampleModel | null> = loadSampleModel): AiGuideState {
  const { t } = useTranslation()
  const [model, setModel] = useState<SampleModel | null>(null)
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [busy, setBusy] = useState(false)
  const loaderRef = useRef(loader)
  const history = useRef<GuideHistoryMessage[]>([])
  const id = useRef(0)

  useEffect(() => { let active = true; void loaderRef.current().then((loaded) => { if (active) setModel(() => loaded) }); return () => { active = false } }, [])
  useEffect(() => {
    history.current = []
    setMessages([{ id: ++id.current, role: 'assistant', content: t('ai.greeting', { place: context.place }) }])
  }, [context.place, t])

  async function ask(question: string) {
    const value = question.trim()
    if (!model || busy || !value) return
    setBusy(true)
    const userMessage: ChatMessage = { id: ++id.current, role: 'user', content: value }
    const assistantId = ++id.current
    setMessages((current) => [...current, userMessage, { id: assistantId, role: 'assistant', content: '…' }])
    history.current.push({ role: 'Guest', content: value })
    const prompt = buildGuidePrompt({ ...context, history: history.current })
    try {
      const result = await model(prompt, {
        cache: false,
        modelTier: 'quick',
        onText: (output) => setMessages((current) => current.map((message) => message.id === assistantId ? { ...message, content: output.text || '…' } : message)),
      })
      setMessages((current) => current.map((message) => message.id === assistantId ? { ...message, content: result.text } : message))
      history.current.push({ role: 'Guide', content: result.text })
    } catch (error) {
      const code = (error as { code?: string })?.code
      const content = code === 'rate_limited' ? t('ai.rateLimited') : code === 'not_granted' ? t('ai.permission') : t('ai.unavailable')
      setMessages((current) => current.map((message) => message.id === assistantId ? { ...message, content } : message))
      history.current.pop()
    } finally {
      setBusy(false)
    }
  }

  return { available: Boolean(model), open, messages, busy, ask, show: () => setOpen(true), close: () => setOpen(false) }
}
