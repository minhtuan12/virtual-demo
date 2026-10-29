import { useTranslation } from 'react-i18next'

export function Intro({ ready, hidden, onStart }: { ready: boolean; hidden: boolean; onStart(): void }) {
  const { t } = useTranslation()
  return <div className={`intro ${hidden ? 'hide' : ''}`}><div className="gl intro-panel"><h1>{t('intro.title')}</h1><p>{t('intro.body')}</p><button disabled={!ready} onClick={onStart}>{t(ready ? 'intro.start' : 'intro.loading')}</button></div></div>
}
