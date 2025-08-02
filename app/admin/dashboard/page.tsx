import { Suspense } from 'react';

import { AdminDashboard } from '@/components/dashboard/admin-dashboard';

const AdminDashboardPage = () => {
    return (
        <Suspense>
            <AdminDashboard />
        </Suspense>
    );
};

export default AdminDashboardPage;
