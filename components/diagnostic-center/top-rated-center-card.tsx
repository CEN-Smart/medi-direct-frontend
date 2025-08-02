'use client';

import { TopRatedCentersResponse } from '@/types/guest';
import { Clock, MapPin, Phone, Star } from 'lucide-react';

import { LocationMap } from '../map/LocationMap';
import { TopRatedCenterCardSkeleton } from '../skeletons/top-rated-center-card-skeleton';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { NoDataFound } from '../ui/no-data-found';

type Props = {
    centers: TopRatedCentersResponse | undefined;
    isError?: boolean;
    errorMessage?: string;
    isPending?: boolean;
};

export function TopRatedCenterCard({
    centers,
    isError,
    isPending,
    errorMessage,
}: Props) {
    if (isPending) {
        return <TopRatedCenterCardSkeleton />;
    }

    if (isError) {
        return (
            <div className="text-red-500">
                {errorMessage || 'Failed to load centres'}
            </div>
        );
    }

    if (!centers || centers.data.centres.length === 0) {
        return (
            <NoDataFound message="No Top-Rated Centers Found Try a different State and LGA." />
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {centers?.data.centres.map((center) => {
                return (
                    <Card
                        key={center.id}
                        className="hover:shadow-lg transition-shadow p-0 overflow-hidden"
                    >
                        <CardContent className="p-0">
                            <div className="flex flex-col  gap-6">
                                {/* Map */}
                                <LocationMap
                                    latitude={Number(center.latitude)}
                                    longitude={Number(center.longitude)}
                                    name={center.name}
                                />
                                {/* Details */}
                                <div className="md:col-span-2 space-y-4 px-5 py-4">
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

                                        <div className="flex flex-col gap-4 text-sm text-gray-600 mb-3">
                                            <div className="flex items-baseline gap-1">
                                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                <span>
                                                    {center.averageRating.toFixed(
                                                        2,
                                                    )}
                                                </span>
                                                <span>
                                                    ({center.reviewsCount}{' '}
                                                    reviews)
                                                </span>
                                            </div>
                                            <div className="flex items-start gap-1">
                                                <MapPin className="w-4 h-4" />
                                                <span className="capitalize">
                                                    {center.address},{' '}
                                                    {center.state}, {center.lga}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="space-y-2 text-sm">
                                            <div className="flex items-center gap-2">
                                                <Phone className="w-4 h-4 text-gray-400" />
                                                <span>{center.phone}</span>
                                            </div>
                                            {/* Total Services */}
                                            <div className="flex items-start gap-1">
                                                <span className="font-medium inline-block whitespace-nowrap">
                                                    Basic Features:
                                                </span>
                                                <div className="flex flex-wrap gap-1">
                                                    {center.additionalFeatures.map(
                                                        (feature) => (
                                                            <Badge
                                                                key={feature}
                                                                className="bg-blue-100 text-blue-800 capitalize"
                                                            >
                                                                {feature}
                                                            </Badge>
                                                        ),
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <div className="flex flex-col w-full">
                                                    {center.operatingHours.map(
                                                        (hour) => (
                                                            <div
                                                                key={hour.day}
                                                                className="flex items-center gap-1 justify-between w-full"
                                                            >
                                                                <span className="font-medium capitalize flex items-center gap-1">
                                                                    <Clock className="w-4 h-4 text-gray-400" />
                                                                    {hour.day}:
                                                                </span>{' '}
                                                                <span>
                                                                    {hour.from}{' '}
                                                                    - {hour.to}
                                                                </span>
                                                            </div>
                                                        ),
                                                    )}
                                                </div>
                                            </div>
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
