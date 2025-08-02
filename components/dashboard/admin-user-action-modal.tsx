'use client';

import Link from 'next/link';

import { useState } from 'react';

import { cn } from '@/lib/utils';
import {
    useApproveDiagnosticCenter,
    useRejectDiagnosticCenter,
    useSuspendDiagnosticCenter,
} from '@/queries/diagnostic-center/admin';
import { useSingleUserDetails } from '@/queries/user-profile';
import { AllUsersResponse } from '@/types/user';
import { format } from 'date-fns';
import { Shield } from 'lucide-react';

import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../ui/dialog';
import { NoDataFound } from '../ui/no-data-found';
import { Skeleton } from '../ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

type Props = {
    selectedUser: AllUsersResponse['data']['users'][number] | undefined;
    children?: React.ReactNode;
};

export function AdminUserActionModal({ selectedUser, children }: Props) {
    const [showUserDetails, setShowUserDetails] = useState(false);
    const {
        data: userDetails,
        isError: isUserDetailsError,
        isPending: isUserDetailsPending,
        error: userDetailsError,
    } = useSingleUserDetails(selectedUser?.id || 0);

    const { mutate: approveDiagnosticCenter, isPending: isApproving } =
        useApproveDiagnosticCenter();

    const { mutate: rejectDiagnosticCenter, isPending: isRejecting } =
        useRejectDiagnosticCenter();
    const { mutate: suspendDiagnosticCenter, isPending: isSuspending } =
        useSuspendDiagnosticCenter();

    return (
        <Dialog open={showUserDetails} onOpenChange={setShowUserDetails}>
            <DialogTrigger asChild>
                {children || (
                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => setShowUserDetails(true)}
                    >
                        View User Details
                    </Button>
                )}
            </DialogTrigger>

            <DialogContent className="sm:max-w-2xl px-0">
                <DialogHeader className="px-6">
                    <DialogTitle>User Details</DialogTitle>
                </DialogHeader>
                <DialogDescription className="sr-only">
                    Action modal
                </DialogDescription>

                {selectedUser && (
                    <Tabs defaultValue="profile" className="space-y-4">
                        <TabsList className="grid grid-cols-3 w-full">
                            <TabsTrigger value="profile">Profile</TabsTrigger>
                            <TabsTrigger value="centres">Centres</TabsTrigger>
                            <TabsTrigger value="actions">Actions</TabsTrigger>
                        </TabsList>

                        <div className="border-t border-gray-200 pt-4 max-h-[500px] overflow-y-auto px-6">
                            <TabsContent value="profile" className="space-y-4">
                                <div className="flex items-center gap-4 p-4 border rounded-lg">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-semibold text-lg capitalize">
                                                {selectedUser.firstName}{' '}
                                                {selectedUser.lastName}
                                            </h3>
                                            {selectedUser.isBoarder && (
                                                <Shield className="w-4 h-4 text-green-500" />
                                            )}
                                        </div>
                                        <p className="text-gray-600">
                                            {selectedUser.email}
                                        </p>
                                        <div className="flex gap-2 mt-2">
                                            <Badge className="bg-blue-100 text-blue-800 hover:bg-opacity-80 transition-colors duration-200">
                                                Centre Owner
                                            </Badge>
                                            <Badge className="bg-gray-100 text-gray-800 hover:bg-opacity-80 transition-colors duration-200">
                                                {selectedUser.role.replace(
                                                    '_',
                                                    ' ',
                                                )}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>

                                <div className="gap-4 grid grid-cols-2">
                                    <div>
                                        <span className="font-medium  text-sm text-gray-600">
                                            Phone
                                        </span>
                                        <p className="mt-1">
                                            {selectedUser.phone}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="font-medium text-sm text-gray-600">
                                            Date Joined
                                        </span>
                                        <p className="mt-1">
                                            {format(
                                                new Date(
                                                    selectedUser.createdAt,
                                                ),
                                                'MMMM dd, yyyy, HH:mm:ss',
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="centres" className="space-y-4">
                                <h3 className="font-semibold">
                                    Diagnostic Centres (
                                    {userDetails?.data.user.diagnosticCentres
                                        .length || 0}
                                    )
                                </h3>

                                {userDetails?.data.user.diagnosticCentres
                                    .length === 0 && (
                                    <NoDataFound message="No diagnostic center found" />
                                )}
                                {/* Error State */}
                                {isUserDetailsError && (
                                    <p className="text-red-500 text-center">
                                        {userDetailsError?.message ||
                                            'Failed to load centres.'}
                                    </p>
                                )}

                                {/* Loading State */}
                                {isUserDetailsPending && (
                                    <>
                                        {Array.from({ length: 3 }).map(
                                            (_, index: number) => (
                                                <Card
                                                    key={index}
                                                    className="mb-4"
                                                >
                                                    <CardContent className="p-4">
                                                        <div className="flex items-center justify-between">
                                                            <Skeleton className="h-6 w-1/2 mb-2" />
                                                            <Skeleton className="h-6 w-16" />
                                                        </div>
                                                        <Skeleton className="h-4 w-full" />
                                                    </CardContent>
                                                </Card>
                                            ),
                                        )}
                                    </>
                                )}

                                <div className="space-y-4">
                                    {userDetails?.data.user.diagnosticCentres.map(
                                        (centre) => (
                                            <Card
                                                key={centre.id}
                                                className="p-4"
                                            >
                                                <CardContent className="flex items-center justify-between">
                                                    <div>
                                                        <h4 className="font-semibold capitalize">
                                                            {centre.name}
                                                        </h4>
                                                        <p className="text-sm text-gray-600 capitalize">
                                                            {centre.description}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <Badge
                                                            className={cn(
                                                                `hover:bg-opacity-80 transition-colors duration-200`,
                                                                {
                                                                    'bg-green-100 text-green-800':
                                                                        centre.status ===
                                                                        'VERIFIED',
                                                                    'bg-yellow-100 text-yellow-800':
                                                                        centre.status ===
                                                                        'PENDING_VERIFICATION',
                                                                    'bg-red-100 text-red-800':
                                                                        centre.status ===
                                                                        'REJECTED',
                                                                    'bg-gray-100 text-gray-800':
                                                                        centre.status ===
                                                                        'SUSPENDED',
                                                                },
                                                            )}
                                                        >
                                                            {centre.status}
                                                        </Badge>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ),
                                    )}
                                </div>
                            </TabsContent>

                            <TabsContent value="actions" className="space-y-4">
                                {/* No content available */}
                                {userDetails?.data.user.diagnosticCentres
                                    .length === 0 && (
                                    <NoDataFound message="No diagnostic center available" />
                                )}
                                <div className="space-y-3">
                                    <div className="space-y-4">
                                        {userDetails?.data.user.diagnosticCentres.map(
                                            (centre) => (
                                                <Card key={centre.id}>
                                                    <CardContent className="flex items-center max-sm:flex-col gap-3 justify-between">
                                                        <div>
                                                            <div className="flex items-start gap-1">
                                                                {/* Logo */}
                                                                {centre.logo && (
                                                                    <picture>
                                                                        <img
                                                                            src={
                                                                                centre.logo ===
                                                                                null
                                                                                    ? '/placeholder-user.jpg'
                                                                                    : centre.logo
                                                                            }
                                                                            alt={
                                                                                centre.name
                                                                            }
                                                                            className="size-24 object-cover"
                                                                        />
                                                                    </picture>
                                                                )}

                                                                <div>
                                                                    <h4 className="font-semibold capitalize">
                                                                        {
                                                                            centre.name
                                                                        }
                                                                    </h4>
                                                                    <p className="text-sm text-gray-600 capitalize">
                                                                        {
                                                                            centre.description
                                                                        }
                                                                    </p>
                                                                    {/* Established Year */}
                                                                    <p className="text-sm text-gray-600 capitalize">
                                                                        Established
                                                                        Year:{' '}
                                                                        {
                                                                            centre.establishedYear
                                                                        }
                                                                    </p>
                                                                    {/* Total Staff */}
                                                                    <p className="text-sm text-gray-600 capitalize">
                                                                        Total
                                                                        Staff:{' '}
                                                                        {
                                                                            centre.totalStaff
                                                                        }
                                                                    </p>
                                                                    {/* CAC Document */}
                                                                    {centre.cacDocument && (
                                                                        <div className="flex gap-2 items-center">
                                                                            <Link
                                                                                target="_blank"
                                                                                rel="noopener noreferrer"
                                                                                href={
                                                                                    centre.cacDocument
                                                                                }
                                                                                className="text-sm text-blue-600 hover:underline"
                                                                            >
                                                                                View
                                                                                CAC
                                                                                Document
                                                                            </Link>
                                                                        </div>
                                                                    )}
                                                                    {/* License Document */}
                                                                    {centre.licenseDocument && (
                                                                        <div className="flex gap-2 items-center">
                                                                            <Link
                                                                                target="_blank"
                                                                                rel="noopener noreferrer"
                                                                                href={
                                                                                    centre.licenseDocument
                                                                                }
                                                                                className="text-sm text-blue-600 hover:underline"
                                                                            >
                                                                                View
                                                                                License
                                                                                Document
                                                                            </Link>
                                                                        </div>
                                                                    )}
                                                                    {/* View all  Images In Link*/}
                                                                    <p className="text-sm text-gray-600 font-medium capitalize">
                                                                        Centre
                                                                        Image
                                                                        Previews:
                                                                    </p>

                                                                    {centre
                                                                        .images
                                                                        .length >
                                                                        0 &&
                                                                        centre.images.map(
                                                                            (
                                                                                image,
                                                                                index,
                                                                            ) => (
                                                                                <div
                                                                                    key={
                                                                                        index
                                                                                    }
                                                                                    className="flex gap-2 items-center"
                                                                                >
                                                                                    <Link
                                                                                        target="_blank"
                                                                                        rel="noopener noreferrer"
                                                                                        href={
                                                                                            image
                                                                                        }
                                                                                        className="text-sm text-blue-600 hover:underline"
                                                                                    >
                                                                                        Image
                                                                                        Preview{' '}
                                                                                        {index +
                                                                                            1}
                                                                                    </Link>
                                                                                </div>
                                                                            ),
                                                                        )}
                                                                </div>
                                                            </div>
                                                            {/* Documents */}
                                                        </div>
                                                        <div className="flex flex-col gap-2 w-full sm:w-auto">
                                                            {/* Reject, Approve and suspend */}
                                                            <Button
                                                                onClick={() =>
                                                                    approveDiagnosticCenter(
                                                                        centre.id,
                                                                    )
                                                                }
                                                                disabled={
                                                                    centre.status ===
                                                                        'VERIFIED' ||
                                                                    isApproving
                                                                }
                                                                size="sm"
                                                                className="bg-emerald-600 text-white hover:bg-green-600"
                                                            >
                                                                {isApproving
                                                                    ? 'Approving...'
                                                                    : 'Approve'}
                                                            </Button>
                                                            <Button
                                                                onClick={() =>
                                                                    rejectDiagnosticCenter(
                                                                        centre.id,
                                                                    )
                                                                }
                                                                disabled={
                                                                    centre.status ===
                                                                        'REJECTED' ||
                                                                    isRejecting
                                                                }
                                                                size="sm"
                                                                className="bg-red-500 text-white hover:bg-red-600 "
                                                            >
                                                                {isRejecting
                                                                    ? 'Rejecting...'
                                                                    : 'Reject'}
                                                            </Button>

                                                            <Button
                                                                disabled={
                                                                    centre.status ===
                                                                        'SUSPENDED' ||
                                                                    isSuspending
                                                                }
                                                                onClick={() =>
                                                                    suspendDiagnosticCenter(
                                                                        centre.id,
                                                                    )
                                                                }
                                                                size="sm"
                                                                className="bg-yellow-500 text-white hover:bg-yellow-600"
                                                            >
                                                                {isSuspending
                                                                    ? 'Suspending...'
                                                                    : 'Suspend'}
                                                            </Button>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            ),
                                        )}
                                    </div>
                                </div>
                            </TabsContent>
                        </div>
                    </Tabs>
                )}
            </DialogContent>
        </Dialog>
    );
}
