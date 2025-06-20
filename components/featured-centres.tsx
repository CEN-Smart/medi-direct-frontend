import { Star, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const featuredCentres = [
  {
    name: "Lagos Diagnostic Centre",
    location: "Ikeja, Lagos",
    rating: 4.5,
    specialties: ["Blood Tests", "X-Ray", "ECG"],
    image: "/placeholder.svg?height=150&width=200",
  },
  {
    name: "MedScan Imaging",
    location: "Victoria Island",
    rating: 4.8,
    specialties: ["MRI", "CT Scan", "Ultrasound"],
    image: "/placeholder.svg?height=150&width=200",
  },
  {
    name: "HealthCheck Diagnostics",
    location: "Surulere, Lagos",
    rating: 4.2,
    specialties: ["Blood Tests", "Urine Tests"],
    image: "/placeholder.svg?height=150&width=200",
  },
]

export function FeaturedCentres() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Centres</h2>
          <p className="text-xl text-gray-600">Top-rated diagnostic centres in Lagos</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredCentres.map((centre, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <img
                  src={centre.image || "/placeholder.svg"}
                  alt={centre.name}
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-semibold mb-2">{centre.name}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <MapPin className="w-4 h-4" />
                  <span>{centre.location}</span>
                  <div className="flex items-center gap-1 ml-auto">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{centre.rating}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {centre.specialties.map((specialty) => (
                    <Badge key={specialty} variant="secondary" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
