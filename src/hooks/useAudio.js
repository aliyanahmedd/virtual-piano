import { useRef, useEffect, useCallback, useState } from 'react'
import * as Tone from 'tone'
import { toToneName } from '../utils/noteConvert'

// Only use samples we know exist on the Tone.js CDN
// Fewer samples = faster load; Sampler interpolates the rest by pitch-shifting
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

const TONE_SAMPLE_URLS = Object.fromEntries(
  Object.entries(SAMPLE_URLS).map(([k, v]) => [toToneName(k), v])
)

export function useAudio(settings) {
  const samplerRef   = useRef(null)
  const reverbRef    = useRef(null)
  const volumeRef    = useRef(null)
  const settingsRef  = useRef(settings)
  const sustainedRef = useRef(new Set())
  const readyRef     = useRef(false)
  const loadingRef   = useRef(false)

  // 'idle' | 'loading' | 'ready' | 'error'
  const [loadState, setLoadState] = useState('idle')

  // Mobile browsers block AudioContext until a user gesture.
  // Unlock it on the very first touch so it's ready when a key is tapped.
  useEffect(() => {
    const unlock = () => { Tone.start() }
    document.addEventListener('touchstart', unlock, { once: true, passive: true })
    return () => document.removeEventListener('touchstart', unlock)
  }, [])

  useEffect(() => { settingsRef.current = settings })

  useEffect(() => {
    if (reverbRef.current) reverbRef.current.wet.value = settings.reverb / 100
  }, [settings.reverb])

  useEffect(() => {
    if (volumeRef.current) {
      volumeRef.current.volume.value = settings.volume === 0
        ? -Infinity
        : Tone.gainToDb(settings.volume / 100)
    }
  }, [settings.volume])

  useEffect(() => {
    if (!settings.sustain && samplerRef.current && sustainedRef.current.size > 0) {
      sustainedRef.current.forEach(id => {
        samplerRef.current.triggerRelease(toToneName(id))
      })
      sustainedRef.current.clear()
    }
  }, [settings.sustain])

  function markReady() {
    if (readyRef.current) return
    readyRef.current  = true
    loadingRef.current = false
    setLoadState('ready')
  }

  async function init() {
    if (readyRef.current || loadingRef.current) return
    loadingRef.current = true
    setLoadState('loading')

    try {
      await Tone.start()
    } catch {
      setLoadState('error')
      loadingRef.current = false
      return
    }

    reverbRef.current = new Tone.Reverb({
      decay: 2.5,
      preDelay: 0.01,
      wet: settingsRef.current.reverb / 100,
    }).toDestination()

    volumeRef.current = new Tone.Volume(
      settingsRef.current.volume === 0 ? -Infinity : Tone.gainToDb(settingsRef.current.volume / 100)
    ).connect(reverbRef.current)

    // Safety timeout — if CDN is slow or a file fails, we proceed after 12s
    // Tone.Sampler can still play notes by interpolating from whatever loaded
    const timeout = setTimeout(() => {
      if (!readyRef.current) markReady()
    }, 12000)

    samplerRef.current = new Tone.Sampler({
      urls: TONE_SAMPLE_URLS,
      baseUrl: 'https://tonejs.github.io/audio/salamander/',
      release: 1,
      onload: () => {
        clearTimeout(timeout)
        markReady()
      },
    }).connect(volumeRef.current)
  }

  const playNote = useCallback(async (noteId) => {
    await init()
    if (!samplerRef.current) return
    samplerRef.current.triggerAttack(toToneName(noteId), Tone.now())
  }, [])

  const stopNote = useCallback((noteId) => {
    if (!samplerRef.current) return
    if (settingsRef.current.sustain) {
      sustainedRef.current.add(noteId)
      return
    }
    samplerRef.current.triggerRelease(toToneName(noteId), Tone.now())
  }, [])

  return { playNote, stopNote, loadState }
}
