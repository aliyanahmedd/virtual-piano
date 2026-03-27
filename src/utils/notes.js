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

// Keyboard mapping — two reliable rows:
//
//  A row  →  white keys of left octave   (A S D F G H J)
//  Q row  →  white keys of right octave  (Q W E R T Y U)
//  Numbers →  black keys in order        (1 2 3 4 5 · 6 7 8 9 0)
//
// Maps to the LEFT two octaves of the 4-octave view so 'A' = leftmost key.
// Each octave = 12 notes. White indices in one octave: 0,2,4,5,7,9,11
const KEY_POSITIONS = [
  // ── Octave 1 white keys — A row ───────────────────────────
  ['a',  0],   // C
  ['s',  2],   // D
  ['d',  4],   // E
  ['f',  5],   // F
  ['g',  7],   // G
  ['h',  9],   // A
  ['j', 11],   // B
  // ── Octave 2 white keys — Q row ───────────────────────────
  ['q', 12],   // C
  ['w', 14],   // D
  ['e', 16],   // E
  ['r', 17],   // F
  ['t', 19],   // G
  ['y', 21],   // A
  ['u', 23],   // B
  // ── Octave 1 black keys — numbers 1–5 ────────────────────
  ['1',  1],   // C#
  ['2',  3],   // D#
  ['3',  6],   // F#
  ['4',  8],   // G#
  ['5', 10],   // A#
  // ── Octave 2 black keys — numbers 6–0 ────────────────────
  ['6', 13],   // C#
  ['7', 15],   // D#
  ['8', 18],   // F#
  ['9', 20],   // G#
  ['0', 22],   // A#
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
      // Digits and special chars display as-is; letters go uppercase
      keyLabels[noteId] = key
    }
  }

  return { keyMap, keyLabels }
}

// Octave limits — lowest base is 1, highest is 5 (so 4 octaves always fit within 1–8)
export const MIN_OCTAVE = 1
export const MAX_OCTAVE = 5
