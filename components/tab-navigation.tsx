"use client"

import { useState } from "react"
import Link from "next/link"

interface TabProps {
  tabs: {
    name: string
    href: string
  }[]
}

export function TabNavigation({ tabs }: TabProps) {
  const [activeTab, setActiveTab] = useState<string | null>(null)

  return (
    <div className="flex space-x-8">
      {tabs.map((tab) => (
        <Link
          key={tab.name}
          href={tab.href}
          className={`tab-underline text-sm font-medium transition-colors duration-200 ${
            activeTab === tab.name ? "text-text-primary active" : "text-text-secondary hover:text-text-primary"
          }`}
          onClick={() => setActiveTab(tab.name)}
        >
          {tab.name}
        </Link>
      ))}
    </div>
  )
}
