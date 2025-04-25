"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface AnimatedFeatureCardProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: "left" | "right" | "up" | "down"
}

export function AnimatedFeatureCard({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: AnimatedFeatureCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              card.classList.add("animate-in")
            }, delay)
            observer.unobserve(card)
          }
        })
      },
      { threshold: 0.1 },
    )

    observer.observe(card)

    return () => {
      observer.disconnect()
    }
  }, [delay])

  const getInitialTransform = () => {
    switch (direction) {
      case "left":
        return "translate-x-8"
      case "right":
        return "-translate-x-8"
      case "down":
        return "-translate-y-8"
      case "up":
      default:
        return "translate-y-8"
    }
  }

  return (
    <div
      ref={cardRef}
      className={cn("opacity-0 transition-all duration-700 ease-out", getInitialTransform(), "data-animate", className)}
      data-animate="true"
    >
      {children}
    </div>
  )
}
