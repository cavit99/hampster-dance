"use client"

import { useState, useEffect } from "react"

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    // Only increment once on mount
    const mounted = { current: false }

    const incrementCount = async () => {
      if (mounted.current) return
      mounted.current = true

      try {
        const response = await fetch("/api/visitor-counter")
        if (!response.ok) return
        const data = await response.json()
        setCount(data.count)
      } catch (err) {
        console.error(err)
      }
    }

    incrementCount()
  }, [])

  const formattedCount = count === null 
    ? "....." 
    : count.toString().padStart(5, "0")

  return (
    <div className="visitor-counter">
      You are visitor:
      <span className="visitor-number">{formattedCount}</span>
    </div>
  )
}

