"use client"

import { useMousePosition } from "@/hooks/use-mouse-position"
import { useEffect, useRef, useState } from "react"

interface CursorHazeProps {
  size?: number
  color?: string
  blur?: number
  opacity?: number
  lag?: number
  pulseSpeed?: number
  pulseIntensity?: number
}

export function CursorHaze({
  size = 300,
  color = "#ffbd07",
  blur = 100,
  opacity = 0.15,
  lag = 0.08,
  pulseSpeed = 3,
  pulseIntensity = 0.1,
}: CursorHazeProps) {
  const { position: mousePosition, isActive } = useMousePosition(5)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [currentSize, setCurrentSize] = useState(size)
  const hazeRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>()
  const lastUpdateTime = useRef<number>(0)

  // Handle smooth animation and pulsing effect
  useEffect(() => {
    // Initialize position with mouse position
    setPosition(mousePosition)

    const animate = (timestamp: number) => {
      // Calculate delta time for consistent animation speed regardless of frame rate
      const deltaTime = timestamp - (lastUpdateTime.current || timestamp)
      lastUpdateTime.current = timestamp

      // Smooth position transition with lag
      setPosition((prevPos) => ({
        x: prevPos.x + (mousePosition.x - prevPos.x) * Math.min(lag * (deltaTime / 16.67), 1),
        y: prevPos.y + (mousePosition.y - prevPos.y) * Math.min(lag * (deltaTime / 16.67), 1),
      }))

      // Pulse effect
      const pulseOffset = Math.sin(timestamp / (1000 / pulseSpeed)) * pulseIntensity
      setCurrentSize(size * (1 + pulseOffset))

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [mousePosition, lag, size, pulseSpeed, pulseIntensity])

  return (
    <div
      ref={hazeRef}
      className="fixed pointer-events-none z-50"
      style={{
        left: position.x,
        top: position.y,
        width: currentSize,
        height: currentSize,
        borderRadius: "50%",
        backgroundColor: color,
        filter: `blur(${blur}px)`,
        opacity: isActive ? opacity : 0,
        transform: "translate(-50%, -50%)",
        transition: "opacity 0.5s ease-out",
        willChange: "left, top, width, height, opacity",
        mixBlendMode: "screen",
      }}
    />
  )
}
