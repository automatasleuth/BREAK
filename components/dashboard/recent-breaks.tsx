import { Clock, Brain, BookOpen, PenTool } from "lucide-react"
import { cn } from "@/lib/utils"

export function RecentBreaks() {
  const recentBreaks = [
    {
      id: 1,
      type: "relax",
      title: "Northern Lights",
      duration: "10 min",
      date: "Today, 2:30 PM",
      icon: Clock,
      color: "text-blue-400 bg-blue-400/10",
    },
    {
      id: 2,
      type: "stimulate",
      title: "Minesweeper",
      duration: "15 min",
      date: "Yesterday, 4:15 PM",
      icon: Brain,
      color: "text-green-400 bg-green-400/10",
    },
    {
      id: 3,
      type: "digest",
      title: "Mental Models",
      duration: "5 min",
      date: "Yesterday, 10:30 AM",
      icon: BookOpen,
      color: "text-amber-400 bg-amber-400/10",
    },
    {
      id: 4,
      type: "reflect",
      title: "Daily Journal",
      duration: "8 min",
      date: "Apr 23, 3:45 PM",
      icon: PenTool,
      color: "text-pink-400 bg-pink-400/10",
    },
  ]

  return (
    <div className="bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl p-5">
      <h2 className="text-lg font-bold mb-4">Recent Breaks</h2>

      <div className="space-y-3">
        {recentBreaks.map((breakItem) => {
          const Icon = breakItem.icon

          return (
            <div
              key={breakItem.id}
              className="flex items-center p-3 rounded-lg bg-[#111111] border border-[#1A1A1A] hover:border-[#222222] transition-colors"
            >
              <div className={cn("w-10 h-10 rounded-full flex items-center justify-center mr-3", breakItem.color)}>
                <Icon className="h-5 w-5" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{breakItem.title}</p>
                <p className="text-sm text-text-secondary">{breakItem.date}</p>
              </div>

              <div className="text-sm text-text-secondary">{breakItem.duration}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
