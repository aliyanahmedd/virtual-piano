import { useState } from 'react'
import PianoKeyboard from './components/PianoKeyboard'
import './App.css'

function App() {
  // activeKeys is a Set of note IDs currently being held down
  // Using a Set means we can press multiple keys simultaneously (chords)
  const [activeKeys, setActiveKeys] = useState(new Set())

  function handlePress(noteId) {
    setActiveKeys(prev => new Set([...prev, noteId]))
  }

  function handleRelease(noteId) {
    setActiveKeys(prev => {
      const next = new Set(prev)
      next.delete(noteId)
      return next
    })
  }

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
        <p>Click keys · Use keyboard · Touch on mobile</p>
      </footer>
    </div>
  )
}

export default App
