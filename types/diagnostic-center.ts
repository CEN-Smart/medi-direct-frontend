export type BookingStatus =
    | 'PENDING'
    | 'CONFIRMED'
    | 'CANCELLED'
    | 'COMPLETED'
    | 'RESCHEDULED'
    | 'NO_SHOW'
    | '';

export type DiagnosticCenterStatus =
    | 'VERIFIED'
    | 'REJECTED'
    | 'SUSPENDED'
    | 'PENDING_VERIFICATION'
    | '';

export type DiagnosticCenterResponse = {
    status: 'success' | 'fail';
    message: string;
    total: number;
    metaData: {
        page: number;
        totalPages: number;
        currentPage: number;
        totalInCurrentPage: number;
    };
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
            status: DiagnosticCenterStatus;
            isActive: boolean;
            averageRating: number;
            reviewsCount: number;
            verifiedAt: string;
            createdAt: string;
            updatedAt: string;
            userId: number; // Assuming userId can
            services: Array<{
                id: number;
                serviceName: string;
                serviceType: string; // Assuming serviceType is a string
                description: string; // Optional
                price: string; // Assuming price is a string
                discountPrice: string; // Optional
                timeDuration: string; // Optional
                resultDeliveryTime: string; // Optional
                instructions: string; // Optional
                isAvailable: boolean;
                isActive: boolean;
                createdAt: string;
                updatedAt: string;
                centreId: number; // Assuming centreId is always present
            }>;

            bookings: Array<{
                id: number;
                status: BookingStatus;
                date: string;
                time: string;
                resultImageUrl: string;
                isResultSent: boolean;
                guestFirstName: string;
                guestLastName: string;
                guestPhone: string;
                guestEmail: string;
                guestAgeRange: string; // Assuming age range is a string
                guestGender: string; // Assuming gender is a string
                guestState: string; // Assuming state is a string
                guestLGA: string; // Assuming LGA is a string
                serviceName: string;
                servicePrice: string; // Assuming price is a string
                rescheduleReason: string; // Optional
                cancellationReason: string; // Optional
                additionalFeedback: string; // Optional
                agreedToTerms: boolean;
                createdAt: string;
                updatedAt: string;
                userId: number; // Assuming userId can be null
                serviceId: number; // Assuming serviceId can be null
                centreId: number; // Assuming centreId is always present
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
                serviceTypeUsed: string; // Assuming serviceTypeUsed is a string
                reviewDescription: string; // Optional
                waitingTime: string; // Optional
                staffBehavior: string; // Optional
                facilityCondition: string; // Optional
                suggestions: string; // Optional
                willRecommend: boolean; // Assuming willRecommend is a boolean
                createdAt: string;
                updatedAt: string;
                userId: number; // Assuming userId can be null
                centreId: number; // Assuming centreId can be null
            }>;
        }>;
    };
};

export type DiagnosticCentreActionsResponse = {
    status: string;
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
            operatingHours: {
                to: string;
                day: string;
                from: string;
                open: boolean;
            }[];
            additionalFeatures: string[];
            images: string[];
            logo: string;
            status: string;
            isActive: boolean;
            averageRating: number;
            reviewsCount: number;
            verifiedAt: string;
            createdAt: string;
            updatedAt: string;
            userId: number;
        };
    };
};

export type CreateCenterServicePayload = {
    serviceName: string;
    serviceType: string;
    description: string;
    price: number;
    isAvailable: boolean;
    discountPrice: number;
    timeDuration: string;
    resultDeliveryTime: string;
    instructions: string;
};

export type SingleCenterServiceResponse = {
    status: 'success' | 'fail';
    message: string;
    data: {
        service: {
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
        };
    };
};

export type CreateDiagnosticCenterPayload = {
    name: string;
    email: string;
    phone: string;
    emergencyPhone: string;
    address: string;
    lga: string;
    state: string;
    latitude: number | undefined;
    longitude: number | undefined;
    description: string;
    website: string;
    licenseDocument: string;
    cacDocument: string;
    establishedYear: number | '';
    totalStaff: number | '';
    operatingHours: {
        to: string;
        day: string;
        from: string;
        open: boolean;
    }[];
    additionalFeatures: string[];
    images: string[];
    logo: string;
};

export type LocationPayload = {
    address: string;
};
export type LocationResponse = {
    status: 'success' | 'fail';
    message: string;
    data: {
        location: {
            lat: number;
            lng: number;
        };
    };
};
