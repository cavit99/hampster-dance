"use client"

import { useState, useEffect, useRef } from "react"
import HamsterGrid from "../components/HamsterGrid"
import VisitorCounter from "../components/VisitorCounter"

function AudioControls() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audio = new Audio("/audio.mp3")
    audio.loop = true
    audioRef.current = audio

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.currentTime = 0
        audioRef.current.play().catch(error => {
          console.error("Error playing audio:", error)
        })
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <div className="center-content">
      <div style={{ width: '100%', padding: '0 1rem' }}>
        <h1 className="site-header">
          THE HAMPSTER DANCE
        </h1>
        <p className="site-subtitle">
          dance the night away
        </p>
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <button 
            onClick={toggleAudio}
            className="retro-link"
          >
            HELP! I can't hear the music
          </button>
        </div>
      </div>

      <HamsterGrid />
      <VisitorCounter />
      
      <div style={{ width: '100%', padding: '0 1rem' }}>
        <p className="site-copyright">© 1997</p>
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <button 
            onClick={toggleAudio} 
            className="retro-link"
          >
            HELP! I can't hear the music
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'white' }}>
      <main style={{ padding: '2rem 1rem' }}>
        <AudioControls />
      </main>
    </div>
  )
}
