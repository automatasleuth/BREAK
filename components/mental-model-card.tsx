"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface MentalModel {
  id: number
  title: string
  description: string
  example: string
  application: string
}

interface MentalModelCardProps {
  className?: string
}

export function MentalModelCard({ className }: MentalModelCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const mentalModels: MentalModel[] = [
    {
      id: 1,
      title: "The Pareto Principle",
      description:
        "Also known as the 80/20 rule, this principle suggests that roughly 80% of effects come from 20% of causes.",
      example: "80% of your results may come from 20% of your efforts or time.",
      application:
        "Focus on identifying and prioritizing the 20% of activities that yield 80% of your desired results.",
    },
    {
      id: 2,
      title: "Occam's Razor",
      description: "When presented with competing hypotheses, select the one that makes the fewest assumptions.",
      example: "The simplest explanation is usually the correct one.",
      application:
        "When solving problems, start with the simplest possible solution before exploring more complex ones.",
    },
    {
      id: 3,
      title: "Confirmation Bias",
      description:
        "The tendency to search for, interpret, favor, and recall information in a way that confirms one's preexisting beliefs.",
      example: "Only reading news sources that align with your political views.",
      application:
        "Actively seek out information that challenges your existing beliefs to make more balanced decisions.",
    },
    {
      id: 4,
      title: "Opportunity Cost",
      description: "The loss of potential gain from other alternatives when one alternative is chosen.",
      example: "Spending time on social media means you can't use that time for exercise or learning.",
      application:
        "When making decisions, consider not just what you gain, but what you give up by not choosing alternatives.",
    },
    {
      id: 5,
      title: "Hanlon's Razor",
      description: "Never attribute to malice that which is adequately explained by stupidity or ignorance.",
      example:
        "A colleague who didn't include you in an email thread likely forgot rather than deliberately excluded you.",
      application: "Assume good intentions first before jumping to conclusions about others' motivations.",
    },
  ]

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % mentalModels.length)
  }

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + mentalModels.length) % mentalModels.length)
  }

  const currentModel = mentalModels[currentIndex]

  return (
    <Card className={cn("bg-[#0A0A0A] border-[#1A1A1A] overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-gold">{currentModel.title}</h3>
            <div className="text-sm text-text-secondary">
              {currentIndex + 1} of {mentalModels.length}
            </div>
          </div>

          <div className="bg-[#111111] rounded-lg p-4 min-h-[200px]">
            <h4 className="text-sm uppercase text-text-secondary mb-2">Description</h4>
            <p className="mb-4">{currentModel.description}</p>

            <h4 className="text-sm uppercase text-text-secondary mb-2">Example</h4>
            <p className="mb-4 text-gold/90 italic">{currentModel.example}</p>

            <h4 className="text-sm uppercase text-text-secondary mb-2">Application</h4>
            <p>{currentModel.application}</p>
          </div>

          <div className="flex justify-between items-center pt-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0 rounded-full border-[#1A1A1A] bg-black text-white hover:bg-[#222222] hover:text-white"
              onClick={handlePrevious}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>

            <div className="flex space-x-1">
              {mentalModels.map((_, index) => (
                <div
                  key={index}
                  className={cn("h-2 w-2 rounded-full", index === currentIndex ? "bg-gold" : "bg-[#1A1A1A]")}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0 rounded-full border-[#1A1A1A] bg-black text-white hover:bg-[#222222] hover:text-white"
              onClick={handleNext}
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
