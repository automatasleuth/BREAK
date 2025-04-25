import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface BreakTypeCardProps {
  title: string
  icon: LucideIcon
  description: string
  color: string
  href: string
  className?: string
}

export function BreakTypeCard({ title, icon: Icon, description, color, href, className }: BreakTypeCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "block group relative overflow-hidden rounded-xl border border-[#1A1A1A] bg-[#0A0A0A] p-5 transition-all duration-300 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5 hover:-translate-y-1",
        className,
      )}
    >
      <div
        className={cn(
          "absolute inset-0 opacity-20 bg-gradient-to-br transition-opacity duration-300 group-hover:opacity-30",
          color,
        )}
      />

      <div className="relative z-10">
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#111111] border border-[#1A1A1A] group-hover:bg-gold/10 group-hover:border-gold/20 transition-colors duration-300">
          <Icon className="h-5 w-5 text-gold" />
        </div>
        <h3 className="mb-1 font-bold">{title}</h3>
        <p className="text-sm text-text-secondary">{description}</p>
      </div>
    </Link>
  )
}
