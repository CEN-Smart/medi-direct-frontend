import {
    CancelBookingPayload,
    CreateBookingsPayload,
    RescheduleBookingPayload,
} from '@/types/bookings';
import { create } from 'zustand';

type GuestBooking = {
    bookingData: CreateBookingsPayload;
    setBookingData: (data: CreateBookingsPayload) => void;
    clearBookingData: () => void;
};

export const useGuestBookingStore = create<GuestBooking>((set) => ({
    bookingData: {
        date: '',
        time: '',
        guestFirstName: '',
        guestLastName: '',
        guestAgeRange: '',
        guestGender: '',
        guestState: '',
        guestLGA: '',
        guestPhone: '',
        guestEmail: '',
        serviceName: '',
        servicePrice: 0,
    },
    setBookingData: (data) => set({ bookingData: data }),
    clearBookingData: () =>
        set({
            bookingData: {
                date: '',
                time: '',
                guestFirstName: '',
                guestLastName: '',
                guestAgeRange: '',
                guestGender: '',
                guestState: '',
                guestLGA: '',
                guestPhone: '',
                guestEmail: '',
                serviceName: '',
                servicePrice: 0,
            },
        }),
}));

// Reschedule Booking Store
type RescheduleBooking = {
    rescheduleData: RescheduleBookingPayload;
    setRescheduleData: (data: RescheduleBookingPayload) => void;
    clearRescheduleData: () => void;
    isSuccess: boolean;
    setIsSuccess: (isSuccess: boolean) => void;
};

export const useRescheduleBookingStore = create<RescheduleBooking>((set) => ({
    rescheduleData: {
        date: '',
        time: '',
        rescheduleReason: '',
    },
    setRescheduleData: (data) => set({ rescheduleData: data }),
    setIsSuccess: (isSuccess) => set({ isSuccess }),
    isSuccess: false,
    clearRescheduleData: () =>
        set({ rescheduleData: { date: '', time: '', rescheduleReason: '' } }),
}));

// Cancel Booking Store

type CancelBookingActions = {
    cancelData: CancelBookingPayload;
    isSuccess: boolean;
    setCancelData: (data: CancelBookingPayload) => void;
    clearCancelData: () => void;
    setIsSuccess: (isSuccess: boolean) => void;
};

export const useCancelBookingStore = create<CancelBookingActions>((set) => ({
    cancelData: {
        cancellationReason: '',
        additionalFeedback: '',
        agreedToTerms: false,
    },
    setCancelData: (data) => set({ cancelData: data }),
    setIsSuccess: (isSuccess) => set({ isSuccess }),
    isSuccess: false,
    clearCancelData: () =>
        set({
            cancelData: {
                cancellationReason: '',
                additionalFeedback: '',
                agreedToTerms: false,
            },
        }),
}));

// Test Result
export type TestResult = {
    resultImageUrl: string;
    setResultImageUrl: (url: string) => void;
    clearAll: () => void;
};

export const useTestResultStore = create<TestResult>((set) => ({
    resultImageUrl: '',
    setResultImageUrl: (url) => set({ resultImageUrl: url }),
    clearAll: () => set({ resultImageUrl: '' }),
}));
