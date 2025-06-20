import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export const animations = {
  // Page entrance animation
  pageEnter: (element: string | Element) => {
    gsap.fromTo(element, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" })
  },

  // Stagger animation for lists
  staggerIn: (elements: string | Element[], delay = 0.1) => {
    gsap.fromTo(
      elements,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: delay,
        ease: "power2.out",
      },
    )
  },

  // Card hover animation
  cardHover: (element: Element) => {
    gsap.to(element, {
      y: -10,
      scale: 1.02,
      duration: 0.3,
      ease: "power2.out",
    })
  },

  cardHoverOut: (element: Element) => {
    gsap.to(element, {
      y: 0,
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    })
  },

  // Button pulse animation
  buttonPulse: (element: Element) => {
    gsap.to(element, {
      scale: 1.05,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
    })
  },

  // Fade in with scroll trigger
  fadeInOnScroll: (element: string | Element) => {
    gsap.fromTo(
      element,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      },
    )
  },

  // Loading animation
  loading: (element: Element) => {
    gsap.to(element, {
      rotation: 360,
      duration: 1,
      repeat: -1,
      ease: "none",
    })
  },
}
