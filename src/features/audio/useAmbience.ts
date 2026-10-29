import { useEffect, useRef, useState } from 'react'
import { AmbienceController } from './ambience'

export function useAmbience(destinationId: string) {
  const controller = useRef<AmbienceController | null>(null)
  const [enabled, setEnabled] = useState(false)
  controller.current ??= new AmbienceController()

  useEffect(() => { if (enabled) controller.current?.setProfile(destinationId) }, [destinationId, enabled])
  useEffect(() => () => { void controller.current?.dispose() }, [])

  return {
    enabled,
    async toggle() {
      if (enabled) { controller.current?.disable(); setEnabled(false); return false }
      await controller.current?.enable(destinationId)
      setEnabled(true)
      return true
    },
  }
}
