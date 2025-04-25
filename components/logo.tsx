"use client"

import { useEffect, useRef } from "react"

interface LogoProps {
  size?: "sm" | "md" | "lg"
  animated?: boolean
  className?: string
}

export function Logo({ size = "sm", animated = true, className = "" }: LogoProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)

  // Determine dimensions based on size prop
  const getDimensions = () => {
    switch (size) {
      case "lg":
        return { width: 48, height: 48 }
      case "md":
        return { width: 32, height: 32 }
      case "sm":
      default:
        return { width: 24, height: 24 }
    }
  }

  const { width, height } = getDimensions()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions with device pixel ratio for crisp rendering
    const dpr = window.devicePixelRatio || 1
    canvas.width = width * dpr
    canvas.height = height * dpr
    ctx.scale(dpr, dpr)

    // Animation variables
    let time = 0
    let pulseDirection = 1
    let pulseAmount = 0

    const drawLogo = (time: number) => {
      // Clear canvas
      ctx.clearRect(0, 0, width, height)

      // Draw background square with gradient
      const gradient = ctx.createLinearGradient(0, 0, width, height)
      gradient.addColorStop(0, "#FFBD07") // gold
      gradient.addColorStop(1, "#FFB300") // amber-400

      ctx.fillStyle = gradient
      ctx.beginPath()
      const cornerRadius = width * 0.1 // 10% corner radius
      ctx.roundRect(0, 0, width, height, cornerRadius)
      ctx.fill()

      // Add top highlight
      const highlightGradient = ctx.createLinearGradient(0, 0, 0, height * 0.5)
      highlightGradient.addColorStop(0, "rgba(255, 255, 255, 0.3)")
      highlightGradient.addColorStop(1, "rgba(255, 255, 255, 0)")

      ctx.fillStyle = highlightGradient
      ctx.beginPath()
      ctx.roundRect(0, 0, width, height * 0.5, cornerRadius)
      ctx.fill()

      // Draw organic crack
      ctx.fillStyle = "#000"

      // Calculate pulse effect for animation
      if (animated) {
        pulseAmount += 0.03 * pulseDirection
        if (pulseAmount > 1 || pulseAmount < 0) {
          pulseDirection *= -1
        }
      }

      const animationOffset = animated ? Math.sin(time * 0.05) * 0.5 : 0
      const pulseEffect = animated ? pulseAmount * 0.3 : 0

      // Main crack path
      ctx.beginPath()
      ctx.moveTo(width * 0.5 + animationOffset, 0)

      // Create a more organic, flowing crack with bezier curves
      ctx.bezierCurveTo(
        width * (0.45 - pulseEffect),
        height * 0.3,
        width * (0.55 + pulseEffect),
        height * 0.5,
        width * (0.48 + animationOffset),
        height * 0.7,
      )

      ctx.bezierCurveTo(
        width * (0.52 - pulseEffect),
        height * 0.85,
        width * (0.48 + pulseEffect),
        height * 0.9,
        width * (0.5 + animationOffset),
        height,
      )

      // Make the crack width vary
      ctx.lineWidth = width * 0.06 * (animated ? 0.8 + pulseAmount * 0.4 : 1)
      ctx.strokeStyle = "#000"
      ctx.stroke()

      // Add smaller branch cracks
      ctx.beginPath()
      ctx.moveTo(width * 0.5, height * 0.35)
      ctx.bezierCurveTo(
        width * (0.6 + pulseEffect),
        height * 0.32,
        width * (0.65 - pulseEffect),
        height * 0.38,
        width * 0.7,
        height * 0.36,
      )
      ctx.lineWidth = width * 0.04 * (animated ? 0.8 + pulseAmount * 0.4 : 1)
      ctx.stroke()

      // Second branch crack
      ctx.beginPath()
      ctx.moveTo(width * 0.5, height * 0.65)
      ctx.bezierCurveTo(
        width * (0.4 - pulseEffect),
        height * 0.62,
        width * (0.35 + pulseEffect),
        height * 0.68,
        width * 0.3,
        height * 0.67,
      )
      ctx.lineWidth = width * 0.03 * (animated ? 0.8 + pulseAmount * 0.4 : 1)
      ctx.stroke()
    }

    // Animation loop
    const animate = () => {
      time += 0.1
      drawLogo(time)

      if (animated) {
        animationRef.current = requestAnimationFrame(animate)
      }
    }

    // Initial draw
    drawLogo(0)

    // Start animation if enabled
    if (animated) {
      animate()
    }

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [width, height, animated])

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className={`${className}`}
      style={{ width: `${width}px`, height: `${height}px` }}
    />
  )
}
