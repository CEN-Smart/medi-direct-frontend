'use client';

import { useMemo } from 'react';

import { cn } from '@/lib/utils';
import { DiagnosticCenterResponse } from '@/types/diagnostic-center';
import { Calendar, FileText, MapPin, Phone } from 'lucide-react';

import ConfirmBookingModal from '../confirm-booking-modal';
import { BookingCardSkeleton } from '../skeletons/booking-card-skeleton';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { NoDataFound } from '../ui/no-data-found';

type Props = {
    centers: DiagnosticCenterResponse | undefined;
    pending: boolean;
    isError: boolean;
    errorMessage?: string;
};

export function DiagnosticCenterBookingCard({
    centers,
    pending,
    isError,
    errorMessage,
}: Props) {
    const centerBookings = useMemo(() => {
        return centers?.data.centres
            .map((centre) => {
                return {
                    centerName: centre.name,
                    centerId: centre.id,
                    bookings: centre.bookings || [],
                };
            })
            .flatMap((centre) => {
                return centre.bookings.map((booking) => ({
                    ...booking,
                    centreName: centre.centerName,
                    centreId: centre.centerId,
                }));
            });
    }, [centers]);

    if (pending) {
        return <BookingCardSkeleton />;
    }

    if (isError) {
        return <div>Error: {errorMessage}</div>;
    }
    return (
        <div className="space-y-4 max-h-[400px] overflow-y-auto">
            {/* No pending bookings */}
            {centerBookings?.filter(
                (booking) =>
                    booking.status === 'PENDING' ||
                    booking.status === 'RESCHEDULED',
            ).length === 0 && (
                <NoDataFound message="No pending bookings available" />
            )}
            {centerBookings
                ?.filter(
                    (booking) =>
                        booking.status === 'PENDING' ||
                        booking.status === 'RESCHEDULED',
                )
                .map((booking) => (
                    <Card key={booking.id}>
                        <CardContent className="p-6">
                            <div className="flex md:flex-row flex-col justify-between md:items-center gap-4">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-semibold text-lg capitalize">
                                            {booking.guestFirstName}{' '}
                                            {booking.guestLastName || ''}
                                        </h3>

                                        <Badge
                                            className={cn(
                                                `'px-2 py-1 text-white rounded-full text-xs font-semibold`,
                                                {
                                                    'bg-red-500':
                                                        booking.status ===
                                                        'CANCELLED',
                                                    'bg-green-500':
                                                        booking.status ===
                                                        'CONFIRMED',
                                                    'bg-yellow-500':
                                                        booking.status ===
                                                        'PENDING',
                                                    'bg-blue-500':
                                                        booking.status ===
                                                        'RESCHEDULED',
                                                },
                                            )}
                                        >
                                            {booking.status ?? 'N/A'}
                                        </Badge>
                                    </div>

                                    <div className="space-y-2 text-gray-600 text-sm">
                                        <div className="flex items-center gap-2">
                                            <FileText className="w-4 h-4" />
                                            <span className="capitalize">
                                                {booking.serviceName ?? 'N/A'}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4" />
                                            <span>
                                                {booking.date} at {booking.time}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-4 h-4" />
                                            <span className="capitalize">
                                                {booking.guestState},{' '}
                                                {booking.guestLGA}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Phone className="w-4 h-4" />
                                            <span>{booking.guestPhone}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col items-end gap-3">
                                    <div className="text-right">
                                        <p className="font-bold text-green-600 text-2xl">
                                            ₦
                                            {booking.servicePrice
                                                ? Number(
                                                      booking.servicePrice,
                                                  ).toLocaleString()
                                                : 'N/A'}
                                        </p>
                                        <p className="text-gray-500 text-sm capitalize">
                                            Booking ID: {booking.centreName} -{' '}
                                            {booking.id
                                                .toString()
                                                .padStart(6, '0')
                                                .padEnd(6, '0')}
                                        </p>
                                    </div>

                                    <div className="flex gap-2">
                                        <ConfirmBookingModal booking={booking}>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                disabled={
                                                    booking.status ===
                                                    'CONFIRMED'
                                                }
                                            >
                                                Confirm
                                            </Button>
                                        </ConfirmBookingModal>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
        </div>
    );
}
