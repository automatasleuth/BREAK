"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, Moon } from "lucide-react"

export default function SettingsPage() {
  const [volume, setVolume] = useState(80)
  const [language, setLanguage] = useState("english")
  const [timezone, setTimezone] = useState("UTC-5")

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 flex items-center">
          <Settings className="mr-3 h-6 w-6 text-gray-400" />
          Settings
        </h1>
        <p className="text-text-secondary">Customize your app experience and preferences.</p>
      </div>

      <Tabs defaultValue="appearance" className="w-full">
        <TabsList className="bg-[#111111] mb-6">
          <TabsTrigger value="appearance" className="data-[state=active]:bg-gold data-[state=active]:text-black">
            Appearance
          </TabsTrigger>
          <TabsTrigger value="sound" className="data-[state=active]:bg-gold data-[state=active]:text-black">
            Sound
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-gold data-[state=active]:text-black">
            Notifications
          </TabsTrigger>
          <TabsTrigger value="general" className="data-[state=active]:bg-gold data-[state=active]:text-black">
            General
          </TabsTrigger>
          <TabsTrigger value="privacy" className="data-[state=active]:bg-gold data-[state=active]:text-black">
            Privacy
          </TabsTrigger>
        </TabsList>

        <TabsContent value="appearance" className="mt-0">
          <Card className="bg-[#0A0A0A] border-[#1A1A1A]">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Moon className="mr-2 h-5 w-5" />
                Appearance
              </CardTitle>
              <CardDescription>Customize how the app looks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="dark-mode" className="font-medium">
                      Dark Mode
                    </Label>
                  </div>\
\
