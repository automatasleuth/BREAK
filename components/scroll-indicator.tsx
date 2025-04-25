"use client"

import { useEffect, useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface ScrollIndicatorProps {
  targetId: string
  className?: string
}

export function ScrollIndicator({ targetId, className = "" }: ScrollIndicatorProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTarget = () => {
    const target = document.getElementById(targetId)
    if (target) {
      target.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <button
      onClick={scrollToTarget}
      className={cn(
        "absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center transition-all duration-500",
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none",
        className,
      )}
      aria-label="Scroll down"
    >
      <span className="text-xs text-text-secondary mb-2">Scroll</span>
      <div className="w-8 h-12 border-2 border-gold/30 rounded-full flex items-center justify-center relative">
        <ChevronDown className="h-4 w-4 text-gold absolute animate-bounce" style={{ animationDuration: "1.5s" }} />
      </div>
    </button>
  )
}
