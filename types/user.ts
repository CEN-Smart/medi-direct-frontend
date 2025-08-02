type User = {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    agreedToTerms: boolean;
    isBoarder: boolean;
    role: 'USER' | 'ADMIN' | 'SUPER_ADMIN';
    createdAt: string;
    updatedAt: string;
};

export type UserDetailsResponse = {
    status: 'success' | 'fail';
    message: string;
    data: {
        user: User;
    };
};

export type AllUsersResponse = {
    status: 'success' | 'fail';
    message: string;
    totalUsers: number;
    metaData: {
        numberInCurrentPage: number;
        totalPages: number;
        currentPage: number;
        pageSize: number;
    };
    data: {
        users: Array<{
            id: number;
            email: string;
            firstName: string;
            lastName: string;
            phone: string;
            agreedToTerms: boolean;
            isBoarder: boolean;
            role: 'USER' | 'ADMIN' | 'SUPER_ADMIN';
            createdAt: string;
            updatedAt: string;
            diagnosticCentres: Array<{
                id: number;
                name: string;
                email: string;
                phone: string;
                emergencyPhone: string;
                address: string;
                lga: string;
                state: string;
                latitude: string;
                longitude: string;
                description: string;
                website: string;
                licenseDocument: string;
                cacDocument: string;
                establishedYear: number;
                totalStaff: number;
                operatingHours: Array<{
                    to: string;
                    day: string;
                    from: string;
                    open: boolean;
                }>;
                additionalFeatures: Array<string>;
                images: Array<string>;
                logo: string;
                status:
                    | 'VERIFIED'
                    | 'PENDING_VERIFICATION'
                    | 'REJECTED'
                    | 'SUSPENDED';
                isActive: boolean;
                averageRating: number;
                reviewsCount: number;
                verifiedAt: string;
                createdAt: string;
                updatedAt: string;
                userId: number;
            }>;
        }>;
    };
};

export type SingleUserResponse = {
    status: 'success' | 'fail';
    message: string;
    data: {
        user: {
            id: number;
            email: string;
            firstName: string;
            lastName: string;
            phone: string;
            agreedToTerms: boolean;
            isBoarder: boolean;
            role: 'USER' | 'ADMIN' | 'SUPER_ADMIN';
            createdAt: string;
            updatedAt: string;
            diagnosticCentres: Array<{
                id: number;
                name: string;
                email: string;
                phone: string;
                emergencyPhone: string;
                address: string;
                lga: string;
                state: string;
                latitude: string;
                longitude: string;
                description: string;
                website: string;
                licenseDocument: string;
                cacDocument: string;
                establishedYear: number;
                totalStaff: number;
                operatingHours: Array<{
                    to: string;
                    day: string;
                    from: string;
                    open: boolean;
                }>;
                additionalFeatures: Array<string>;
                images: Array<string>;
                logo: string;
                status:
                    | 'VERIFIED'
                    | 'PENDING_VERIFICATION'
                    | 'REJECTED'
                    | 'SUSPENDED';
                isActive: boolean;
                averageRating: number;
                reviewsCount: number;
                verifiedAt: string; // Optional for pending or rejected centres
            }>;
        };
    };
};
