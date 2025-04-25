import { Clock, Brain, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function RecommendedBreaks() {
  const recommendations = [
    {
      id: 1,
      type: "relax",
      title: "Ocean Waves",
      duration: "10 min",
      icon: Clock,
      color: "text-blue-400 bg-blue-400/10",
    },
    {
      id: 2,
      type: "stimulate",
      title: "Memory Game",
      duration: "5 min",
      icon: Brain,
      color: "text-green-400 bg-green-400/10",
    },
    {
      id: 3,
      type: "digest",
      title: "Pareto Principle",
      duration: "5 min",
      icon: BookOpen,
      color: "text-amber-400 bg-amber-400/10",
    },
  ]

  return (
    <div className="bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl p-5">
      <h2 className="text-lg font-bold mb-4">Recommended For You</h2>

      <div className="space-y-3">
        {recommendations.map((rec) => {
          const Icon = rec.icon

          return (
            <div
              key={rec.id}
              className="flex items-center p-3 rounded-lg bg-[#111111] border border-[#1A1A1A] hover:border-[#222222] transition-colors"
            >
              <div className={cn("w-10 h-10 rounded-full flex items-center justify-center mr-3", rec.color)}>
                <Icon className="h-5 w-5" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{rec.title}</p>
                <p className="text-sm text-text-secondary">{rec.duration}</p>
              </div>

              <Button size="sm" className="bg-black hover:bg-[#222222] text-white">
                Start
              </Button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
