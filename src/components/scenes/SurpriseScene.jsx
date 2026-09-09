import React, { useState, useEffect } from 'react'
import './SurpriseScene.css'

const SurpriseScene = ({ config, onNext }) => {
  const [stage, setStage] = useState(0)
  const [isRevealing, setIsRevealing] = useState(false)

  const surpriseType = config.surpriseType || 'gift'

  useEffect(() => {
    if (stage === 0) {
      const timer = setTimeout(() => setStage(1), 500)
      return () => clearTimeout(timer)
    }
    if (stage === 1) {
      const timer = setTimeout(() => setStage(2), 2000)
      return () => clearTimeout(timer)
    }
  }, [stage])

  const handleReveal = () => {
    setIsRevealing(true)
    setTimeout(() => {
      onNext()
    }, 1500)
  }

  return (
    <div className="surprise-scene">
      {stage >= 1 && !isRevealing && (
        <div className="surprise-text">
          <p>Wait...</p>
        </div>
      )}

      {stage >= 2 && !isRevealing && (
        <div className="surprise-subtitle">
          <p>I almost forgot one thing.</p>
        </div>
      )}

      {stage >= 2 && !isRevealing && (
        <div className="surprise-container">
          {surpriseType === 'gift' && (
            <div className="gift-box" onClick={handleReveal}>
              <div className="gift-top">
                <div className="ribbon"></div>
              </div>
              <div className="gift-body"></div>
              <div className="gift-text">There's one more thing.</div>
            </div>
          )}

          {surpriseType === 'message' && (
            <div className="message-box" onClick={handleReveal}>
              <div className="message-icon">💌</div>
              <p>One last secret</p>
              <button className="reveal-btn">Reveal →</button>
            </div>
          )}

          {surpriseType === 'photo' && config.memoryPhotos?.[0] && (
            <div className="photo-box" onClick={handleReveal}>
              <img src={config.memoryPhotos[0]} alt="Surprise" />
              <p>This one.</p>
            </div>
          )}
        </div>
      )}

      {isRevealing && (
        <div className="reveal-animation">
          <div className="particle"></div>
          <div className="particle" style={{ animationDelay: '0.1s' }}></div>
          <div className="particle" style={{ animationDelay: '0.2s' }}></div>
          <div className="particle" style={{ animationDelay: '0.3s' }}></div>
          <div className="particle" style={{ animationDelay: '0.4s' }}></div>
        </div>
      )}
    </div>
  )
}

export default SurpriseScene
