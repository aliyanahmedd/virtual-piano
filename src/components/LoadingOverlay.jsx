import './LoadingOverlay.css'

// Shown after the first keypress while Salamander samples download from CDN.
// Fades out automatically once isLoading becomes false.
function LoadingOverlay({ isLoading }) {
  if (!isLoading) return null

  return (
    <div className="loading-overlay">
      <div className="loading-box">
        <div className="loading-keys">
          {[0,1,2,3,4].map(i => (
            <div key={i} className="loading-key" style={{ animationDelay: i * 0.12 + 's' }} />
          ))}
        </div>
        <p className="loading-text">Loading piano samples…</p>
        <p className="loading-sub">Steinway Grand · First load only</p>
      </div>
    </div>
  )
}

export default LoadingOverlay
