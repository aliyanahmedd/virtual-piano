import { useState, useRef } from 'react'
import { SONGS } from '../data/songs'
import './SongSearch.css'

export default function SongSearch({ onSelect }) {
  const [open, setOpen]   = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)

  const results = query.trim().length > 0
    ? SONGS.filter(s =>
        s.title.toLowerCase().includes(query.toLowerCase()) ||
        s.artist.toLowerCase().includes(query.toLowerCase())
      )
    : SONGS

  function openSearch() {
    setOpen(true)
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  function closeSearch() {
    setOpen(false)
    setQuery('')
  }

  function handleSelect(song) {
    onSelect(song)
    closeSearch()
  }

  return (
    <div className="song-search">
      {!open ? (
        <button className="song-search__trigger" onClick={openSearch}>
          ♪ &nbsp;Song Guide
        </button>
      ) : (
        <div className="song-search__panel">
          <div className="song-search__bar">
            <span className="song-search__icon">♪</span>
            <input
              ref={inputRef}
              className="song-search__input"
              placeholder="Search songs or artists…"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            <button className="song-search__close" onClick={closeSearch}>✕</button>
          </div>
          <ul className="song-search__list">
            {results.map(song => (
              <li key={song.id} className="song-search__item" onClick={() => handleSelect(song)}>
                <span className="song-search__name">{song.title}</span>
                <span className="song-search__artist">{song.artist}</span>
              </li>
            ))}
            {results.length === 0 && (
              <li className="song-search__empty">No songs found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}
