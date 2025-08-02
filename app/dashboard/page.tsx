import { Suspense } from 'react';

import { UserDashboard } from '@/components/dashboard/user-dashboard';

const DashboardPage = () => {
    return (
        <Suspense>
            <UserDashboard />
        </Suspense>
    );
};

export default DashboardPage;
