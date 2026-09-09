import React, { useState, useEffect } from 'react'
import WishExperience from './components/WishExperience'
import './App.css'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <div className="logo-text">wishly</div>
          <div className="loading-dot"></div>
        </div>
      </div>
    )
  }

  return <WishExperience />
}

export default App
