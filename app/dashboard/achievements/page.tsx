"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Award,
  Trophy,
  Star,
  Clock,
  Calendar,
  Brain,
  BookOpen,
  PenTool,
  BarChart3,
  Lock,
  CheckCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function AchievementsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const achievementCategories = [
    { id: "all", label: "All" },
    { id: "streak", label: "Streaks" },
    { id: "milestones", label: "Milestones" },
    { id: "special", label: "Special" },
  ]

  const achievements = [
    {
      id: 1,
      title: "Early Bird",
      description: "Complete 5 breaks before 9 AM",
      category: "special",
      progress: 3,
      total: 5,
      icon: Clock,
      color: "bg-blue-400/20 text-blue-400",
      xp: 50,
    },
    {
      id: 2,
      title: "Consistency King",
      description: "Maintain a 7-day streak",
      category: "streak",
      progress: 5,
      total: 7,
      icon: Calendar,
      color: "bg-green-400/20 text-green-400",
      xp: 100,
    },
    {
      id: 3,
      title: "Explorer",
      description: "Try all break types",
      category: "milestones",
      progress: 3,
      total: 4,
      icon: Brain,
      color: "bg-amber-400/20 text-amber-400",
      xp: 75,
    },
    {
      id: 4,
      title: "Bookworm",
      description: "Complete 10 Digest breaks",
      category: "milestones",
      progress: 7,
      total: 10,
      icon: BookOpen,
      color: "bg-amber-400/20 text-amber-400",
      xp: 100,
    },
    {
      id: 5,
      title: "Self-Aware",
      description: "Complete 10 Reflect breaks",
      category: "milestones",
      progress: 10,
      total: 10,
      icon: PenTool,
      color: "bg-pink-400/20 text-pink-400",
      xp: 100,
      completed: true,
    },
    {
      id: 6,
      title: "Zen Master",
      description: "Complete 20 Relax breaks",
      category: "milestones",
      progress: 15,
      total: 20,
      icon: Clock,
      color: "bg-blue-400/20 text-blue-400",
      xp: 150,
    },
    {
      id: 7,
      title: "Brain Trainer",
      description: "Complete 20 Stimulate breaks",
      category: "milestones",
      progress: 12,
      total: 20,
      icon: Brain,
      color: "bg-green-400/20 text-green-400",
      xp: 150,
    },
    {
      id: 8,
      title: "Two Week Warrior",
      description: "Maintain a 14-day streak",
      category: "streak",
      progress: 5,
      total: 14,
      icon: Calendar,
      color: "bg-green-400/20 text-green-400",
      xp: 200,
    },
    {
      id: 9,
      title: "Month Master",
      description: "Maintain a 30-day streak",
      category: "streak",
      progress: 5,
      total: 30,
      icon: Calendar,
      color: "bg-green-400/20 text-green-400",
      xp: 500,
    },
    {
      id: 10,
      title: "Century Club",
      description: "Complete 100 breaks total",
      category: "milestones",
      progress: 47,
      total: 100,
      icon: Trophy,
      color: "bg-gold/20 text-gold",
      xp: 1000,
    },
    {
      id: 11,
      title: "Night Owl",
      description: "Complete 5 breaks after 10 PM",
      category: "special",
      progress: 2,
      total: 5,
      icon: Clock,
      color: "bg-blue-400/20 text-blue-400",
      xp: 50,
    },
    {
      id: 12,
      title: "Weekend Warrior",
      description: "Complete 10 breaks on weekends",
      category: "special",
      progress: 6,
      total: 10,
      icon: Calendar,
      color: "bg-green-400/20 text-green-400",
      xp: 100,
    },
  ]

  const filteredAchievements =
    selectedCategory === "all" ? achievements : achievements.filter((a) => a.category === selectedCategory)

  const completedAchievements = achievements.filter((a) => a.completed || a.progress >= a.total).length
  const totalAchievements = achievements.length
  const completionPercentage = Math.round((completedAchievements / totalAchievements) * 100)
  const totalXP = achievements.reduce((sum, a) => {
    const earnedXP = a.completed || a.progress >= a.total ? a.xp : Math.floor((a.progress / a.total) * a.xp)
    return sum + earnedXP
  }, 0)

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 flex items-center">
          <Award className="mr-3 h-6 w-6 text-gold" />
          Achievements
        </h1>
        <p className="text-text-secondary">Track your accomplishments and earn badges for your progress.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-[#0A0A0A] border-[#1A1A1A]">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Trophy className="mr-2 h-5 w-5 text-gold" />
              Completion
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-gold">{completionPercentage}%</div>
            <p className="text-text-secondary text-sm mt-1">
              {completedAchievements} of {totalAchievements} achievements
            </p>
            <div className="h-2 bg-[#111111] rounded-full overflow-hidden mt-3">
              <div
                className="h-full bg-gradient-to-r from-gold/70 to-gold rounded-full"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#0A0A0A] border-[#1A1A1A]">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Star className="mr-2 h-5 w-5 text-gold" />
              Total XP
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-gold">{totalXP} XP</div>
            <p className="text-text-secondary text-sm mt-1">From achievements</p>
          </CardContent>
        </Card>

        <Card className="bg-[#0A0A0A] border-[#1A1A1A]">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <BarChart3 className="mr-2 h-5 w-5 text-gold" />
              Recent Unlocks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-pink-400/20 flex items-center justify-center mr-3">
                <PenTool className="h-5 w-5 text-pink-400" />
              </div>
              <div>
                <p className="font-medium">Self-Aware</p>
                <p className="text-xs text-text-secondary">Unlocked 2 days ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-[#0A0A0A] border-[#1A1A1A] mb-6">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>Your Achievements</CardTitle>
          <div className="flex space-x-2">
            {achievementCategories.map((category) => (
              <Button
                key={category.id}
                variant="outline"
                size="sm"
                className={cn(
                  "border-[#1A1A1A] bg-black text-white hover:bg-[#222222]",
                  selectedCategory === category.id && "border-gold/30 bg-gold/10 text-gold",
                )}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAchievements.map((achievement) => {
              const Icon = achievement.icon
              const isCompleted = achievement.completed || achievement.progress >= achievement.total
              const percentage = Math.round((achievement.progress / achievement.total) * 100)

              return (
                <div
                  key={achievement.id}
                  className={cn(
                    "bg-[#111111] border border-[#1A1A1A] rounded-lg p-4 transition-all duration-300",
                    isCompleted && "border-gold/30",
                  )}
                >
                  <div className="flex items-center mb-3">
                    <div
                      className={`w-12 h-12 rounded-full ${achievement.color} flex items-center justify-center mr-3`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center">
                        <h3 className="font-medium">{achievement.title}</h3>
                        {isCompleted && <CheckCircle className="h-4 w-4 ml-2 text-gold" />}
                      </div>
                      <p className="text-sm text-text-secondary">{achievement.description}</p>
                    </div>
                  </div>
                  <div className="h-2 bg-[#0A0A0A] rounded-full overflow-hidden">
                    <div
                      className={cn("h-full rounded-full", isCompleted ? "bg-gold" : "bg-gray-600")}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-xs text-text-secondary">
                      {achievement.progress}/{achievement.total} completed
                    </p>
                    <p className="text-xs font-medium text-gold">+{achievement.xp} XP</p>
                  </div>
                </div>
              )
            })}

            {/* Locked achievement example */}
            <div className="bg-[#111111] border border-[#1A1A1A] rounded-lg p-4 opacity-60">
              <div className="flex items-center mb-3">
                <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center mr-3">
                  <Lock className="h-6 w-6 text-gray-500" />
                </div>
                <div>
                  <h3 className="font-medium">???</h3>
                  <p className="text-sm text-text-secondary">Complete more breaks to unlock</p>
                </div>
              </div>
              <div className="h-2 bg-[#0A0A0A] rounded-full overflow-hidden">
                <div className="h-full bg-gray-700 rounded-full w-0"></div>
              </div>
              <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-text-secondary">0/? completed</p>
                <p className="text-xs font-medium text-gold">+??? XP</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
