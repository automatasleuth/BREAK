import { cn } from "@/lib/utils"

export function StreakCalendar() {
  // Generate current month days
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()

  // Get first day of month (0 = Sunday, 1 = Monday, etc.)
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()

  // Generate calendar days
  const days = []

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push({ day: null, isCurrentMonth: false })
  }

  // Add days of the current month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      day: i,
      isCurrentMonth: true,
      isToday: i === currentDate.getDate(),
      hasBreak: Math.random() > 0.5, // Randomly assign breaks for demo
      breakCount: Math.floor(Math.random() * 3) + 1, // Random 1-3 breaks
    })
  }

  // Group days into weeks
  const weeks = []
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7))
  }

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return (
    <div className="bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl p-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Break Calendar</h2>
        <div className="text-sm font-medium">
          {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              {weekdays.map((day) => (
                <th key={day} className="text-xs text-text-secondary font-medium py-2">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {weeks.map((week, weekIndex) => (
              <tr key={weekIndex}>
                {week.map((day, dayIndex) => (
                  <td key={dayIndex} className="p-1 text-center">
                    {day.day !== null ? (
                      <div
                        className={cn(
                          "relative h-10 w-10 rounded-full flex flex-col items-center justify-center mx-auto text-sm transition-colors",
                          day.isToday && "bg-gold text-black font-medium",
                          day.hasBreak && !day.isToday && "bg-gold/20 text-gold",
                          !day.hasBreak && !day.isToday && "text-text-secondary hover:bg-[#111111]",
                        )}
                      >
                        <span>{day.day}</span>
                        {day.hasBreak && (
                          <span className="absolute -bottom-1 text-[10px] text-gold">{day.breakCount}</span>
                        )}
                      </div>
                    ) : (
                      <div className="h-10 w-10"></div>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-center mt-4 text-sm text-text-secondary space-x-4">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-gold mr-2"></div>
          <span>Today</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-gold/20 mr-2"></div>
          <span>Break Completed</span>
        </div>
      </div>
    </div>
  )
}
