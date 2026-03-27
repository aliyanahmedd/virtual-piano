// Generates a 4-octave note list starting from baseOctave
// e.g. baseOctave=2 → C2–B5  (28 white keys — closer to a real piano)
const NOTE_NAMES = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B']
const BLACK_NOTES = new Set(['C#','D#','F#','G#','A#'])
export const OCTAVE_SPAN = 4   // how many octaves are shown at once

export function generateNotes(baseOctave) {
  const notes = []
  for (let o = baseOctave; o < baseOctave + OCTAVE_SPAN; o++) {
    for (const name of NOTE_NAMES) {
      const id = name.replace('#', 's') + o
      notes.push({ id, name, octave: o, isBlack: BLACK_NOTES.has(name) })
    }
  }
  return notes
}

// Keyboard key → note-array index mapping.
// We map keys to octaves 3 and 4 within the 4-octave view (indices 24–47).
// Octaves 1 and 2 (indices 0–23) are click/touch only — no key label shown.
//
// Each octave has 12 notes; white-key indices within an octave: 0,2,4,5,7,9,11
// Octave 3 starts at index 24, octave 4 at index 36.
const KEY_POSITIONS = [
  // Octave 3 white keys
  ['a', 24],  // C
  ['s', 26],  // D
  ['d', 28],  // E
  ['f', 29],  // F
  ['g', 31],  // G
  ['h', 33],  // A
  ['j', 35],  // B
  // Octave 4 white keys
  ['k', 36],  // C
  ['l', 38],  // D
  [';', 40],  // E
  ["'", 41],  // F
  // Octave 3 black keys
  ['w', 25],  // C#
  ['e', 27],  // D#
  ['t', 30],  // F#
  ['y', 32],  // G#
  ['u', 34],  // A#
  // Octave 4 black keys
  ['o', 37],  // C#
  ['p', 39],  // D#
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

// Octave limits — lowest base is 1, highest is 5 (so 4 octaves always fit within 1–8)
export const MIN_OCTAVE = 1
export const MAX_OCTAVE = 5
