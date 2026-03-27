import { useState, useMemo, useCallback } from 'react'
import PianoKeyboard from './components/PianoKeyboard'
import Controls from './components/Controls'
import { useAudio } from './hooks/useAudio'
import { useKeyboard } from './hooks/useKeyboard'
import { generateNotes, generateKeyMap } from './utils/notes'
import './App.css'

const DEFAULT_SETTINGS = {
  volume:  80,
  reverb:  25,
  sustain: false,
}

function App() {
  const [activeKeys, setActiveKeys] = useState(new Set())
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)
  const [octave, setOctave] = useState(3)  // base octave — shows octave & octave+1

  // Recompute notes and key map whenever octave changes
  // useMemo means this only recalculates when octave actually changes, not every render
  const notes = useMemo(() => generateNotes(octave), [octave])
  const { keyMap, keyLabels } = useMemo(() => generateKeyMap(octave), [octave])

  const { playNote, stopNote } = useAudio(settings)

  const handlePress = useCallback((noteId) => {
    setActiveKeys(prev => new Set([...prev, noteId]))
    playNote(noteId)
  }, [playNote])

  const handleRelease = useCallback((noteId) => {
    setActiveKeys(prev => {
      const next = new Set(prev)
      next.delete(noteId)
      return next
    })
    stopNote(noteId)
  }, [stopNote])

  // When octave changes, release all held keys so nothing gets stuck
  function handleOctaveChange(newOctave) {
    activeKeys.forEach(noteId => stopNote(noteId))
    setActiveKeys(new Set())
    setOctave(newOctave)
  }

  function handleSettingChange(key, value) {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  useKeyboard(keyMap, handlePress, handleRelease)

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
        <Controls
          settings={settings}
          onSettingChange={handleSettingChange}
          octave={octave}
          onOctaveChange={handleOctaveChange}
        />
        <PianoKeyboard
          notes={notes}
          keyLabels={keyLabels}
          activeKeys={activeKeys}
          onPress={handlePress}
          onRelease={handleRelease}
        />
      </main>

      <footer className="app-footer">
        <p>A–J · K–; for two octaves &nbsp;·&nbsp; W E T Y U · O P for black keys</p>
      </footer>
    </div>
  )
}

export default App
