import './PianoKeyboard.css'
import PianoKey from './PianoKey'

// White key: 44px wide + 2px gap = 46px per slot
// Black key: 28px wide, centered between adjacent white keys
//
// Centers of white keys within one octave (44px key, 2px gap):
//   C=22  D=68  E=114  F=160  G=206  A=252  B=298
// Black key left = midpoint of its two neighbors − (28/2)
const BLACK_KEY_OFFSETS = {
  'C#': 31,   // (22+68)/2 − 14
  'D#': 77,   // (68+114)/2 − 14
  'F#': 169,  // (160+206)/2 − 14
  'G#': 215,  // (206+252)/2 − 14
  'A#': 261,  // (252+298)/2 − 14
}

const WHITE_KEY_SLOT = 46  // 44px key + 2px gap

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
