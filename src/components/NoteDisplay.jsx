import './NoteDisplay.css'

// Shows the currently pressed notes in real time
// activeKeys is a Set of note IDs like 'C3', 'Gs4'
function NoteDisplay({ activeKeys, notes }) {
  // Build a lookup so we can get the pretty name (e.g. "G#4") from a note ID
  const noteById = Object.fromEntries(notes.map(n => [n.id, n]))

  const active = [...activeKeys]
    .map(id => noteById[id])
    .filter(Boolean)
    .map(n => n.name + n.octave)

  return (
    <div className="note-display">
      {active.length === 0
        ? <span className="note-display__placeholder">— play a note —</span>
        : active.map(label => (
            <span key={label} className="note-display__chip">{label}</span>
          ))
      }
    </div>
  )
}

export default NoteDisplay
