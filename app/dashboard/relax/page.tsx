"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Volume2, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AuroraAnimation } from "@/components/aurora-animation"
import { BreathingExercise } from "@/components/breathing-exercise"
import { cn } from "@/lib/utils"

export default function RelaxPage() {
  const [activeTab, setActiveTab] = useState<"aurora" | "breathing" | "sounds">("aurora")

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 flex items-center">
          <Clock className="mr-3 h-6 w-6 text-blue-400" />
          Relax
        </h1>
        <p className="text-text-secondary">
          Take a moment to calm your mind with soothing visuals and relaxation exercises.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="md:col-span-1 space-y-4">
          <Card className="bg-[#0A0A0A] border-[#1A1A1A]">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Relaxation Tools</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 pt-0">
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start",
                  activeTab === "aurora" ? "bg-blue-500/10 text-blue-400" : "text-text-secondary",
                )}
                onClick={() => setActiveTab("aurora")}
              >
                <Moon className="mr-2 h-4 w-4" />
                Aurora Visualization
              </Button>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start",
                  activeTab === "breathing" ? "bg-blue-500/10 text-blue-400" : "text-text-secondary",
                )}
                onClick={() => setActiveTab("breathing")}
              >
                <Clock className="mr-2 h-4 w-4" />
                Breathing Exercise
              </Button>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start",
                  activeTab === "sounds" ? "bg-blue-500/10 text-blue-400" : "text-text-secondary",
                )}
                onClick={() => setActiveTab("sounds")}
              >
                <Volume2 className="mr-2 h-4 w-4" />
                Ambient Sounds
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-[#0A0A0A] border-[#1A1A1A]">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Benefits</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="space-y-2 text-sm text-text-secondary">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Reduces stress and anxiety</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Lowers heart rate and blood pressure</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Improves focus and concentration</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Enhances creativity and problem-solving</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-3">
          <Card className="bg-[#0A0A0A] border-[#1A1A1A]">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">
                {activeTab === "aurora" && "Aurora Visualization"}
                {activeTab === "breathing" && "Breathing Exercise"}
                {activeTab === "sounds" && "Ambient Sounds"}
              </CardTitle>
            </CardHeader>
            <CardContent className="aspect-video">
              {activeTab === "aurora" && <AuroraAnimation />}
              {activeTab === "breathing" && <BreathingExercise />}
              {activeTab === "sounds" && <div>Sounds Coming Soon!</div>}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
