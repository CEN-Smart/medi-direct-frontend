"use client";

import { AlertCircle, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { animations } from "@/lib/animations";

interface Booking {
  id: string;
  centreName: string;
  testType: string;
  date: string;
  time: string;
  status: string;
  price: number;
  location: string;
  phone: string;
}

interface RescheduleModalProps {
  booking: Booking | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (
    bookingId: string,
    newDate: string,
    newTime: string,
    reason: string,
  ) => void;
}

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
];

const rescheduleReasons = [
  "Personal emergency",
  "Work conflict",
  "Health reasons",
  "Travel plans",
  "Family commitment",
  "Other",
];

export function RescheduleModal({
  booking,
  isOpen,
  onClose,
  onConfirm,
}: RescheduleModalProps) {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    newDate: "",
    newTime: "",
    reason: "",
    customReason: "",
  });

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setFormData({
        newDate: "",
        newTime: "",
        reason: "",
        customReason: "",
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && step === 1) {
      const modalContent = document.querySelector(".reschedule-modal-content");
      if (modalContent) {
        animations.pageEnter(modalContent);
      }
    }
  }, [isOpen, step]);

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1);
      // Animate step transition
      setTimeout(() => {
        const nextStepElement = document.querySelector(
          `[data-reschedule-step="${step + 1}"]`,
        );
        if (nextStepElement) {
          animations.pageEnter(nextStepElement);
        }
      }, 100);
    }
  };

  const handleConfirm = async () => {
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const reason =
      formData.reason === "Other" ? formData.customReason : formData.reason;
    onConfirm(booking!.id, formData.newDate, formData.newTime, reason);

    setIsLoading(false);
    setStep(3); // Success step
  };

  const isFormValid =
    formData.newDate &&
    formData.newTime &&
    formData.reason &&
    (formData.reason !== "Other" || formData.customReason.trim());

  if (!booking) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl reschedule-modal-content">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            Reschedule Appointment
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Indicator */}
          <div className="flex justify-center items-center space-x-4">
            {[1, 2].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                    step >= stepNum
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {stepNum}
                </div>
                {stepNum < 2 && (
                  <div
                    className={`w-12 h-1 mx-2 transition-all duration-300 ${
                      step > stepNum ? "bg-blue-600" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Current Booking Info */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <h3 className="mb-2 font-semibold text-blue-900">
                Current Appointment
              </h3>
              <div className="gap-4 grid grid-cols-1 md:grid-cols-2 text-sm">
                <div>
                  <p className="text-blue-700">
                    <strong>Centre:</strong> {booking.centreName}
                  </p>
                  <p className="text-blue-700">
                    <strong>Test:</strong> {booking.testType}
                  </p>
                </div>
                <div>
                  <p className="text-blue-700">
                    <strong>Date:</strong> {booking.date}
                  </p>
                  <p className="text-blue-700">
                    <strong>Time:</strong> {booking.time}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step 1: New Date & Time */}
          {step === 1 && (
            <div data-reschedule-step="1" className="space-y-4">
              <h3 className="font-semibold text-lg">Select New Date & Time</h3>

              <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                <div>
                  <label className="block mb-2 font-medium text-sm">
                    New Date
                  </label>
                  <Input
                    type="date"
                    value={formData.newDate}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        newDate: e.target.value,
                      }))
                    }
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium text-sm">
                    New Time
                  </label>
                  <Select
                    value={formData.newTime}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, newTime: value }))
                    }
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

              {/* Available Slots Info */}
              <div className="bg-green-50 p-4 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-green-500 rounded-full w-2 h-2"></div>
                  <span className="font-medium text-green-800 text-sm">
                    Available Slots
                  </span>
                </div>
                <p className="text-green-700 text-sm">
                  {`Most time slots are available for the selected centre. You'll
									receive confirmation within 2 hours.`}
                </p>
              </div>

              <Button
                onClick={handleNext}
                disabled={!formData.newDate || !formData.newTime}
                className="w-full"
              >
                Continue
              </Button>
            </div>
          )}

          {/* Step 2: Reason */}
          {step === 2 && (
            <div data-reschedule-step="2" className="space-y-4">
              <h3 className="font-semibold text-lg">Reason for Rescheduling</h3>

              <div>
                <label className="block mb-2 font-medium text-sm">
                  Please select a reason
                </label>
                <Select
                  value={formData.reason}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, reason: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select reason" />
                  </SelectTrigger>
                  <SelectContent>
                    {rescheduleReasons.map((reason) => (
                      <SelectItem key={reason} value={reason}>
                        {reason}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {formData.reason === "Other" && (
                <div>
                  <label className="block mb-2 font-medium text-sm">
                    Please specify
                  </label>
                  <Textarea
                    placeholder="Please provide details..."
                    value={formData.customReason}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        customReason: e.target.value,
                      }))
                    }
                    rows={3}
                  />
                </div>
              )}

              {/* Summary */}
              <Card className="bg-gray-50">
                <CardContent className="p-4">
                  <h4 className="mb-3 font-medium">Reschedule Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">From:</span>
                      <span>
                        {booking.date} at {booking.time}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">To:</span>
                      <span className="font-medium text-blue-600">
                        {formData.newDate} at {formData.newTime}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Reason:</span>
                      <span>
                        {formData.reason === "Other"
                          ? formData.customReason
                          : formData.reason}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="bg-yellow-50 p-4 border border-yellow-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertCircle className="mt-0.5 w-4 h-4 text-yellow-600" />
                  <div className="text-yellow-800 text-sm">
                    <p className="mb-1 font-medium">Important Notes:</p>
                    <ul className="space-y-1 list-disc list-inside">
                      <li>Rescheduling is subject to availability</li>
                      <li>{`You'll receive confirmation within 2 hours`}</li>
                      <li>No additional charges for rescheduling</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button
                  onClick={handleConfirm}
                  disabled={!isFormValid || isLoading}
                  className="flex-1"
                >
                  {isLoading ? "Processing..." : "Confirm Reschedule"}
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Success */}
          {step === 3 && (
            <div data-reschedule-step="3" className="space-y-4 text-center">
              <div className="flex justify-center items-center bg-green-100 mx-auto rounded-full w-16 h-16">
                <div className="w-8 h-8 text-green-600 text-2xl">✓</div>
              </div>
              <h3 className="font-semibold text-green-600 text-xl">
                Reschedule Request Submitted!
              </h3>
              <p className="text-gray-600">
                Your reschedule request has been submitted successfully. The
                diagnostic centre will confirm your new appointment within 2
                hours.
              </p>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="mb-2 font-medium text-blue-900 text-sm">
                  New Appointment Details:
                </p>
                <div className="text-blue-800 text-sm">
                  <p>
                    <strong>Date:</strong> {formData.newDate}
                  </p>
                  <p>
                    <strong>Time:</strong> {formData.newTime}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <Badge className="bg-yellow-100 text-yellow-800">
                      Pending Confirmation
                    </Badge>
                  </p>
                </div>
              </div>

              <Button onClick={onClose} className="w-full">
                Done
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
