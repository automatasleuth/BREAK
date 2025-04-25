"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, Calendar, Clock, Award, TrendingUp, Brain, BookOpen, PenTool, Filter } from "lucide-react"
import { cn } from "@/lib/utils"

export default function ProgressPage() {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("week")

  const breakTypeData = [
    { type: "Relax", count: 15, color: "bg-blue-400", icon: Clock },
    { type: "Stimulate", count: 12, color: "bg-green-400", icon: Brain },
    { type: "Digest", count: 10, color: "bg-amber-400", icon: BookOpen },
    { type: "Reflect", count: 10, color: "bg-pink-400", icon: PenTool },
  ]

  const totalBreaks = breakTypeData.reduce((sum, item) => sum + item.count, 0)

  const weeklyActivity = [
    { day: "Mon", breaks: 2 },
    { day: "Tue", breaks: 3 },
    { day: "Wed", breaks: 1 },
    { day: "Thu", breaks: 2 },
    { day: "Fri", breaks: 3 },
    { day: "Sat", breaks: 0 },
    { day: "Sun", breaks: 1 },
  ]

  const achievements = [
    {
      title: "Early Bird",
      description: "Complete 5 breaks before 9 AM",
      progress: 3,
      total: 5,
      icon: Clock,
    },
    {
      title: "Consistency King",
      description: "Maintain a 7-day streak",
      progress: 5,
      total: 7,
      icon: Calendar,
    },
    {
      title: "Explorer",
      description: "Try all break types",
      progress: 3,
      total: 4,
      icon: Brain,
    },
  ]

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 flex items-center">
          <BarChart3 className="mr-3 h-6 w-6 text-gold" />
          Progress
        </h1>
        <p className="text-text-secondary">Track your mental fitness journey and see how far you've come.</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <Tabs defaultValue="overview" className="w-[400px]">
          <TabsList className="bg-[#111111]">
            <TabsTrigger value="overview" className="data-[state=active]:bg-gold data-[state=active]:text-black">
              Overview
            </TabsTrigger>
            <TabsTrigger value="achievements" className="data-[state=active]:bg-gold data-[state=active]:text-black">
              Achievements
            </TabsTrigger>
            <TabsTrigger value="stats" className="data-[state=active]:bg-gold data-[state=active]:text-black">
              Stats
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "border-[#1A1A1A] bg-black text-white hover:bg-[#222222]",
              timeRange === "week" && "border-gold/30 bg-gold/10 text-gold",
            )}
            onClick={() => setTimeRange("week")}
          >
            Week
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "border-[#1A1A1A] bg-black text-white hover:bg-[#222222]",
              timeRange === "month" && "border-gold/30 bg-gold/10 text-gold",
            )}
            onClick={() => setTimeRange("month")}
          >
            Month
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "border-[#1A1A1A] bg-black text-white hover:bg-[#222222]",
              timeRange === "year" && "border-gold/30 bg-gold/10 text-gold",
            )}
            onClick={() => setTimeRange("year")}
          >
            Year
          </Button>
          <Button variant="outline" size="sm" className="border-[#1A1A1A] bg-black text-white hover:bg-[#222222]">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-[#0A0A0A] border-[#1A1A1A]">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-gold" />
              Total Breaks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-gold">{totalBreaks}</div>
            <p className="text-text-secondary text-sm mt-1">+12% from last {timeRange}</p>
          </CardContent>
        </Card>

        <Card className="bg-[#0A0A0A] border-[#1A1A1A]">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-gold" />
              Current Streak
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-gold">5 days</div>
            <p className="text-text-secondary text-sm mt-1">Your longest: 14 days</p>
          </CardContent>
        </Card>

        <Card className="bg-[#0A0A0A] border-[#1A1A1A]">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Clock className="mr-2 h-5 w-5 text-gold" />
              Break Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-gold">8.5 hrs</div>
            <p className="text-text-secondary text-sm mt-1">This {timeRange}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <Card className="bg-[#0A0A0A] border-[#1A1A1A] h-full">
            <CardHeader>
              <CardTitle>Break Activity</CardTitle>
              <CardDescription>Your break patterns over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-end justify-between">
                {weeklyActivity.map((day, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="flex flex-col-reverse">
                      {Array.from({ length: day.breaks }).map((_, i) => (
                        <div
                          key={i}
                          className="w-12 h-12 m-1 rounded-md bg-gold/20 border border-gold/10 flex items-center justify-center"
                        >
                          {i === 0 && day.breaks > 0 && <span className="text-gold font-medium">{day.breaks}</span>}
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 text-sm text-text-secondary">{day.day}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="bg-[#0A0A0A] border-[#1A1A1A]">
            <CardHeader>
              <CardTitle>Break Type Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {breakTypeData.map((item, index) => {
                  const Icon = item.icon
                  const percentage = Math.round((item.count / totalBreaks) * 100)

                  return (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center">
                          <Icon className={`h-4 w-4 mr-2 text-${item.color.replace("bg-", "")}`} />
                          <span>{item.type}</span>
                        </div>
                        <div className="text-sm text-text-secondary">
                          {item.count} ({percentage}%)
                        </div>
                      </div>
                      <div className="h-2 bg-[#111111] rounded-full overflow-hidden">
                        <div className={`h-full ${item.color} rounded-full`} style={{ width: `${percentage}%` }}></div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="bg-[#0A0A0A] border-[#1A1A1A] mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="mr-2 h-5 w-5 text-gold" />
            Achievements Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon
              const percentage = Math.round((achievement.progress / achievement.total) * 100)

              return (
                <div key={index} className="bg-[#111111] border border-[#1A1A1A] rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center mr-3">
                      <Icon className="h-5 w-5 text-gold" />
                    </div>
                    <div>
                      <p className="font-medium">{achievement.title}</p>
                      <p className="text-xs text-text-secondary">{achievement.description}</p>
                    </div>
                  </div>
                  <div className="h-2 bg-[#0A0A0A] rounded-full overflow-hidden mt-3">
                    <div className="h-full bg-gold rounded-full" style={{ width: `${percentage}%` }}></div>
                  </div>
                  <p className="text-right text-xs text-text-secondary mt-1">
                    {achievement.progress}/{achievement.total} completed
                  </p>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </>
  )
}
