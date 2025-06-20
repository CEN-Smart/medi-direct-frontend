import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, centreId, serviceId, appointmentDate, appointmentTime, totalAmount } = body

    // Validate required fields
    if (!userId || !centreId || !serviceId || !appointmentDate || !appointmentTime) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    // Generate booking reference
    const bookingReference = `BK${Date.now().toString().slice(-6)}`

    // In a real app, save to database
    const booking = {
      id: Date.now(),
      bookingReference,
      userId,
      centreId,
      serviceId,
      appointmentDate,
      appointmentTime,
      status: "pending",
      totalAmount,
      paymentStatus: "pending",
      createdAt: new Date().toISOString(),
    }

    // TODO: Send confirmation SMS/email
    // TODO: Notify diagnostic centre

    return NextResponse.json({
      success: true,
      data: booking,
      message: "Booking created successfully",
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to create booking" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ success: false, error: "User ID required" }, { status: 400 })
    }

    // Mock bookings data - replace with database query
    const mockBookings = [
      {
        id: 1,
        bookingReference: "BK001",
        centreName: "Lagos Diagnostic Centre",
        testType: "Blood Test (Full Panel)",
        appointmentDate: "2024-01-15",
        appointmentTime: "10:00",
        status: "confirmed",
        totalAmount: 15000,
      },
    ]

    return NextResponse.json({
      success: true,
      data: mockBookings,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch bookings" }, { status: 500 })
  }
}
