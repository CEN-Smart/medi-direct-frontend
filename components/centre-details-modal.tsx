'use client';

import { useEffect, useState } from 'react';

import { LocationMap } from '@/components/map/LocationMap';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { animations } from '@/lib/animations';
import { useSingleSearchedCenter } from '@/queries/search-centres/search-centres';
import { SearchedCentersResponse } from '@/types/guest';
import { format } from 'date-fns';
import { Calendar, Clock, MapPin, Phone, Shield, Star } from 'lucide-react';

import { GuestBookingModal } from './guest-booking-modal';
import { NoDataFound } from './ui/no-data-found';
import { Skeleton } from './ui/skeleton';

interface CentreDetailsModalProps {
    centre: SearchedCentersResponse['data']['centres'][number] | undefined;
    children?: React.ReactNode;
}

export function CentreDetailsModal({
    centre,
    children,
}: Readonly<CentreDetailsModalProps>) {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('services');

    const {
        data: centerData,
        isError: isCentreError,
        error: centerError,
        isPending: isCentrePending,
    } = useSingleSearchedCenter(centre?.id ?? 0);

    useEffect(() => {
        if (isOpen && centre) {
            // Animate modal content
            const modalContent = document.querySelector('.modal-content');
            if (modalContent) {
                animations.pageEnter(modalContent);
            }
        }
    }, [isOpen, centre]);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {children || (
                    <Button variant="outline" onClick={() => setIsOpen(true)}>
                        View Details
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-4xl z-[10000] overflow-y-auto modal-content px-0">
                <DialogHeader className="px-6">
                    <DialogTitle className="flex items-center gap-2">
                        <span className="capitalize">{centre?.name}</span>
                        {centre?.status === 'VERIFIED' && (
                            <Badge className="bg-green-100 text-green-800">
                                Verified
                            </Badge>
                        )}
                    </DialogTitle>
                </DialogHeader>

                <div className="gap-6 grid grid-cols-1 lg:grid-cols-3 max-h-[80vh] overflow-y-auto px-6 pt-4">
                    {/* Image and Basic Info */}
                    <div className="lg:col-span-1">
                        <LocationMap
                            latitude={Number(centre?.latitude)}
                            longitude={Number(centre?.longitude)}
                            name={centre?.name || 'Centre Location'}
                            className="mb-4 rounded-lg w-full h-48 border border-gray-200"
                        />

                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <Star className="fill-yellow-400 w-4 h-4 text-yellow-400" />
                                <span className="font-medium">
                                    {centre?.averageRating.toFixed(1)}
                                </span>
                                <span className="text-gray-500">
                                    ({centre?.reviewsCount} reviews)
                                </span>
                            </div>

                            <div className="flex items-start gap-2 text-gray-600 capitalize">
                                <MapPin className="w-4 h-4 shrink-0" />
                                <span>
                                    {centre?.address} - {centre?.state},{' '}
                                    {centre?.lga}
                                </span>
                            </div>

                            <div className="flex items-center gap-2 text-gray-600">
                                <Phone className="w-4 h-4" />
                                <span>{centre?.phone}</span>
                            </div>

                            <div className=" text-gray-600">
                                <div className="flex flex-col w-full">
                                    {centre?.operatingHours.map((hour) => {
                                        const { from, to } = hour;
                                        const amPmFormat = (time: string) => {
                                            const [hours, minutes] =
                                                time.split(':');
                                            const amPm =
                                                +hours >= 12 ? 'PM' : 'AM';
                                            const formattedHours =
                                                +hours % 12 || 12;
                                            return `${formattedHours}:${minutes} ${amPm}`;
                                        };
                                        return (
                                            <div
                                                key={hour.day}
                                                className="flex items-center justify-between gap-2"
                                            >
                                                <div className="flex items-center gap-1">
                                                    <Clock className="w-4 h-4 text-gray-400" />
                                                    <span className="text-gray-600 text-sm font-semibold">
                                                        {hour.day}:
                                                    </span>
                                                </div>
                                                <span className="text-gray-600 text-sm">
                                                    {hour.open
                                                        ? `${amPmFormat(from)} - ${amPmFormat(to)}`
                                                        : 'Closed'}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        <GuestBookingModal centre={centre}>
                            <Button className="bg-blue-600 hover:bg-blue-700 mt-6 w-full">
                                <Calendar className="mr-2 w-4 h-4" />
                                Book Appointment
                            </Button>
                        </GuestBookingModal>
                    </div>

                    {/* Detailed Information */}
                    <div className="lg:col-span-2">
                        <Tabs value={activeTab} onValueChange={setActiveTab}>
                            <TabsList className="grid grid-cols-3 w-full">
                                <TabsTrigger value="services">
                                    Services & Prices
                                </TabsTrigger>
                                <TabsTrigger value="reviews">
                                    Reviews
                                </TabsTrigger>
                                <TabsTrigger value="info">
                                    Information
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="services" className="space-y-4">
                                <h3 className="mb-4 font-semibold text-lg">
                                    Available Services (
                                    {centerData?.data.centre.services.length})
                                </h3>
                                {(() => {
                                    if (isCentrePending) {
                                        return (
                                            <div className="space-y-4">
                                                <Skeleton className="h-6 w-1/3" />
                                                <Skeleton className="h-6 w-full" />
                                                <Skeleton className="h-6 w-full" />
                                                <Skeleton className="h-6 w-full" />
                                            </div>
                                        );
                                    }
                                    if (isCentreError) {
                                        return (
                                            <p>
                                                Error loading services:{' '}
                                                {centerError.message}
                                            </p>
                                        );
                                    }
                                    if (
                                        centerData?.data.centre.services
                                            .length === 0
                                    ) {
                                        return (
                                            <NoDataFound message="No services available for this centre." />
                                        );
                                    }
                                    return centerData?.data.centre.services.map(
                                        (service) => (
                                            <Card key={service.id}>
                                                <CardContent className="p-4">
                                                    <div className="flex justify-between items-center">
                                                        <div>
                                                            <h4 className="font-medium capitalize">
                                                                {
                                                                    service.serviceName
                                                                }
                                                            </h4>
                                                            <p className="text-gray-500 text-sm">
                                                                Duration:{' '}
                                                                {
                                                                    service.timeDuration
                                                                }
                                                            </p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="font-semibold text-green-600">
                                                                ₦
                                                                {Number(
                                                                    service.price,
                                                                ).toLocaleString()}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ),
                                    );
                                })()}
                            </TabsContent>

                            <TabsContent value="reviews" className="space-y-4">
                                <h3 className="mb-4 font-semibold text-lg">
                                    Patient Reviews
                                </h3>
                                {(() => {
                                    if (isCentrePending) {
                                        return (
                                            <div className="space-y-4">
                                                <Skeleton className="h-6 w-1/3" />
                                                <Skeleton className="h-6 w-full" />
                                                <Skeleton className="h-6 w-full" />
                                            </div>
                                        );
                                    }
                                    if (isCentreError) {
                                        return (
                                            <p>
                                                Error loading reviews:{' '}
                                                {centerError.message}
                                            </p>
                                        );
                                    }
                                    if (
                                        centerData?.data.centre.reviews
                                            .length === 0
                                    ) {
                                        return (
                                            <NoDataFound message="No reviews available for this centre." />
                                        );
                                    }
                                    return centerData?.data.centre.reviews.map(
                                        (review) => (
                                            <Card key={review.id}>
                                                <CardContent className="p-4">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <div>
                                                            <p className="font-medium capitalize">
                                                                {review.guestName
                                                                    ? review.guestName
                                                                    : 'Anonymous'}
                                                            </p>
                                                            <div className="flex items-center gap-1">
                                                                {[
                                                                    ...Array(
                                                                        review.rating,
                                                                    ),
                                                                ].map(
                                                                    (
                                                                        _,
                                                                        starIdx,
                                                                    ) => (
                                                                        <Star
                                                                            key={`${review.id}-star-${starIdx}`}
                                                                            className="fill-yellow-400 w-4 h-4 text-yellow-400"
                                                                        />
                                                                    ),
                                                                )}
                                                            </div>
                                                        </div>
                                                        <span className="text-gray-500 text-sm">
                                                            {format(
                                                                review.createdAt,
                                                                'MMMM dd, yyyy, HH:mm:ss',
                                                            )}
                                                        </span>
                                                    </div>
                                                    <p className="text-gray-600">
                                                        {
                                                            review.reviewDescription
                                                        }
                                                    </p>
                                                </CardContent>
                                            </Card>
                                        ),
                                    );
                                })()}
                            </TabsContent>

                            <TabsContent value="info" className="space-y-4">
                                <h3 className="mb-4 font-semibold text-lg">
                                    Centre Information
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="mb-2 font-medium">
                                            About:
                                        </h4>
                                        <p className="text-gray-600">
                                            <span>{centre?.description}</span>
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="mb-2 font-medium">
                                            Specialties:
                                        </h4>
                                        <div className="flex flex-wrap gap-2 capitalize">
                                            {centre &&
                                            centre?.services?.length > 0 ? (
                                                centre?.services.map(
                                                    (service) => (
                                                        <Badge
                                                            key={service.id}
                                                            variant="secondary"
                                                        >
                                                            {
                                                                service.serviceName
                                                            }
                                                        </Badge>
                                                    ),
                                                )
                                            ) : (
                                                <span className="text-gray-500">
                                                    No specialties listed
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="mb-2 font-medium">
                                            Certifications
                                        </h4>
                                        <div className="flex items-center gap-2">
                                            {centerData?.data.centre.status ===
                                                'VERIFIED' && (
                                                <div className="flex items-center gap-1">
                                                    <Shield className="w-4 h-4 text-green-600" />
                                                    <span className="text-gray-600 text-sm">
                                                        Licensed
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
