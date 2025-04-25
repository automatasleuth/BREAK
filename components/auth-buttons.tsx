"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { AuthModal } from "./auth-modal"

export function AuthButtons() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalView, setModalView] = useState<"signin" | "signup">("signin")

  // For now, let's assume the user is not logged in
  const isLoggedIn = false

  const openSignIn = () => {
    setModalView("signin")
    setIsModalOpen(true)
  }

  const openSignUp = () => {
    setModalView("signup")
    setIsModalOpen(true)
  }

  // Add a ref to the container
  const containerRef = useRef<HTMLDivElement>(null)

  // Add useEffect to listen for custom events
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleOpenSignup = () => {
      setModalView("signup")
      setIsModalOpen(true)
    }

    container.addEventListener("open-signup", handleOpenSignup)

    return () => {
      container.removeEventListener("open-signup", handleOpenSignup)
    }
  }, [])

  if (isLoggedIn) {
    return (
      <div className="flex items-center gap-4">
        <Link href="/dashboard">
          <Button className="bg-gold hover:bg-gold-hover text-black">Dashboard</Button>
        </Link>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="auth-buttons-component">
      <Button
        className="bg-white hover:bg-white text-black border border-white font-medium transition-all duration-200 btn-sign-in"
        onClick={openSignIn}
      >
        Sign In
      </Button>

      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} initialView={modalView} />
    </div>
  )
}
