"use client"

import { useRouter } from "next/navigation"
import { setCookie } from "cookies-next"

export function useAuthBypass() {
  const router = useRouter()

  const bypassAuth = () => {
    // Set a cookie to indicate demo access
    setCookie("demo_access", "true", {
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    })

    // Navigate to dashboard
    router.push("/dashboard")
  }

  return { bypassAuth }
}
