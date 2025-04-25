"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  // Determine active tab from pathname
  const getActiveTab = () => {
    const path = pathname.split("/").pop() || "dashboard"
    return path
  }

  const [activeTab, setActiveTab] = useState(getActiveTab())

  // Update active tab when pathname changes
  useEffect(() => {
    setActiveTab(getActiveTab())
  }, [pathname])

  // Close sidebar when route changes (mobile)
  useEffect(() => {
    setIsMobileSidebarOpen(false)
  }, [router])

  return (
    <div className="min-h-screen bg-black text-text-primary flex">
      {/* Sidebar */}
      <DashboardSidebar
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Header */}
        <DashboardHeader onMenuClick={() => setIsMobileSidebarOpen(true)} />

        {/* Main Dashboard Content */}
        <main className="flex-1 overflow-y-auto bg-[#050505] px-4 py-6 md:px-8 md:py-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  )
}
