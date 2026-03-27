import { useEffect, useRef } from 'react'

// onSustainToggle — called when spacebar is pressed (toggles sustain pedal)
export function useKeyboard(keyMap, onPress, onRelease, onSustainToggle) {
  const heldKeys  = useRef(new Set())
  const keyMapRef = useRef(keyMap)
  useEffect(() => { keyMapRef.current = keyMap }, [keyMap])

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.metaKey || e.ctrlKey || e.target.tagName === 'INPUT') return

      // Spacebar toggles sustain — preventDefault stops page scroll
      if (e.key === ' ') {
        e.preventDefault()
        onSustainToggle?.()
        return
      }

      const key = e.key === ';' ? ';' : e.key === "'" ? "'" : e.key.toLowerCase()
      const noteId = keyMapRef.current[key]
      if (!noteId) return
      if (heldKeys.current.has(key)) return
      heldKeys.current.add(key)
      onPress(noteId)
    }

    function handleKeyUp(e) {
      const key = e.key === ';' ? ';' : e.key === "'" ? "'" : e.key.toLowerCase()
      const noteId = keyMapRef.current[key]
      if (!noteId) return
      heldKeys.current.delete(key)
      onRelease(noteId)
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [onPress, onRelease, onSustainToggle])
}
