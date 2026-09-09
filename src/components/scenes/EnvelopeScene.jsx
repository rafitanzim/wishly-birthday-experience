import React, { useState, useEffect } from 'react'
import './EnvelopeScene.css'

const EnvelopeScene = ({ config, onNext }) => {
  const [isOpening, setIsOpening] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      // Auto-advance after envelope reveals
      if (isOpen) {
        setTimeout(() => {
          onNext()
        }, 2500)
      }
    }, 1500)

    return () => clearTimeout(timer)
  }, [isOpen, onNext])

  const handleEnvelopeClick = () => {
    if (!isOpening) {
      setIsOpening(true)
      setTimeout(() => {
        setIsOpen(true)
      }, 600)
    }
  }

  return (
    <div className="envelope-scene">
      <div className="envelope-container" onClick={handleEnvelopeClick}>
        <div className={`envelope ${isOpen ? 'open' : ''} ${isOpening ? 'opening' : ''}`}>
          {!isOpen && (
            <>
              <div className="envelope-front">
                <div className="envelope-text">For {config.recipientName}</div>
                <div className="envelope-subtitle">Open me</div>
              </div>
              <div className="envelope-back"></div>
            </>
          )}

          {isOpen && (
            <div className="envelope-letter">
              <div className="letter-content">
                <div className="letter-shine"></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {!isOpen && (
        <div className="envelope-hint">
          <p>tap to open</p>
        </div>
      )}
    </div>
  )
}

export default EnvelopeScene
