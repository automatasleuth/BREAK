// Utility function to check if an element is in viewport
export function isInViewport(element: HTMLElement, offset = 0): boolean {
  const rect = element.getBoundingClientRect()
  return rect.top <= (window.innerHeight || document.documentElement.clientHeight) - offset && rect.bottom >= 0
}

// Utility function to add scroll-triggered animations
export function setupScrollAnimations() {
  const animatedElements = document.querySelectorAll("[data-animate]")

  const checkAnimations = () => {
    animatedElements.forEach((element) => {
      if (isInViewport(element as HTMLElement, 100)) {
        element.classList.add("animate-in")
      }
    })
  }

  // Check on initial load
  checkAnimations()

  // Check on scroll
  window.addEventListener("scroll", checkAnimations)

  return () => {
    window.removeEventListener("scroll", checkAnimations)
  }
}

// Utility function for parallax effect
export function setupParallaxEffect() {
  const parallaxElements = document.querySelectorAll("[data-parallax]")

  const updateParallax = () => {
    parallaxElements.forEach((element) => {
      const speed = Number.parseFloat(element.getAttribute("data-parallax") || "0.1")
      const scrollY = window.scrollY
      const yPos = -(scrollY * speed)
      element.setAttribute("style", `transform: translate3d(0, ${yPos}px, 0)`)
    })
  }

  window.addEventListener("scroll", updateParallax)

  return () => {
    window.removeEventListener("scroll", updateParallax)
  }
}
