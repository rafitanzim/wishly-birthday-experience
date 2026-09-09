import React, { useState, useEffect } from 'react'
import './BirthdayReveal.css'

const BirthdayReveal = ({ config, onNext }) => {
  const [showText, setShowText] = useState(false)
  const [showPhoto, setShowPhoto] = useState(false)
  const [showSubtext, setShowSubtext] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const [photoLoaded, setPhotoLoaded] = useState(false)

  useEffect(() => {
    const timings = [
      { delay: 300, setter: setShowText },
      { delay: 1500, setter: setShowPhoto },
      { delay: 3000, setter: () => setPhotoLoaded(true) },
      { delay: 4500, setter: setShowSubtext },
      { delay: 6000, setter: setShowButton }
    ]

    const timers = timings.map(({ delay, setter }) =>
      setTimeout(setter, delay)
    )

    return () => timers.forEach(timer => clearTimeout(timer))
  }, [])

  return (
    <div className="birthday-reveal">
      <div className="reveal-background" />

      {showText && (
        <div className="birthday-text">
          <h1>Happy Birthday,<br />{config.recipientName}</h1>
        </div>
      )}

      {showPhoto && (
        <div className="photo-container">
          <img
            src={config.heroPhoto}
            alt={config.recipientName}
            className="hero-photo"
            onLoad={() => setPhotoLoaded(true)}
          />
          <div className="photo-overlay"></div>
        </div>
      )}

      {showSubtext && (
        <div className="subtext">
          <p>Today is yours.</p>
        </div>
      )}

      {showButton && (
        <div className="reveal-button-container">
          <button className="continue-btn" onClick={onNext}>
            Keep going <span className="arrow">→</span>
          </button>
        </div>
      )}
    </div>
  )
}

export default BirthdayReveal
