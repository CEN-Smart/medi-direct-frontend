import { Suspense } from "react"
import { SearchSection } from "@/components/search-section"
import { FeaturedCentres } from "@/components/featured-centres"
import { HowItWorks } from "@/components/how-it-works"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-green-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Find Diagnostic Services
              <span className="text-blue-600"> Near You</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Connect with verified diagnostic centres across Lagos. Compare prices, read reviews, and book appointments
              instantly.
            </p>
          </div>

          <Suspense fallback={<div>Loading search...</div>}>
            <SearchSection />
          </Suspense>
        </div>
      </section>

      <HowItWorks />
      <FeaturedCentres />
      <Footer />
    </div>
  )
}
