// Generates a 4-octave note list starting from baseOctave
// e.g. baseOctave=2 → C2–B5  (28 white keys — closer to a real piano)
const NOTE_NAMES = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B']
const BLACK_NOTES = new Set(['C#','D#','F#','G#','A#'])
export const OCTAVE_SPAN = 3   // 3 octaves — all covered by keyboard

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

// Full 3-octave keyboard mapping — every visible key has a shortcut.
//
// 3 octaves visible = 21 white keys + 15 black keys = 36 notes total.
// Each octave = 12 notes. White indices within one octave: 0,2,4,5,7,9,11
//
//  White keys:  A-row = octave 1 · Q-row = octave 2 · Z-row = octave 3
//  Black keys:  1-5   = octave 1 · 6-0   = octave 2 · I O P [ ] = octave 3
const KEY_POSITIONS = [
  // ── Octave 1 white (A S D F G H J) ──────────────────────
  ['a',  0],  // C
  ['s',  2],  // D
  ['d',  4],  // E
  ['f',  5],  // F
  ['g',  7],  // G
  ['h',  9],  // A
  ['j', 11],  // B
  // ── Octave 2 white (Q W E R T Y U) ──────────────────────
  ['q', 12],  // C
  ['w', 14],  // D
  ['e', 16],  // E
  ['r', 17],  // F
  ['t', 19],  // G
  ['y', 21],  // A
  ['u', 23],  // B
  // ── Octave 3 white (Z X C V B N M) ──────────────────────
  ['z', 24],  // C
  ['x', 26],  // D
  ['c', 28],  // E
  ['v', 29],  // F
  ['b', 31],  // G
  ['n', 33],  // A
  ['m', 35],  // B
  // ── Octave 1 black (1 2 3 4 5) ───────────────────────────
  ['1',  1],  // C#
  ['2',  3],  // D#
  ['3',  6],  // F#
  ['4',  8],  // G#
  ['5', 10],  // A#
  // ── Octave 2 black (6 7 8 9 0) ───────────────────────────
  ['6', 13],  // C#
  ['7', 15],  // D#
  ['8', 18],  // F#
  ['9', 20],  // G#
  ['0', 22],  // A#
  // ── Octave 3 black (I O P [ ]) ───────────────────────────
  ['i', 25],  // C#
  ['o', 27],  // D#
  ['p', 30],  // F#
  ['[', 32],  // G#
  [']', 34],  // A#
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
