import './PianoKeyboard.css'
import PianoKey from './PianoKey'

// White key: 44px + 2px gap = 46px per slot
// Black key: 28px, centered between its two neighbors
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

  // Find the left/right boundaries of the keyboard-shortcut zone so we can
  // draw a gold highlight bracket under those keys
  const shortcutNoteIds = new Set(Object.keys(keyLabels))
  const shortcutWhiteKeys = whiteKeys.filter(n => shortcutNoteIds.has(n.id))
  let zoneLeft = null
  let zoneWidth = null
  if (shortcutWhiteKeys.length > 0) {
    // Position of the first shortcut white key in the row
    const firstIdx = whiteKeys.indexOf(shortcutWhiteKeys[0])
    const lastIdx  = whiteKeys.indexOf(shortcutWhiteKeys[shortcutWhiteKeys.length - 1])
    zoneLeft  = firstIdx * WHITE_KEY_SLOT
    zoneWidth = (lastIdx - firstIdx + 1) * WHITE_KEY_SLOT - 2  // -2 = last gap
  }

  return (
    <div className="keyboard-wrap">
      <div className="keyboard-body">

        {/* Gold bracket showing which keys have keyboard shortcuts */}
        {zoneLeft !== null && (
          <div
            className="keyboard-zone"
            style={{ left: zoneLeft + 20, width: zoneWidth }}
            title="These keys are mapped to your keyboard (A–J, Q–U, 1–0)"
          >
            <span className="keyboard-zone__label">keyboard zone</span>
          </div>
        )}

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
