"use client"

import { useState, useEffect } from "react"
import { User, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { animations } from "@/lib/animations"

interface Centre {
  id: number
  name: string
  location: string
}

interface GuestBookingModalProps {
  centre: Centre | null
  isOpen: boolean
  onClose: () => void
}

const mockServices = [
  { id: 1, name: "Blood Test (Full Panel)", price: 15000 },
  { id: 2, name: "X-Ray Chest", price: 8000 },
  { id: 3, name: "ECG", price: 5000 },
  { id: 4, name: "Ultrasound Abdomen", price: 12000 },
]

const timeSlots = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
]

export function GuestBookingModal({ centre, isOpen, onClose }: GuestBookingModalProps) {
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [bookingData, setBookingData] = useState({
    service: "",
    date: "",
    time: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    notes: "",
  })

  useEffect(() => {
    if (isOpen) {
      setStep(1)
      setBookingData({
        service: "",
        date: "",
        time: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        notes: "",
      })
    }
  }, [isOpen])

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
      // Animate step transition
      const nextStepElement = document.querySelector(`[data-step="${step + 1}"]`)
      if (nextStepElement) {
        animations.pageEnter(nextStepElement)
      }
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    // Simulate booking API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
    setStep(4) // Success step
  }

  const selectedService = mockServices.find((s) => s.id.toString() === bookingData.service)

  if (!centre) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Book Appointment - {centre.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Indicator */}
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= stepNum ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {stepNum}
                </div>
                {stepNum < 3 && <div className={`w-12 h-1 mx-2 ${step > stepNum ? "bg-blue-600" : "bg-gray-200"}`} />}
              </div>
            ))}
          </div>

          {/* Step 1: Service Selection */}
          {step === 1 && (
            <div data-step="1" className="space-y-4">
              <h3 className="text-lg font-semibold">Select Service</h3>
              <div className="grid gap-3">
                {mockServices.map((service) => (
                  <Card
                    key={service.id}
                    className={`cursor-pointer transition-all ${
                      bookingData.service === service.id.toString()
                        ? "ring-2 ring-blue-600 bg-blue-50"
                        : "hover:shadow-md"
                    }`}
                    onClick={() => setBookingData((prev) => ({ ...prev, service: service.id.toString() }))}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">{service.name}</h4>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">₦{service.price.toLocaleString()}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <Button onClick={handleNext} disabled={!bookingData.service} className="w-full">
                Continue
              </Button>
            </div>
          )}

          {/* Step 2: Date & Time */}
          {step === 2 && (
            <div data-step="2" className="space-y-4">
              <h3 className="text-lg font-semibold">Select Date & Time</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Preferred Date</label>
                  <Input
                    type="date"
                    value={bookingData.date}
                    onChange={(e) => setBookingData((prev) => ({ ...prev, date: e.target.value }))}
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Preferred Time</label>
                  <Select
                    value={bookingData.time}
                    onValueChange={(value) => setBookingData((prev) => ({ ...prev, time: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button onClick={handleNext} disabled={!bookingData.date || !bookingData.time} className="flex-1">
                  Continue
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Personal Information */}
          {step === 3 && (
            <div data-step="3" className="space-y-4">
              <h3 className="text-lg font-semibold">Your Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="First Name"
                    value={bookingData.firstName}
                    onChange={(e) => setBookingData((prev) => ({ ...prev, firstName: e.target.value }))}
                    className="pl-10"
                  />
                </div>

                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Last Name"
                    value={bookingData.lastName}
                    onChange={(e) => setBookingData((prev) => ({ ...prev, lastName: e.target.value }))}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={bookingData.email}
                  onChange={(e) => setBookingData((prev) => ({ ...prev, email: e.target.value }))}
                  className="pl-10"
                />
              </div>

              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  value={bookingData.phone}
                  onChange={(e) => setBookingData((prev) => ({ ...prev, phone: e.target.value }))}
                  className="pl-10"
                />
              </div>

              {/* Booking Summary */}
              <Card className="bg-gray-50">
                <CardContent className="p-4">
                  <h4 className="font-medium mb-3">Booking Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Service:</span>
                      <span>{selectedService?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Date:</span>
                      <span>{bookingData.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Time:</span>
                      <span>{bookingData.time}</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span>Total:</span>
                      <span className="text-green-600">₦{selectedService?.price.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={
                    !bookingData.firstName ||
                    !bookingData.lastName ||
                    !bookingData.email ||
                    !bookingData.phone ||
                    isLoading
                  }
                  className="flex-1"
                >
                  {isLoading ? "Booking..." : "Confirm Booking"}
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Success */}
          {step === 4 && (
            <div data-step="4" className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <div className="w-8 h-8 text-green-600">✓</div>
              </div>
              <h3 className="text-xl font-semibold text-green-600">Booking Confirmed!</h3>
              <p className="text-gray-600">
                Your appointment has been booked successfully. You will receive a confirmation SMS and email shortly.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-medium">
                  Booking Reference: <span className="text-blue-600">BK{Date.now().toString().slice(-6)}</span>
                </p>
              </div>
              <Button onClick={onClose} className="w-full">
                Done
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
