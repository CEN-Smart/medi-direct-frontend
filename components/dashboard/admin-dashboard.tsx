'use client';

import { useMemo, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { adminDashboardTabs } from '@/docs';
import { useTabState } from '@/hooks/use-url-state';
import { cn } from '@/lib/utils';
import { useAllUsers, useUserProfile } from '@/queries/user-profile';
import { format } from 'date-fns';
import { Building2, Eye, Shield, UserCheck, Users } from 'lucide-react';

import { UserProfileTab } from '../diagnostic-center/profile-tab';
import { Pagination } from '../pagination';
import { SearchInput } from '../search-input';
import { TableSkeleton } from '../skeletons/table-skeleton';
import { NoTableData } from '../table/no-table-data';
import { AdminDashboardDetailCard } from './admin-dashboard-detail-card';
import { AdminUserActionModal } from './admin-user-action-modal';
import { ServiceTypeTable } from './service-type-table';

export function AdminDashboard() {
    const { activeTab, handleTabChange } = useTabState(
        adminDashboardTabs[0].value,
        'admin-dashboard',
    );
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize] = useState(10);
    const [searchText, setSearchText] = useState('');
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

    const handleUserSelect = (userId: string) => {
        setSelectedUsers((prev) =>
            prev.includes(userId)
                ? prev.filter((id) => id !== userId)
                : [...prev, userId],
        );
    };

    const {
        data: allUsers,
        isError: isAllUsersError,
        isPending: isAllUsersPending,
        error: allUserError,
    } = useAllUsers(pageSize, pageNumber, searchText);

    const {
        data: user,
        isError: isUserError,
        isPending: pendingUser,
        error: userError,
    } = useUserProfile();

    const approvedCentres = useMemo(() => {
        return allUsers?.data.users.flatMap((user) => {
            const centres = user.diagnosticCentres?.filter((centre) => {
                return centre.status === 'VERIFIED';
            });
            return centres || [];
        });
    }, [allUsers]);

    const pendingCentres = useMemo(() => {
        return allUsers?.data.users.flatMap((user) => {
            const centres = user.diagnosticCentres?.filter((centre) => {
                return centre.status === 'PENDING_VERIFICATION';
            });
            return centres || [];
        });
    }, [allUsers]);

    const centreOwners = useMemo(() => {
        return allUsers?.data.users.filter((user) => {
            const centreUserIds = allUsers?.data.users
                .flatMap((u) => u.diagnosticCentres)
                .map((centre) => centre.userId);
            return centreUserIds?.includes(user.id);
        });
    }, [allUsers]);

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="mx-auto px-4 py-8 container">
                <div className="mb-8">
                    <h1 className="mb-2 font-bold text-gray-900 text-3xl">
                        User Management
                    </h1>
                    <p className="text-gray-600">
                        Manage all registered users and their permissions
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="gap-6 grid grid-cols-1 md:grid-cols-4 mb-8">
                    <AdminDashboardDetailCard
                        isPending={isAllUsersPending}
                        isError={isAllUsersError}
                        errorMessage={allUserError?.message}
                        title="Total Users"
                        total={allUsers?.totalUsers ?? 0}
                        icon={<Users className="w-8 h-8 text-blue-500" />}
                    />
                    <AdminDashboardDetailCard
                        title="Active Centres"
                        total={approvedCentres?.length ?? 0}
                        icon={<UserCheck className="w-8 h-8 text-green-500" />}
                        iconClassName="text-green-500"
                        isPending={isAllUsersPending}
                        isError={isAllUsersError}
                        errorMessage={allUserError?.message}
                    />
                    <AdminDashboardDetailCard
                        title="Pending Centres"
                        total={pendingCentres?.length ?? 0}
                        icon={<Building2 className="w-8 h-8 text-yellow-500" />}
                        iconClassName="text-yellow-500"
                        isPending={isAllUsersPending}
                        isError={isAllUsersError}
                        errorMessage={allUserError?.message}
                    />

                    <AdminDashboardDetailCard
                        title="Centre Owners"
                        total={centreOwners?.length ?? 0}
                        icon={<Building2 className="w-8 h-8 text-blue-500" />}
                        iconClassName="text-red-500"
                        isPending={isAllUsersPending}
                        isError={isAllUsersError}
                        errorMessage={allUserError?.message}
                    />
                </div>

                <section
                    aria-label="profile-adminDashboardTabs"
                    className="space-y-4 w-full"
                >
                    <div className="flex flex-wrap justify-between items-center gap-2">
                        <h2 className="font-semibold text-lg">
                            Dashboard Overview
                        </h2>
                        <div className="flex flex-wrap gap-4">
                            {adminDashboardTabs.map((tab) => (
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
                    {activeTab === 'users' && (
                        <>
                            {/* Filters and Actions */}
                            <Card className="mb-6">
                                <CardContent className="p-6">
                                    <div className="flex lg:flex-row flex-col justify-between items-center gap-4">
                                        <div className="flex sm:flex-row flex-col flex-1 gap-4">
                                            <div className="relative flex-1 max-w-md">
                                                <SearchInput
                                                    className=" focus:border-blue-500 focus:ring-blue-500"
                                                    inputClassName="border-blue-300 ring-2 ring-blue-300 focus:border-blue-500 focus:ring-blue-500"
                                                    searchText={searchText}
                                                    setSearchText={
                                                        setSearchText
                                                    }
                                                    placeholder="Search users..."
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Users Table */}
                            <Card>
                                <CardContent className="p-0">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="w-12">
                                                    <Checkbox
                                                        checked={
                                                            selectedUsers.length >
                                                            0
                                                        }
                                                        onCheckedChange={(
                                                            checked,
                                                        ) => {
                                                            if (
                                                                !allUsers?.data
                                                                    .users
                                                            )
                                                                return;
                                                            if (checked) {
                                                                setSelectedUsers(
                                                                    allUsers.data.users.map(
                                                                        (
                                                                            user,
                                                                        ) =>
                                                                            user.id.toString(),
                                                                    ),
                                                                );
                                                            } else {
                                                                setSelectedUsers(
                                                                    [],
                                                                );
                                                            }
                                                        }}
                                                    />
                                                </TableHead>
                                                <TableHead>User</TableHead>
                                                <TableHead>Role</TableHead>

                                                <TableHead>Join Date</TableHead>
                                                <TableHead className="w-32">
                                                    Actions
                                                </TableHead>
                                                <TableHead className="w-12"></TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        {isAllUsersPending && (
                                            <TableSkeleton columns={5} />
                                        )}
                                        {!isAllUsersPending &&
                                            allUsers?.data.users.length ===
                                                0 && (
                                                <NoTableData
                                                    colSpan={5}
                                                    message="No users found"
                                                />
                                            )}
                                        <TableBody>
                                            {allUsers?.data.users.map(
                                                (user) => (
                                                    <TableRow key={user.id}>
                                                        <TableCell>
                                                            <Checkbox
                                                                checked={selectedUsers.includes(
                                                                    user.id.toString(),
                                                                )}
                                                                onClick={() =>
                                                                    handleUserSelect(
                                                                        user.id.toString(),
                                                                    )
                                                                }
                                                            />
                                                        </TableCell>
                                                        <TableCell>
                                                            <div className="flex items-center gap-3">
                                                                <div>
                                                                    <div className="flex items-center gap-2">
                                                                        <p className="font-medium capitalize">
                                                                            {
                                                                                user.firstName
                                                                            }{' '}
                                                                            {
                                                                                user.lastName
                                                                            }
                                                                        </p>
                                                                        {user.isBoarder && (
                                                                            <Shield className="w-4 h-4 text-green-500" />
                                                                        )}
                                                                    </div>
                                                                    <p className="text-gray-600 text-sm">
                                                                        {
                                                                            user.email
                                                                        }
                                                                    </p>
                                                                    <p className="text-gray-500 text-sm">
                                                                        {
                                                                            user.phone
                                                                        }
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Badge
                                                                className={cn(
                                                                    `rounded-full bg-emerald-600`,
                                                                )}
                                                            >
                                                                {user.role.replace(
                                                                    '_',
                                                                    ' ',
                                                                )}
                                                            </Badge>
                                                        </TableCell>

                                                        <TableCell className="text-gray-600 text-sm whitespace-nowrap">
                                                            {format(
                                                                new Date(
                                                                    user.createdAt,
                                                                ),
                                                                'MMM dd, yyyy HH:mm:ss',
                                                            )}
                                                        </TableCell>

                                                        <TableCell>
                                                            <AdminUserActionModal
                                                                selectedUser={
                                                                    user
                                                                }
                                                            >
                                                                <div className="flex items-center text-blue-600 hover:text-blue-800 cursor-pointer whitespace-nowrap">
                                                                    <Eye className="mr-2 w-4 h-4" />
                                                                    View Details
                                                                </div>
                                                            </AdminUserActionModal>
                                                        </TableCell>
                                                    </TableRow>
                                                ),
                                            )}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>

                            {/* Pagination */}
                            {allUsers && allUsers?.data.users.length > 0 && (
                                <div className="flex items-center justify-end py-4">
                                    <Pagination
                                        currentPage={
                                            allUsers?.metaData.currentPage || 1
                                        }
                                        totalPages={
                                            allUsers?.metaData.totalPages || 1
                                        }
                                        onPageChange={(page) => {
                                            setPageNumber(page);
                                            setSearchText(''); // Reset search on page change
                                        }}
                                    />
                                </div>
                            )}
                        </>
                    )}
                    {activeTab === 'profile' && (
                        <UserProfileTab
                            user={user}
                            isError={isUserError}
                            isPending={pendingUser}
                            error={userError}
                        />
                    )}
                    {activeTab === 'service-types' && <ServiceTypeTable />}
                </section>
            </div>
        </div>
    );
}
