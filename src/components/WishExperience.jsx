import React, { useState, useEffect } from 'react'
import IntroScene from './scenes/IntroScene'
import EnvelopeScene from './scenes/EnvelopeScene'
import BirthdayReveal from './scenes/BirthdayReveal'
import MemoryScene from './scenes/MemoryScene'
import LetterScene from './scenes/LetterScene'
import SurpriseScene from './scenes/SurpriseScene'
import FinalScene from './scenes/FinalScene'
import MusicController from './MusicController'
import AmbientParticles from './AmbientParticles'
import { experienceConfig } from '../config'
import './WishExperience.css'

const WishExperience = () => {
  const [currentScene, setCurrentScene] = useState(0)
  const [audioEnabled, setAudioEnabled] = useState(false)
  const [audioContext, setAudioContext] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.7)

  const scenes = [
    IntroScene,
    EnvelopeScene,
    BirthdayReveal,
    MemoryScene,
    LetterScene,
    SurpriseScene,
    FinalScene
  ]

  const CurrentScene = scenes[currentScene]

  useEffect(() => {
    // Handle keyboard navigation for testing
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowRight') {
        goToNextScene()
      } else if (e.key === 'ArrowLeft') {
        goToPreviousScene()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentScene])

  const goToNextScene = () => {
    if (currentScene < scenes.length - 1) {
      setCurrentScene(currentScene + 1)
    }
  }

  const goToPreviousScene = () => {
    if (currentScene > 0) {
      setCurrentScene(currentScene - 1)
    }
  }

  const handleAudioRequest = async () => {
    if (!audioEnabled) {
      try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)()
        setAudioContext(audioCtx)
        setAudioEnabled(true)
        setIsPlaying(true)
      } catch (err) {
        console.error('Audio context creation failed:', err)
      }
    }
  }

  return (
    <div className="wish-experience">
      <AmbientParticles theme={experienceConfig.theme} />

      <div className="scene-container">
        <CurrentScene
          config={experienceConfig}
          onNext={goToNextScene}
          onAudioRequest={handleAudioRequest}
          audioEnabled={audioEnabled}
          isPlaying={isPlaying}
        />
      </div>

      {audioEnabled && (
        <MusicController
          musicUrl={experienceConfig.music}
          isPlaying={isPlaying}
          onPlayPause={() => setIsPlaying(!isPlaying)}
          volume={volume}
          onVolumeChange={setVolume}
        />
      )}

      <div className="scene-nav" style={{ display: 'none' }}>
        <button onClick={goToPreviousScene} disabled={currentScene === 0}>
          ←
        </button>
        <span>{currentScene + 1} / {scenes.length}</span>
        <button onClick={goToNextScene} disabled={currentScene === scenes.length - 1}>
          →
        </button>
      </div>
    </div>
  )
}

export default WishExperience
