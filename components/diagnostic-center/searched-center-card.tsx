'use client';

import { useMemo } from 'react';

import { SearchedCentersResponse } from '@/types/guest';
import { MapPin, MessageSquare, Phone, Star } from 'lucide-react';

import { CentreDetailsModal } from '../centre-details-modal';
import { GuestBookingModal } from '../guest-booking-modal';
import { GuestReviewModal } from '../guest-review-modal';
import { LocationMap } from '../map/LocationMap';
import { SearchedCenterCardSkeleton } from '../skeletons/searched-center-card-skeleton';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';

type Props = {
    centers: SearchedCentersResponse | undefined;
    isError?: boolean;
    errorMessage?: string;
    isPending?: boolean;
};

export function SearchedCenterCard({
    centers,
    isError,
    isPending,
    errorMessage,
}: Props) {
    const centersWithServicesAndReviews = useMemo(() => {
        const allData = centers?.data.centres.flatMap((center) => {
            return {
                ...center,
                services: center.services || [],
                reviews: center.reviews || [],
            };
        });
        return allData || [];
    }, [centers]);

    if (isPending) {
        return <SearchedCenterCardSkeleton />;
    }

    if (isError) {
        return (
            <div className="text-red-500">
                {errorMessage || 'Failed to load centres'}
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4 w-full">
            {centersWithServicesAndReviews.map((center) => {
                return (
                    <Card
                        key={`searched-center-${center.name}-${center.id}`}
                        className="hover:shadow-lg transition-shadow p-0 overflow-hidden w-full"
                    >
                        <CardContent className="p-0 w-full">
                            <div className="flex max-md:flex-col gap-6">
                                {/* Map */}
                                <LocationMap
                                    latitude={Number(center.latitude)}
                                    longitude={Number(center.longitude)}
                                    name={center.name}
                                />
                                {/* Details */}
                                <div className="space-y-4 px-5 py-4 w-full flex-1">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <h3 className="text-xl font-semibold capitalize">
                                                {center.name}
                                            </h3>
                                            {center.status === 'VERIFIED' && (
                                                <Badge className="bg-green-100 hover:bg-green-100 text-green-800">
                                                    Verified
                                                </Badge>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                                            <div className="flex items-center gap-1">
                                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                <span>
                                                    {center.averageRating.toFixed(
                                                        1,
                                                    )}
                                                </span>
                                                <span>
                                                    ({center.reviewsCount}{' '}
                                                    reviews)
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <MapPin className="w-4 h-4" />
                                                <span className="capitalize">
                                                    {center.state} {center.lga}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="space-y-2 text-sm">
                                            <div className="flex items-center gap-2">
                                                <Phone className="w-4 h-4 text-gray-400" />
                                                <span>{center.phone}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-1 w-full">
                                        <p className="text-sm font-semibold whitespace-nowrap">
                                            Available Services:
                                        </p>
                                        <div className=" w-full">
                                            {center.services.length === 0 ? (
                                                <span className="text-gray-500">
                                                    No services available
                                                </span>
                                            ) : (
                                                <span>
                                                    {center.services.length}{' '}
                                                    {center.services.length ===
                                                    1
                                                        ? 'service'
                                                        : 'services'}{' '}
                                                    available
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-4">
                                        <div className="flex gap-2">
                                            <CentreDetailsModal centre={center}>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    View Details
                                                </Button>
                                            </CentreDetailsModal>
                                            <GuestReviewModal centre={center}>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    <MessageSquare className="w-4 h-4 mr-1" />
                                                    Review
                                                </Button>
                                            </GuestReviewModal>
                                            <GuestBookingModal centre={center}>
                                                <Button size="sm">
                                                    Book Now
                                                </Button>
                                            </GuestBookingModal>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}
