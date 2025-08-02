'use client';

import { useRouter } from 'next/navigation';

import { useEffect, useState } from 'react';

import { DiagnosticCenterBookingCard } from '@/components/diagnostic-center/booking-card';
import { DiagnosticCenterCard } from '@/components/diagnostic-center/center-card';
import { DiagnosticConfirmedBookingCard } from '@/components/diagnostic-center/confirmed-booking-card';
import { UserProfileTab } from '@/components/diagnostic-center/profile-tab';
import { Header } from '@/components/header';
import { userDashboardTabs } from '@/docs';
import { useTabState } from '@/hooks/use-url-state';
import { cn } from '@/lib/utils';
import { useDiagnosticCenters } from '@/queries/diagnostic-center/center';
import { useUserProfile } from '@/queries/user-profile';

export function UserDashboard() {
    const router = useRouter();

    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize] = useState(10);
    const { activeTab, handleTabChange } = useTabState(
        userDashboardTabs[0].value,
        'user-dashboard',
    );
    const {
        data: centers,
        isPending: pendingCenters,
        isError: isCenterError,
        error: centerError,
    } = useDiagnosticCenters(pageNumber, pageSize);

    const {
        data: user,
        isError: isUserError,
        isPending: pendingUser,
        error: userError,
    } = useUserProfile();

    useEffect(() => {
        if (
            user &&
            (user.data.user.role === 'ADMIN' ||
                user.data.user.role === 'SUPER_ADMIN')
        ) {
            router.push('/admin/dashboard');
        }
    }, [user, router]);

    return (
        <div className="bg-gray-50 min-h-screen">
            <Header />

            <div className="mx-auto px-4 py-8 container">
                <div className="mb-8">
                    <h1 className="mb-2 font-bold text-gray-900 text-3xl">
                        My Dashboard
                    </h1>
                    <p className="text-gray-600">
                        Manage your appointments, centres, and view test results
                    </p>
                </div>

                <section
                    aria-label="profile-userDashboardTabs"
                    className="space-y-4 w-full"
                >
                    <div className="flex flex-wrap justify-between items-center gap-2">
                        <h2 className="font-semibold text-lg">
                            Dashboard Overview
                        </h2>
                        <div className="flex flex-wrap gap-4">
                            {userDashboardTabs.map((tab) => (
                                <button
                                    key={tab.value}
                                    onClick={() => handleTabChange(tab.value)}
                                    className={cn(
                                        `px-4 py-2 rounded-md cursor-pointer bg-gray-200 text-gray-700`,
                                        {
                                            'bg-blue-500 text-white':
                                                activeTab === tab.value,
                                        },
                                    )}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>
                    {activeTab === 'bookings' && (
                        <DiagnosticCenterBookingCard
                            centers={centers}
                            pending={pendingCenters}
                            isError={isCenterError}
                            errorMessage={centerError?.message}
                        />
                    )}
                    {activeTab === 'centres' && (
                        <DiagnosticCenterCard
                            setPageNumber={setPageNumber}
                            centers={centers}
                            pending={pendingCenters}
                            isError={isCenterError}
                            errorMessage={centerError?.message}
                        />
                    )}
                    {activeTab === 'history' && (
                        <DiagnosticConfirmedBookingCard
                            centers={centers}
                            pending={pendingCenters}
                            isError={isCenterError}
                            errorMessage={centerError?.message}
                        />
                    )}
                    {activeTab === 'profile' && (
                        <UserProfileTab
                            user={user}
                            isError={isUserError}
                            isPending={pendingUser}
                            error={userError}
                        />
                    )}
                </section>
            </div>
        </div>
    );
}
