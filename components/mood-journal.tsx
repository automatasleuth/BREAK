"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

interface MoodJournalProps {
  className?: string
}

export function MoodJournal({ className }: MoodJournalProps) {
  const [selectedMood, setSelectedMood] = useState<number | null>(null)
  const [journalEntry, setJournalEntry] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const moods = [
    { emoji: "😔", label: "Low", color: "bg-blue-500/20 border-blue-500/30" },
    { emoji: "😐", label: "Neutral", color: "bg-gray-500/20 border-gray-500/30" },
    { emoji: "🙂", label: "Good", color: "bg-green-500/20 border-green-500/30" },
    { emoji: "😊", label: "Great", color: "bg-amber-500/20 border-amber-500/30" },
    { emoji: "😄", label: "Excellent", color: "bg-pink-500/20 border-pink-500/30" },
  ]

  const handleSubmit = () => {
    if (selectedMood === null) return

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)

      // Reset form after a delay
      setTimeout(() => {
        setSubmitted(false)
        setSelectedMood(null)
        setJournalEntry("")
      }, 3000)
    }, 1500)
  }

  const promptQuestions = [
    "What's the most important thing that happened today?",
    "What are you grateful for today?",
    "What challenged you today and how did you respond?",
    "What did you learn today?",
    "How could tomorrow be better than today?",
  ]

  return (
    <div className={cn("space-y-6", className)}>
      {submitted ? (
        <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-6 text-center">
          <h3 className="text-xl font-bold mb-2">Journal Entry Saved!</h3>
          <p className="text-text-secondary">Your mood and thoughts have been recorded.</p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">How are you feeling today?</h3>
            <div className="flex justify-between">
              {moods.map((mood, index) => (
                <button
                  key={index}
                  className={cn(
                    "w-16 h-16 rounded-full flex flex-col items-center justify-center transition-all duration-300 border",
                    selectedMood === index
                      ? `${mood.color} ring-2 ring-gold/20`
                      : "bg-[#111111] border-[#1A1A1A] hover:bg-[#1A1A1A]",
                  )}
                  onClick={() => setSelectedMood(index)}
                  disabled={isSubmitting}
                >
                  <span className="text-2xl">{mood.emoji}</span>
                  <span className="text-[10px] mt-1 text-text-secondary">{mood.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Journal Entry</h3>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-gold hover:text-gold/80"
                onClick={() => {
                  const randomPrompt = promptQuestions[Math.floor(Math.random() * promptQuestions.length)]
                  setJournalEntry((prev) => (prev ? `${prev}\n\n${randomPrompt}` : randomPrompt))
                }}
                disabled={isSubmitting}
              >
                Need a prompt?
              </Button>
            </div>

            <Textarea
              value={journalEntry}
              onChange={(e) => setJournalEntry(e.target.value)}
              placeholder="Write your thoughts here..."
              className="min-h-[200px] bg-[#111111] border-[#1A1A1A] resize-none"
              disabled={isSubmitting}
            />

            <Button
              className="w-full bg-gold hover:bg-gold-hover text-black"
              onClick={handleSubmit}
              disabled={selectedMood === null || isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save Journal Entry"}
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
