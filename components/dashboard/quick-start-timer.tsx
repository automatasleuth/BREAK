"use client"

import { useState, useEffect, useRef } from "react"
import { Play, Pause, RotateCcw, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

interface QuickStartTimerProps {
  className?: string
}

export function QuickStartTimer({ className }: QuickStartTimerProps) {
  const [duration, setDuration] = useState(5)
  const [isRunning, setIsRunning] = useState(false)
  const [timeLeft, setTimeLeft] = useState(duration * 60)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Effect to handle the countdown timer
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalRef.current as NodeJS.Timeout)
            setIsRunning(false)
            return 0
          }
          return prevTime - 1
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
  }, [isRunning])

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Toggle timer between running and paused
  const toggleTimer = () => {
    if (timeLeft === 0) {
      // If timer reached zero, reset it before starting
      setTimeLeft(duration * 60)
    }
    setIsRunning(!isRunning)
  }

  // Reset timer to initial duration
  const resetTimer = () => {
    setIsRunning(false)
    setTimeLeft(duration * 60)
  }

  // Handle duration change from slider
  const handleDurationChange = (value: number[]) => {
    const newDuration = value[0]
    setDuration(newDuration)
    if (!isRunning) {
      setTimeLeft(newDuration * 60)
    }
  }

  // Preset durations for quick selection
  const presetDurations = [5, 10, 15, 30]

  return (
    <div className={cn("bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl p-5", className)}>
      <h2 className="text-lg font-bold mb-4">Quick Start Timer</h2>

      <div className="flex flex-col md:flex-row md:items-center gap-6">
        <div className="flex-1 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">Duration: {duration} minutes</span>
          </div>

          <Slider
            defaultValue={[5]}
            min={1}
            max={60}
            step={1}
            value={[duration]}
            onValueChange={handleDurationChange}
            disabled={isRunning}
            className="w-full"
          />

          <div className="flex justify-between text-xs text-text-secondary">
            <span>1 min</span>
            <span>60 min</span>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="text-4xl font-bold tabular-nums mb-3">{formatTime(timeLeft)}</div>

          <div className="flex space-x-2">
            <Button onClick={toggleTimer} className="bg-black hover:bg-[#222222] text-white">
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
              onClick={resetTimer}
              className="border-[#1A1A1A] bg-black text-white hover:bg-[#222222] hover:text-white"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-[#1A1A1A] grid grid-cols-2 sm:grid-cols-4 gap-2">
        {presetDurations.map((mins) => (
          <Button
            key={mins}
            variant="outline"
            size="sm"
            className={cn(
              "border-[#1A1A1A] bg-black text-white hover:bg-[#222222] hover:text-white",
              duration === mins && "border-gold/30 bg-gold/10 text-gold hover:bg-gold/20 hover:text-gold",
            )}
            onClick={() => {
              if (!isRunning) {
                setDuration(mins)
                setTimeLeft(mins * 60)
              }
            }}
            disabled={isRunning}
          >
            <Clock className="mr-2 h-3 w-3" />
            {mins} min
          </Button>
        ))}
      </div>
    </div>
  )
}
