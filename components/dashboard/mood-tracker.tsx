"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null)

  const moods = [
    { emoji: "😔", label: "Low" },
    { emoji: "😐", label: "Neutral" },
    { emoji: "🙂", label: "Good" },
    { emoji: "😊", label: "Great" },
    { emoji: "😄", label: "Excellent" },
  ]

  return (
    <div className="bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl p-5">
      <h2 className="text-lg font-bold mb-4">How are you feeling today?</h2>

      <div className="flex justify-between mb-6">
        {moods.map((mood, index) => (
          <button
            key={index}
            className={cn(
              "w-12 h-12 rounded-full flex flex-col items-center justify-center transition-all duration-300",
              selectedMood === index
                ? "bg-gold/30 ring-2 ring-gold/20"
                : "bg-[#111111] border border-[#1A1A1A] hover:bg-[#1A1A1A]",
            )}
            onClick={() => setSelectedMood(index)}
          >
            <span className="text-xl">{mood.emoji}</span>
            <span className="text-[10px] mt-1 text-text-secondary">{mood.label}</span>
          </button>
        ))}
      </div>

      <div className="bg-[#111111] border border-[#1A1A1A] rounded-lg p-4 min-h-[80px] mb-4">
        <textarea
          placeholder="Add a note about how you're feeling (optional)"
          className="w-full bg-transparent border-none focus:outline-none text-sm text-text-secondary resize-none h-[60px]"
        />
      </div>

      <Button className="w-full bg-gold hover:bg-gold-hover text-black">Save Mood</Button>
    </div>
  )
}
