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

// Keyboard mapping — mapped to the MIDDLE two octaves of the 4-octave view
// so the labels always appear in the center of the keyboard (most visible).
//
// With 4 octaves visible (indices 0–47):
//   Octave 1 = 0–11   (click/touch only, leftmost)
//   Octave 2 = 12–23  (click/touch only)
//   Octave 3 = 24–35  ← A row keyboard shortcuts
//   Octave 4 = 36–47  ← Q row keyboard shortcuts
//
//  A S D F G H J  →  white keys of octave 3
//  Q W E R T Y U  →  white keys of octave 4
//  1 2 3 4 5      →  black keys of octave 3
//  6 7 8 9 0      →  black keys of octave 4
const KEY_POSITIONS = [
  // ── Octave 3 white keys — A row ──────────────────────────
  ['a', 24],   // C
  ['s', 26],   // D
  ['d', 28],   // E
  ['f', 29],   // F
  ['g', 31],   // G
  ['h', 33],   // A
  ['j', 35],   // B
  // ── Octave 4 white keys — Q row ──────────────────────────
  ['q', 36],   // C
  ['w', 38],   // D
  ['e', 40],   // E
  ['r', 41],   // F
  ['t', 43],   // G
  ['y', 45],   // A
  ['u', 47],   // B
  // ── Octave 3 black keys — 1 2 3 4 5 ─────────────────────
  ['1', 25],   // C#
  ['2', 27],   // D#
  ['3', 30],   // F#
  ['4', 32],   // G#
  ['5', 34],   // A#
  // ── Octave 4 black keys — 6 7 8 9 0 ─────────────────────
  ['6', 37],   // C#
  ['7', 39],   // D#
  ['8', 42],   // F#
  ['9', 44],   // G#
  ['0', 46],   // A#
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
