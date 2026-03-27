import './PianoKeyboard.css'
import PianoKey from './PianoKey'

// Black key left-offsets within one octave (from left edge of that octave)
// White key width = 52px + 2px gap = 54px per slot
// Black key (34px wide) centered between adjacent white keys
const BLACK_KEY_OFFSETS = {
  'C#': 35,
  'D#': 87,
  'F#': 191,
  'G#': 243,
  'A#': 295,
}

const WHITE_KEY_SLOT = 54  // 52px key + 2px gap

function PianoKeyboard({ notes, keyLabels, activeKeys, onPress, onRelease }) {
  const whiteKeys = notes.filter(n => !n.isBlack)
  const blackKeys  = notes.filter(n =>  n.isBlack)

  // Absolute left position of a black key on the full keyboard
  function getBlackKeyLeft(note) {
    // How many white keys come before this octave?
    // Each octave has 7 white keys. baseOctave is the first octave in the list.
    const baseOctave = notes[0].octave
    const octaveOffset = (note.octave - baseOctave) * 7 * WHITE_KEY_SLOT
    return octaveOffset + BLACK_KEY_OFFSETS[note.name]
  }

  return (
    <div className="keyboard-wrap">
      <div className="keyboard-body">
        <div className="keyboard-white-layer">
          {whiteKeys.map(note => (
            <PianoKey
              key={note.id}
              note={note}
              keyLabel={keyLabels[note.id]}
              isActive={activeKeys.has(note.id)}
              onPress={onPress}
              onRelease={onRelease}
            />
          ))}
        </div>
        <div className="keyboard-black-layer">
          {blackKeys.map(note => (
            <div
              key={note.id}
              style={{ left: getBlackKeyLeft(note) + 'px' }}
              className="black-key-positioner"
            >
              <PianoKey
                note={note}
                keyLabel={keyLabels[note.id]}
                isActive={activeKeys.has(note.id)}
                onPress={onPress}
                onRelease={onRelease}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PianoKeyboard
