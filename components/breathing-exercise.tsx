"use client"

import { useState, useEffect, useRef } from "react"
import { Play, Pause, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BreathingExerciseProps {
  className?: string
}

export function BreathingExercise({ className }: BreathingExerciseProps) {
  const [isRunning, setIsRunning] = useState(false)
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale" | "rest">("inhale")
  const [counter, setCounter] = useState(0)
  const [cycles, setCycles] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Breathing pattern timing (in seconds)
  const timing = {
    inhale: 4,
    hold: 7,
    exhale: 8,
    rest: 1,
  }

  // Effect to handle the breathing cycle
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setCounter((prevCounter) => {
          const newCounter = prevCounter + 1

          // Determine which phase we're in and if we need to transition
          if (phase === "inhale" && newCounter >= timing.inhale) {
            setPhase("hold")
            return 0
          } else if (phase === "hold" && newCounter >= timing.hold) {
            setPhase("exhale")
            return 0
          } else if (phase === "exhale" && newCounter >= timing.exhale) {
            setPhase("rest")
            return 0
          } else if (phase === "rest" && newCounter >= timing.rest) {
            setPhase("inhale")
            setCycles((prev) => prev + 1)
            return 0
          }

          return newCounter
        })
      }, 1000)
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning, phase])

  // Toggle breathing exercise between running and paused
  const toggleExercise = () => {
    setIsRunning(!isRunning)
  }

  // Reset breathing exercise
  const resetExercise = () => {
    setIsRunning(false)
    setPhase("inhale")
    setCounter(0)
    setCycles(0)
  }

  // Calculate the progress percentage for the current phase
  const getProgressPercentage = () => {
    const maxTime = timing[phase]
    return (counter / maxTime) * 100
  }

  // Get instruction text based on current phase
  const getInstructionText = () => {
    switch (phase) {
      case "inhale":
        return "Breathe in slowly..."
      case "hold":
        return "Hold your breath..."
      case "exhale":
        return "Breathe out slowly..."
      case "rest":
        return "Pause..."
      default:
        return ""
    }
  }

  // Get the circle size based on the current phase
  const getCircleSize = () => {
    if (phase === "inhale") {
      return 50 + (counter / timing.inhale) * 50
    } else if (phase === "hold") {
      return 100
    } else if (phase === "exhale") {
      return 100 - (counter / timing.exhale) * 50
    } else {
      return 50
    }
  }

  return (
    <div className={`flex flex-col items-center justify-center p-6 ${className}`}>
      <div className="mb-8 relative">
        <div
          className="rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 transition-all duration-1000 flex items-center justify-center"
          style={{
            width: `${getCircleSize()}%`,
            height: `${getCircleSize()}%`,
            maxWidth: "300px",
            maxHeight: "300px",
            minWidth: "150px",
            minHeight: "150px",
          }}
        >
          <div className="text-center">
            <div className="text-xl font-bold mb-2">{getInstructionText()}</div>
            <div className="text-4xl font-bold text-gold">{timing[phase] - counter}</div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-md mb-4">
        <div className="h-2 bg-[#111111] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300"
            style={{ width: `${getProgressPercentage()}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-text-secondary mt-1">
          <span>
            Phase: <span className="text-gold capitalize">{phase}</span>
          </span>
          <span>
            Cycles: <span className="text-gold">{cycles}</span>
          </span>
        </div>
      </div>

      <div className="flex space-x-4">
        <Button onClick={toggleExercise} className="bg-gold hover:bg-gold-hover text-black">
          {isRunning ? (
            <>
              <Pause className="mr-2 h-4 w-4" />
              Pause
            </>
          ) : (
            <>
              <Play className="mr-2 h-4 w-4" />
              Start
            </>
          )}
        </Button>

        <Button
          variant="outline"
          onClick={resetExercise}
          className="border-[#1A1A1A] bg-black text-white hover:bg-[#222222] hover:text-white"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset
        </Button>
      </div>
    </div>
  )
}
