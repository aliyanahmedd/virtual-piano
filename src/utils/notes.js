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

// Keyboard mapping — intuitive layout starting from the leftmost visible key:
//
//  White keys  →  letter keys starting at A (home row + extras)
//  Black keys  →  number keys 1–0
//
// With 4 octaves visible (base → base+3), we map the LEFT two octaves so
// 'A' always lands on the leftmost key the user sees.
//
// Each octave = 12 notes. White-key indices within an octave: 0,2,4,5,7,9,11
// Octave 1 of the view = indices  0–11
// Octave 2 of the view = indices 12–23
const KEY_POSITIONS = [
  // ── Octave 1 white keys (A S D F G H J) ──────────────────
  ['a',  0],   // C
  ['s',  2],   // D
  ['d',  4],   // E
  ['f',  5],   // F
  ['g',  7],   // G
  ['h',  9],   // A
  ['j', 11],   // B
  // ── Octave 2 white keys (K L ; ' Z X C) ──────────────────
  ['k', 12],   // C
  ['l', 14],   // D
  [';', 16],   // E
  ["'", 17],   // F
  ['z', 19],   // G
  ['x', 21],   // A
  ['c', 23],   // B
  // ── Octave 1 black keys (1 2 3 4 5) ──────────────────────
  ['1',  1],   // C#
  ['2',  3],   // D#
  ['3',  6],   // F#
  ['4',  8],   // G#
  ['5', 10],   // A#
  // ── Octave 2 black keys (6 7 8 9 0) ──────────────────────
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
