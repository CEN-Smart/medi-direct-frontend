'use client';

import { useRescheduleBookingStore } from '@/stores/guest-booking';

import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from '../ui/dialog';

export function RescheduleBookingSuccessDialog() {
    const { rescheduleData, clearRescheduleData, isSuccess, setIsSuccess } =
        useRescheduleBookingStore();
    return (
        <Dialog open={isSuccess} onOpenChange={setIsSuccess}>
            <DialogContent className="sm:max-w-2xl px-6 py-8">
                <DialogTitle className="sr-only">
                    Reschedule Booking Success
                </DialogTitle>
                <DialogDescription className="sr-only">
                    Your booking has been rescheduled successfully.
                </DialogDescription>
                <div data-reschedule-step="3" className="space-y-4 text-center">
                    <div className="flex justify-center items-center bg-green-100 mx-auto rounded-full w-16 h-16">
                        <div className="w-8 h-8 text-green-600 text-2xl">✓</div>
                    </div>
                    <h3 className="font-semibold text-green-600 text-xl">
                        Reschedule Request Submitted!
                    </h3>
                    <p className="text-gray-600">
                        Your reschedule request has been submitted successfully.
                        The diagnostic centre will confirm your new appointment
                        within 2 hours.
                    </p>

                    <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="mb-2 font-medium text-blue-900 text-sm">
                            New Appointment Details:
                        </p>
                        <div className="text-blue-800 text-sm">
                            <p>
                                <strong>Date:</strong> {rescheduleData.date}
                            </p>
                            <p>
                                <strong>Time:</strong> {rescheduleData.time}
                            </p>
                            <div>
                                <strong>Status:</strong>{' '}
                                <Badge className="bg-yellow-100 text-yellow-800">
                                    Pending Confirmation
                                </Badge>
                            </div>
                        </div>
                    </div>
                    <Button
                        type="button"
                        onClick={(e) => {
                            e.preventDefault();
                            setIsSuccess(false);
                            clearRescheduleData();
                        }}
                        className="w-full"
                    >
                        Close
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
