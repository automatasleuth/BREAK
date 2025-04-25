"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { TabNavigation } from "@/components/tab-navigation"
import { ChevronRight, Clock, Brain, BookOpen, PenTool, BarChart3, ArrowRight } from "lucide-react"
import { AuroraAnimation } from "@/components/aurora-animation"
import { MinesweeperGame } from "@/components/minesweeper-game"
import { AuthButtons } from "@/components/auth-buttons"
import { Logo } from "@/components/logo"
import { useState, useEffect } from "react"
import { AnimatedHeading } from "@/components/animated-heading"
import { AnimatedFeatureCard } from "@/components/animated-feature-card"
import { DynamicBackground } from "@/components/dynamic-background"
import { ScrollIndicator } from "@/components/scroll-indicator"
import { setupScrollAnimations, setupParallaxEffect } from "@/lib/animation-utils"
import { CursorHaze } from "@/components/cursor-haze"

export default function LandingPage() {
  const tabs = [
    { name: "Relax", href: "#relax" },
    { name: "Stimulate", href: "#stimulate" },
    { name: "Digest", href: "#digest" },
    { name: "Reflect", href: "#reflect" },
    { name: "Progress", href: "#progress" },
  ]

  const [scrollY, setScrollY] = useState(0)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)

    // Set up animations
    const cleanupScrollAnimations = setupScrollAnimations()
    const cleanupParallaxEffect = setupParallaxEffect()

    return () => {
      window.removeEventListener("scroll", handleScroll)
      cleanupScrollAnimations()
      cleanupParallaxEffect()
    }
  }, [])

  return (
    <div className="min-h-screen bg-black text-text-primary">
      {/* Cursor Haze - only render on client side */}
      {isMounted && (
        <CursorHaze 
          size={350} 
          blur={120} 
          opacity={0.12} 
          lag={0.08} 
          pulseSpeed={2} 
          pulseIntensity={0.15} 
        />
      )}
      
      {/* Navigation */}
      <header className="mx-auto px-6 py-4 max-w-7xl">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 flex items-center justify-center">
              <Logo size="sm" animated={true} />
            </div>
            <span className="font-bold text-xl">BREAK</span>
          </div>
          <div className="hidden md:block">
            <TabNavigation tabs={tabs} />
          </div>
          <AuthButtons />
        </nav>
      </header>

      {/* Hero Section - With dynamic elements */}
      <section className="mx-auto px-6 pt-20 pb-16 max-w-7xl relative">
        <DynamicBackground className="opacity-30" />
        <div className="max-w-xl relative z-10">
          <div className="overflow-hidden mb-4">
            <h1 className="text-5xl md:text-6xl font-bold reveal-text" style={{ animationDelay: '0.3s' }}>
              Take a <span className="text-gold">Break.</span>
            </h1>
          </div>
          <p className="text-lg text-text-secondary mb-6 max-w-lg opacity-0 translate-y-4 transition-all duration-700 ease-out animate-in" style={{ transitionDelay: '0.8s' }} data-animate="true">
            A mental refresh room for high-performing professionals to take intentional, brain-boosting breaks
            throughout the day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 opacity-0 translate-y-4 transition-all duration-700 ease-out animate-in" style={{ transitionDelay: '1.2s' }} data-animate="true">
            <Button
              className="bg-gold hover:bg-gold-hover text-black font-bold px-6 py-2 text-base btn-hover-effect shimmer"
              onClick={() => {
                // Find the auth buttons component and trigger the sign-up modal
                const authButtonsComponent = document.querySelector(".auth-buttons-component")
                if (authButtonsComponent) {
                  const event = new CustomEvent("open-signup")
                  authButtonsComponent.dispatchEvent(event)
                }
              }}
            >
              Get Started <ChevronRight className="ml-2 h-4 w-4 animated-icon" />
            </Button>
            <Button className="bg-white hover:bg-white text-black border border-white font-medium px-6 py-2 text-base btn-hover-effect">
              Learn More
            </Button>
          </div>
        </div>
        <ScrollIndicator targetId="how-it-works" />
      </section>

      {/* How It Works Section - With dynamic elements */}
      <section id="how-it-works" className="py-16 relative overflow-hidden bg-[#070707]">
        <div className="absolute inset-0 opacity-10 animated-gradient">
          <div
            className="absolute top-1/4 left-1/3 w-64 h-64 rounded-full bg-gold blur-[100px] animate-pulse"
            style={{
              animationDuration: "15s",
              transform: `translateY(${scrollY * 0.05}px)`
            }}
            data-parallax="0.05"
          />
        </div>

        <div className="mx-auto px-6 max-w-7xl relative z-10">
          <div className="text-center mb-10">
            <AnimatedHeading>How BREAK Works</AnimatedHeading>
            <p className="text-text-secondary max-w-2xl mx-auto text-base opacity-0 translate-y-4 transition-all duration-700 ease-out" data--animate="true">
              A simple, intentional approach to mental refreshment throughout your day
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Connecting line */}
              <div className="absolute left-[28px] top-10 bottom-0 w-[2px] bg-gradient-to-b from-gold/40 via-gold/20 to-transparent h-[calc(100%-40px)] md:block hidden"></div>

              <div className="grid grid-cols-1 md:grid-cols-[60px_1fr] gap-x-8 gap-y-10">
                <AnimatedFeatureCard delay={200} direction="left" className="w-14 h-14 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
                  <span className="text-gold font-bold text-xl">1</span>
                </AnimatedFeatureCard>
                <AnimatedFeatureCard delay={400} direction="right">
                  <h3 className="text-xl font-bold mb-2">Choose Your Break</h3>
                  <p className="text-text-secondary text-base mb-4">
                    Select from five different break types based on what your mind needs right now.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-4">
                    {[
                      { icon: Clock, name: "Relax" },
                      { icon: Brain, name: "Stimulate" },
                      { icon: BookOpen, name: "Digest" },
                      { icon: PenTool, name: "Reflect" },
                      { icon: BarChart3, name: "Progress" },
                    ].map((item, i) => (
                      <div key={i} className="flex flex-col items-center hover-lift">
                        <div className="w-10 h-10 rounded-full bg-[#0A0A0A] border border-[#1A1A1A] flex items-center justify-center mb-2">
                          <item.icon className="h-5 w-5 text-gold" />
                        </div>
                        <span className="text-sm">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </AnimatedFeatureCard>

                <AnimatedFeatureCard delay={600} direction="left" className="w-14 h-14 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
                  <span className="text-gold font-bold text-xl">2</span>
                </AnimatedFeatureCard>
                <AnimatedFeatureCard delay={800} direction="right">
                  <h3 className="text-xl font-bold mb-2">Take 5-15 Minutes</h3>
                  <p className="text-text-secondary text-base mb-4">
                    Engage with the content for a short, intentional break that refreshes your mind.
                  </p>
                  <div className="bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl p-4 flex items-center justify-between mt-4 hover-lift">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center mr-4">
                        <Clock className="h-5 w-5 text-gold" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">Break Timer</div>
                        <div className="text-2xl font-bold tabular-nums">05:00</div>
                      </div>
                    </div>
                    <Button className="bg-gold hover:bg-gold-hover text-black shimmer">Start</Button>
                  </div>
                </AnimatedFeatureCard>

                <AnimatedFeatureCard delay={1000} direction="left" className="w-14 h-14 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
                  <span className="text-gold font-bold text-xl">3</span>
                </AnimatedFeatureCard>
                <AnimatedFeatureCard delay={1200} direction="right">
                  <h3 className="text-xl font-bold mb-2">Return Refreshed</h3>
                  <p className="text-text-secondary text-base mb-4">
                    Get back to your work with improved focus, creativity, and mental clarity.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                    {[
                      { metric: "Focus", increase: "+27%" },
                      { metric: "Productivity", increase: "+32%" },
                      { metric: "Wellbeing", increase: "+41%" },
                    ].map((stat, i) => (
                      <div key={i} className="bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl p-3 hover-lift" style={{ transitionDelay: `${i * 100}ms` }}>
                        <div className="text-sm text-text-secondary">{stat.metric}</div>
                        <div className="text-lg font-bold text-gold counter-animation">{stat.increase}</div>
                      </div>
                    ))}
                  </div>
                </AnimatedFeatureCard>
              </div>
            </div>
          </div>
      </section>

      {/* Features Section - With dynamic elements */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#050505]">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div
              className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-gold blur-[120px] animate-pulse"
              style={{
                animationDuration: "20s",
                transform: `translateY(${scrollY * 0.05}px)`
              }}
              data-parallax="0.1"
            />
          </div>
        </div>

        <div className="mx-auto px-6 max-w-7xl relative z-10">
          <div className="text-center mb-10">
            <AnimatedHeading>Mental Refresh Experiences</AnimatedHeading>
            <p className="text-text-secondary max-w-2xl mx-auto text-base opacity-0 translate-y-4 transition-all duration-700 ease-out" data-animate="true">
              Choose how you want to refresh your mind with our carefully designed experiences
            </p>
          </div>

          {/* Feature Cards - With dynamic elements */}
          <div className="space-y-12">
            {/* Relax Feature */}
            <AnimatedFeatureCard id="relax" className="flex flex-col md:flex-row gap-6 items-center">
              <div className="md:w-1/2">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#0A0A0A] border border-gold/20 mb-4 animated-icon">
                  <Clock className="h-6 w-6 text-gold" />
                </div>
                <h3 className="text-2xl font-bold mb-2 flex items-center">
                  Relax
                  <span className="ml-3 px-2 py-0.5 text-xs bg-gold/10 text-gold rounded-full">5-15 min</span>
                </h3>
                <p className="text-text-secondary text-base mb-4">
                  Immerse yourself in the mesmerizing aurora borealis with calming visual backgrounds.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-[#111111] border border-[#1A1A1A] rounded-full text-xs text-text-secondary hover-lift">
                    Northern Lights
                  </span>
                  <span className="px-3 py-1 bg-[#111111] border border-[#1A1A1A] rounded-full text-xs text-text-secondary hover-lift">
                    Starry Sky
                  </span>
                  <span className="px-3 py-1 bg-[#111111] border border-[#1A1A1A] rounded-full text-xs text-text-secondary hover-lift">
                    Mountain Silhouette
                  </span>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl overflow-hidden relative aspect-video hover-lift">
                  <AuroraAnimation />
                </div>
              </div>
            </AnimatedFeatureCard>

            {/* Stimulate Feature */}
            <AnimatedFeatureCard id="stimulate" className="flex flex-col md:flex-row-reverse gap-6 items-center" delay={200}>
              <div className="md:w-1/2">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#0A0A0A] border border-gold/20 mb-4 animated-icon">
                  <Brain className="h-6 w-6 text-gold" />
                </div>
                <h3 className="text-2xl font-bold mb-2 flex items-center">
                  Stimulate
                  <span className="ml-3 px-2 py-0.5 text-xs bg-gold/10 text-gold rounded-full">5-15 min</span>
                </h3>
                <p className="text-text-secondary text-base mb-4">
                  Challenge your mind with puzzles and brain games designed to sharpen cognitive skills.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-[#111111] border border-[#1A1A1A] rounded-full text-xs text-text-secondary hover-lift">
                    Minesweeper
                  </span>
                  <span className="px-3 py-1 bg-[#111111] border border-[#1A1A1A] rounded-full text-xs text-text-secondary hover-lift">
                    Memory Games
                  </span>
                  <span className="px-3 py-1 bg-[#111111] border border-[#1A1A1A] rounded-full text-xs text-text-secondary hover-lift">
                    Word Play
                  </span>
                </div>
              </div>
              <div className="md:w-1/2 h-[400px]">
                <div className="hover-lift h-full">
                  <MinesweeperGame className="h-full" />
                </div>
              </div>
            </AnimatedFeatureCard>

            {/* Digest Feature */}
            <AnimatedFeatureCard id="digest" className="flex flex-col md:flex-row gap-6 items-center" delay={400}>
              <div className="md:w-1/2">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#0A0A0A] border border-gold/20 mb-4 animated-icon">
                  <BookOpen className="h-6 w-6 text-gold" />
                </div>
                <h3 className="text-2xl font-bold mb-2 flex items-center">
                  Digest
                  <span className="ml-3 px-2 py-0.5 text-xs bg-gold/10 text-gold rounded-full">5-15 min</span>
                </h3>
                <p className="text-text-secondary text-base mb-4">
                  Consume bite-sized summaries of insightful content to expand your knowledge.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-[#111111] border border-[#1A1A1A] rounded-full text-xs text-text-secondary hover-lift">
                    Mental Models
                  </span>
                  <span className="px-3 py-1 bg-[#111111] border border-[#1A1A1A] rounded-full text-xs text-text-secondary hover-lift">
                    Short Essays
                  </span>
                  <span className="px-3 py-1 bg-[#111111] border border-[#1A1A1A] rounded-full text-xs text-text-secondary hover-lift">
                    Wisdom
                  </span>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl overflow-hidden p-6 aspect-video hover-lift">
                  <div className="h-full flex flex-col justify-between">
                    <div>
                      <h4 className="text-base font-bold mb-2">The Pareto Principle</h4>
                      <p className="text-text-secondary text-sm mb-3">
                        Also known as the 80/20 rule, this principle suggests that roughly 80% of effects come from 20%
                        of causes.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="h-1.5 bg-gold/20 rounded-full w-3/4 shimmer"></div>
                      <div className="h-1.5 bg-gold/10 rounded-full w-full shimmer" style={{ animationDelay: '0.5s' }}></div>
                      <div className="h-1.5 bg-gold/20 rounded-full w-5/6 shimmer" style={{ animationDelay: '1s' }}></div>
                      <div className="h-1.5 bg-gold/10 rounded-full w-2/3 shimmer" style={{ animationDelay: '1.5s' }}></div>
                    </div>
                    <div className="flex justify-between items-center mt-3">
                      <div className="text-xs text-text-secondary">1 of 5</div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="h-7 w-7 p-0 rounded-full animated-icon">
                          <ArrowRight className="h-3 w-3 rotate-180" />
                        </Button>
                        <Button variant="outline" size="sm" className="h-7 w-7 p-0 rounded-full animated-icon">
                          <ArrowRight className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedFeatureCard>

            {/* Reflect Feature */}
            <AnimatedFeatureCard id="reflect" className="flex flex-col md:flex-row-reverse gap-6 items-center" delay={600}>
              <div className="md:w-1/2">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#0A0A0A] border border-gold/20 mb-4 animated-icon">
                  <PenTool className="h-6 w-6 text-gold" />
                </div>
                <h3 className="text-2xl font-bold mb-2 flex items-center">
                  Reflect
                  <span className="ml-3 px-2 py-0.5 text-xs bg-gold/10 text-gold rounded-full">5-15 min</span>
                </h3>
                <p className="text-text-secondary text-base mb-4">
                  Log your mood and journal your thoughts to track mental wellbeing over time.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-[#111111] border border-[#1A1A1A] rounded-full text-xs text-text-secondary hover-lift">
                    Mood Tracking
                  </span>
                  <span className="px-3 py-1 bg-[#111111] border border-[#1A1A1A] rounded-full text-xs text-text-secondary hover-lift">
                    Journaling
                  </span>
                  <span className="px-3 py-1 bg-[#111111] border border-[#1A1A1A] rounded-full text-xs text-text-secondary hover-lift">
                    Trends
                  </span>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl overflow-hidden p-6 hover-lift">
                  <div className="space-y-4">
                    <div>
                      <div className="text-base font-medium mb-2">How are you feeling today?</div>
                      <div className="flex justify-between">
                        {["😔", "😐", "🙂", "😊", "😄"].map((emoji, i) => (
                          <div
                            key={i}
                            className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                              i === 3 ? "bg-gold/30 ring-2 ring-gold/20" : "bg-[#111111] border border-[#1A1A1A]"
                            } transition-all duration-300 hover:bg-gold/20 animated-icon`}
                            style={{ transitionDelay: `${i * 50}ms` }}
                          >
                            <span>{emoji}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="text-base font-medium mb-2">Quick journal</div>
                      <div className="bg-[#111111] border border-[#1A1A1A] rounded-lg p-3 min-h-[100px]">
                        <p className="text-text-secondary text-sm">What's on your mind today?</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedFeatureCard>

            {/* Progress Feature */}
            <AnimatedFeatureCard id="progress" className="flex flex-col md:flex-row gap-6 items-center" delay={800}>
              <div className="md:w-1/2">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#0A0A0A] border border-gold/20 mb-4 animated-icon">
                  <BarChart3 className="h-6 w-6 text-gold" />
                </div>
                <h3 className="text-2xl font-bold mb-2 flex items-center">
                  Progress
                  <span className="ml-3 px-2 py-0.5 text-xs bg-gold/10 text-gold rounded-full">Ongoing</span>
                </h3>
                <p className="text-text-secondary text-base mb-4">
                  Track XP progression and daily streaks to encourage consistent usage.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-[#111111] border border-[#1A1A1A] rounded-full text-xs text-text-secondary hover-lift">
                    XP Tracking
                  </span>
                  <span className="px-3 py-1 bg-[#111111] border border-[#1A1A1A] rounded-full text-xs text-text-secondary hover-lift">
                    Daily Streaks
                  </span>
                  <span className="px-3 py-1 bg-[#111111] border border-[#1A1A1A] rounded-full text-xs text-text-secondary hover-lift">
                    Milestones
                  </span>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl overflow-hidden p-6 hover-lift">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Level 5</span>
                        <span>1,250 XP</span>
                      </div>
                      <div className="h-3 bg-[#111111] rounded-full w-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-gold/70 to-gold w-[65%] rounded-full shimmer"></div>
                      </div>
                      <div className="flex justify-between text-xs text-text-secondary mt-1">
                        <span>Next level: 750 XP needed</span>
                        <span>65%</span>
                      </div>
                    </div>

                    <div>
                      <div className="text-xs mb-2">Current streak</div>
                      <div className="flex justify-between items-center">
                        <div className="flex space-x-1">
                          {[...Array(7)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-7 h-7 rounded-md flex items-center justify-center ${
                                i < 5
                                  ? "bg-gold/70 text-black font-medium"
                                  : "bg-[#111111] border border-[#1A1A1A] text-text-secondary"
                              } floating`}
                              style={{ animationDelay: `${i * 0.2}s` }}
                            >
                              {i < 5 ? "✓" : ""}
                            </div>
                          ))}
                        </div>
                        <span className="text-base font-bold text-gold counter-animation">5 days</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-[#111111] border border-[#1A1A1A] rounded-lg p-3 hover-lift">
                        <div className="text-xs text-text-secondary">Total Breaks</div>
                        <div className="text-base font-bold counter-animation">47</div>
                      </div>
                      <div className="bg-[#111111] border border-[#1A1A1A] rounded-lg p-3 hover-lift">
                        <div className="text-xs text-text-secondary">Time Saved</div>
                        <div className="text-base font-bold counter-animation">8.5 hrs</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedFeatureCard>
          </div>
        </div>
      </section>

      {/* Testimonials Section - With dynamic elements */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-b from-[#070707] to-[#0A0A0A]">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full bg-gold blur-[120px] animate-pulse"
            style={{
              animationDuration: "18s",
              transform: `translateY(${scrollY * 0.08}px)`
            }}
            data-parallax="0.08"
          />
          <div
            className="absolute bottom-1/3 left-1/3 w-64 h-64 rounded-full bg-gold blur-[100px] animate-pulse"
            style={{
              animationDuration: "15s",
              animationDelay: "2s",
              transform: `translateY(${scrollY * 0.05}px)`
            }}
            data-parallax="0.05"
          />
        </div>

        <div className="mx-auto px-6 max-w-7xl relative z-10">
          <div className="text-center mb-12">
            <AnimatedHeading>What Professionals Are Saying</AnimatedHeading>
            <p className="text-text-secondary max-w-2xl mx-auto text-base opacity-0 translate-y-4 transition-all duration-700 ease-out" data-animate="true">
              Hear from people who have made BREAK a part of their daily routine
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                quote:
                  "BREAK has transformed my workday. The short mental refresh sessions help me maintain focus without burning out.",
                author: "Sarah J.",
                role: "Software Engineer",
              },
              {
                quote:
                  "I use the Stimulate feature between meetings to reset my brain. It's like a mental palette cleanser.",
                author: "Michael T.",
                role: "Product Manager",
              },
              {
                quote:
                  "The Digest feature gives me bite-sized wisdom that I can actually apply immediately. Perfect for quick breaks.",
                author: "Aisha K.",
                role: "Financial Analyst",
              },
            ].map((testimonial, i) => (
              <AnimatedFeatureCard key={i} delay={i * 200} direction="up">
                <div className="bg-[#0A0A0A] p-6 rounded-xl border border-[#1A1A1A] relative feature-card h-full shadow-lg shadow-gold/5 hover:shadow-gold/10 transition-shadow duration-500">
                  <div className="absolute top-6 left-6 opacity-10 text-gold">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M10 11H6C5.46957 11 4.96086 10.7893 4.58579 10.4142C4.21071 10.0391 4 9.53043 4 9V7C4 6.46957 4.21071 5.96086 4.58579 5.58579C4.96086 5.21071 5.46957 5 5 5H8C8.53043 5 9.03914 5.21071 9.41421 5.58579C9.78929 5.96086 10 6.46957 10 7V17C10 17.5304 9.78929 18.0391 9.41421 18.4142C9.03914 18.7893 8.53043 19 8 19H6C5.46957 19 4.96086 18.7893 4.58579 18.4142C4.21071 18.0391 4 17.5304 4 17V15"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M20 11H16C15.4696 11 14.9609 10.7893 14.5858 10.4142C14.2107 10.0391 14 9.53043 14 9V7C14 6.46957 14.2107 5.96086 14.5858 5.58579C14.9609 5.21071 15.4696 5 16 5H18C18.5304 5 19.0391 5.21071 19.4142 5.58579C19.7893 5.96086 20 6.46957 20 7V17C20 17.5304 19.7893 18.0391 19.4142 18.4142C19.0391 18.7893 18.5304 19 18 19H16C15.4696 19 14.9609 18.7893 14.5858 18.4142C14.2107 18.0391 14 17.5304 14 17V15"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <p className="text-text-secondary mb-6 relative z-10 text-sm leading-relaxed">{testimonial.quote}</p>
                  <div className="pt-4 mt-auto border-t border-[#1A1A1A]">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center mr-3">
                        <span className="text-gold font-medium text-sm">{testimonial.author.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-medium text-sm">{testimonial.author}</p>
                        <p className="text-text-secondary text-xs">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedFeatureCard>
            ))}
          </div>
          
          {/* Pagination dots */}
          <div className="flex justify-center mt-8 space-x-2">
            <div className="w-2 h-2 rounded-full bg-gold"></div>
            <div className="w-2 h-2 rounded-full bg-[#1A1A1A]"></div>
            <div className="w-2 h-2 rounded-full bg-[#1A1A1A]"></div>
          </div>
        </div>
      </section>

      {/* CTA Section - With dynamic elements */}
      <section className="mx-auto px-6 py-16 text-center max-w-7xl relative">
        <DynamicBackground className="opacity-20" />
        <AnimatedFeatureCard delay={200} direction="up">
          <div className="flex justify-center mb-6">
            <Logo size="md" animated={true} className="mx-auto floating" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to take a <span className="text-gold">BREAK</span>?
          </h2>
          <p className="text-lg text-text-secondary mb-6 max-w-2xl mx-auto">
            Join thousands of professionals who are improving their mental clarity, focus, and wellbeing with intentional
            breaks.
          </p>
          <Button
            className="bg-gold hover:bg-gold-hover text-black font-bold px-6 py-2 text-base btn-hover-effect shimmer"
            onClick={() => {
              // Find the auth buttons component and trigger the sign-up modal
              const authButtonsComponent = document.querySelector(".auth-buttons-component")
              if (authButtonsComponent) {
                const event = new CustomEvent("open-signup")
                authButtonsComponent.dispatchEvent(event)
              }
            }}
          >
            Start Your Free Trial
          </Button>
          <p className="mt-4 text-text-secondary flex items-center justify-center text-sm">
            <span>No credit card required</span>
            <span className="mx-3">•</span>
            <span>Cancel anytime</span>
          </p>
        </AnimatedFeatureCard>
      </section>

      {/* Footer */}
      <footer className="border-t border-card-outline py-8">
        <div className="mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="h-6 w-6 flex items-center justify-center">
                <Logo size="sm" animated={false} />
              </div>
              <span className="font-bold text-base">BREAK</span>
            </div>
            <div className="flex space-x-6 mb-4 md:mb-0">
              <Link href="#" className="text-text-secondary hover:text-text-primary transition-colors text-sm">
                Privacy
              </Link>
              <Link href="#" className="text-text-secondary hover:text-text-primary transition-colors text-sm">
                Terms
              </Link>
              <Link href="#" className="text-text-secondary hover:text-text-primary transition-colors text-sm">
                Contact
              </Link>
            </div>
            <div className="text-text-secondary text-sm">© {new Date().getFullYear()} BREAK. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
