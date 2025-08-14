import { useMemo } from 'react';

import { cn } from '@/lib/utils';
import { DiagnosticCenterResponse } from '@/types/diagnostic-center';
import { Calendar, FileText } from 'lucide-react';

import { CancelModal } from '../cancel-booking-modal';
import { CompletedBookingModal } from '../completed-booking-modal';
import { RescheduleModal } from '../reschedule-modal';
import { BookingCardSkeleton } from '../skeletons/booking-card-skeleton';
import { CancelBookingSuccessDialog } from '../success-dialogs/cancel-booking-success-dialog';
import { RescheduleBookingSuccessDialog } from '../success-dialogs/reschedule-booking-success-dialog';
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

export function DiagnosticConfirmedBookingCard({
    centers,
    pending,
    isError,
    errorMessage,
}: Readonly<Props>) {
    const centerBookings = useMemo(() => {
        return centers?.data.centres
            .map((centre) => {
                return {
                    centerName: centre.name,
                    bookings: centre.bookings || [],
                };
            })
            .flatMap((centre) => {
                return centre.bookings.map((booking) => ({
                    ...booking,
                    centreName: centre.centerName,
                }));
            });
    }, [centers]);

    if (pending) {
        return <BookingCardSkeleton />;
    }

    if (isError) {
        return <div className="text-red-500">{errorMessage}</div>;
    }

    return (
        <div className="space-y-4 max-h-[60svh] overflow-y-auto">
            <RescheduleBookingSuccessDialog />
            <CancelBookingSuccessDialog />
            {/* No confirmed bookings */}
            {centerBookings?.filter(
                (booking) =>
                    booking.status === 'CONFIRMED' ||
                    booking.status === 'CANCELLED',
            ).length === 0 && (
                <NoDataFound message="No confirmed bookings available" />
            )}
            {centerBookings
                ?.filter(
                    (booking) =>
                        booking.status === 'CONFIRMED' ||
                        booking.status === 'CANCELLED',
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
                                                'px-2 py-1 text-white rounded-full text-xs font-semibold',
                                                {
                                                    'bg-green-500':
                                                        booking.status ===
                                                        'CONFIRMED',
                                                    'bg-red-500':
                                                        booking.status ===
                                                        'CANCELLED',
                                                },
                                            )}
                                        >
                                            {booking.status}
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
                                            <span>{booking.date}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col items-end gap-3">
                                    <div className="text-right">
                                        <p className="font-bold text-xl text-emerald-500">
                                            ₦
                                            {Number(
                                                booking.servicePrice,
                                            ).toLocaleString()}
                                        </p>
                                        <p
                                            className="text-gray-500
												text-sm capitalize"
                                        >
                                            ID: {booking.centreName} -{' '}
                                            {booking.id
                                                .toString()
                                                .padStart(6, '0')
                                                .padEnd(6, '0')}
                                        </p>
                                    </div>

                                    <div className="flex gap-2">
                                        <CompletedBookingModal
                                            booking={booking}
                                        >
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                disabled={
                                                    booking.status ===
                                                    'COMPLETED'
                                                }
                                            >
                                                Complete
                                            </Button>
                                        </CompletedBookingModal>
                                        <RescheduleModal booking={booking}>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                disabled={
                                                    booking.status ===
                                                        'RESCHEDULED' ||
                                                    booking.status ===
                                                        'CANCELLED'
                                                }
                                            >
                                                Reschedule
                                            </Button>
                                        </RescheduleModal>
                                        <CancelModal booking={booking}>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                disabled={
                                                    booking.status ===
                                                    'CANCELLED'
                                                }
                                            >
                                                Cancel
                                            </Button>
                                        </CancelModal>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
        </div>
    );
}
