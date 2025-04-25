import { Clock, Brain, BookOpen, PenTool } from "lucide-react"
import { BreakTypeCard } from "@/components/dashboard/break-type-card"
import { ProgressStats } from "@/components/dashboard/progress-stats"
import { StreakCalendar } from "@/components/dashboard/streak-calendar"
import { RecentBreaks } from "@/components/dashboard/recent-breaks"
import { QuickStartTimer } from "@/components/dashboard/quick-start-timer"
import { RecommendedBreaks } from "@/components/dashboard/recommended-breaks"
import { MoodTracker } from "@/components/dashboard/mood-tracker"

export default function Dashboard() {
  return (
    <>
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome back, Demo</h1>
        <p className="text-text-secondary">Ready for a mental refresh? You've completed 3 of 5 breaks this week.</p>
      </div>

      {/* Quick Start Timer */}
      <QuickStartTimer className="mb-8" />

      {/* Break Types Grid */}
      <div className="mb-8">
        <div className="mb-4">
          <h2 className="text-xl font-bold">Break Types</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <BreakTypeCard
            title="Relax"
            icon={Clock}
            description="Calm your mind with soothing visuals"
            color="from-blue-500/20 to-purple-500/20"
            href="/dashboard/relax"
          />
          <BreakTypeCard
            title="Stimulate"
            icon={Brain}
            description="Engage your brain with puzzles"
            color="from-green-500/20 to-emerald-500/20"
            href="/dashboard/stimulate"
          />
          <BreakTypeCard
            title="Digest"
            icon={BookOpen}
            description="Consume bite-sized wisdom"
            color="from-amber-500/20 to-orange-500/20"
            href="/dashboard/digest"
          />
          <BreakTypeCard
            title="Reflect"
            icon={PenTool}
            description="Journal thoughts and track mood"
            color="from-pink-500/20 to-rose-500/20"
            href="/dashboard/reflect"
          />
        </div>
      </div>

      {/* Two Column Layout for Stats and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Left Column - Progress Stats */}
        <div className="lg:col-span-2 space-y-6">
          <ProgressStats />
          <StreakCalendar />
          <RecentBreaks />
        </div>

        {/* Right Column - Recommendations and Mood */}
        <div className="space-y-6">
          <RecommendedBreaks />
          <MoodTracker />
        </div>
      </div>
    </>
  )
}
