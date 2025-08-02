export type TopRatedCentersResponse = {
    status: 'success' | 'fail';
    message: string;
    data: {
        centres: Array<{
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
                | 'PENDING_VERIFICATION'
                | 'VERIFIED'
                | 'SUSPENDED'
                | 'REJECTED';
            isActive: boolean;
            averageRating: number;
            reviewsCount: number;
            verifiedAt: string;
            createdAt: string;
            updatedAt: string;
            userId: number;
        }>;
    };
};

export type CenterOperatingHoursResponse = {
    status: 'success' | 'fail';
    message: string;
    data: {
        openingHours: Array<string>;
    };
};

export type SearchedCentersResponse = {
    status: 'success' | 'fail';
    total: number;
    metaData: {
        page: number;
        totalPages: number;
        currentPage: number;
        totalInCurrentPage: number;
    };
    message: string;
    data: {
        centres: Array<{
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
                | 'PENDING_VERIFICATION'
                | 'VERIFIED'
                | 'SUSPENDED'
                | 'REJECTED';
            isActive: boolean;
            averageRating: number;
            reviewsCount: number;
            verifiedAt: string;
            createdAt: string;
            updatedAt: string;
            userId: number;
            services: Array<{
                id: number;
                serviceName: string;
                serviceType: string;
                description: string;
                price: string;
                discountPrice: string;
                timeDuration: string;
                resultDeliveryTime: string;
                instructions: string;
                isAvailable: boolean;
                isActive: boolean;
                createdAt: string;
                updatedAt: string;
                centreId: number;
            }>;
            reviews: Array<{
                id: number;
                isAnonymous: boolean;
                guestName: string;
                guestEmail: string;
                guestPhone: string;
                guestVisitDate: string;
                allowToContact: boolean;
                rating: number;
                staffRating: number;
                cleanlinessRating: number;
                equipmentRating: number;
                waitingTimeRating: number;
                resultDeliveryRating: number;
                valueForMoneyRating: number;
                reviewTitle: string;
                serviceTypeUsed: string;
                reviewDescription: string;
                waitingTime: string;
                staffBehavior: string;
                facilityCondition: string;
                suggestions: string;
                willRecommend: boolean;
                createdAt: string;
                updatedAt: string;
            }>;
        }>;
    };
};

export type SingleSearchedCenterResponse = {
    status: 'success' | 'fail';
    message: string;
    data: {
        centre: {
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
                | 'PENDING_VERIFICATION'
                | 'VERIFIED'
                | 'SUSPENDED'
                | 'REJECTED';
            isActive: boolean;
            averageRating: number;
            reviewsCount: number;
            centreId: number;
            verifiedAt: string;
            createdAt: string;
            updatedAt: string;
            userId: number;
            services: Array<{
                id: number;
                serviceName: string;
                serviceType: string;
                description: string;
                price: string;
                discountPrice: string;
                timeDuration: string;
                resultDeliveryTime: string;
                instructions: string;
                isAvailable: boolean;
                isActive: boolean;
                createdAt: string;
                updatedAt: string;
                centreId: number;
            }>;
            reviews: Array<{
                id: number;
                isAnonymous: boolean;
                guestName: string;
                guestEmail: string;
                guestPhone: string;
                guestVisitDate: string;
                allowToContact: boolean;
                rating: number;
                staffRating: number;
                cleanlinessRating: number;
                equipmentRating: number;
                waitingTimeRating: number;
                resultDeliveryRating: number;
                valueForMoneyRating: number;
                reviewTitle: string;
                serviceTypeUsed: string;
                reviewDescription: string;
                waitingTime: string;
                staffBehavior: string;
                facilityCondition: string;
                suggestions: string;
                willRecommend: boolean;
                createdAt: string;
                updatedAt: string;
            }>;
        };
    };
};
