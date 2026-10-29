import { useEffect, useMemo, useState } from 'react'
import { Narrator } from './voice'

export function useNarration(text: string) {
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window
  const narrator = useMemo(() => supported ? new Narrator(window.speechSynthesis) : null, [supported])
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (enabled) narrator?.speak(text)
  }, [enabled, narrator, text])

  useEffect(() => () => narrator?.stop(), [narrator])

  return {
    supported,
    enabled,
    toggle() {
      if (!supported || !narrator) return 'unsupported' as const
      if (enabled) { narrator.stop(); setEnabled(false); return 'disabled' as const }
      setEnabled(true)
      return 'enabled' as const
    },
    speakCurrent: () => narrator?.speak(text),
    stop: () => { narrator?.stop(); setEnabled(false) },
  }
}
