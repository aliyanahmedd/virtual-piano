import { MIN_OCTAVE, MAX_OCTAVE, OCTAVE_SPAN } from '../utils/notes'
import './Controls.css'

function Controls({ settings, onSettingChange, octave, onOctaveChange }) {
  return (
    <div className="controls">

      {/* ── Octave ───────────────────────────────────── */}
      <div className="control-group">
        <span className="control-label">
          <span className="control-icon">♩</span> Octave
        </span>
        <div className="octave-control">
          <button
            className="octave-btn"
            onClick={() => onOctaveChange(octave - 1)}
            disabled={octave <= MIN_OCTAVE}
            aria-label="Lower octave"
          >−</button>
          <span className="octave-value">{octave} – {octave + OCTAVE_SPAN - 1}</span>
          <button
            className="octave-btn"
            onClick={() => onOctaveChange(octave + 1)}
            disabled={octave >= MAX_OCTAVE}
            aria-label="Raise octave"
          >+</button>
        </div>
      </div>

      <div className="controls-divider" />

      {/* ── Volume ───────────────────────────────────── */}
      <div className="control-group control-group--wide">
        <label className="control-label" htmlFor="volume">
          <span className="control-icon">◉</span> Volume
          <span className="control-value">{settings.volume}</span>
        </label>
        <div className="slider-track">
          <input
            id="volume"
            type="range" min="0" max="100"
            value={settings.volume}
            onChange={e => onSettingChange('volume', Number(e.target.value))}
            className="slider"
          />
          <div className="slider-fill" style={{ width: settings.volume + '%' }} />
        </div>
      </div>

      {/* ── Reverb ───────────────────────────────────── */}
      <div className="control-group control-group--wide">
        <label className="control-label" htmlFor="reverb">
          <span className="control-icon">〜</span> Reverb
          <span className="control-value">{settings.reverb}</span>
        </label>
        <div className="slider-track">
          <input
            id="reverb"
            type="range" min="0" max="100"
            value={settings.reverb}
            onChange={e => onSettingChange('reverb', Number(e.target.value))}
            className="slider"
          />
          <div className="slider-fill" style={{ width: settings.reverb + '%' }} />
        </div>
      </div>

      <div className="controls-divider" />

      {/* ── Sustain ──────────────────────────────────── */}
      <div className="control-group">
        <span className="control-label">
          <span className="control-icon">⬤</span> Sustain
        </span>
        <button
          className={`sustain-btn ${settings.sustain ? 'sustain-btn--on' : ''}`}
          onClick={() => onSettingChange('sustain', !settings.sustain)}
          aria-pressed={settings.sustain}
        >
          <span className="sustain-indicator" />
          {settings.sustain ? 'On' : 'Off'}
          <span className="sustain-hint">Space</span>
        </button>
      </div>

    </div>
  )
}

export default Controls
