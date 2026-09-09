import React, { useState, useEffect } from 'react'
import './MemoryScene.css'

const MemoryScene = ({ config, onNext }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [showPhotoContent, setShowPhotoContent] = useState(false)

  const photos = config.memoryPhotos || []
  const captions = config.memoryCaptions || []
  const hasPhotos = photos.length > 0

  useEffect(() => {
    const showTimer = setTimeout(() => setShowPhotoContent(true), 500)
    return () => clearTimeout(showTimer)
  }, [currentPhotoIndex])

  const handleNextPhoto = () => {
    if (isTransitioning) return

    if (currentPhotoIndex < photos.length - 1) {
      setIsTransitioning(true)
      setShowPhotoContent(false)
      setTimeout(() => {
        setCurrentPhotoIndex(currentPhotoIndex + 1)
        setIsTransitioning(false)
      }, 400)
    } else {
      onNext()
    }
  }

  const handlePrevPhoto = () => {
    if (isTransitioning || currentPhotoIndex === 0) return

    setIsTransitioning(true)
    setShowPhotoContent(false)
    setTimeout(() => {
      setCurrentPhotoIndex(currentPhotoIndex - 1)
      setIsTransitioning(false)
    }, 400)
  }

  if (!hasPhotos) {
    return (
      <div className="memory-scene empty">
        <div className="empty-state">
          <p>No memories shared</p>
        </div>
      </div>
    )
  }

  const currentPhoto = photos[currentPhotoIndex]
  const currentCaption = captions[currentPhotoIndex]

  return (
    <div className="memory-scene">
      <div className="memory-container">
        <div className="memory-photo-wrapper">
          <img
            src={currentPhoto}
            alt={`Memory ${currentPhotoIndex + 1}`}
            className={`memory-photo ${showPhotoContent ? 'visible' : ''}`}
          />
          <div className="memory-overlay"></div>
        </div>

        {showPhotoContent && currentCaption && (
          <div className="memory-caption">
            <p>{currentCaption}</p>
          </div>
        )}
      </div>

      <div className="memory-controls">
        <button
          className="nav-btn prev-btn"
          onClick={handlePrevPhoto}
          disabled={currentPhotoIndex === 0 || isTransitioning}
          aria-label="Previous photo"
        >
          ← 
        </button>

        <div className="photo-counter">
          <span>{currentPhotoIndex + 1}</span>
          <span className="divider">/</span>
          <span>{photos.length}</span>
        </div>

        <button
          className="nav-btn next-btn"
          onClick={handleNextPhoto}
          disabled={isTransitioning}
          aria-label="Next photo or continue"
        >
          {currentPhotoIndex === photos.length - 1 ? '→' : '→'}
        </button>
      </div>
    </div>
  )
}

export default MemoryScene
