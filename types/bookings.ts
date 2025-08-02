export type CreateBookingsPayload = {
    date: string;
    time: string;
    guestFirstName: string;
    guestLastName: string;
    guestAgeRange: string;
    guestGender: string;
    guestState: string;
    guestLGA: string;
    guestPhone: string;
    guestEmail: string;
    serviceName: string;
    servicePrice: number;
};

export type CreateBookingsResponse = {
    status: 'success' | 'fail';
    message: string;
    data: {
        booking: {
            id: number;
            status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
            date: string;
            time: string;
            guestFirstName: string;
            guestLastName: string;
            guestPhone: string;
            guestEmail: string;
            guestAgeRange: string;
            guestGender: string;
            guestState: string;
            guestLGA: string;
            serviceName: string;
            servicePrice: number;
            rescheduleReason: string;
            cancellationReason: string;
            additionalFeedback: string;
            agreedToTerms: boolean;
            createdAt: string;
            updatedAt: string;
            userId: number;
            serviceId: number;
            centreId: number;
        };
    };
};

export type GuestReviewPayload = {
    isAnonymous: boolean;
    guestName: string;
    guestEmail: string;
    guestPhone: string;
    guestVisitDate: string; // Format: YYYY-MM-DD
    allowToContact: boolean;
    rating: number; // Rating out of 5
    staffRating: number;
    cleanlinessRating: number;
    equipmentRating: number;
    waitingTimeRating: number;
    resultDeliveryRating: number;
    valueForMoneyRating: number;
    reviewTitle: string;
    serviceTypeUsed: string; // e.g., "Blood Test", "X-Ray", etc.
    reviewDescription: string;
    waitingTime: string; // e.g., "30 minutes", "1 hour"
    staffBehavior: string; // Feedback on staff behavior
    facilityCondition: string; // Feedback on facility condition
    suggestions: string; // Suggestions for improvement
    willRecommend: boolean;
};

export type GuestReviewResponse = {
    status: 'success' | 'fail';
    message: string;
    data: {
        review: {
            id: number;
            isAnonymous: boolean;
            guestName: string;
            guestEmail: string;
            guestPhone: string;
            guestVisitDate: string; // Format: YYYY-MM-DD
            allowToContact: boolean;
            rating: number; // Rating out of 5
            staffRating: number;
            cleanlinessRating: number;
            equipmentRating: number;
            waitingTimeRating: number;
            resultDeliveryRating: number;
            valueForMoneyRating: number;
            reviewTitle: string;
            serviceTypeUsed: string; // e.g., "Blood Test", "X-Ray", etc.
            reviewDescription: string;
            waitingTime: string; // e.g., "30 minutes", "1 hour"
            staffBehavior: string; // Feedback on staff behavior
            facilityCondition: string; // Feedback on facility condition
            suggestions: string; // Suggestions for improvement
            willRecommend: boolean;
            createdAt: string;
        };
    };
};

export type RescheduleBookingPayload = {
    date: string;
    time: string;
    rescheduleReason: string;
};

export type CancelBookingPayload = {
    cancellationReason: string;
    additionalFeedback?: string;
    agreedToTerms: boolean;
};
