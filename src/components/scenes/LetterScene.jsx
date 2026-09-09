import React, { useState, useEffect } from 'react'
import './LetterScene.css'

const LetterScene = ({ config, onNext }) => {
  const [visibleLines, setVisibleLines] = useState(0)
  const [showButton, setShowButton] = useState(false)

  const message = config.message || ''
  const paragraphs = message.split('\n\n').filter(p => p.trim())

  useEffect(() => {
    if (visibleLines < paragraphs.length) {
      const delay = visibleLines === 0 ? 800 : 1200
      const timer = setTimeout(() => {
        setVisibleLines(visibleLines + 1)
      }, delay)
      return () => clearTimeout(timer)
    } else if (visibleLines >= paragraphs.length && !showButton) {
      const timer = setTimeout(() => {
        setShowButton(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [visibleLines, showButton, paragraphs.length])

  return (
    <div className="letter-scene">
      <div className="letter-content">
        <h2 className="letter-heading">Something I wanted to tell you</h2>

        <div className="message-container">
          {paragraphs.map((paragraph, index) => (
            <div
              key={index}
              className={`message-paragraph ${index < visibleLines ? 'visible' : ''}`}
            >
              {paragraph.split('\n').map((line, lineIdx) => (
                <React.Fragment key={lineIdx}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>

        {showButton && (
          <div className="letter-button-container">
            <button className="continue-btn" onClick={onNext}>
              Keep going <span className="arrow">→</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default LetterScene
