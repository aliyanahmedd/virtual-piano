// Converts our internal note IDs to Tone.js note names
// Our format:  'C3', 'Cs3', 'Ds4', 'Fs3', 'Gs3', 'As4'
// Tone.js format: 'C3', 'C#3', 'D#4', 'F#3', 'G#3', 'A#4'
export function toToneName(noteId) {
  // 'Cs3' → 'C#3'  (insert # between letter and s-octave group)
  return noteId.replace(/([A-G])s(\d)/, '$1#$2')
}
