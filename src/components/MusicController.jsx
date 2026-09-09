import React, { useEffect, useRef, useState } from 'react'
import './MusicController.css'

const MusicController = ({ musicUrl, isPlaying, onPlayPause, volume, onVolumeChange }) => {
  const audioRef = useRef(null)
  const [isMuted, setIsMuted] = useState(false)
  const [showVolumeControl, setShowVolumeControl] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = isMuted ? 0 : volume

    if (isPlaying) {
      audio.play().catch(() => {
        // Autoplay failed silently
      })
    } else {
      audio.pause()
    }
  }, [isPlaying, volume, isMuted])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleEnded = () => {
      audio.currentTime = 0
      audio.play()
    }

    audio.addEventListener('ended', handleEnded)
    return () => audio.removeEventListener('ended', handleEnded)
  }, [])

  return (
    <div className="music-controller">
      <audio ref={audioRef} src={musicUrl} loop />

      <div className="music-controls">
        <button
          className="control-btn play-btn"
          onClick={onPlayPause}
          title={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <svg viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        <button
          className="control-btn volume-btn"
          onClick={() => setShowVolumeControl(!showVolumeControl)}
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? (
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.26 2.5-4.02zM19.1 4.9L4.9 19.1c-.4.4-.4 1 0 1.4.4.4 1 .4 1.4 0L20.5 6.3c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0zM6.5 12c0 .94.35 1.79.92 2.44l1.41-1.41C8.5 12.43 8 11.26 8 10v-.33L6.59 11.08C6.51 11.36 6.5 11.67 6.5 12zm0-7h-1C4.12 5 3 6.12 3 7.5v9c0 1.38 1.12 2.5 2.5 2.5h1V5z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.26 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
            </svg>
          )}
        </button>
      </div>

      {showVolumeControl && (
        <div className="volume-control-panel">
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={isMuted ? 0 : volume}
            onChange={(e) => {
              const val = parseFloat(e.target.value)
              onVolumeChange(val)
              setIsMuted(val === 0)
            }}
            className="volume-slider"
          />
          <button
            className="mute-toggle"
            onClick={() => {
              setIsMuted(!isMuted)
              if (!isMuted) {
                onVolumeChange(0)
              } else {
                onVolumeChange(0.7)
              }
            }}
          >
            {isMuted ? 'Unmute' : 'Mute'}
          </button>
        </div>
      )}
    </div>
  )
}

export default MusicController
