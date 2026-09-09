import React, { useState, useEffect } from 'react'
import './IntroScene.css'

const IntroScene = ({ config, onNext, onAudioRequest, audioEnabled }) => {
  const [stage, setStage] = useState(0)
  const [headphonesAccepted, setHeadphonesAccepted] = useState(false)

  const textSequence = [
    { text: 'hey...', delay: 500 },
    { text: 'someone made something for you.', delay: 2000 },
    { text: 'but first...', delay: 3500 }
  ]

  useEffect(() => {
    if (stage < textSequence.length) {
      const timer = setTimeout(() => {
        setStage(stage + 1)
      }, textSequence[stage].delay)
      return () => clearTimeout(timer)
    }
  }, [stage])

  const handleReady = () => {
    onAudioRequest()
    setHeadphonesAccepted(true)
    setTimeout(() => {
      onNext()
    }, 800)
  }

  return (
    <div className="intro-scene">
      <div className="intro-content">
        {stage > 0 && (
          <div className="intro-text intro-text-1">
            {textSequence[0].text}
          </div>
        )}

        {stage > 1 && (
          <div className="intro-text intro-text-2">
            {textSequence[1].text}
          </div>
        )}

        {stage > 2 && (
          <div className="intro-text intro-text-3">
            {textSequence[2].text}
          </div>
        )}

        {stage > 2 && !headphonesAccepted && (
          <div className="headphones-prompt">
            <div className="headphones-emoji">🎧</div>
            <p>put your headphones on</p>
            <button className="ready-btn" onClick={handleReady}>
              I'm ready <span className="arrow">→</span>
            </button>
          </div>
        )}

        {headphonesAccepted && (
          <div className="loading-exit">
            <div className="exit-dot"></div>
          </div>
        )}
      </div>
    </div>
  )
}

export default IntroScene
