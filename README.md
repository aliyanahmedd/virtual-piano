# Grand Piano — Virtual Concert Grand

A luxury virtual piano you can play with your computer keyboard or by touch on mobile. Built with React + Vite, powered by real Steinway grand piano audio samples.

## Keyboard Controls

| Keys | Notes |
|------|-------|
| `A S D F G H J` | White keys — octave 1 |
| `Q W E R T Y U` | White keys — octave 2 |
| `Z X C V B N M` | White keys — octave 3 |
| `1 2 3 4 5` | Black keys — octave 1 |
| `6 7 8 9 0` | Black keys — octave 2 |
| `I O P [ ]` | Black keys — octave 3 |
| `Space` | Sustain pedal |

## Features

- Real Steinway grand piano samples (Salamander Grand Piano)
- 3 fully keyboard-mapped octaves — every visible key has a shortcut
- Volume, reverb and sustain controls
- Octave shift — play any range on the piano
- Live note display
- Touch screen support for mobile and tablet
- Luxury dark lacquer design with gold accents

## Run locally

```bash
npm install
npm run dev
```

## Tech Stack

- React 19 + Vite
- Tone.js (Web Audio engine + reverb)
- Salamander Grand Piano samples
- Plain CSS
