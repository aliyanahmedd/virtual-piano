// Generates a 2-octave note list starting from baseOctave
// e.g. baseOctave=3 → C3–B4, baseOctave=4 → C4–B5
const NOTE_NAMES = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B']
const BLACK_NOTES = new Set(['C#','D#','F#','G#','A#'])

export function generateNotes(baseOctave) {
  const notes = []
  for (let o = baseOctave; o <= baseOctave + 1; o++) {
    for (const name of NOTE_NAMES) {
      // Internal ID: 'C3', 'Cs3', 'Ds4' etc. (no # symbol — cleaner as object keys)
      const id = name.replace('#', 's') + o
      notes.push({ id, name, octave: o, isBlack: BLACK_NOTES.has(name) })
    }
  }
  return notes
}

// Keyboard key → position index mapping (always the same regardless of octave)
// Bottom row: white keys of octave 1 then octave 2
// Top row: black keys
const KEY_POSITIONS = [
  // [key, noteIndexWithinTwoOctaves]
  // Octave 1 white keys (indices 0,2,4,5,7,9,11)
  ['a', 0],  // C
  ['s', 2],  // D
  ['d', 4],  // E
  ['f', 5],  // F
  ['g', 7],  // G
  ['h', 9],  // A
  ['j', 11], // B
  // Octave 2 white keys (indices 12,14,16,17,19,21,23)
  ['k', 12], // C
  ['l', 14], // D
  [';', 16], // E
  ["'", 17], // F
  // Octave 1 black keys
  ['w', 1],  // C#
  ['e', 3],  // D#
  ['t', 6],  // F#
  ['y', 8],  // G#
  ['u', 10], // A#
  // Octave 2 black keys
  ['o', 13], // C#
  ['p', 15], // D#
]

// Build KEY_MAP and KEY_LABELS dynamically from baseOctave
export function generateKeyMap(baseOctave) {
  const notes = generateNotes(baseOctave)
  const keyMap = {}
  const keyLabels = {}

  for (const [key, index] of KEY_POSITIONS) {
    if (index < notes.length) {
      const noteId = notes[index].id
      keyMap[key] = noteId
      keyLabels[noteId] = key === ';' ? ';' : key === "'" ? "'" : key.toUpperCase()
    }
  }

  return { keyMap, keyLabels }
}

// Octave limits — lowest we go is 1, highest is 6 (so 2 octaves always fit)
export const MIN_OCTAVE = 1
export const MAX_OCTAVE = 6
