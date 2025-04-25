"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Logo } from "@/components/logo"
import { useRouter } from "next/navigation"

type SignInFormProps = {
  onViewChange: (view: "signin" | "signup") => void
}

export function SignInForm({ onViewChange }: SignInFormProps) {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    // Check if using demo account
    if (email === "demo@break.app" && password === "password") {
      // Directly navigate to dashboard for demo account
      router.push("/dashboard")
      return
    }

    // For any other credentials, just go to dashboard for now
    // In a real app, you would authenticate here
    setTimeout(() => {
      router.push("/dashboard")
    }, 1000)
  }

  // For demo purposes - show credentials
  const fillDemoCredentials = () => {
    setEmail("demo@break.app")
    setPassword("password")
  }

  return (
    <div className="w-full bg-gradient-to-b from-[#0A0A0A] to-[#121212] p-8 rounded-2xl border border-[#222222] overflow-hidden relative">
      {/* Background aurora effect */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-gold/10 rounded-full blur-3xl opacity-20 animate-pulse-subtle"></div>
      <div
        className="absolute -bottom-40 -left-40 w-80 h-80 bg-gold/10 rounded-full blur-3xl opacity-20 animate-pulse-subtle"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="flex flex-col md:flex-row md:gap-10 relative z-10">
        {/* Left side - branding */}
        <div className="flex flex-col items-center md:items-start md:w-1/3 mb-6 md:mb-0">
          <div className="h-16 w-16 flex items-center justify-center mb-4">
            <Logo size="lg" animated={true} />
          </div>
          <h2 className="text-white text-xl font-bold mb-3">Welcome back</h2>
          <p className="text-gray-400 text-sm text-center md:text-left">
            Take a moment to reconnect with your mental wellness journey.
          </p>
        </div>

        {/* Right side - form */}
        <div className="md:w-2/3">
          {error && (
            <div className="p-3 bg-red-900/20 border border-red-900/50 text-red-50 text-sm rounded-md mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="group">
              <label
                htmlFor="email"
                className="block text-sm text-gray-300 mb-1.5 transition-all group-focus-within:text-gold"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-[#111111] border-[#333333] text-white h-12 rounded-xl transition-all focus:border-gold/50 focus:ring-1 focus:ring-gold/30"
              />
            </div>

            <div className="group">
              <div className="flex justify-between items-center mb-1.5">
                <label
                  htmlFor="password"
                  className="block text-sm text-gray-300 transition-all group-focus-within:text-gold"
                >
                  Password
                </label>
                <a href="#" className="text-xs text-gold hover:text-gold-hover transition-colors">
                  Forgot password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-[#111111] border-[#333333] text-white h-12 rounded-xl transition-all focus:border-gold/50 focus:ring-1 focus:ring-gold/30"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gold hover:bg-gold-hover text-black font-medium h-12 rounded-xl transition-all transform hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(255,189,7,0.3)]"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full bg-gray-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-gradient-to-b from-[#0A0A0A] to-[#121212] px-2 text-gray-400">OR CONTINUE WITH</span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full bg-white hover:bg-gray-100 text-black border-transparent h-12 mb-4 rounded-xl flex items-center justify-center transition-all transform hover:scale-[1.02]"
            onClick={() => router.push("/dashboard")}
          >
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            <span className="text-gray-800">Sign in with Google</span>
          </Button>

          <Button
            type="button"
            variant="ghost"
            className="w-full text-gray-400 hover:text-white transition-colors"
            onClick={fillDemoCredentials}
          >
            Use demo account
          </Button>

          <div className="text-center mt-6 text-sm text-gray-400">
            Don't have an account?{" "}
            <button
              onClick={() => onViewChange("signup")}
              className="text-gold hover:text-gold-hover transition-colors"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
