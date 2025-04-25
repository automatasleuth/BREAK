"use client"

import { useState, useEffect, useCallback } from "react"

interface MousePosition {
  x: number
  y: number
}

export function useMousePosition(throttleMs = 10) {
  // Initialize with null to indicate we don't have a position yet
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 })
  const [isActive, setIsActive] = useState(false)

  // Throttle function to limit the rate of updates
  const throttle = useCallback((callback: Function, delay: number) => {
    let lastCall = 0
    return (...args: any[]) => {
      const now = Date.now()
      if (now - lastCall < delay) return
      lastCall = now
      return callback(...args)
    }
  }, [])

  useEffect(() => {
    // Set initial position to center of screen
    if (typeof window !== "undefined") {
      setMousePosition({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      })
    }

    // Throttled update function
    const handleMouseMove = throttle((ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY })
      if (!isActive) setIsActive(true)
    }, throttleMs)

    // Handle mouse entering/leaving the window
    const handleMouseEnter = () => setIsActive(true)
    const handleMouseLeave = () => setIsActive(false)

    if (typeof window !== "undefined") {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseenter", handleMouseEnter)
      window.addEventListener("mouseleave", handleMouseLeave)
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("mousemove", handleMouseMove)
        window.removeEventListener("mouseenter", handleMouseEnter)
        window.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [throttleMs, throttle, isActive])

  return { position: mousePosition, isActive }
}
