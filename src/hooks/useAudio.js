import { useRef, useEffect, useCallback, useState } from 'react'
import * as Tone from 'tone'
import { toToneName } from '../utils/noteConvert'

const SAMPLE_URLS = {
  'C2':  'C2.mp3',
  'Ds2': 'Ds2.mp3',
  'Fs2': 'Fs2.mp3',
  'A2':  'A2.mp3',
  'C3':  'C3.mp3',
  'Ds3': 'Ds3.mp3',
  'Fs3': 'Fs3.mp3',
  'A3':  'A3.mp3',
  'C4':  'C4.mp3',
  'Ds4': 'Ds4.mp3',
  'Fs4': 'Fs4.mp3',
  'A4':  'A4.mp3',
  'C5':  'C5.mp3',
  'Ds5': 'Ds5.mp3',
  'Fs5': 'Fs5.mp3',
  'A5':  'A5.mp3',
  'C6':  'C6.mp3',
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

  // isLoading: true while samples are being fetched from CDN
  // isReady: true once samples are fully loaded and playback is safe
  const [isLoading, setIsLoading] = useState(false)
  const [isReady,   setIsReady]   = useState(false)

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

  async function init() {
    if (readyRef.current || loadingRef.current) return
    loadingRef.current = true
    setIsLoading(true)

    await Tone.start()

    reverbRef.current = new Tone.Reverb({
      decay: 2.5,
      preDelay: 0.01,
      wet: settingsRef.current.reverb / 100,
    }).toDestination()

    volumeRef.current = new Tone.Volume(
      settingsRef.current.volume === 0 ? -Infinity : Tone.gainToDb(settingsRef.current.volume / 100)
    ).connect(reverbRef.current)

    samplerRef.current = new Tone.Sampler({
      urls: TONE_SAMPLE_URLS,
      baseUrl: 'https://tonejs.github.io/audio/salamander/',
      release: 1,
      onload: () => {
        readyRef.current  = true
        loadingRef.current = false
        setIsLoading(false)
        setIsReady(true)
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

  return { playNote, stopNote, isLoading, isReady }
}
