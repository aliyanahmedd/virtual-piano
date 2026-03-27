import { MIN_OCTAVE, MAX_OCTAVE } from '../utils/notes'
import './Controls.css'

function Controls({ settings, onSettingChange, octave, onOctaveChange }) {
  return (
    <div className="controls">

      {/* ── Octave shift ─────────────────────────────── */}
      <div className="control-group">
        <span className="control-label">Octave</span>
        <div className="octave-control">
          <button
            className="octave-btn"
            onClick={() => onOctaveChange(octave - 1)}
            disabled={octave <= MIN_OCTAVE}
            aria-label="Lower octave"
          >−</button>
          <span className="octave-value">{octave} – {octave + 1}</span>
          <button
            className="octave-btn"
            onClick={() => onOctaveChange(octave + 1)}
            disabled={octave >= MAX_OCTAVE}
            aria-label="Raise octave"
          >+</button>
        </div>
      </div>

      {/* ── Volume ───────────────────────────────────── */}
      <div className="control-group">
        <label className="control-label" htmlFor="volume">
          Volume
          <span className="control-value">{settings.volume}</span>
        </label>
        <div className="slider-track">
          <input
            id="volume"
            type="range"
            min="0"
            max="100"
            value={settings.volume}
            onChange={e => onSettingChange('volume', Number(e.target.value))}
            className="slider"
          />
          <div
            className="slider-fill"
            style={{ width: settings.volume + '%' }}
          />
        </div>
      </div>

      {/* ── Reverb ───────────────────────────────────── */}
      <div className="control-group">
        <label className="control-label" htmlFor="reverb">
          Reverb
          <span className="control-value">{settings.reverb}</span>
        </label>
        <div className="slider-track">
          <input
            id="reverb"
            type="range"
            min="0"
            max="100"
            value={settings.reverb}
            onChange={e => onSettingChange('reverb', Number(e.target.value))}
            className="slider"
          />
          <div
            className="slider-fill"
            style={{ width: settings.reverb + '%' }}
          />
        </div>
      </div>

      {/* ── Sustain pedal ────────────────────────────── */}
      <div className="control-group">
        <span className="control-label">Sustain</span>
        <button
          className={`sustain-btn ${settings.sustain ? 'sustain-btn--on' : ''}`}
          onClick={() => onSettingChange('sustain', !settings.sustain)}
          aria-pressed={settings.sustain}
        >
          <span className="sustain-btn__icon">⬤</span>
          {settings.sustain ? 'On' : 'Off'}
        </button>
      </div>

    </div>
  )
}

export default Controls
