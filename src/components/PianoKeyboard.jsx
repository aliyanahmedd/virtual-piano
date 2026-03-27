import { useState } from 'react'
import { NOTES } from '../utils/notes'
import PianoKey from './PianoKey'
import './PianoKeyboard.css'

// How far to offset each black key from the left edge of the keyboard (in px)
// On a real piano, black keys are NOT evenly spaced — they cluster in groups of 2 and 3
// These offsets match the exact positions of a standard 88-key piano keyboard
// White key width = 52px, black key width = 34px
// A black key sits centered between the two white keys it belongs to
// So C# sits at: C_left + 52 - 34/2 = 35px from C
const BLACK_KEY_OFFSETS = {
  // Per-note offsets within one octave (in px, from the left of that octave)
  'C#': 35,   // Between C and D
  'D#': 87,   // Between D and E
  'F#': 191,  // Between F and G
  'G#': 243,  // Between G and A
  'A#': 295,  // Between A and B
}

function PianoKeyboard({ activeKeys, onPress, onRelease }) {
  // Separate white and black keys so we can layer them correctly
  const whiteKeys = NOTES.filter(n => !n.isBlack)
  const blackKeys  = NOTES.filter(n =>  n.isBlack)

  // Total width of the keyboard = number of white keys × white key width
  const WHITE_KEY_WIDTH = 52

  // Calculate the absolute left position of each black key
  // We need to know: how many white keys came before this octave?
  function getBlackKeyLeft(note) {
    // Count white keys in octaves before this one (each octave has 7 white keys)
    const octaveOffset = (note.octave - 3) * 7 * WHITE_KEY_WIDTH
    return octaveOffset + BLACK_KEY_OFFSETS[note.name]
  }

  return (
    <div className="keyboard-wrap">
      <div className="keyboard-body">
        {/* White keys form the base layer */}
        <div className="keyboard-white-layer">
          {whiteKeys.map(note => (
            <PianoKey
              key={note.id}
              note={note}
              isActive={activeKeys.has(note.id)}
              onPress={onPress}
              onRelease={onRelease}
            />
          ))}
        </div>

        {/* Black keys sit on top, absolutely positioned */}
        <div className="keyboard-black-layer">
          {blackKeys.map(note => (
            <div
              key={note.id}
              style={{ left: getBlackKeyLeft(note) + 'px' }}
              className="black-key-positioner"
            >
              <PianoKey
                note={note}
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
