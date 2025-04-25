"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Mail, Key, Bell, Clock, Calendar, Award, BarChart3, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"

export default function ProfilePage() {
  const [name, setName] = useState("Demo User")
  const [email, setEmail] = useState("demo@break.app")
  const [bio, setBio] = useState(
    "I'm a professional looking to improve my mental wellbeing through intentional breaks.",
  )
  const [defaultBreakDuration, setDefaultBreakDuration] = useState(5)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [isEditing, setIsEditing] = useState(false)

  const userStats = [
    { label: "Total Breaks", value: "47", icon: Clock },
    { label: "Current Streak", value: "5 days", icon: Calendar },
    { label: "Achievements", value: "1/12", icon: Award },
    { label: "XP Level", value: "5", icon: BarChart3 },
  ]

  const recentActivity = [
    { type: "break", title: "Completed a Relax break", time: "Today, 10:30 AM" },
    { type: "achievement", title: "Unlocked 'Self-Aware' achievement", time: "2 days ago" },
    { type: "streak", title: "Reached a 5-day streak", time: "Today" },
    { type: "break", title: "Completed a Stimulate break", time: "Yesterday, 3:15 PM" },
  ]

  const handleSaveProfile = () => {
    setIsEditing(false)
    // In a real app, this would save to a database
    alert("Profile updated successfully!")
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 flex items-center">
          <User className="mr-3 h-6 w-6 text-blue-400" />
          Profile
        </h1>
        <p className="text-text-secondary">Manage your account information and preferences.</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="bg-[#111111] mb-6">
          <TabsTrigger value="profile" className="data-[state=active]:bg-gold data-[state=active]:text-black">
            Profile
          </TabsTrigger>
          <TabsTrigger value="preferences" className="data-[state=active]:bg-gold data-[state=active]:text-black">
            Preferences
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-gold data-[state=active]:text-black">
            Notifications
          </TabsTrigger>
          <TabsTrigger value="activity" className="data-[state=active]:bg-gold data-[state=active]:text-black">
            Activity
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="md:col-span-1">
              <Card className="bg-[#0A0A0A] border-[#1A1A1A]">
                <CardHeader>
                  <CardTitle>Profile Picture</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <div className="h-32 w-32 rounded-full bg-gold/20 flex items-center justify-center mb-4">
                    <span className="text-gold font-bold text-4xl">D</span>
                  </div>
                  <p className="font-medium text-lg">{name}</p>
                  <p className="text-text-secondary text-sm">{email}</p>
                  <div className="mt-4 w-full h-2 bg-[#111111] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-gold/70 to-gold w-[65%] rounded-full"></div>
                  </div>
                  <div className="flex justify-between text-xs text-text-secondary mt-1 w-full">
                    <span>1,250 XP</span>
                    <span>750 XP to Level 6</span>
                  </div>
                  <Button className="mt-4 bg-black text-white hover:bg-[#222222] w-full">Change Picture</Button>
                </CardContent>
              </Card>

              <Card className="bg-[#0A0A0A] border-[#1A1A1A] mt-6">
                <CardHeader>
                  <CardTitle>Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userStats.map((stat, index) => {
                      const Icon = stat.icon
                      return (
                        <div key={index} className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-[#111111] flex items-center justify-center mr-3">
                            <Icon className="h-5 w-5 text-gold" />
                          </div>
                          <div>
                            <p className="text-sm text-text-secondary">{stat.label}</p>
                            <p className="font-medium">{stat.value}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-2">
              <Card className="bg-[#0A0A0A] border-[#1A1A1A] mb-6">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle>Account Information</CardTitle>
                    <CardDescription>Manage your personal details</CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    className="bg-black text-white hover:bg-[#222222] border-[#1A1A1A]"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? "Cancel" : "Edit"}
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center mb-1">
                      <User className="h-4 w-4 mr-2 text-text-secondary" />
                      <label className="text-sm font-medium text-text-secondary">Full Name</label>
                    </div>
                    {isEditing ? (
                      <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-[#111111] border-[#1A1A1A]"
                      />
                    ) : (
                      <p className="text-white p-2">{name}</p>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center mb-1">
                      <Mail className="h-4 w-4 mr-2 text-text-secondary" />
                      <label className="text-sm font-medium text-text-secondary">Email</label>
                    </div>
                    {isEditing ? (
                      <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-[#111111] border-[#1A1A1A]"
                      />
                    ) : (
                      <p className="text-white p-2">{email}</p>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center mb-1">
                      <User className="h-4 w-4 mr-2 text-text-secondary" />
                      <label className="text-sm font-medium text-text-secondary">Bio</label>
                    </div>
                    {isEditing ? (
                      <Textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="bg-[#111111] border-[#1A1A1A]"
                        rows={3}
                      />
                    ) : (
                      <p className="text-white p-2">{bio}</p>
                    )}
                  </div>
                  {isEditing && (
                    <Button className="bg-gold hover:bg-gold-hover text-black" onClick={handleSaveProfile}>
                      Save Changes
                    </Button>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-[#0A0A0A] border-[#1A1A1A]">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Key className="mr-2 h-5 w-5 text-blue-400" />
                    Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-text-secondary block mb-1">Password</label>
                    <div className="flex">
                      <Input
                        type="password"
                        value="••••••••"
                        disabled
                        className="bg-[#111111] border-[#1A1A1A] rounded-r-none"
                      />
                      <Button className="bg-black text-white hover:bg-[#222222] rounded-l-none">Change</Button>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-[#1A1A1A]">
                    <Button
                      variant="outline"
                      className="w-full justify-start bg-black text-white hover:bg-[#222222] border-[#1A1A1A]"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Log Out of All Devices
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="preferences" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-[#0A0A0A] border-[#1A1A1A]">
              <CardHeader>
                <CardTitle>Break Preferences</CardTitle>
                <CardDescription>Customize your break experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-text-secondary block mb-1">
                    Default Break Duration (minutes)
                  </label>
                  <Input
                    type="number"
                    value={defaultBreakDuration}
                    onChange={(e) => setDefaultBreakDuration(Number.parseInt(e.target.value))}
                    min="1"
                    max="60"
                    className="bg-[#111111] border-[#1A1A1A]"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auto-start-timer" className="font-medium">
                      Auto-start Timer
                    </Label>
                    <p className="text-sm text-text-secondary">Automatically start timer when opening a break</p>
                  </div>
                  <Switch id="auto-start-timer" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="sound-effects" className="font-medium">
                      Sound Effects
                    </Label>
                    <p className="text-sm text-text-secondary">Play sounds during breaks</p>
                  </div>
                  <Switch id="sound-effects" defaultChecked />
                </div>
              </CardContent>
              <CardFooter className="border-t border-[#1A1A1A] pt-4">
                <Button className="bg-black text-white hover:bg-[#222222]">Save Preferences</Button>
              </CardFooter>
            </Card>

            <Card className="bg-[#0A0A0A] border-[#1A1A1A]">
              <CardHeader>
                <CardTitle>Display Preferences</CardTitle>
                <CardDescription>Customize your visual experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="dark-mode" className="font-medium">
                      Dark Mode
                    </Label>
                    <p className="text-sm text-text-secondary">Use dark theme</p>
                  </div>
                  <Switch id="dark-mode" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="animations" className="font-medium">
                      Animations
                    </Label>
                    <p className="text-sm text-text-secondary">Enable UI animations</p>
                  </div>
                  <Switch id="animations" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="compact-view" className="font-medium">
                      Compact View
                    </Label>
                    <p className="text-sm text-text-secondary">Use more condensed UI</p>
                  </div>
                  <Switch id="compact-view" />
                </div>
              </CardContent>
              <CardFooter className="border-t border-[#1A1A1A] pt-4">
                <Button className="bg-black text-white hover:bg-[#222222]">Save Display Settings</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="mt-0">
          <Card className="bg-[#0A0A0A] border-[#1A1A1A]">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5 text-blue-400" />
                Notification Settings
              </CardTitle>
              <CardDescription>Manage how and when you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-3">Email Notifications</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-notifications" className="font-medium">
                        Email Notifications
                      </Label>
                      <p className="text-sm text-text-secondary">Receive email notifications</p>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>
                  <div className="flex items-center justify-between pl-6">
                    <div>
                      <Label htmlFor="email-reminders" className="font-medium">
                        Break Reminders
                      </Label>
                      <p className="text-sm text-text-secondary">Daily reminders to take breaks</p>
                    </div>
                    <Switch id="email-reminders" disabled={!emailNotifications} />
                  </div>
                  <div className="flex items-center justify-between pl-6">
                    <div>
                      <Label htmlFor="email-achievements" className="font-medium">
                        Achievement Notifications
                      </Label>
                      <p className="text-sm text-text-secondary">When you earn new achievements</p>
                    </div>
                    <Switch id="email-achievements" disabled={!emailNotifications} />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-3">Push Notifications</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="push-notifications" className="font-medium">
                        Push Notifications
                      </Label>
                      <p className="text-sm text-text-secondary">Receive push notifications</p>
                    </div>
                    <Switch
                      id="push-notifications"
                      checked={pushNotifications}
                      onCheckedChange={setPushNotifications}
                    />
                  </div>
                  <div className="flex items-center justify-between pl-6">
                    <div>
                      <Label htmlFor="push-reminders" className="font-medium">
                        Break Reminders
                      </Label>
                      <p className="text-sm text-text-secondary">Reminders to take breaks</p>
                    </div>
                    <Switch id="push-reminders" disabled={!pushNotifications} defaultChecked />
                  </div>
                  <div className="flex items-center justify-between pl-6">
                    <div>
                      <Label htmlFor="push-achievements" className="font-medium">
                        Achievement Notifications
                      </Label>
                      <p className="text-sm text-text-secondary">When you earn new achievements</p>
                    </div>
                    <Switch id="push-achievements" disabled={!pushNotifications} defaultChecked />
                  </div>
                  <div className="flex items-center justify-between pl-6">
                    <div>
                      <Label htmlFor="push-streaks" className="font-medium">
                        Streak Notifications
                      </Label>
                      <p className="text-sm text-text-secondary">Reminders to maintain your streak</p>
                    </div>
                    <Switch id="push-streaks" disabled={!pushNotifications} defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-[#1A1A1A] pt-4">
              <Button className="bg-black text-white hover:bg-[#222222]">Save Notification Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="mt-0">
          <Card className="bg-[#0A0A0A] border-[#1A1A1A]">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your recent actions and achievements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="p-3 bg-[#111111] border border-[#1A1A1A] rounded-md hover:border-[#222222] transition-colors"
                  >
                    <div className="flex items-center">
                      <div
                        className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center mr-3",
                          activity.type === "break" && "bg-blue-400/20",
                          activity.type === "achievement" && "bg-gold/20",
                          activity.type === "streak" && "bg-green-400/20",
                        )}
                      >
                        {activity.type === "break" && <Clock className="h-5 w-5 text-blue-400" />}
                        {activity.type === "achievement" && <Award className="h-5 w-5 text-gold" />}
                        {activity.type === "streak" && <Calendar className="h-5 w-5 text-green-400" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{activity.title}</p>
                        <p className="text-sm text-text-secondary">{activity.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t border-[#1A1A1A] pt-4 flex justify-center">
              <Button variant="outline" className="bg-black text-white hover:bg-[#222222] border-[#1A1A1A]">
                View All Activity
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  )
}
