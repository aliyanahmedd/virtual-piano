import { KEY_LABELS } from '../utils/notes'
import './PianoKey.css'

// A single piano key — white or black
// Props:
//   note       — the note object from notes.js
//   isActive   — true when this key is currently being pressed (shows glow)
//   onPress    — called when the user clicks/touches the key down
//   onRelease  — called when the user releases
function PianoKey({ note, isActive, onPress, onRelease }) {
  const keyLabel = KEY_LABELS[note.id]
  const className = [
    'piano-key',
    note.isBlack ? 'piano-key--black' : 'piano-key--white',
    isActive ? 'piano-key--active' : '',
  ].join(' ')

  return (
    <div
      className={className}
      // Mouse events
      onMouseDown={() => onPress(note.id)}
      onMouseUp={() => onRelease(note.id)}
      onMouseLeave={() => isActive && onRelease(note.id)}
      // Touch events (preventDefault stops the page from scrolling while playing)
      onTouchStart={(e) => { e.preventDefault(); onPress(note.id) }}
      onTouchEnd={(e) => { e.preventDefault(); onRelease(note.id) }}
    >
      <span className="piano-key__note">{note.name}{note.octave}</span>
      {keyLabel && <span className="piano-key__label">{keyLabel}</span>}
    </div>
  )
}

export default PianoKey
