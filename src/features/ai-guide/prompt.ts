import type { Locale } from '../language/language'

export interface GuideHistoryMessage { role: 'Guest' | 'Guide'; content: string }

export interface GuidePromptInput {
  locale: Locale
  place: string
  location: string
  description: string
  viewpoint: string
  details: string[]
  history: GuideHistoryMessage[]
}

const languageNames: Record<Locale, string> = { en: 'English', vi: 'Vietnamese', de: 'German', ko: 'Korean', ja: 'Japanese' }

export function buildGuidePrompt(input: GuidePromptInput): string {
  const history = input.history.slice(-8).map((message) => `${message.role}: ${message.content}`).join('\n')
  return `You are a friendly travel guide in a 360° virtual tour. Place: ${input.place} (${input.location}). Description: ${input.description} Current viewpoint: ${input.viewpoint}. Visible details: ${input.details.join('; ') || 'none'}. Respond in ${languageNames[input.locale]}, in plain text, using at most 90 words. Use the supplied context and reliable general knowledge. If you are unsure about a fact or number, say so clearly and do not invent it.\n\nConversation:\n${history}\nGuide:`
}
