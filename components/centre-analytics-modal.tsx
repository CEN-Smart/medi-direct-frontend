'use client';

import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { DiagnosticCenterResponse } from '@/types/diagnostic-center';
import { format } from 'date-fns';
import {
    BarChart3,
    Calendar,
    Hospital,
    MessageSquareMore,
    Star,
} from 'lucide-react';

import { OverviewAnalyticsCard } from './dashboard/overview-analytics-card';
import { NoDataFound } from './ui/no-data-found';

interface CentreAnalyticsModalProps {
    centre: DiagnosticCenterResponse['data']['centres'][number] & {
        totalCenters: number;
    };
    children?: React.ReactNode;
}

export function CentreAnalyticsModal({
    centre,
    children,
}: Readonly<CentreAnalyticsModalProps>) {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {children || (
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsOpen(true)}
                    >
                        <BarChart3 className="mr-2 w-4 h-4" />
                        View Analytics
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="px-0 sm:max-w-7xl">
                <DialogHeader className="px-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 capitalize">
                            <BarChart3 className="w-5 h-5 text-blue-600" />
                            <DialogTitle>Analytics - {centre.name}</DialogTitle>
                        </div>
                    </div>
                </DialogHeader>
                <DialogDescription className="sr-only">
                    Analytics Modal
                </DialogDescription>

                <Tabs
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="space-y-6 w-full"
                >
                    <div className="px-4">
                        <TabsList className="grid grid-cols-3 w-full">
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="patients">Patients</TabsTrigger>
                            <TabsTrigger value="reviews">Reviews</TabsTrigger>
                        </TabsList>
                    </div>

                    <div className="px-4 max-h-[70dvh] overflow-y-auto">
                        {/* Overview Tab */}
                        <TabsContent
                            value="overview"
                            className="space-y-6 w-full"
                        >
                            {/* Key Metrics */}
                            <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full">
                                <OverviewAnalyticsCard
                                    title="Total Bookings"
                                    detail={centre.bookings.length.toLocaleString()}
                                    icon={
                                        <Calendar className="w-8 h-8 text-blue-500" />
                                    }
                                />
                                <OverviewAnalyticsCard
                                    title="Average Rating"
                                    detail={`${centre.averageRating.toFixed(1)}`}
                                    icon={
                                        <Star className="w-8 h-8 text-yellow-500" />
                                    }
                                />

                                {/* Total services */}
                                <OverviewAnalyticsCard
                                    title="Total Services"
                                    detail={centre.services.length.toString()}
                                    icon={
                                        <Hospital className="w-8 h-8 text-green-500" />
                                    }
                                />

                                {/* Total centers */}
                                <OverviewAnalyticsCard
                                    title="Total Reviews"
                                    detail={centre.reviewsCount.toLocaleString()}
                                    icon={
                                        <MessageSquareMore className="w-8 h-8 text-pink-500" />
                                    }
                                />
                            </div>
                        </TabsContent>

                        {/* Patients Tab */}
                        <TabsContent value="patients" className="space-y-6">
                            <div className="gap-6 grid grid-cols-1 lg:grid-cols-2">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Age Distribution</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-3">
                                            {/* Age Range */}
                                            {Object.entries(
                                                centre.bookings.reduce(
                                                    (acc, curr) => {
                                                        const age = Number(
                                                            curr.guestAgeRange.split(
                                                                '-',
                                                            )[1],
                                                        );
                                                        if (age < 18) {
                                                            acc['0-17']++;
                                                        } else if (age < 26) {
                                                            acc['18-25']++;
                                                        } else if (age < 36) {
                                                            acc['26-35']++;
                                                        } else if (age < 46) {
                                                            acc['36-45']++;
                                                        } else if (age < 56) {
                                                            acc['46-55']++;
                                                        } else {
                                                            acc['56+']++;
                                                        }
                                                        return acc;
                                                    },
                                                    {
                                                        '0-17': 0,
                                                        '18-25': 0,
                                                        '26-35': 0,
                                                        '36-45': 0,
                                                        '46-55': 0,
                                                        '56+': 0,
                                                    },
                                                ),
                                            ).map(([range, count], index) => {
                                                const countPercentage =
                                                    (count /
                                                        centre.bookings
                                                            .length) *
                                                    100;

                                                return (
                                                    <div
                                                        key={`age-range-${range}-${index}`}
                                                        className="gap-1 grid grid-cols-2"
                                                    >
                                                        <span className="font-medium text-sm capitalize">
                                                            {range}
                                                        </span>
                                                        <div className="flex items-center gap-1">
                                                            <div className="bg-gray-200 rounded-full w-20 h-2">
                                                                <div
                                                                    className="bg-purple-500 rounded-full h-2"
                                                                    style={{
                                                                        width: `${!isNaN(countPercentage) ? countPercentage : 0}%`,
                                                                    }}
                                                                ></div>
                                                            </div>

                                                            <span className="font-medium text-sm">
                                                                {isNaN(
                                                                    countPercentage,
                                                                )
                                                                    ? 0
                                                                    : countPercentage.toFixed(
                                                                          2,
                                                                      )}
                                                                %
                                                            </span>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>
                                            Gender Distribution
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {centre.bookings.length === 0 && (
                                                <NoDataFound message="No Gender Distributions" />
                                            )}
                                            {Object.entries(
                                                centre.bookings.reduce(
                                                    (acc, curr) => {
                                                        const gender =
                                                            curr.guestGender.toLocaleLowerCase();
                                                        if (!acc[gender]) {
                                                            acc[gender] = 0;
                                                        }
                                                        acc[gender]++;
                                                        return acc;
                                                    },
                                                    {} as Record<
                                                        string,
                                                        number
                                                    >,
                                                ),
                                            ).map(([gender, count], index) => {
                                                const countPercentage =
                                                    (count /
                                                        centre.bookings
                                                            .length) *
                                                    100;

                                                return (
                                                    <div
                                                        key={`gender-${gender}-${index}`}
                                                        className="gap-1 grid grid-cols-2"
                                                    >
                                                        <span className="font-medium text-sm capitalize">
                                                            {gender}
                                                        </span>
                                                        <div className="flex items-center gap-1">
                                                            <div className="bg-gray-200 rounded-full w-24 h-3">
                                                                <div
                                                                    className={cn(
                                                                        `rounded-full h-full`,
                                                                        {
                                                                            'bg-blue-500':
                                                                                gender.toLocaleLowerCase() ===
                                                                                'male',
                                                                            'bg-pink-500':
                                                                                gender.toLocaleLowerCase() ===
                                                                                'female',
                                                                        },
                                                                    )}
                                                                    style={{
                                                                        width: `${Number(countPercentage)}%`,
                                                                    }}
                                                                ></div>
                                                            </div>
                                                            <span className="font-medium text-sm">
                                                                {Number(
                                                                    countPercentage,
                                                                ).toFixed(2)}
                                                                %
                                                            </span>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>

                        {/* Reviews Tab */}
                        <TabsContent value="reviews" className="space-y-6">
                            <div className="gap-6 grid grid-cols-1 lg:grid-cols-2">
                                <Card className="h-fit">
                                    <CardHeader>
                                        <CardTitle>Rating Overview</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="mb-6 text-center">
                                            <p className="font-bold text-4xl">
                                                {centre.averageRating.toFixed(
                                                    2,
                                                )}
                                            </p>
                                            <div className="flex justify-center gap-1 my-2">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <Star
                                                        key={star}
                                                        className={`w-5 h-5 ${
                                                            star <=
                                                            Math.floor(
                                                                centre.averageRating,
                                                            )
                                                                ? 'text-yellow-400 fill-current'
                                                                : 'text-gray-300'
                                                        }`}
                                                    />
                                                ))}
                                            </div>
                                            <p className="text-gray-600 text-sm">
                                                {centre.reviewsCount} total
                                                reviews
                                            </p>
                                        </div>

                                        <div className="space-y-2">
                                            {centre.reviews.length === 0 && (
                                                <NoDataFound message="No reviews yet" />
                                            )}

                                            {Object.entries(
                                                centre.reviews.reduce(
                                                    (acc, review) => {
                                                        acc[review.rating] =
                                                            (acc[
                                                                review.rating
                                                            ] || 0) + 1;
                                                        return acc;
                                                    },
                                                    {} as Record<
                                                        number,
                                                        number
                                                    >,
                                                ),
                                            ).map(([rating, count]) => (
                                                <div
                                                    key={rating}
                                                    className="flex items-center gap-2"
                                                >
                                                    <span className="w-6 text-sm">
                                                        {rating}★
                                                    </span>
                                                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                                                        <div
                                                            className="bg-yellow-400 rounded-full h-2"
                                                            style={{
                                                                width: `${
                                                                    (Number(
                                                                        count,
                                                                    ) /
                                                                        centre
                                                                            .reviews
                                                                            .length) *
                                                                    100
                                                                }%`,
                                                            }}
                                                        ></div>
                                                    </div>
                                                    <span className="w-12 text-sm text-right">
                                                        {count}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="h-fit">
                                    <CardHeader>
                                        <CardTitle>Recent Reviews</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {centre.reviews.length === 0 && (
                                                <NoDataFound message="No reviews yet" />
                                            )}
                                            {centre.reviews.map((review) => (
                                                <div
                                                    key={review.id}
                                                    className="pb-4 border-b last:border-b-0"
                                                >
                                                    <div className="flex justify-between items-center mb-2">
                                                        <div className="flex items-center gap-2">
                                                            <span className="font-medium text-sm capitalize">
                                                                {review.guestName ===
                                                                ''
                                                                    ? 'Anonymous'
                                                                    : review.guestName}
                                                            </span>
                                                            <div className="flex gap-1">
                                                                {[
                                                                    1, 2, 3, 4,
                                                                    5,
                                                                ].map(
                                                                    (star) => (
                                                                        <Star
                                                                            key={
                                                                                star
                                                                            }
                                                                            className={`w-3 h-3 ${
                                                                                star <=
                                                                                review.rating
                                                                                    ? 'text-yellow-400 fill-current'
                                                                                    : 'text-gray-300'
                                                                            }`}
                                                                        />
                                                                    ),
                                                                )}
                                                            </div>
                                                        </div>
                                                        <span className="text-gray-500 text-xs">
                                                            {format(
                                                                review.createdAt,
                                                                'yyyy-MM-dd, HH:mm:ss',
                                                            )}
                                                        </span>
                                                    </div>
                                                    <p className="mb-1 text-gray-600 text-sm">
                                                        {
                                                            review.reviewDescription
                                                        }
                                                    </p>
                                                    <Badge
                                                        variant="outline"
                                                        className="text-xs capitalize"
                                                    >
                                                        {review.serviceTypeUsed}
                                                    </Badge>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>
                    </div>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
}
