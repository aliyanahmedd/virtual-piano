import './PianoKey.css'

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
      <span className="piano-key__note">{note.name}{note.octave}</span>
      {keyLabel && <span className="piano-key__label">{keyLabel}</span>}
    </div>
  )
}

export default PianoKey
