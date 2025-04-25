"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, ChevronLeft, ChevronRight, Quote, Lightbulb, Clock, Bookmark, Share2 } from "lucide-react"
import { cn } from "@/lib/utils"

export default function DigestPage() {
  const [activeQuoteIndex, setActiveQuoteIndex] = useState(0)
  const [activeMentalModelIndex, setActiveMentalModelIndex] = useState(0)
  const [savedQuotes, setSavedQuotes] = useState<number[]>([])
  const [readingTime, setReadingTime] = useState(3) // minutes

  const quotes = [
    {
      text: "The only way to do great work is to love what you do.",
      author: "Steve Jobs",
      source: "Stanford Commencement Address, 2005",
    },
    {
      text: "It is not that we have a short time to live, but that we waste a lot of it.",
      author: "Seneca",
      source: "On the Shortness of Life",
    },
    {
      text: "The mind is everything. What you think you become.",
      author: "Buddha",
      source: "Buddhist teachings",
    },
    {
      text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
      author: "Aristotle",
      source: "Nicomachean Ethics",
    },
    {
      text: "Your time is limited, so don't waste it living someone else's life.",
      author: "Steve Jobs",
      source: "Stanford Commencement Address, 2005",
    },
  ]

  const mentalModels = [
    {
      title: "The Pareto Principle",
      description:
        "Also known as the 80/20 rule, this principle suggests that roughly 80% of effects come from 20% of causes. For example, 80% of your results may come from 20% of your efforts.",
      source: "Named after economist Vilfredo Pareto",
      category: "Productivity",
    },
    {
      title: "Occam's Razor",
      description:
        "When presented with competing hypotheses, select the one that makes the fewest assumptions. The simplest explanation is usually the correct one.",
      source: "Named after William of Ockham",
      category: "Decision Making",
    },
    {
      title: "Confirmation Bias",
      description:
        "The tendency to search for, interpret, favor, and recall information in a way that confirms one's preexisting beliefs or hypotheses.",
      source: "Cognitive Psychology",
      category: "Thinking",
    },
    {
      title: "Availability Heuristic",
      description:
        "A mental shortcut that relies on immediate examples that come to mind when evaluating a specific topic, concept, or decision.",
      source: "Cognitive Psychology",
      category: "Thinking",
    },
    {
      title: "Second-Order Thinking",
      description:
        "Considering the consequences of the consequences. Thinking beyond the immediate results of an action to the effects that follow.",
      source: "Systems Thinking",
      category: "Decision Making",
    },
  ]

  const handlePrevQuote = () => {
    setActiveQuoteIndex((prev) => (prev === 0 ? quotes.length - 1 : prev - 1))
  }

  const handleNextQuote = () => {
    setActiveQuoteIndex((prev) => (prev === quotes.length - 1 ? 0 : prev + 1))
  }

  const handlePrevModel = () => {
    setActiveMentalModelIndex((prev) => (prev === 0 ? mentalModels.length - 1 : prev - 1))
  }

  const handleNextModel = () => {
    setActiveMentalModelIndex((prev) => (prev === mentalModels.length - 1 ? 0 : prev + 1))
  }

  const toggleSaveQuote = (index: number) => {
    if (savedQuotes.includes(index)) {
      setSavedQuotes(savedQuotes.filter((i) => i !== index))
    } else {
      setSavedQuotes([...savedQuotes, index])
    }
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 flex items-center">
          <BookOpen className="mr-3 h-6 w-6 text-amber-400" />
          Digest
        </h1>
        <p className="text-text-secondary">Consume bite-sized wisdom and knowledge to expand your mind.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-[#0A0A0A] border-[#1A1A1A]">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Quote className="mr-2 h-5 w-5 text-amber-400" />
                Daily Wisdom
              </CardTitle>
              <CardDescription>Inspirational quotes to reflect upon</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-md p-6 min-h-[200px] flex flex-col justify-center relative">
                <div className="absolute top-4 right-4 text-amber-400/30 pointer-events-none">
                  <Quote className="h-16 w-16 rotate-180" />
                </div>
                <blockquote className="text-xl italic text-white/90 text-center mb-4 relative z-10">
                  "{quotes[activeQuoteIndex].text}"
                </blockquote>
                <div className="text-center">
                  <p className="font-medium text-amber-400">{quotes[activeQuoteIndex].author}</p>
                  <p className="text-sm text-white/60">{quotes[activeQuoteIndex].source}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t border-[#1A1A1A] pt-4">
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-black text-white hover:bg-[#222222] border-[#1A1A1A]"
                  onClick={() => toggleSaveQuote(activeQuoteIndex)}
                >
                  <Bookmark
                    className={cn(
                      "h-4 w-4 mr-1",
                      savedQuotes.includes(activeQuoteIndex) ? "fill-amber-400 text-amber-400" : "",
                    )}
                  />
                  {savedQuotes.includes(activeQuoteIndex) ? "Saved" : "Save"}
                </Button>
                <Button variant="outline" size="sm" className="bg-black text-white hover:bg-[#222222] border-[#1A1A1A]">
                  <Share2 className="h-4 w-4 mr-1" />
                  Share
                </Button>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-black text-white hover:bg-[#222222] border-[#1A1A1A]"
                  onClick={handlePrevQuote}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm text-text-secondary py-1 px-2">
                  {activeQuoteIndex + 1}/{quotes.length}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-black text-white hover:bg-[#222222] border-[#1A1A1A]"
                  onClick={handleNextQuote}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>

          <Card className="bg-[#0A0A0A] border-[#1A1A1A]">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lightbulb className="mr-2 h-5 w-5 text-amber-400" />
                Mental Models
              </CardTitle>
              <CardDescription>Powerful thinking frameworks to improve your decision making</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-md p-6 min-h-[200px] relative">
                <div className="absolute top-4 right-4 text-amber-400/20 pointer-events-none">
                  <Lightbulb className="h-12 w-12" />
                </div>
                <div className="mb-2 flex items-center">
                  <h3 className="text-xl font-bold text-white">{mentalModels[activeMentalModelIndex].title}</h3>
                  <span className="ml-2 px-2 py-0.5 text-xs bg-amber-400/20 text-amber-400 rounded-full">
                    {mentalModels[activeMentalModelIndex].category}
                  </span>
                </div>
                <p className="text-white/80 mb-4">{mentalModels[activeMentalModelIndex].description}</p>
                <p className="text-sm text-white/60 italic">Source: {mentalModels[activeMentalModelIndex].source}</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t border-[#1A1A1A] pt-4">
              <div className="flex items-center">
                <Clock className="h-4 w-4 text-text-secondary mr-1" />
                <span className="text-sm text-text-secondary">{readingTime} min read</span>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-black text-white hover:bg-[#222222] border-[#1A1A1A]"
                  onClick={handlePrevModel}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm text-text-secondary py-1 px-2">
                  {activeMentalModelIndex + 1}/{mentalModels.length}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-black text-white hover:bg-[#222222] border-[#1A1A1A]"
                  onClick={handleNextModel}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-[#0A0A0A] border-[#1A1A1A]">
            <CardHeader>
              <CardTitle>Reading List</CardTitle>
              <CardDescription>Saved content for later</CardDescription>
            </CardHeader>
            <CardContent>
              {savedQuotes.length > 0 ? (
                <div className="space-y-3">
                  {savedQuotes.map((index) => (
                    <div
                      key={index}
                      className="p-3 bg-[#111111] border border-[#1A1A1A] rounded-md hover:border-[#222222] transition-colors"
                    >
                      <p className="text-sm italic mb-1">"{quotes[index].text.substring(0, 60)}..."</p>
                      <p className="text-xs text-amber-400">{quotes[index].author}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-text-secondary">
                  <Bookmark className="h-8 w-8 mx-auto mb-2 opacity-30" />
                  <p>No saved items yet</p>
                  <p className="text-sm">Save quotes to read later</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-[#0A0A0A] border-[#1A1A1A]">
            <CardHeader>
              <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {["Productivity", "Decision Making", "Thinking", "Philosophy", "Psychology"].map((category) => (
                  <Button
                    key={category}
                    variant="outline"
                    className="w-full justify-start bg-black text-white hover:bg-[#222222] border-[#1A1A1A]"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#0A0A0A] border-[#1A1A1A]">
            <CardHeader>
              <CardTitle>Fun Fact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-[#111111] border border-[#1A1A1A] rounded-md">
                <p className="text-white/90">
                  The human brain can process an image that the eyes see for as little as 13 milliseconds.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
