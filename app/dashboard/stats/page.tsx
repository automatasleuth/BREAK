import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"

export default function StatsPage() {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 flex items-center">
          <TrendingUp className="mr-3 h-6 w-6 text-green-400" />
          Statistics
        </h1>
        <p className="text-text-secondary">Detailed analytics about your break habits and patterns.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="bg-[#0A0A0A] border-[#1A1A1A]">
          <CardHeader>
            <CardTitle>Break Type Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] bg-[#111111] rounded-md flex items-center justify-center">
              <p className="text-white/70">Pie Chart Placeholder</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#0A0A0A] border-[#1A1A1A]">
          <CardHeader>
            <CardTitle>Time of Day Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] bg-[#111111] rounded-md flex items-center justify-center">
              <p className="text-white/70">Bar Chart Placeholder</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
