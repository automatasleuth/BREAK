import { TrendingUp, Clock, Award } from "lucide-react"

export function ProgressStats() {
  return (
    <div className="bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl p-5">
      <h2 className="text-lg font-bold mb-4">Your Progress</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#111111] border border-[#1A1A1A] rounded-lg p-4 flex items-center">
          <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center mr-3">
            <Clock className="h-5 w-5 text-gold" />
          </div>
          <div>
            <p className="text-sm text-text-secondary">Break Time</p>
            <p className="text-xl font-bold">8.5 hrs</p>
          </div>
        </div>

        <div className="bg-[#111111] border border-[#1A1A1A] rounded-lg p-4 flex items-center">
          <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center mr-3">
            <TrendingUp className="h-5 w-5 text-gold" />
          </div>
          <div>
            <p className="text-sm text-text-secondary">Total Breaks</p>
            <p className="text-xl font-bold">47</p>
          </div>
        </div>

        <div className="bg-[#111111] border border-[#1A1A1A] rounded-lg p-4 flex items-center">
          <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center mr-3">
            <Award className="h-5 w-5 text-gold" />
          </div>
          <div>
            <p className="text-sm text-text-secondary">Current Streak</p>
            <p className="text-xl font-bold">5 days</p>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex justify-between text-sm mb-2">
          <span>Weekly Goal (3/5 breaks)</span>
          <span>60%</span>
        </div>
        <div className="h-2 bg-[#111111] rounded-full w-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-gold/70 to-gold w-[60%] rounded-full"></div>
        </div>
      </div>
    </div>
  )
}
