import { useState, useMemo, useCallback } from 'react'
import PianoKeyboard from './components/PianoKeyboard'
import Controls from './components/Controls'
import NoteDisplay from './components/NoteDisplay'
import LoadingOverlay from './components/LoadingOverlay'
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
  const [octave, setOctave] = useState(2)

  const notes = useMemo(() => generateNotes(octave), [octave])
  const { keyMap, keyLabels } = useMemo(() => generateKeyMap(octave), [octave])

  const { playNote, stopNote, loadState } = useAudio(settings)

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

  function handleOctaveChange(newOctave) {
    activeKeys.forEach(id => stopNote(id))
    setActiveKeys(new Set())
    setOctave(newOctave)
  }

  function handleSettingChange(key, value) {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  // Spacebar toggles sustain — same as clicking the sustain button
  const handleSustainToggle = useCallback(() => {
    setSettings(prev => ({ ...prev, sustain: !prev.sustain }))
  }, [])

  useKeyboard(keyMap, handlePress, handleRelease, handleSustainToggle)

  const isPlaying = activeKeys.size > 0

  return (
    <div className={`app ${isPlaying ? 'app--playing' : ''}`}>
      <LoadingOverlay loadState={loadState} />

      <header className="app-header">
        <div className="app-header__brand">
          <span className="app-header__ornament">✦</span>
          <h1 className="app-header__title">Grand Piano</h1>
          <span className="app-header__ornament">✦</span>
        </div>
        <p className="app-header__sub">Virtual Concert Grand</p>
      </header>

      <NoteDisplay activeKeys={activeKeys} notes={notes} />

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
        <div className="app-footer__row">
          <span>A – J &nbsp;·&nbsp; K ; ' &nbsp;=&nbsp; two octaves</span>
          <span className="app-footer__dot">◆</span>
          <span>W E T Y U &nbsp;·&nbsp; O P &nbsp;=&nbsp; black keys</span>
          <span className="app-footer__dot">◆</span>
          <span>Space &nbsp;=&nbsp; sustain</span>
        </div>
      </footer>
    </div>
  )
}

export default App
