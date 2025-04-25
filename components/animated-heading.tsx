"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface AnimatedHeadingProps {
  children: React.ReactNode
  className?: string
  underline?: boolean
  delay?: number
}

export function AnimatedHeading({ children, className = "", underline = true, delay = 0 }: AnimatedHeadingProps) {
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const heading = headingRef.current
    if (!heading) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              heading.classList.add("animate-in")
            }, delay)
            observer.unobserve(heading)
          }
        })
      },
      { threshold: 0.1 },
    )

    observer.observe(heading)

    return () => {
      observer.disconnect()
    }
  }, [delay])

  return (
    <h2
      ref={headingRef}
      className={cn(
        "text-4xl md:text-5xl font-bold mb-3 inline-block relative opacity-0 translate-y-4 transition-all duration-700 ease-out",
        underline &&
          "after:absolute after:-bottom-2 after:left-0 after:w-0 after:h-1 after:bg-gold after:opacity-70 after:transition-all after:duration-1000 after:ease-out",
        "data-animate",
        className,
      )}
      data-animate="true"
    >
      <span className="relative z-10">{children}</span>
    </h2>
  )
}
