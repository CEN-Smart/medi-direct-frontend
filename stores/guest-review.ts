import { create } from 'zustand';

export type GuestReviewState = {
    reviewData: {
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
};
type GuestReviewActions = {
    setReviewData: (data: GuestReviewState['reviewData']) => void;
    clearReviewData: () => void;
};

export const useGuestReviewStore = create<
    GuestReviewState & GuestReviewActions
>((set) => ({
    reviewData: {
        isAnonymous: false,
        guestName: '',
        guestEmail: '',
        guestPhone: '',
        guestVisitDate: '',
        allowToContact: false,
        rating: 0,
        staffRating: 0,
        cleanlinessRating: 0,
        equipmentRating: 0,
        waitingTimeRating: 0,
        resultDeliveryRating: 0,
        valueForMoneyRating: 0,
        reviewTitle: '',
        serviceTypeUsed: '',
        reviewDescription: '',
        waitingTime: '',
        staffBehavior: '',
        facilityCondition: '',
        suggestions: '',
        willRecommend: false,
    },
    setReviewData: (data) => set({ reviewData: data }),
    clearReviewData: () =>
        set({
            reviewData: {
                isAnonymous: false,
                guestName: '',
                guestEmail: '',
                guestPhone: '',
                guestVisitDate: '',
                allowToContact: false,
                rating: 0,
                staffRating: 0,
                cleanlinessRating: 0,
                equipmentRating: 0,
                waitingTimeRating: 0,
                resultDeliveryRating: 0,
                valueForMoneyRating: 0,
                reviewTitle: '',
                serviceTypeUsed: '',
                reviewDescription: '',
                waitingTime: '',
                staffBehavior: '',
                facilityCondition: '',
                suggestions: '',
                willRecommend: false,
            },
        }),
}));
