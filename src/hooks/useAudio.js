import { useRef, useEffect, useCallback } from 'react'
import * as Tone from 'tone'
import { toToneName } from '../utils/noteConvert'

// Salamander Grand Piano — real recordings of a Steinway grand.
// We load one sample every few semitones; Tone.Sampler fills in the rest
// by pitch-shifting the nearest sample. This is standard in all real samplers.
const SAMPLE_URLS = {
  'C3':  'C3.mp3',
  'Ds3': 'Ds3.mp3',
  'Fs3': 'Fs3.mp3',
  'A3':  'A3.mp3',
  'C4':  'C4.mp3',
  'Ds4': 'Ds4.mp3',
  'Fs4': 'Fs4.mp3',
  'A4':  'A4.mp3',
  'C5':  'C5.mp3',
}

// Convert our key names (Ds3) to Tone.js names (D#3) for the sample map
const TONE_SAMPLE_URLS = Object.fromEntries(
  Object.entries(SAMPLE_URLS).map(([k, v]) => [toToneName(k), v])
)

export function useAudio(settings) {
  // We use refs (not state) for audio objects — React doesn't need to re-render
  // when the sampler loads; it's purely a sound-playing side effect
  const samplerRef   = useRef(null)
  const reverbRef    = useRef(null)
  const volumeRef    = useRef(null)
  const settingsRef  = useRef(settings)  // always up-to-date settings
  const sustainedRef = useRef(new Set()) // notes held by sustain pedal
  const readyRef     = useRef(false)
  const loadingRef   = useRef(false)

  // Keep settingsRef in sync on every render (avoids stale closure issues)
  useEffect(() => {
    settingsRef.current = settings
  })

  // Update reverb wet value whenever the reverb setting changes
  useEffect(() => {
    if (reverbRef.current) {
      reverbRef.current.wet.value = settings.reverb / 100
    }
  }, [settings.reverb])

  // Update volume whenever it changes
  useEffect(() => {
    if (volumeRef.current) {
      // Tone.js uses decibels; convert 0-100 linear to dB
      // At volume 0 we mute; at 100 we set 0 dB (full)
      volumeRef.current.volume.value = settings.volume === 0
        ? -Infinity
        : Tone.gainToDb(settings.volume / 100)
    }
  }, [settings.volume])

  // When sustain is turned OFF, release any notes that were being held by it
  useEffect(() => {
    if (!settings.sustain && samplerRef.current && sustainedRef.current.size > 0) {
      sustainedRef.current.forEach(noteId => {
        samplerRef.current.triggerRelease(toToneName(noteId))
      })
      sustainedRef.current.clear()
    }
  }, [settings.sustain])

  // Lazy init — Web Audio requires a user gesture before it can start.
  // We init on the first key press, not on page load.
  async function init() {
    if (readyRef.current || loadingRef.current) return
    loadingRef.current = true

    // Tone.start() resumes the AudioContext after the user gesture
    await Tone.start()

    // Signal chain: Sampler → Volume → Reverb → Speakers
    // This lets us control volume and reverb independently
    reverbRef.current = new Tone.Reverb({
      decay: 2.5,      // how long the reverb tail lasts (seconds)
      preDelay: 0.01,  // tiny gap before reverb starts
      wet: settingsRef.current.reverb / 100,
    }).toDestination()

    volumeRef.current = new Tone.Volume(
      settingsRef.current.volume === 0 ? -Infinity : Tone.gainToDb(settingsRef.current.volume / 100)
    ).connect(reverbRef.current)

    samplerRef.current = new Tone.Sampler({
      urls: TONE_SAMPLE_URLS,
      baseUrl: 'https://tonejs.github.io/audio/salamander/',
      release: 1,  // how long the note fades out after release (seconds)
      onload: () => {
        readyRef.current = true
        loadingRef.current = false
      },
    }).connect(volumeRef.current)
  }

  // Called when a key is pressed down
  const playNote = useCallback(async (noteId) => {
    await init()
    if (!samplerRef.current) return

    const toneName = toToneName(noteId)
    // triggerAttack starts the note. It handles the case where the sampler
    // is still loading by queuing the note automatically.
    samplerRef.current.triggerAttack(toneName, Tone.now())
  }, [])

  // Called when a key is released
  const stopNote = useCallback((noteId) => {
    if (!samplerRef.current) return

    if (settingsRef.current.sustain) {
      // With sustain on, we don't actually stop the note —
      // we remember it so we can release it when sustain is turned off
      sustainedRef.current.add(noteId)
      return
    }

    samplerRef.current.triggerRelease(toToneName(noteId), Tone.now())
  }, [])

  return { playNote, stopNote }
}
