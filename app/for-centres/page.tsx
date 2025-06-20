"use client"

import { useEffect, useRef } from "react"
import { TrendingUp, Users, Calendar, BarChart3, Shield } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { animations } from "@/lib/animations"
import Link from "next/link"

const features = [
  {
    icon: TrendingUp,
    title: "Increase Revenue",
    description: "Fill empty slots and maximize your centre's utilization rate.",
    stat: "40% average increase",
  },
  {
    icon: Users,
    title: "Reach More Patients",
    description: "Connect with patients actively searching for diagnostic services.",
    stat: "10,000+ active users",
  },
  {
    icon: Calendar,
    title: "Smart Scheduling",
    description: "Automated booking system that syncs with your availability.",
    stat: "24/7 booking",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Track bookings, revenue, and patient feedback in real-time.",
    stat: "Real-time insights",
  },
]

const benefits = [
  "No setup fees or hidden costs",
  "Commission-based pricing model",
  "Dedicated support team",
  "Marketing and promotional support",
  "Patient review management",
  "Secure payment processing",
]

const testimonials = [
  {
    name: "Dr. Adebayo Ogundimu",
    position: "Director, Lagos Medical Centre",
    content:
      "MediDirect has transformed our patient booking process. We've seen a 45% increase in appointments since joining.",
    rating: 5,
  },
  {
    name: "Mrs. Funmi Adeleke",
    position: "Manager, HealthScan Diagnostics",
    content:
      "The platform is easy to use and our patients love the convenience. Highly recommended for any diagnostic centre.",
    rating: 5,
  },
]

export default function ForCentresPage() {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (heroRef.current) {
      animations.pageEnter(heroRef.current)
    }

    // Animate feature cards
    const featureCards = document.querySelectorAll(".feature-card")
    featureCards.forEach((card) => {
      animations.fadeInOnScroll(card)
    })

    // Animate testimonials
    const testimonialCards = document.querySelectorAll(".testimonial-card")
    testimonialCards.forEach((card) => {
      animations.fadeInOnScroll(card)
    })
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section ref={heroRef} className="bg-gradient-to-br from-green-50 to-blue-50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-green-100 text-green-800 mb-4">For Diagnostic Centres</Badge>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Grow Your <span className="text-green-600">Diagnostic Centre</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Join MediDirect and connect with thousands of patients looking for quality diagnostic services. Increase
                your bookings and revenue with our smart platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/centre/signup">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700">
                    Join MediDirect
                  </Button>
                </Link>
                <Button size="lg" variant="outline">
                  Schedule Demo
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src="/placeholder.svg?height=400&width=500"
                alt="Diagnostic Centre Dashboard"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Partner With Us?</h2>
            <p className="text-xl text-gray-600">Everything you need to grow your diagnostic centre</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="feature-card group cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                    <feature.icon className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{feature.description}</p>
                  <Badge variant="secondary" className="text-xs">
                    {feature.stat}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">What You Get</h2>
              <p className="text-xl text-gray-600 mb-8">
                Everything you need to succeed on our platform, with no upfront costs.
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <Shield className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <img src="/placeholder.svg?height=400&width=500" alt="Centre Benefits" className="rounded-lg shadow-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Partners Say</h2>
            <p className="text-xl text-gray-600">Hear from diagnostic centres already growing with MediDirect</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="testimonial-card">
                <CardContent className="p-8">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <div key={i} className="w-5 h-5 text-yellow-400 fill-current">
                        ⭐
                      </div>
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.position}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join hundreds of diagnostic centres already growing their business with MediDirect.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/centre/signup">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                Join Now - It's Free
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
