"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { PenTool, Save, Calendar, Clock, Tag, BarChart, ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

export default function ReflectPage() {
  const [journalEntry, setJournalEntry] = useState("")
  const [journalTitle, setJournalTitle] = useState("")
  const [selectedMood, setSelectedMood] = useState<number | null>(null)
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [showPastEntries, setShowPastEntries] = useState(false)
  const [wordCount, setWordCount] = useState(0)
  const [moodHistory, setMoodHistory] = useState<{ date: string; mood: number }[]>([
    { date: "Apr 23", mood: 4 },
    { date: "Apr 22", mood: 3 },
    { date: "Apr 21", mood: 3 },
    { date: "Apr 20", mood: 2 },
    { date: "Apr 19", mood: 4 },
    { date: "Apr 18", mood: 3 },
    { date: "Apr 17", mood: 1 },
  ])

  const moods = [
    { emoji: "😔", label: "Low" },
    { emoji: "😐", label: "Neutral" },
    { emoji: "🙂", label: "Good" },
    { emoji: "😊", label: "Great" },
    { emoji: "😄", label: "Excellent" },
  ]

  const pastEntries = [
    {
      id: 1,
      title: "Morning Reflection",
      date: "Apr 23, 2025",
      excerpt: "Today I woke up feeling energized and ready to tackle the day...",
      mood: 4,
      tags: ["morning", "energy"],
    },
    {
      id: 2,
      title: "Work Challenges",
      date: "Apr 22, 2025",
      excerpt: "Had a difficult meeting today but managed to find a solution...",
      mood: 3,
      tags: ["work", "challenge"],
    },
    {
      id: 3,
      title: "Evening Thoughts",
      date: "Apr 21, 2025",
      excerpt: "Reflecting on the day's events and planning for tomorrow...",
      mood: 3,
      tags: ["evening", "planning"],
    },
  ]

  useEffect(() => {
    // Update word count when journal entry changes
    setWordCount(journalEntry.split(/\s+/).filter(Boolean).length)
  }, [journalEntry])

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleSaveEntry = () => {
    // In a real app, this would save to a database
    alert("Journal entry saved!")
    // Reset form
    setJournalTitle("")
    setJournalEntry("")
    setSelectedMood(null)
    setTags([])
  }

  const getCurrentDate = () => {
    return new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 flex items-center">
          <PenTool className="mr-3 h-6 w-6 text-pink-400" />
          Reflect
        </h1>
        <p className="text-text-secondary">Journal your thoughts and track your mood to improve self-awareness.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-[#0A0A0A] border-[#1A1A1A]">
            <CardHeader>
              <CardTitle>Today's Journal</CardTitle>
              <CardDescription>Write down your thoughts and feelings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-text-secondary">{getCurrentDate()}</div>
                <div className="flex items-center text-sm text-text-secondary">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                </div>
              </div>

              <Input
                placeholder="Entry Title"
                value={journalTitle}
                onChange={(e) => setJournalTitle(e.target.value)}
                className="bg-[#111111] border-[#1A1A1A]"
              />

              <Textarea
                placeholder="How are you feeling today? What's on your mind?"
                value={journalEntry}
                onChange={(e) => setJournalEntry(e.target.value)}
                className="min-h-[200px] bg-[#111111] border-[#1A1A1A]"
              />

              <div className="flex justify-between items-center text-sm text-text-secondary">
                <div>{wordCount} words</div>
                <div>Autosaved at {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">How are you feeling?</label>
                <div className="flex justify-between mb-4">
                  {moods.map((mood, index) => (
                    <button
                      key={index}
                      className={cn(
                        "w-12 h-12 rounded-full flex flex-col items-center justify-center transition-all duration-300",
                        selectedMood === index
                          ? "bg-pink-400/30 ring-2 ring-pink-400/20"
                          : "bg-[#111111] border border-[#1A1A1A] hover:bg-[#1A1A1A]",
                      )}
                      onClick={() => setSelectedMood(index)}
                    >
                      <span className="text-xl">{mood.emoji}</span>
                      <span className="text-[10px] mt-1 text-text-secondary">{mood.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tags</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {tags.map((tag) => (
                    <div
                      key={tag}
                      className="px-2 py-1 bg-[#111111] border border-[#1A1A1A] rounded-full text-sm flex items-center"
                    >
                      <span>{tag}</span>
                      <button
                        className="ml-1 text-text-secondary hover:text-white"
                        onClick={() => handleRemoveTag(tag)}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex">
                  <Input
                    placeholder="Add a tag"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    className="bg-[#111111] border-[#1A1A1A] rounded-r-none"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        handleAddTag()
                      }
                    }}
                  />
                  <Button className="bg-black text-white hover:bg-[#222222] rounded-l-none" onClick={handleAddTag}>
                    Add
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-[#1A1A1A] pt-4">
              <Button className="bg-black text-white hover:bg-[#222222]" onClick={handleSaveEntry}>
                <Save className="mr-2 h-4 w-4" /> Save Entry
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-[#0A0A0A] border-[#1A1A1A]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>Past Entries</CardTitle>
                <CardDescription>Review your previous journal entries</CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-text-secondary"
                onClick={() => setShowPastEntries(!showPastEntries)}
              >
                {showPastEntries ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </CardHeader>
            {showPastEntries && (
              <CardContent>
                <div className="space-y-4">
                  {pastEntries.map((entry) => (
                    <div
                      key={entry.id}
                      className="p-4 bg-[#111111] border border-[#1A1A1A] rounded-md hover:border-[#222222] transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{entry.title}</h3>
                        <div className="text-2xl">{moods[entry.mood].emoji}</div>
                      </div>
                      <p className="text-sm text-text-secondary mb-2">{entry.excerpt}</p>
                      <div className="flex justify-between items-center">
                        <div className="text-xs text-text-secondary">{entry.date}</div>
                        <div className="flex gap-1">
                          {entry.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 bg-[#0A0A0A] border border-[#1A1A1A] rounded-full text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-[#0A0A0A] border-[#1A1A1A]">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart className="mr-2 h-5 w-5 text-pink-400" />
                Mood Tracker
              </CardTitle>
              <CardDescription>Track your mood over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium">Last 7 Days</div>
                  <Button variant="ghost" size="sm" className="text-text-secondary h-8 px-2">
                    <Calendar className="h-4 w-4 mr-1" /> View Calendar
                  </Button>
                </div>

                <div className="flex justify-between items-end h-[150px]">
                  {moodHistory.map((day, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div
                        className="w-8 bg-pink-400/30 rounded-t-sm"
                        style={{ height: `${(day.mood + 1) * 25}px` }}
                      ></div>
                      <div className="mt-2 text-xs text-text-secondary">{day.date}</div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-[#1A1A1A]">
                  <div className="text-sm font-medium mb-2">Mood Distribution</div>
                  <div className="grid grid-cols-5 gap-2">
                    {moods.map((mood, index) => {
                      const count = moodHistory.filter((day) => day.mood === index).length
                      return (
                        <div key={index} className="flex flex-col items-center">
                          <div className="text-xl mb-1">{mood.emoji}</div>
                          <div className="text-xs text-text-secondary">{count}</div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#0A0A0A] border-[#1A1A1A]">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Tag className="mr-2 h-5 w-5 text-pink-400" />
                Popular Tags
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {["work", "morning", "energy", "challenge", "planning", "evening", "ideas", "goals", "reflection"].map(
                  (tag) => (
                    <div
                      key={tag}
                      className="px-3 py-1 bg-[#111111] border border-[#1A1A1A] rounded-full text-sm hover:bg-[#1A1A1A] cursor-pointer transition-colors"
                    >
                      {tag}
                    </div>
                  ),
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#0A0A0A] border-[#1A1A1A]">
            <CardHeader>
              <CardTitle>Reflection Prompts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-[#111111] border border-[#1A1A1A] rounded-md hover:border-[#222222] transition-colors cursor-pointer">
                  <p className="text-sm">What are three things you're grateful for today?</p>
                </div>
                <div className="p-3 bg-[#111111] border border-[#1A1A1A] rounded-md hover:border-[#222222] transition-colors cursor-pointer">
                  <p className="text-sm">What's one challenge you faced today and how did you handle it?</p>
                </div>
                <div className="p-3 bg-[#111111] border border-[#1A1A1A] rounded-md hover:border-[#222222] transition-colors cursor-pointer">
                  <p className="text-sm">What's something you learned today?</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
