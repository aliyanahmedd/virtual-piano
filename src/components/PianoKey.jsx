import './PianoKey.css'

// A single piano key.
// Label priority:
//   1. If the key has a keyboard shortcut → show just the shortcut (A, S, 1, 2…)
//   2. If no shortcut → show just the note letter, no octave (C, D#…) very dimly
// Note + octave is shown in the NoteDisplay bar above when played, not here.
function PianoKey({ note, keyLabel, isActive, onPress, onRelease }) {
  const className = [
    'piano-key',
    note.isBlack ? 'piano-key--black' : 'piano-key--white',
    isActive ? 'piano-key--active' : '',
  ].join(' ')

  return (
    <div
      className={className}
      onMouseDown={() => onPress(note.id)}
      onMouseUp={() => onRelease(note.id)}
      onMouseLeave={() => isActive && onRelease(note.id)}
      onTouchStart={(e) => { e.preventDefault(); onPress(note.id) }}
      onTouchEnd={(e) => { e.preventDefault(); onRelease(note.id) }}
    >
      {keyLabel
        ? <span className="piano-key__label piano-key__label--shortcut">{keyLabel}</span>
        : <span className="piano-key__label piano-key__label--note">{note.name}</span>
      }
    </div>
  )
}

export default PianoKey
