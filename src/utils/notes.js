// All notes across 2 octaves (C3 to B4)
// Each note has: id, name, octave, isBlack, and the keyboard key that triggers it
// We expose two octaves so the user has 24 notes to work with

export const NOTES = [
  // Octave 3
  { id: 'C3',  name: 'C',  octave: 3, isBlack: false },
  { id: 'Cs3', name: 'C#', octave: 3, isBlack: true  },
  { id: 'D3',  name: 'D',  octave: 3, isBlack: false },
  { id: 'Ds3', name: 'D#', octave: 3, isBlack: true  },
  { id: 'E3',  name: 'E',  octave: 3, isBlack: false },
  { id: 'F3',  name: 'F',  octave: 3, isBlack: false },
  { id: 'Fs3', name: 'F#', octave: 3, isBlack: true  },
  { id: 'G3',  name: 'G',  octave: 3, isBlack: false },
  { id: 'Gs3', name: 'G#', octave: 3, isBlack: true  },
  { id: 'A3',  name: 'A',  octave: 3, isBlack: false },
  { id: 'As3', name: 'A#', octave: 3, isBlack: true  },
  { id: 'B3',  name: 'B',  octave: 3, isBlack: false },
  // Octave 4
  { id: 'C4',  name: 'C',  octave: 4, isBlack: false },
  { id: 'Cs4', name: 'C#', octave: 4, isBlack: true  },
  { id: 'D4',  name: 'D',  octave: 4, isBlack: false },
  { id: 'Ds4', name: 'D#', octave: 4, isBlack: true  },
  { id: 'E4',  name: 'E',  octave: 4, isBlack: false },
  { id: 'F4',  name: 'F',  octave: 4, isBlack: false },
  { id: 'Fs4', name: 'F#', octave: 4, isBlack: true  },
  { id: 'G4',  name: 'G',  octave: 4, isBlack: false },
  { id: 'Gs4', name: 'G#', octave: 4, isBlack: true  },
  { id: 'A4',  name: 'A',  octave: 4, isBlack: false },
  { id: 'As4', name: 'A#', octave: 4, isBlack: true  },
  { id: 'B4',  name: 'B',  octave: 4, isBlack: false },
]

// Keyboard key → note id mapping (QWERTY layout, two rows)
// Bottom row (white keys): A S D F G H J  |  K L ; '
// Top row (black keys):    W E   T Y U    |  O P
export const KEY_MAP = {
  // Octave 3 white keys
  'a': 'C3',
  's': 'D3',
  'd': 'E3',
  'f': 'F3',
  'g': 'G3',
  'h': 'A3',
  'j': 'B3',
  // Octave 3 black keys
  'w': 'Cs3',
  'e': 'Ds3',
  't': 'Fs3',
  'y': 'Gs3',
  'u': 'As3',
  // Octave 4 white keys
  'k': 'C4',
  'l': 'D4',
  ';': 'E4',
  "'": 'F4',
  // Octave 4 black keys (fewer because of screen space)
  'o': 'Cs4',
  'p': 'Ds4',
}

// Display label for each key (what to show on the piano key)
export const KEY_LABELS = Object.fromEntries(
  Object.entries(KEY_MAP).map(([key, noteId]) => [noteId, key.toUpperCase()])
)
