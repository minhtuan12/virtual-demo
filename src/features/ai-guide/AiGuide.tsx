import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { AiGuideState } from './useAiGuide'

export function AiGuide({ guide }: { guide: AiGuideState }) {
  const { t } = useTranslation()
  const [value, setValue] = useState('')
  const submit = () => { const question = value; setValue(''); void guide.ask(question) }
  return <section className="chat gl" aria-label={t('ai.title')}>
    <header><strong>{t('ai.title')}</strong><button aria-label={t('controls.close')} onClick={guide.close}>×</button></header>
    <div className="chat-messages">{guide.messages.map((message) => <div key={message.id} className={`message ${message.role}`}>{message.content}</div>)}</div>
    <div className="chat-suggestions"><button onClick={() => void guide.ask(t('ai.suggestionSpecial'))}>{t('ai.suggestionSpecial')}</button><button onClick={() => void guide.ask(t('ai.suggestionSeason'))}>{t('ai.suggestionSeason')}</button></div>
    <div className="chat-form"><input value={value} maxLength={200} placeholder={t('ai.placeholder')} onChange={(event) => setValue(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') { event.preventDefault(); submit() } }} /><button disabled={guide.busy} onClick={submit}>{t('controls.send')}</button></div>
  </section>
}
