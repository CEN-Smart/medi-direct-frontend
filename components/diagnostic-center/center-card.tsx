'use client';

import { useMemo } from 'react';

import { cn } from '@/lib/utils';
import { DiagnosticCenterResponse } from '@/types/diagnostic-center';
import {
    BarChart3,
    FileText,
    MapPin,
    Plus,
    Settings,
    Users,
} from 'lucide-react';

import { CentreAnalyticsModal } from '../centre-analytics-modal';
import { CreateCentreModal } from '../create-centre-modal';
import { ManageServicesModal } from '../manage-services-modal';
import { Pagination } from '../pagination';
import { DiagnosticCenterCardSkeleton } from '../skeletons/diagnostic-center-card-skeleton';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { NoDataFound } from '../ui/no-data-found';

type Props = {
    centers: DiagnosticCenterResponse | undefined;
    pending: boolean;
    isError: boolean;
    setPageNumber: (page: number) => void;
    errorMessage?: string;
};

export function DiagnosticCenterCard({
    centers,
    pending,
    isError,
    errorMessage,
    setPageNumber,
}: Props) {
    const centersWithBookingsReviewsAndServices = useMemo(() => {
        const allData = centers?.data.centres.flatMap((center) => {
            return {
                ...center,
                totalCenters: centers.data.centres.length,
                bookings: center.bookings || [],
                reviews: center.reviews || [],
                services: center.services || [],
            };
        });
        return allData || [];
    }, [centers]);
    return (
        <div>
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            My Diagnostic Centres
                        </h2>
                        <p className="text-gray-600">
                            Manage your diagnostic centres and services
                        </p>
                    </div>
                    <CreateCentreModal>
                        <Button className="bg-green-600 hover:bg-green-700">
                            <Plus className="w-4 h-4 mr-2" />
                            Add New Centre
                        </Button>
                    </CreateCentreModal>
                </div>
                {!pending &&
                    !isError &&
                    centersWithBookingsReviewsAndServices &&
                    centersWithBookingsReviewsAndServices.length === 0 && (
                        <NoDataFound message="No diagnostic center data available" />
                    )}
                {isError && (
                    <Card className="p-6">
                        <CardContent className="text-red-500">
                            <p>
                                Error loading diagnostic centers: {errorMessage}
                            </p>
                        </CardContent>
                    </Card>
                )}
                {pending && <DiagnosticCenterCardSkeleton />}
                <div className="max-h-[60svh] overflow-y-auto space-y-4">
                    {!pending &&
                        !isError &&
                        centersWithBookingsReviewsAndServices &&
                        centersWithBookingsReviewsAndServices.map((center) => (
                            <Card key={center.id}>
                                <CardContent className="p-6">
                                    <div className="flex lg:flex-row flex-col justify-between lg:items-center gap-6">
                                        <div className="space-y-4 w-full">
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-semibold text-xl capitalize">
                                                    {center.name}
                                                </h3>
                                                <div
                                                    className={cn(
                                                        `px-2 py-1 text-white rounded-full text-xs font-semibold`,
                                                        {
                                                            'bg-emerald-500':
                                                                center.status ===
                                                                'VERIFIED',
                                                            'bg-yellow-500':
                                                                center.status ===
                                                                'PENDING_VERIFICATION',
                                                            'bg-red-500':
                                                                center.status ===
                                                                'REJECTED',
                                                            'bg-gray-500':
                                                                center.status ===
                                                                'SUSPENDED',
                                                        },
                                                    )}
                                                >
                                                    <span>
                                                        {center.status
                                                            .replace(/_/g, ' ')
                                                            .toUpperCase()}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-2 text-gray-600">
                                                <MapPin className="w-4 h-4" />
                                                <span className="capitalize">
                                                    {center.address}
                                                </span>
                                            </div>

                                            <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 text-sm">
                                                <div className="flex items-center gap-2">
                                                    <FileText className="w-4 h-4 text-blue-500" />
                                                    <span>
                                                        {center.services.length}{' '}
                                                        Services
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Users className="w-4 h-4 text-green-500" />
                                                    <span>
                                                        {center.bookings.length}{' '}
                                                        Bookings
                                                    </span>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <span className="text-yellow-500">
                                                        ★
                                                    </span>
                                                    <span>
                                                        {center.averageRating?.toFixed(
                                                            1,
                                                        ) || 'N/A'}{' '}
                                                        (
                                                        {center.reviewsCount ||
                                                            0}{' '}
                                                        reviews)
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex sm:flex-row flex-col gap-2">
                                            <ManageServicesModal
                                                centerId={center.id}
                                                centre={center}
                                            >
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    <Settings className="mr-2 w-4 h-4" />
                                                    Manage Services
                                                </Button>
                                            </ManageServicesModal>
                                            <CentreAnalyticsModal
                                                centre={center}
                                            >
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    <BarChart3 className="mr-2 w-4 h-4" />
                                                    View Analytics
                                                </Button>
                                            </CentreAnalyticsModal>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                </div>
            </div>
            {centersWithBookingsReviewsAndServices?.length > 0 && (
                <div className="mt-6 flex justify-end ">
                    <Pagination
                        currentPage={centers?.metaData.currentPage ?? 1}
                        totalPages={centers?.metaData.totalPages ?? 1}
                        onPageChange={(page) => setPageNumber(page)}
                    />
                </div>
            )}
        </div>
    );
}
