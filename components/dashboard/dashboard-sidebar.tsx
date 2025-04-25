"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Home,
  Clock,
  Brain,
  BookOpen,
  PenTool,
  BarChart3,
  Settings,
  LogOut,
  X,
  Calendar,
  Award,
  TrendingUp,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import { cn } from "@/lib/utils"

interface DashboardSidebarProps {
  isOpen: boolean
  onClose: () => void
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function DashboardSidebar({ isOpen, onClose, activeTab, setActiveTab }: DashboardSidebarProps) {
  const router = useRouter()

  const handleLogout = () => {
    // In a real app, you would clear authentication state here
    // For now, just navigate to the home page
    router.push("/")
  }

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Home, href: "/dashboard" },
    { id: "relax", label: "Relax", icon: Clock, href: "/dashboard/relax" },
    { id: "stimulate", label: "Stimulate", icon: Brain, href: "/dashboard/stimulate" },
    { id: "digest", label: "Digest", icon: BookOpen, href: "/dashboard/digest" },
    { id: "reflect", label: "Reflect", icon: PenTool, href: "/dashboard/reflect" },
  ]

  const secondaryNavItems = [
    { id: "calendar", label: "Calendar", icon: Calendar, href: "/dashboard/calendar" },
    { id: "achievements", label: "Achievements", icon: Award, href: "/dashboard/achievements" },
    { id: "stats", label: "Statistics", icon: TrendingUp, href: "/dashboard/stats" },
    { id: "progress", label: "Progress", icon: BarChart3, href: "/dashboard/progress" },
    { id: "profile", label: "Profile", icon: User, href: "/dashboard/profile" },
    { id: "settings", label: "Settings", icon: Settings, href: "/dashboard/settings" },
  ]

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/80 z-40 md:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#0A0A0A] border-r border-[#1A1A1A] transition-transform duration-300 md:translate-x-0 md:static md:z-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Sidebar Header */}
        <div className="h-16 border-b border-[#1A1A1A] flex items-center justify-between px-4">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <div className="h-8 w-8 flex items-center justify-center">
              <Logo size="sm" animated={true} />
            </div>
            <span className="font-bold text-lg">BREAK</span>
          </Link>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={onClose}>
            <X className="h-5 w-5" />
            <span className="sr-only">Close menu</span>
          </Button>
        </div>

        {/* Sidebar Content */}
        <div className="py-4 px-2 space-y-6 overflow-y-auto h-[calc(100%-4rem)]">
          {/* Main Navigation */}
          <div>
            <h3 className="px-4 text-xs uppercase text-text-secondary font-medium mb-2">Break Types</h3>
            <nav className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    activeTab === item.id
                      ? "bg-gold/10 text-gold"
                      : "text-text-secondary hover:text-text-primary hover:bg-[#111111]",
                  )}
                  onClick={() => setActiveTab(item.id)}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Secondary Navigation */}
          <div>
            <h3 className="px-4 text-xs uppercase text-text-secondary font-medium mb-2">Account</h3>
            <nav className="space-y-1">
              {secondaryNavItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    activeTab === item.id
                      ? "bg-gold/10 text-gold"
                      : "text-text-secondary hover:text-text-primary hover:bg-[#111111]",
                  )}
                  onClick={() => setActiveTab(item.id)}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* User Stats */}
          <div className="px-4 py-3 bg-[#111111] rounded-lg mx-2">
            <div className="flex items-center mb-2">
              <div className="h-8 w-8 rounded-full bg-gold/20 flex items-center justify-center mr-2">
                <span className="text-gold font-medium text-sm">D</span>
              </div>
              <div>
                <p className="font-medium text-sm">Demo User</p>
                <p className="text-text-secondary text-xs">Level 5</p>
              </div>
            </div>
            <div className="h-2 bg-[#0A0A0A] rounded-full w-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-gold/70 to-gold w-[65%] rounded-full"></div>
            </div>
            <div className="flex justify-between text-xs text-text-secondary mt-1">
              <span>1,250 XP</span>
              <span>750 XP to Level 6</span>
            </div>
          </div>

          {/* Logout Button */}
          <div className="px-2 mt-auto">
            <Button
              variant="outline"
              className="w-full justify-start bg-black text-white hover:bg-[#222222] hover:text-white border-[#1A1A1A]"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Log Out
            </Button>
          </div>
        </div>
      </aside>
    </>
  )
}
