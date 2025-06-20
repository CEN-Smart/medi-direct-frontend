"use client"

import { useEffect, useRef } from "react"
import { Search, Calendar, FileText, Shield, Clock, Star } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { animations } from "@/lib/animations"
import Link from "next/link"

const steps = [
  {
    icon: Search,
    title: "Search & Compare",
    description: "Find diagnostic centres near you and compare prices, ratings, and available services.",
    details: "Use our advanced search filters to find centres by location, test type, price range, and availability.",
  },
  {
    icon: Calendar,
    title: "Book Appointment",
    description: "Select your preferred date and time slot, then confirm your booking instantly.",
    details: "Choose from available time slots and receive instant confirmation with booking reference.",
  },
  {
    icon: FileText,
    title: "Get Results",
    description: "Receive your test results digitally and access them anytime from your dashboard.",
    details: "Download your results securely and keep track of your health history in one place.",
  },
]

const benefits = [
  {
    icon: Shield,
    title: "Verified Centres",
    description: "All diagnostic centres are verified and licensed for your safety.",
  },
  {
    icon: Clock,
    title: "Save Time",
    description: "No more waiting in queues. Book appointments at your convenience.",
  },
  {
    icon: Star,
    title: "Best Prices",
    description: "Compare prices across centres and find the best deals for your tests.",
  },
]

export default function HowItWorksPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)
  const benefitsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (heroRef.current) {
      animations.pageEnter(heroRef.current)
    }

    // Animate steps on scroll
    const stepCards = document.querySelectorAll(".step-card")
    stepCards.forEach((card, index) => {
      animations.fadeInOnScroll(card)
    })

    // Animate benefits on scroll
    const benefitCards = document.querySelectorAll(".benefit-card")
    benefitCards.forEach((card) => {
      animations.fadeInOnScroll(card)
    })
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section ref={heroRef} className="bg-gradient-to-br from-blue-50 to-green-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              How <span className="text-blue-600">MediDirect</span> Works
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Getting your diagnostic tests done has never been easier. Follow these simple steps to book your
              appointment.
            </p>
            <Link href="/search">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Get Started Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section ref={stepsRef} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple 3-Step Process</h2>
            <p className="text-xl text-gray-600">Book your diagnostic test in minutes</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <Card key={index} className="step-card relative overflow-hidden group cursor-pointer">
                <CardContent className="p-8 text-center">
                  <div className="absolute top-4 right-4 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-sm">{index + 1}</span>
                  </div>

                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                    <step.icon className="w-10 h-10 text-blue-600" />
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600 mb-4">{step.description}</p>
                  <p className="text-sm text-gray-500">{step.details}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section ref={benefitsRef} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose MediDirect?</h2>
            <p className="text-xl text-gray-600">Experience the benefits of modern healthcare booking</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="benefit-card group cursor-pointer">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors">
                    <benefit.icon className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of patients who trust MediDirect for their diagnostic needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/search">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Find Centres Now
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600"
              >
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
