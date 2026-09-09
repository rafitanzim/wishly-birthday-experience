import React, { useState, useEffect } from 'react'
import './FinalScene.css'

const FinalScene = ({ config, onNext }) => {
  const [stage, setStage] = useState(0)

  useEffect(() => {
    const timings = [
      { delay: 500, value: 1 },
      { delay: 2500, value: 2 },
      { delay: 4500, value: 3 },
      { delay: 7000, value: 4 }
    ]

    const timers = timings.map(({ delay, value }) =>
      setTimeout(() => setStage(value), delay)
    )

    return () => timers.forEach(timer => clearTimeout(timer))
  }, [])

  return (
    <div className="final-scene">
      <div className="final-content">
        {stage >= 1 && (
          <div className="final-text final-text-1">
            <h1>Happy Birthday, {config.recipientName}.</h1>
          </div>
        )}

        {stage >= 2 && (
          <div className="final-text final-text-2">
            <p>I hope you remember this year.</p>
          </div>
        )}

        {stage >= 3 && (
          <div className="final-text final-text-3">
            <p>{config.finalMessage || 'You deserve good things. ❤️'}</p>
          </div>
        )}

        {stage >= 4 && (
          <div className="wishly-branding">
            <p className="made-with">made with wishly</p>
            <button className="cta-btn" onClick={onNext}>
              Make something like this for someone →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default FinalScene
