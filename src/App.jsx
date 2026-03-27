import { useState, useCallback } from 'react'
import PianoKeyboard from './components/PianoKeyboard'
import { useAudio } from './hooks/useAudio'
import { useKeyboard } from './hooks/useKeyboard'
import './App.css'

// Default settings — will be controlled by the panel in step 6
const DEFAULT_SETTINGS = {
  volume:  80,   // 0-100
  reverb:  25,   // 0-100
  sustain: false,
}

function App() {
  const [activeKeys, setActiveKeys] = useState(new Set())
  const [settings] = useState(DEFAULT_SETTINGS)

  // Audio engine — handles sample loading, playback, effects
  const { playNote, stopNote } = useAudio(settings)

  // Press: add to visual activeKeys AND play the sound
  const handlePress = useCallback((noteId) => {
    setActiveKeys(prev => new Set([...prev, noteId]))
    playNote(noteId)
  }, [playNote])

  // Release: remove from visual activeKeys AND tell audio to release
  const handleRelease = useCallback((noteId) => {
    setActiveKeys(prev => {
      const next = new Set(prev)
      next.delete(noteId)
      return next
    })
    stopNote(noteId)
  }, [stopNote])

  // Physical keyboard → piano keys
  useKeyboard(handlePress, handleRelease)

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header__brand">
          <span className="app-header__ornament">✦</span>
          <h1 className="app-header__title">Grand Piano</h1>
          <span className="app-header__ornament">✦</span>
        </div>
        <p className="app-header__sub">Virtual Concert Grand</p>
      </header>

      <main className="app-main">
        <PianoKeyboard
          activeKeys={activeKeys}
          onPress={handlePress}
          onRelease={handleRelease}
        />
      </main>

      <footer className="app-footer">
        <p>Click keys · Use keyboard (A–J, K–; for two octaves) · Touch on mobile</p>
      </footer>
    </div>
  )
}

export default App
