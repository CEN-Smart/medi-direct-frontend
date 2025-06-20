"use client"

import { useState, useEffect } from "react"
import { Star, MapPin, Phone, Clock, Calendar, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { animations } from "@/lib/animations"

interface Centre {
  id: number
  name: string
  location: string
  rating: number
  reviewCount: number
  phone: string
  services: string[]
  priceRange: string
  openHours: string
  image: string
  verified: boolean
}

interface CentreDetailsModalProps {
  centre: Centre | null
  isOpen: boolean
  onClose: () => void
  onBook: (centre: Centre) => void
}

const mockServices = [
  { name: "Blood Test (Full Panel)", price: 15000, duration: "15 mins" },
  { name: "X-Ray Chest", price: 8000, duration: "10 mins" },
  { name: "ECG", price: 5000, duration: "15 mins" },
  { name: "Ultrasound Abdomen", price: 12000, duration: "30 mins" },
]

const mockReviews = [
  {
    id: 1,
    name: "Adebayo Johnson",
    rating: 5,
    comment: "Excellent service and very professional staff. Highly recommended!",
    date: "2024-01-10",
  },
  {
    id: 2,
    name: "Funmi Adebayo",
    rating: 4,
    comment: "Good facilities and quick service. Will definitely come back.",
    date: "2024-01-08",
  },
]

export function CentreDetailsModal({ centre, isOpen, onClose, onBook }: CentreDetailsModalProps) {
  const [activeTab, setActiveTab] = useState("services")

  useEffect(() => {
    if (isOpen && centre) {
      // Animate modal content
      const modalContent = document.querySelector(".modal-content")
      if (modalContent) {
        animations.pageEnter(modalContent)
      }
    }
  }, [isOpen, centre])

  if (!centre) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto modal-content">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {centre.name}
            {centre.verified && <Badge className="bg-green-100 text-green-800">Verified</Badge>}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Image and Basic Info */}
          <div className="lg:col-span-1">
            <img
              src={centre.image || "/placeholder.svg"}
              alt={centre.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{centre.rating}</span>
                <span className="text-gray-500">({centre.reviewCount} reviews)</span>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{centre.location}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="w-4 h-4" />
                <span>{centre.phone}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{centre.openHours}</span>
              </div>
            </div>

            <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700" onClick={() => onBook(centre)}>
              <Calendar className="w-4 h-4 mr-2" />
              Book Appointment
            </Button>
          </div>

          {/* Detailed Information */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="services">Services & Prices</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="info">Information</TabsTrigger>
              </TabsList>

              <TabsContent value="services" className="space-y-4">
                <h3 className="text-lg font-semibold mb-4">Available Services</h3>
                {mockServices.map((service, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">{service.name}</h4>
                          <p className="text-sm text-gray-500">Duration: {service.duration}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">₦{service.price.toLocaleString()}</p>
                          <Button size="sm" variant="outline">
                            Select
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="reviews" className="space-y-4">
                <h3 className="text-lg font-semibold mb-4">Patient Reviews</h3>
                {mockReviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium">{review.name}</p>
                          <div className="flex items-center gap-1">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="info" className="space-y-4">
                <h3 className="text-lg font-semibold mb-4">Centre Information</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">About</h4>
                    <p className="text-gray-600">
                      {centre.name} is a leading diagnostic centre providing comprehensive healthcare services with
                      state-of-the-art equipment and experienced medical professionals.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Specialties</h4>
                    <div className="flex flex-wrap gap-2">
                      {centre.services.map((service) => (
                        <Badge key={service} variant="secondary">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Certifications</h4>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-gray-600">Licensed by Lagos State Ministry of Health</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
