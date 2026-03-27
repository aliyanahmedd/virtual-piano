import { useEffect, useRef } from 'react'
import './Teleprompter.css'

export default function Teleprompter({ song, songPos, onClose }) {
  const currentLineRef = useRef(null)

  const totalKeys = song.lines.reduce((sum, line) => sum + line.length, 0)
  const doneKeys  = song.lines
    .slice(0, songPos.line)
    .reduce((sum, line) => sum + line.length, 0) + songPos.key
  const progress   = Math.round((doneKeys / totalKeys) * 100)
  const isComplete = doneKeys >= totalKeys

  // Snap back to current line every time the position advances
  useEffect(() => {
    if (currentLineRef.current) {
      currentLineRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [songPos.line, songPos.key])

  return (
    <div className="teleprompter">
      <div className="teleprompter__header">
        <div className="teleprompter__meta">
          <span className="teleprompter__title">{song.title}</span>
          <span className="teleprompter__sep">·</span>
          <span className="teleprompter__artist">{song.artist}</span>
        </div>
        <div className="teleprompter__progress-track">
          <div
            className="teleprompter__progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <button className="teleprompter__close" onClick={onClose}>✕ Exit</button>
      </div>

      <div className="teleprompter__scroll">
        {song.lines.map((line, lineIdx) => {
          const isPastLine    = lineIdx < songPos.line
          const isCurrentLine = lineIdx === songPos.line

          return (
            <div
              key={lineIdx}
              ref={isCurrentLine ? currentLineRef : null}
              className={`teleprompter__line${isCurrentLine ? ' is-current' : isPastLine ? ' is-past' : ''}`}
            >
              {line.map((key, keyIdx) => {
                const isPast    = isPastLine || (isCurrentLine && keyIdx < songPos.key)
                const isCurrent = isCurrentLine && keyIdx === songPos.key
                return (
                  <span
                    key={keyIdx}
                    className={`teleprompter__key${isCurrent ? ' is-current' : isPast ? ' is-past' : ''}`}
                  >
                    {key}
                  </span>
                )
              })}
            </div>
          )
        })}

        {isComplete && (
          <div className="teleprompter__complete">✦ &nbsp;Complete &nbsp;✦</div>
        )}
      </div>
    </div>
  )
}
