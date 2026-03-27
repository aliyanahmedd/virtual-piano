import './LoadingOverlay.css'

// Small non-blocking status badge — shows while samples load or if there's an error
// Doesn't cover the piano so the user can still interact while loading
function LoadingOverlay({ loadState }) {
  if (loadState === 'ready' || loadState === 'idle') return null

  return (
    <div className={`load-badge load-badge--${loadState}`}>
      {loadState === 'loading' && (
        <>
          <span className="load-badge__dots">
            <span /><span /><span />
          </span>
          Loading samples…
        </>
      )}
      {loadState === 'error' && '⚠ Audio unavailable — check connection'}
    </div>
  )
}

export default LoadingOverlay
