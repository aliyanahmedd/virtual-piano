import { useState, useMemo, useCallback, useRef, useEffect } from 'react'
import PianoKeyboard from './components/PianoKeyboard'
import Controls from './components/Controls'
import NoteDisplay from './components/NoteDisplay'
import LoadingOverlay from './components/LoadingOverlay'
import SongSearch from './components/SongSearch'
import Teleprompter from './components/Teleprompter'
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
  const [settings, setSettings]     = useState(DEFAULT_SETTINGS)
  const [octave, setOctave]         = useState(1)
  const [activeSong, setActiveSong] = useState(null)
  const [songPos, setSongPos]       = useState({ line: 0, key: 0 })

  // Stable refs so handlePress never needs to be recreated when pos changes
  const activeSongRef = useRef(null)
  const songPosRef    = useRef({ line: 0, key: 0 })
  useEffect(() => { activeSongRef.current = activeSong }, [activeSong])
  useEffect(() => { songPosRef.current = songPos }, [songPos])

  const notes                             = useMemo(() => generateNotes(octave), [octave])
  const { keyMap, keyLabels }             = useMemo(() => generateKeyMap(octave), [octave])
  const { playNote, stopNote, loadState } = useAudio(settings)

  const handlePress = useCallback((noteId, rawKey) => {
    setActiveKeys(prev => new Set([...prev, noteId]))
    playNote(noteId)

    // Song guide: advance only when the correct keyboard key is pressed
    const song = activeSongRef.current
    if (song && rawKey) {
      const pos      = songPosRef.current
      const expected = song.lines[pos.line]?.[pos.key]?.toLowerCase()
      if (rawKey === expected) {
        setSongPos(prev => {
          const lineLen = song.lines[prev.line].length
          if (prev.key + 1 < lineLen)                  return { line: prev.line, key: prev.key + 1 }
          if (prev.line + 1 < song.lines.length)        return { line: prev.line + 1, key: 0 }
          return prev // song complete — stay at end
        })
      }
    }
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

  const handleSustainToggle = useCallback(() => {
    setSettings(prev => ({ ...prev, sustain: !prev.sustain }))
  }, [])

  function handleSongSelect(song) {
    activeKeys.forEach(id => stopNote(id))
    setActiveKeys(new Set())
    setSettings({
      volume:  song.settings.volume,
      reverb:  song.settings.reverb,
      sustain: song.settings.sustain,
    })
    setOctave(song.settings.octave)
    setActiveSong(song)
    setSongPos({ line: 0, key: 0 })
  }

  function handleSongClose() {
    setActiveSong(null)
    setSongPos({ line: 0, key: 0 })
  }

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

      {!activeSong && <NoteDisplay activeKeys={activeKeys} notes={notes} />}

      <div className="app-guide">
        {activeSong ? (
          <Teleprompter
            song={activeSong}
            songPos={songPos}
            onClose={handleSongClose}
          />
        ) : (
          <SongSearch onSelect={handleSongSelect} />
        )}
      </div>

      <main className="app-main">
        {/* piano-stage keeps controls + keyboard as one fixed-size block */}
        <div className="piano-stage">
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
        </div>
      </main>

      <footer className="app-footer">
        <div className="app-footer__row">
          <span>A–J &nbsp;·&nbsp; Q–U &nbsp;·&nbsp; Z–M &nbsp;=&nbsp; white keys</span>
          <span className="app-footer__dot">◆</span>
          <span>1–5 &nbsp;·&nbsp; 6–0 &nbsp;·&nbsp; I O P [ ] &nbsp;=&nbsp; black keys</span>
          <span className="app-footer__dot">◆</span>
          <span>Space &nbsp;=&nbsp; sustain</span>
        </div>
      </footer>
    </div>
  )
}

export default App
