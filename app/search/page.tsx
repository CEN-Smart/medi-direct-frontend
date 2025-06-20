"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Star, MapPin, Phone, Clock, Filter } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { CentreDetailsModal } from "@/components/centre-details-modal"
import { GuestBookingModal } from "@/components/guest-booking-modal"

// Mock data - replace with API calls
const mockCentres = [
  {
    id: 1,
    name: "Lagos Diagnostic Centre",
    location: "Ikeja, Lagos",
    rating: 4.5,
    reviewCount: 128,
    phone: "+234 801 234 5678",
    services: ["Blood Test", "X-Ray", "ECG", "Ultrasound"],
    priceRange: "₦5,000 - ₦50,000",
    openHours: "8:00 AM - 6:00 PM",
    image: "/placeholder.svg?height=200&width=300",
    verified: true,
  },
  {
    id: 2,
    name: "MedScan Imaging Centre",
    location: "Victoria Island, Lagos",
    rating: 4.8,
    reviewCount: 89,
    phone: "+234 802 345 6789",
    services: ["MRI", "CT Scan", "Mammography", "X-Ray"],
    priceRange: "₦15,000 - ₦150,000",
    openHours: "7:00 AM - 8:00 PM",
    image: "/placeholder.svg?height=200&width=300",
    verified: true,
  },
  {
    id: 3,
    name: "HealthCheck Diagnostics",
    location: "Surulere, Lagos",
    rating: 4.2,
    reviewCount: 67,
    phone: "+234 803 456 7890",
    services: ["Blood Test", "Urine Test", "ECG", "Stress Test"],
    priceRange: "₦3,000 - ₦25,000",
    openHours: "9:00 AM - 5:00 PM",
    image: "/placeholder.svg?height=200&width=300",
    verified: false,
  },
]

export default function SearchPage() {
  const searchParams = useSearchParams()
  const [centres, setCentres] = useState(mockCentres)
  const [filters, setFilters] = useState({
    testType: searchParams.get("test") || "",
    location: searchParams.get("location") || "",
    date: searchParams.get("date") || "",
  })

  const [selectedCentre, setSelectedCentre] = useState<any>(null)
  const [guestBookingCentre, setGuestBookingCentre] = useState<any>(null)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Diagnostic Centres</h1>
          <p className="text-gray-600">
            {centres.length} centres found
            {filters.location && ` in ${filters.location}`}
            {filters.testType && ` for ${filters.testType}`}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Filter className="w-5 h-5" />
                  <h3 className="font-semibold">Filters</h3>
                </div>
                {/* Add filter components here */}
                <p className="text-sm text-gray-600">Filter options coming soon...</p>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-3 space-y-6">
            {centres.map((centre) => (
              <Card key={centre.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Image */}
                    <div className="md:col-span-1">
                      <img
                        src={centre.image || "/placeholder.svg"}
                        alt={centre.name}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>

                    {/* Details */}
                    <div className="md:col-span-2 space-y-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-semibold">{centre.name}</h3>
                          {centre.verified && <Badge className="bg-green-100 text-green-800">Verified</Badge>}
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span>{centre.rating}</span>
                            <span>({centre.reviewCount} reviews)</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{centre.location}</span>
                          </div>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-gray-400" />
                            <span>{centre.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span>{centre.openHours}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Available Services:</p>
                        <div className="flex flex-wrap gap-2">
                          {centre.services.map((service) => (
                            <Badge key={service} variant="secondary">
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4">
                        <div>
                          <p className="text-sm text-gray-600">Price Range</p>
                          <p className="font-semibold text-green-600">{centre.priceRange}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => setSelectedCentre(centre)}>
                            View Details
                          </Button>
                          <Button size="sm" onClick={() => setGuestBookingCentre(centre)}>
                            Book Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <CentreDetailsModal
        centre={selectedCentre}
        isOpen={!!selectedCentre}
        onClose={() => setSelectedCentre(null)}
        onBook={(centre) => {
          setSelectedCentre(null)
          setGuestBookingCentre(centre)
        }}
      />

      <GuestBookingModal
        centre={guestBookingCentre}
        isOpen={!!guestBookingCentre}
        onClose={() => setGuestBookingCentre(null)}
      />
    </div>
  )
}
