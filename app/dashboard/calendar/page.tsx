"use client"

import React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarIcon, ChevronLeft, ChevronRight, Plus, Clock, Brain, BookOpen, PenTool } from "lucide-react"
import { cn } from "@/lib/utils"

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())

  // Generate calendar data
  const generateCalendarDays = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()

    // First day of the month
    const firstDay = new Date(year, month, 1)
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0)

    // Day of the week for the first day (0 = Sunday, 1 = Monday, etc.)
    const firstDayOfWeek = firstDay.getDay()
    // Total days in the month
    const daysInMonth = lastDay.getDate()

    // Generate array of days
    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push({ day: null, isCurrentMonth: false })
    }

    // Add days of the current month
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(year, month, i)
      const isToday = isSameDay(currentDate, new Date())
      const isSelected = selectedDate && isSameDay(currentDate, selectedDate)

      // Randomly assign breaks for demo
      const hasBreaks = Math.random() > 0.6
      const breakCount = hasBreaks ? Math.floor(Math.random() * 3) + 1 : 0
      const breakTypes = hasBreaks ? getRandomBreakTypes(breakCount) : []

      days.push({
        day: i,
        date: currentDate,
        isCurrentMonth: true,
        isToday,
        isSelected,
        hasBreaks,
        breakCount,
        breakTypes,
      })
    }

    // Add empty cells for days after the last day of the month to complete the grid
    const remainingCells = 42 - days.length // 6 rows of 7 days
    for (let i = 0; i < remainingCells; i++) {
      days.push({ day: null, isCurrentMonth: false })
    }

    return days
  }

  // Helper function to check if two dates are the same day
  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    )
  }

  // Helper function to get random break types
  const getRandomBreakTypes = (count: number) => {
    const types = [
      { type: "relax", icon: Clock, color: "text-blue-400" },
      { type: "stimulate", icon: Brain, color: "text-green-400" },
      { type: "digest", icon: BookOpen, color: "text-amber-400" },
      { type: "reflect", icon: PenTool, color: "text-pink-400" },
    ]

    // Shuffle and take the first 'count' elements
    return [...types].sort(() => Math.random() - 0.5).slice(0, count)
  }

  const calendarDays = generateCalendarDays(currentMonth)

  // Group days into weeks
  const weeks = []
  for (let i = 0; i < calendarDays.length; i += 7) {
    weeks.push(calendarDays.slice(i, i + 7))
  }

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  // Navigate to next month
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  // Format month and year
  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" })
  }

  // Handle date selection
  const handleDateClick = (day: any) => {
    if (day.date) {
      setSelectedDate(day.date)
    }
  }

  // Sample scheduled breaks for the selected date
  const scheduledBreaks = [
    {
      id: 1,
      title: "Morning Meditation",
      time: "08:00 AM",
      duration: "10 min",
      type: "relax",
      icon: Clock,
      color: "text-blue-400",
    },
    {
      id: 2,
      title: "Brain Teaser",
      time: "12:30 PM",
      duration: "15 min",
      type: "stimulate",
      icon: Brain,
      color: "text-green-400",
    },
    {
      id: 3,
      title: "Evening Journal",
      time: "06:00 PM",
      duration: "10 min",
      type: "reflect",
      icon: PenTool,
      color: "text-pink-400",
    },
  ]

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 flex items-center">
          <CalendarIcon className="mr-3 h-6 w-6 text-blue-400" />
          Calendar
        </h1>
        <p className="text-text-secondary">Schedule and manage your breaks throughout the week.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <Card className="bg-[#0A0A0A] border-[#1A1A1A]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>{formatMonthYear(currentMonth)}</CardTitle>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 bg-black text-white hover:bg-[#222222] border-[#1A1A1A]"
                  onClick={prevMonth}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 bg-black text-white hover:bg-[#222222] border-[#1A1A1A]"
                  onClick={nextMonth}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1">
                {weekdays.map((day) => (
                  <div key={day} className="text-center text-sm font-medium text-text-secondary py-2">
                    {day}
                  </div>
                ))}

                {weeks.map((week, weekIndex) => (
                  <React.Fragment key={weekIndex}>
                    {week.map((day, dayIndex) => (
                      <div
                        key={dayIndex}
                        className={cn(
                          "min-h-[80px] p-1 relative border border-[#1A1A1A] rounded-md",
                          day.isCurrentMonth ? "bg-[#111111]" : "bg-[#0A0A0A] opacity-50",
                          day.isSelected && "ring-2 ring-gold/30",
                          day.isToday && "bg-gold/10",
                        )}
                        onClick={() => day.day && handleDateClick(day)}
                      >
                        {day.day && (
                          <>
                            <div className="flex justify-between items-start">
                              <span className={cn("text-sm font-medium", day.isToday && "text-gold")}>{day.day}</span>
                              {day.hasBreaks && (
                                <span className="text-xs bg-gold/20 text-gold px-1 rounded">{day.breakCount}</span>
                              )}
                            </div>

                            {day.hasBreaks && (
                              <div className="mt-1 space-y-1">
                                {day.breakTypes.map((breakType, index) => {
                                  const Icon = breakType.icon
                                  return (
                                    <div key={index} className="text-xs flex items-center p-1 bg-[#0A0A0A] rounded">
                                      <Icon className={`h-3 w-3 mr-1 ${breakType.color}`} />
                                      <span className="capitalize">{breakType.type}</span>
                                    </div>
                                  )
                                })}
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t border-[#1A1A1A] pt-4">
              <div className="flex space-x-4 text-sm text-text-secondary">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-gold/20 mr-2"></div>
                  <span>Today</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-gold mr-2"></div>
                  <span>Selected</span>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-[#0A0A0A] border-[#1A1A1A]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>Scheduled Breaks</CardTitle>
                <CardDescription>
                  {selectedDate?.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </CardDescription>
              </div>
              <Button className="bg-black text-white hover:bg-[#222222]">
                <Plus className="h-4 w-4 mr-1" /> Add Break
              </Button>
            </CardHeader>
            <CardContent>
              {scheduledBreaks.length > 0 ? (
                <div className="space-y-3">
                  {scheduledBreaks.map((breakItem) => {
                    const Icon = breakItem.icon
                    return (
                      <div
                        key={breakItem.id}
                        className="p-3 bg-[#111111] border border-[#1A1A1A] rounded-md hover:border-[#222222] transition-colors"
                      >
                        <div className="flex items-center">
                          <div
                            className={`w-8 h-8 rounded-full bg-[#0A0A0A] flex items-center justify-center mr-3 ${breakItem.color}`}
                          >
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{breakItem.title}</p>
                            <div className="flex items-center text-sm text-text-secondary">
                              <span>{breakItem.time}</span>
                              <span className="mx-2">•</span>
                              <span>{breakItem.duration}</span>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-text-secondary hover:text-white"
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-text-secondary">
                  <CalendarIcon className="h-12 w-12 mx-auto mb-3 opacity-20" />
                  <p>No breaks scheduled</p>
                  <p className="text-sm">Click the "Add Break" button to schedule a break</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-[#0A0A0A] border-[#1A1A1A]">
            <CardHeader>
              <CardTitle>Break Templates</CardTitle>
              <CardDescription>Quick-add common breaks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start bg-black text-white hover:bg-[#222222] border-[#1A1A1A]"
                >
                  <Clock className="mr-2 h-4 w-4 text-blue-400" />
                  Morning Meditation (10 min)
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-black text-white hover:bg-[#222222] border-[#1A1A1A]"
                >
                  <Brain className="mr-2 h-4 w-4 text-green-400" />
                  Lunch Break Game (15 min)
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-black text-white hover:bg-[#222222] border-[#1A1A1A]"
                >
                  <BookOpen className="mr-2 h-4 w-4 text-amber-400" />
                  Afternoon Reading (5 min)
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-black text-white hover:bg-[#222222] border-[#1A1A1A]"
                >
                  <PenTool className="mr-2 h-4 w-4 text-pink-400" />
                  Evening Journal (10 min)
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
