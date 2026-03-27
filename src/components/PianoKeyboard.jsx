import './PianoKeyboard.css'
import PianoKey from './PianoKey'

const BLACK_KEY_OFFSETS = {
  'C#': 31,
  'D#': 77,
  'F#': 169,
  'G#': 215,
  'A#': 261,
}
const WHITE_KEY_SLOT = 46

function PianoKeyboard({ notes, keyLabels, activeKeys, onPress, onRelease }) {
  const whiteKeys = notes.filter(n => !n.isBlack)
  const blackKeys  = notes.filter(n =>  n.isBlack)
  const baseOctave = notes[0]?.octave ?? 1

  function getBlackKeyLeft(note) {
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
