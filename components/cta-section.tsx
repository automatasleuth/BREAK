"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { AuthModal } from "./auth-modal"
import { Logo } from "@/components/logo"

export function CTASection() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <section className="container mx-auto px-4 py-20 text-center">
      <div className="flex justify-center mb-8">
        <Logo size="lg" animated={true} className="mx-auto" />
      </div>
      <h2 className="text-4xl font-bold mb-6">
        Ready to take a <span className="text-gold">BREAK</span>?
      </h2>
      <p className="text-xl text-text-secondary mb-10 max-w-2xl mx-auto">
        Join thousands of professionals who are improving their mental clarity, focus, and wellbeing with intentional
        breaks.
      </p>
      <Button
        className="bg-gold hover:bg-gold-hover text-black font-bold px-8 py-6 text-lg btn-hover-effect"
        onClick={() => setIsModalOpen(true)}
      >
        Start Your Free Trial
      </Button>
      <p className="mt-6 text-text-secondary flex items-center justify-center">
        <span>No credit card required</span>
        <span className="mx-4">•</span>
        <span>Cancel anytime</span>
      </p>

      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} initialView="signup" />
    </section>
  )
}
