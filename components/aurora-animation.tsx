"use client"

import { useEffect, useRef } from "react"

export function AuroraAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions with device pixel ratio
    const setCanvasDimensions = () => {
      const { width, height } = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)
      return { width, height }
    }

    let { width, height } = setCanvasDimensions()

    // Handle resize
    const handleResize = () => {
      const dimensions = setCanvasDimensions()
      width = dimensions.width
      height = dimensions.height
      // Reinitialize particles and aurora waves when resizing
      initializeParticles()
      initializeAuroraWaves()
      // Regenerate mountain points when resizing
      generateMountainPoints()
    }

    window.addEventListener("resize", handleResize)

    // Animation variables
    let time = 0
    let globalIntensity = 0.8 // Global intensity factor that will oscillate
    const desktopMode = window.innerWidth >= 1024

    // Stars/particles
    const particles: {
      x: number
      y: number
      radius: number
      opacity: number
      pulseSpeed: number
      pulseOffset: number
    }[] = []

    // Shooting stars
    const shootingStars: {
      x: number
      y: number
      length: number
      speed: number
      angle: number
      life: number
      maxLife: number
    }[] = []

    // Clouds
    const clouds: {
      x: number
      y: number
      width: number
      height: number
      speed: number
      opacity: number
    }[] = []

    // Initialize particles
    const initializeParticles = () => {
      particles.length = 0
      const particleCount = Math.floor((width * height) / 3000) // Adjust density based on screen size

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height * 0.7, // Keep stars in upper 70% of screen
          radius: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.5 + 0.2,
          pulseSpeed: Math.random() * 0.002 + 0.001,
          pulseOffset: Math.random() * Math.PI * 2,
        })
      }
    }

    // Initialize clouds
    const initializeClouds = () => {
      clouds.length = 0
      const cloudCount = 3 // Just a few clouds

      for (let i = 0; i < cloudCount; i++) {
        clouds.push({
          x: Math.random() * width * 1.5 - width * 0.5, // Start some clouds off-screen
          y: Math.random() * height * 0.4, // Upper part of the sky
          width: Math.random() * width * 0.3 + width * 0.1, // 10-40% of screen width
          height: Math.random() * height * 0.05 + height * 0.02, // 2-7% of screen height
          speed: Math.random() * 0.2 + 0.1, // Slow movement
          opacity: Math.random() * 0.15 + 0.05, // Very subtle opacity
        })
      }
    }

    // Create a shooting star
    const createShootingStar = () => {
      // Only create if there aren't too many already
      if (shootingStars.length < 3 && Math.random() < 0.01) {
        // 1% chance per frame
        const x = Math.random() * width
        const y = Math.random() * height * 0.5 // Upper half of the screen
        const length = Math.random() * 80 + 40 // Length of the trail
        const angle = Math.PI / 4 + (Math.random() * Math.PI) / 2 // Angle between π/4 and 3π/4
        const speed = Math.random() * 3 + 2 // Speed of movement
        const maxLife = Math.random() * 100 + 50 // How long it lives

        shootingStars.push({
          x,
          y,
          length,
          angle,
          speed,
          life: 0,
          maxLife,
        })
      }
    }

    // Aurora waves
    const auroraWaves: {
      baseY: number
      amplitude: number
      wavelength: number
      speed: number
      colorStops: { position: number; color: string }[]
      intensityOffset: number // Added for individual wave intensity variation
      colorShift: number // Added for color shifting over time
    }[] = []

    // Initialize aurora waves
    const initializeAuroraWaves = () => {
      auroraWaves.length = 0

      // Color palettes for aurora
      const palettes = [
        // Teal to purple
        [
          { position: 0, color: "rgba(0, 210, 255, 0)" },
          { position: 0.5, color: "rgba(0, 210, 255, 0.3)" },
          { position: 0.8, color: "rgba(120, 0, 255, 0.2)" },
          { position: 1, color: "rgba(120, 0, 255, 0)" },
        ],
        // Green to blue
        [
          { position: 0, color: "rgba(0, 255, 140, 0)" },
          { position: 0.5, color: "rgba(0, 255, 140, 0.3)" },
          { position: 0.8, color: "rgba(0, 140, 255, 0.2)" },
          { position: 1, color: "rgba(0, 140, 255, 0)" },
        ],
        // Pink to blue
        [
          { position: 0, color: "rgba(255, 0, 180, 0)" },
          { position: 0.5, color: "rgba(255, 0, 180, 0.2)" },
          { position: 0.8, color: "rgba(0, 180, 255, 0.3)" },
          { position: 1, color: "rgba(0, 180, 255, 0)" },
        ],
      ]

      // Create multiple aurora waves with different parameters
      const waveCount = 3
      for (let i = 0; i < waveCount; i++) {
        const palette = palettes[i % palettes.length]

        auroraWaves.push({
          baseY: height * (0.3 + i * 0.1), // Stagger the base positions
          amplitude: height * (0.05 + i * 0.03), // Increasing amplitudes
          wavelength: 0.003 + i * 0.002, // Different wavelengths
          speed: 0.2 + i * 0.1, // Different speeds
          colorStops: palette,
          intensityOffset: Math.random() * Math.PI * 2, // Random phase offset for intensity variation
          colorShift: Math.random() * 0.01, // Small random color shift speed
        })
      }
    }

    // Pre-generate mountain points to avoid regenerating them on each frame
    // This will fix the glitchy mountain animation
    let mountainPoints1: { x: number; y: number }[] = []
    let mountainPoints2: { x: number; y: number }[] = []

    const generateMountainPoints = () => {
      // Clear existing points
      mountainPoints1 = []
      mountainPoints2 = []

      // First mountain range (distant)
      const peakCount1 = Math.ceil(width / 100)
      const segmentWidth1 = width / peakCount1

      for (let i = 0; i <= peakCount1; i++) {
        const x = i * segmentWidth1
        // Use a consistent seed for the random function to get the same mountains each time
        const y = height * (0.75 - Math.sin(i * 0.5) * 0.05 - (Math.sin(i * 3.9) * 0.5 + 0.5) * 0.05)
        mountainPoints1.push({ x, y })
      }

      // Second mountain range (closer)
      const peakCount2 = Math.ceil(width / 80)
      const segmentWidth2 = width / peakCount2

      for (let i = 0; i <= peakCount2; i++) {
        const x = i * segmentWidth2
        // Use a consistent seed for the random function to get the same mountains each time
        const y = height * (0.8 - Math.sin(i * 0.8) * 0.08 - (Math.sin(i * 7.3) * 0.5 + 0.5) * 0.06)
        mountainPoints2.push({ x, y })
      }
    }

    // Initialize
    initializeParticles()
    initializeAuroraWaves()
    initializeClouds()
    generateMountainPoints()

    // Helper function to shift colors over time
    const shiftColor = (color: string, amount: number): string => {
      // Parse rgba color
      const match = color.match(/rgba$$(\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)$$/)
      if (!match) return color

      const r = Number.parseInt(match[1], 10)
      const g = Number.parseInt(match[2], 10)
      const b = Number.parseInt(match[3], 10)
      const a = Number.parseFloat(match[4])

      // Shift hue by converting to HSL, adjusting H, and converting back to RGB
      // This is a simplified version that just cycles through colors
      const hueShift = (time * amount) % 1
      const newR = Math.floor((r + hueShift * 255) % 255)
      const newG = Math.floor((g + hueShift * 255) % 255)
      const newB = Math.floor((b + hueShift * 255) % 255)

      return `rgba(${newR}, ${newG}, ${newB}, ${a})`
    }

    // Draw stars with subtle twinkling
    const drawStars = () => {
      particles.forEach((particle) => {
        // Subtle pulsing effect
        const pulse = Math.sin(time * particle.pulseSpeed + particle.pulseOffset) * 0.2 + 0.8
        const starOpacity = particle.opacity * pulse

        // Create a small glow around larger stars
        if (particle.radius > 1) {
          const glow = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.radius * 3)
          glow.addColorStop(0, `rgba(255, 255, 255, ${starOpacity})`)
          glow.addColorStop(1, "rgba(255, 255, 255, 0)")

          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.radius * 3, 0, Math.PI * 2)
          ctx.fillStyle = glow
          ctx.fill()
        }

        // Star itself
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius * pulse, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${starOpacity})`
        ctx.fill()
      })
    }

    // Draw shooting stars
    const drawShootingStars = () => {
      // Update and draw each shooting star
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const star = shootingStars[i]
        star.life++

        // Remove if it's lived its life
        if (star.life > star.maxLife) {
          shootingStars.splice(i, 1)
          continue
        }

        // Calculate current position
        const progress = star.life / star.maxLife
        const fadeIn = Math.min(progress * 3, 1) // Fade in during first third
        const fadeOut = Math.max(1 - (progress - 0.7) * 3, 0) // Fade out during last third
        const opacity = Math.min(fadeIn, fadeOut)

        const currentX = star.x + Math.cos(star.angle) * star.speed * star.life
        const currentY = star.y + Math.sin(star.angle) * star.speed * star.life

        // Draw trail
        ctx.beginPath()
        ctx.moveTo(currentX, currentY)
        ctx.lineTo(
          currentX - Math.cos(star.angle) * star.length * opacity,
          currentY - Math.sin(star.angle) * star.length * opacity,
        )

        // Create gradient for trail
        const gradient = ctx.createLinearGradient(
          currentX,
          currentY,
          currentX - Math.cos(star.angle) * star.length * opacity,
          currentY - Math.sin(star.angle) * star.length * opacity,
        )
        gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity})`)
        gradient.addColorStop(0.3, `rgba(200, 220, 255, ${opacity * 0.6})`)
        gradient.addColorStop(1, "rgba(180, 200, 255, 0)")

        ctx.strokeStyle = gradient
        ctx.lineWidth = 2
        ctx.stroke()

        // Draw head
        ctx.beginPath()
        ctx.arc(currentX, currentY, 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
        ctx.fill()
      }
    }

    // Draw clouds
    const drawClouds = () => {
      clouds.forEach((cloud, index) => {
        // Move cloud
        cloud.x += cloud.speed

        // Reset cloud position if it moves off screen
        if (cloud.x > width + cloud.width) {
          cloud.x = -cloud.width
          cloud.y = Math.random() * height * 0.4
          cloud.opacity = Math.random() * 0.15 + 0.05
        }

        // Draw cloud as a gradient ellipse
        const gradient = ctx.createRadialGradient(
          cloud.x + cloud.width / 2,
          cloud.y + cloud.height / 2,
          0,
          cloud.x + cloud.width / 2,
          cloud.y + cloud.height / 2,
          cloud.width / 2,
        )
        gradient.addColorStop(0, `rgba(255, 255, 255, ${cloud.opacity})`)
        gradient.addColorStop(0.5, `rgba(255, 255, 255, ${cloud.opacity * 0.7})`)
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)")

        ctx.beginPath()
        ctx.ellipse(
          cloud.x + cloud.width / 2,
          cloud.y + cloud.height / 2,
          cloud.width / 2,
          cloud.height / 2,
          0,
          0,
          Math.PI * 2,
        )
        ctx.fillStyle = gradient
        ctx.fill()
      })
    }

    // Draw aurora waves with dynamic intensity and color shifts
    const drawAurora = () => {
      // Calculate global intensity variation (slow pulsing)
      globalIntensity = 0.8 + Math.sin(time * 0.05) * 0.2

      // Occasional intensity bursts
      if (Math.random() < 0.002) {
        // 0.2% chance per frame
        globalIntensity = 1.2 // Temporary brightness boost
      }

      // Add more complex wave patterns for desktop
      if (desktopMode) {
        // Create a more complex aurora effect for desktop
        ctx.globalCompositeOperation = "screen"
      }

      auroraWaves.forEach((wave) => {
        // Calculate wave-specific intensity with offset
        const waveIntensity = globalIntensity * (0.8 + Math.sin(time * 0.1 + wave.intensityOffset) * 0.2)

        // Create a path for the wave
        ctx.beginPath()

        // Start at the left edge
        ctx.moveTo(0, wave.baseY)

        // Draw the wave across the canvas
        for (let x = 0; x <= width; x += desktopMode ? 1 : 2) {
          const dx = x * wave.wavelength

          // Use multiple sine waves for more organic movement
          const dy =
            wave.amplitude *
            waveIntensity * // Apply intensity variation
            (Math.sin(dx + time * wave.speed) * 0.6 +
              Math.sin(dx * 1.5 + time * wave.speed * 0.7) * 0.3 +
              Math.sin(dx * 2.5 + time * wave.speed * 1.3) * 0.1)

          ctx.lineTo(x, wave.baseY + dy)
        }

        // Complete the path to create a closed shape
        ctx.lineTo(width, height)
        ctx.lineTo(0, height)
        ctx.closePath()

        // Create gradient for the aurora
        const gradient = ctx.createLinearGradient(0, wave.baseY - wave.amplitude, 0, height)

        // Add color stops with subtle color shifting over time
        wave.colorStops.forEach((stop) => {
          // Apply subtle color shift
          const shiftedColor = shiftColor(stop.color, wave.colorShift)
          gradient.addColorStop(stop.position, shiftedColor)
        })

        // Fill the path with the gradient
        ctx.fillStyle = gradient
        ctx.fill()

        // For desktop, add an extra glow effect
        if (desktopMode) {
          ctx.shadowColor = "rgba(120, 200, 255, 0.2)"
          ctx.shadowBlur = 15
        }
      })

      // Reset composite operation
      ctx.globalCompositeOperation = "source-over"
    }

    // Draw background with stars
    const drawBackground = () => {
      // Create a gradient for the night sky
      const skyGradient = ctx.createLinearGradient(0, 0, 0, height)
      skyGradient.addColorStop(0, "#0A0A14") // Very dark blue at top
      skyGradient.addColorStop(0.5, "#111133") // Slightly lighter in middle
      skyGradient.addColorStop(1, "#0A0A14") // Very dark at bottom

      // Fill the background
      ctx.fillStyle = skyGradient
      ctx.fillRect(0, 0, width, height)
    }

    // Draw distant mountains silhouette using pre-generated points
    const drawMountains = () => {
      // First mountain range (distant)
      ctx.beginPath()
      ctx.moveTo(0, height * 0.75)

      // Use pre-generated points for consistent mountains
      mountainPoints1.forEach((point) => {
        ctx.lineTo(point.x, point.y)
      })

      ctx.lineTo(width, height * 0.75)
      ctx.lineTo(width, height)
      ctx.lineTo(0, height)
      ctx.closePath()

      // Fill with dark gradient
      const mountainGradient = ctx.createLinearGradient(0, height * 0.7, 0, height)
      mountainGradient.addColorStop(0, "#080810")
      mountainGradient.addColorStop(1, "#0A0A14")
      ctx.fillStyle = mountainGradient
      ctx.fill()

      // Second mountain range (closer)
      ctx.beginPath()
      ctx.moveTo(0, height * 0.8)

      // Use pre-generated points for consistent mountains
      mountainPoints2.forEach((point) => {
        ctx.lineTo(point.x, point.y)
      })

      ctx.lineTo(width, height * 0.8)
      ctx.lineTo(width, height)
      ctx.lineTo(0, height)
      ctx.closePath()

      // Fill with very dark gradient
      const mountainGradient2 = ctx.createLinearGradient(0, height * 0.75, 0, height)
      mountainGradient2.addColorStop(0, "#050508")
      mountainGradient2.addColorStop(1, "#080810")
      ctx.fillStyle = mountainGradient2
      ctx.fill()
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height)

      // Draw scene elements
      drawBackground()
      drawStars()
      createShootingStar() // Chance to create a new shooting star
      drawShootingStars()
      drawClouds()
      drawAurora()
      drawMountains()

      // Update time
      time += 0.01
      animationRef.current = requestAnimationFrame(animate)
    }

    // Start animation
    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl">
      <canvas ref={canvasRef} className="w-full h-full" style={{ display: "block" }} />
    </div>
  )
}
