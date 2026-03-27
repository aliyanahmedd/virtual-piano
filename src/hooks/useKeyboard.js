import { useEffect, useRef } from 'react'
import { KEY_MAP } from '../utils/notes'

// Listens to the physical keyboard and calls onPress/onRelease
// with the matching note ID (e.g. pressing 'A' → 'C3')
export function useKeyboard(onPress, onRelease) {
  // Track which keys are physically held to prevent the browser's
  // key-repeat firing onPress dozens of times while holding a key
  const heldKeys = useRef(new Set())

  useEffect(() => {
    function handleKeyDown(e) {
      // Ignore if modifier keys are held (Ctrl+S etc) or if we're
      // typing in an input field somewhere on the page
      if (e.metaKey || e.ctrlKey || e.target.tagName === 'INPUT') return

      const key = e.key.toLowerCase()
      const noteId = KEY_MAP[key]
      if (!noteId) return
      if (heldKeys.current.has(key)) return  // already held, ignore repeat

      heldKeys.current.add(key)
      onPress(noteId)
    }

    function handleKeyUp(e) {
      const key = e.key.toLowerCase()
      const noteId = KEY_MAP[key]
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
  }, [onPress, onRelease])
}
