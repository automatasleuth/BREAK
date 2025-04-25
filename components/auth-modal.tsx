"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { SignInForm } from "./sign-in-form"
import { SignUpForm } from "./sign-up-form"

type AuthModalProps = {
  isOpen: boolean
  onClose: () => void
  initialView?: "signin" | "signup"
}

export function AuthModal({ isOpen, onClose, initialView = "signin" }: AuthModalProps) {
  const [view, setView] = useState<"signin" | "signup">(initialView)

  const handleViewChange = (newView: "signin" | "signup") => {
    setView(newView)
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[550px] md:max-w-[650px] p-0 bg-transparent border-none shadow-xl">
        {view === "signin" ? (
          <SignInForm onViewChange={handleViewChange} />
        ) : (
          <SignUpForm onViewChange={handleViewChange} />
        )}
      </DialogContent>
    </Dialog>
  )
}
