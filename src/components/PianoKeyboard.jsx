import { useState, useEffect } from 'react'
import './PianoKeyboard.css'
import PianoKey from './PianoKey'

// Black key ratios relative to white key slot size (standard piano geometry)
const BLACK_KEY_RATIOS = { 'C#': 0.674, 'D#': 1.674, 'F#': 3.674, 'G#': 4.674, 'A#': 5.674 }

function getSlotSize() {
  return window.innerWidth <= 600 ? 36 : 46
}

function PianoKeyboard({ notes, keyLabels, activeKeys, onPress, onRelease }) {
  const [slotSize, setSlotSize] = useState(getSlotSize)

  useEffect(() => {
    const onResize = () => setSlotSize(getSlotSize())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const whiteKeys = notes.filter(n => !n.isBlack)
  const blackKeys  = notes.filter(n =>  n.isBlack)
  const baseOctave = notes[0]?.octave ?? 1

  function getBlackKeyLeft(note) {
    const octaveOffset = (note.octave - baseOctave) * 7 * slotSize
    return octaveOffset + Math.round(BLACK_KEY_RATIOS[note.name] * slotSize)
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
