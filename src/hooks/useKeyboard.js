import { useEffect, useRef } from 'react'

// keyMap is now passed in (dynamic — changes with octave shift)
export function useKeyboard(keyMap, onPress, onRelease) {
  const heldKeys = useRef(new Set())
  // Keep a ref to the latest keyMap so the event handlers always see current octave
  const keyMapRef = useRef(keyMap)
  useEffect(() => { keyMapRef.current = keyMap }, [keyMap])

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.metaKey || e.ctrlKey || e.target.tagName === 'INPUT') return
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
  }, [onPress, onRelease])
}
