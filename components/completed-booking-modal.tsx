'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { useCompleteBooking } from '@/queries/diagnostic-center/center';
import { DiagnosticCenterResponse } from '@/types/diagnostic-center';
import { Calendar, FileText, MapPin, Phone } from 'lucide-react';

interface CompletedBookingModalProps {
    booking:
        | (DiagnosticCenterResponse['data']['centres'][number]['bookings'][number] & {
              centreName: string;
          })
        | undefined;
    children?: React.ReactNode;
}

export function CompletedBookingModal({
    booking,
    children,
}: Readonly<CompletedBookingModalProps>) {
    const [isOpen, setIsOpen] = useState(false);

    const { mutate: completeBooking, isPending: pendingComplete } =
        useCompleteBooking(booking?.id, setIsOpen);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {children || (
                    <Button variant="outline" size="sm">
                        Confirm Completion
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Confirm Completion</DialogTitle>
                    <DialogDescription>
                        Please review the details below and confirm that you
                        want to complete this booking.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 text-sm text-gray-700">
                    <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        <span className="font-medium capitalize">
                            {booking?.serviceName ?? 'N/A'}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>
                            {booking?.date} at {booking?.time}
                        </span>
                    </div>
                    <div className="flex items-center gap-2 capitalize">
                        <MapPin className="w-4 h-4" />
                        <span>
                            {`${booking?.guestState}, ${booking?.guestLGA}`}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        <span>{booking?.guestPhone}</span>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t">
                        <span className="font-semibold text-gray-900">
                            Amount
                        </span>
                        <span className="font-bold text-green-600 text-lg">
                            ₦
                            {booking?.servicePrice
                                ? Number(booking.servicePrice).toLocaleString()
                                : 'N/A'}
                        </span>
                    </div>
                </div>

                <DialogFooter className="pt-4">
                    <Button
                        variant="outline"
                        onClick={() => setIsOpen(false)}
                        className="mr-2"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        onClick={(e) => {
                            e.preventDefault();
                            if (booking?.id !== undefined) {
                                completeBooking(booking.id);
                            }
                        }}
                        disabled={pendingComplete}
                        className="bg-blue-600 text-white hover:bg-blue-700"
                    >
                        {pendingComplete ? 'Completing...' : 'Complete Booking'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
