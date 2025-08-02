import { apiClient } from '@/services/api';
import { ErrorResponse } from '@/types';
import {
    CreateBookingsPayload,
    CreateBookingsResponse,
    GuestReviewPayload,
    GuestReviewResponse,
} from '@/types/bookings';
import {
    UseMutationOptions,
    useMutation,
    useQueryClient,
} from '@tanstack/react-query';
import { toast } from 'sonner';

import { allKeysToValidate, bookingsKeys, reviewKeys } from '../keys';

const createBooking = async (
    payload: CreateBookingsPayload,
    id?: number,
): Promise<CreateBookingsResponse> => {
    const response = await apiClient.post({
        url: `/bookings/${id}`,
        body: payload,
        auth: false,
    });
    return response;
};

export const useCreateBooking = (
    id?: number,
    setStep?: (step: number) => void,
    options?: Omit<
        UseMutationOptions<
            CreateBookingsResponse,
            ErrorResponse,
            CreateBookingsPayload,
            unknown
        >,
        'mutationFn' | 'mutationKey'
    >,
) => {
    const queryClient = useQueryClient();
    const hash = [bookingsKeys.create];
    return useMutation({
        mutationFn: (payload) => createBooking(payload, id),
        mutationKey: hash,
        onSuccess: (data) => {
            if (data.status === 'success') {
                allKeysToValidate.forEach((key) => {
                    queryClient.invalidateQueries({ queryKey: [key] });
                });
                if (setStep) {
                    setStep(4);
                }
                toast.success(data.message);
            }
        },
        onError: (error) => {
            toast.error(
                error.response?.data.message || 'Failed to create booking',
            );
        },
        ...options,
    });
};

const createGuestReview = async (
    payload: GuestReviewPayload,
    id?: number,
): Promise<GuestReviewResponse> => {
    const response = await apiClient.post({
        url: `/review/${id}`,
        body: payload,
        auth: false,
    });
    return response;
};

export const useCreateGuestReview = (
    id?: number,
    setIsOpen?: (open: boolean) => void,
    options?: Omit<
        UseMutationOptions<
            GuestReviewResponse,
            ErrorResponse,
            GuestReviewPayload,
            unknown
        >,
        'mutationFn' | 'mutationKey'
    >,
) => {
    const queryClient = useQueryClient();
    const hash = [reviewKeys.create];
    return useMutation({
        mutationFn: (payload) => createGuestReview(payload, id),
        mutationKey: hash,
        onSuccess: (data) => {
            if (data.status === 'success') {
                allKeysToValidate.forEach((key) => {
                    queryClient.invalidateQueries({ queryKey: [key] });
                });
                if (setIsOpen) {
                    setIsOpen(false);
                }
                toast.success(data.message);
            }
        },
        onError: (error) => {
            toast.error(
                error.response?.data.message || 'Failed to create guest review',
            );
        },
        ...options,
    });
};
