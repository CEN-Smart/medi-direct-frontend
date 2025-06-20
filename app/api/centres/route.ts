import { type NextRequest, NextResponse } from "next/server"

// Mock data - replace with actual database queries
const mockCentres = [
  {
    id: 1,
    name: "Lagos Diagnostic Centre",
    location: "Ikeja, Lagos",
    lga: "Ikeja",
    rating: 4.5,
    reviewCount: 128,
    phone: "+234 801 234 5678",
    services: ["Blood Test", "X-Ray", "ECG", "Ultrasound"],
    priceRange: { min: 5000, max: 50000 },
    openHours: "8:00 AM - 6:00 PM",
    verified: true,
    latitude: 6.6018,
    longitude: 3.3515,
  },
  // Add more mock centres...
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const testType = searchParams.get("testType")
    const location = searchParams.get("location")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    // Filter centres based on query parameters
    let filteredCentres = mockCentres

    if (testType) {
      filteredCentres = filteredCentres.filter((centre) =>
        centre.services.some((service) => service.toLowerCase().includes(testType.toLowerCase())),
      )
    }

    if (location) {
      filteredCentres = filteredCentres.filter(
        (centre) =>
          centre.lga.toLowerCase().includes(location.toLowerCase()) ||
          centre.location.toLowerCase().includes(location.toLowerCase()),
      )
    }

    // Pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedCentres = filteredCentres.slice(startIndex, endIndex)

    return NextResponse.json({
      success: true,
      data: paginatedCentres,
      pagination: {
        page,
        limit,
        total: filteredCentres.length,
        totalPages: Math.ceil(filteredCentres.length / limit),
      },
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch centres" }, { status: 500 })
  }
}
