import { apiClient } from '@/services/api';
import { ErrorResponse } from '@/types';
import { DiagnosticCentreActionsResponse } from '@/types/diagnostic-center';
import {
    UseMutationOptions,
    useMutation,
    useQueryClient,
} from '@tanstack/react-query';
import { toast } from 'sonner';

import { allKeysToValidate } from '../keys';

// Approve Diagnostic Center by ID
export const approveDiagnosticCenter = async (
    id: number,
): Promise<DiagnosticCentreActionsResponse> => {
    const response = await apiClient.patch({
        url: `centre/${id}`,
        body: {},
    });
    return response;
};

// Custom hook to approve a diagnostic center
export const useApproveDiagnosticCenter = (
    options?: Omit<
        UseMutationOptions<
            DiagnosticCentreActionsResponse,
            ErrorResponse,
            number,
            unknown
        >,
        'mutationKey' | 'mutationFn'
    >,
) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: approveDiagnosticCenter,
        onSuccess: (data) => {
            if (data.status === 'success') {
                toast.success('Diagnostic center approved successfully');
                allKeysToValidate.map((key) =>
                    queryClient.invalidateQueries({ queryKey: [key] }),
                );
            } else {
                toast.error(
                    data.message || 'Failed to approve diagnostic center',
                );
            }
        },
        onError: (error: ErrorResponse) => {
            toast.error(
                error.response?.data.message ||
                    'An error occurred while approving the diagnostic center',
            );
        },
        ...options,
    });
};

// /centre/8/suspend

export const suspendDiagnosticCenter = async (
    id: number,
): Promise<DiagnosticCentreActionsResponse> => {
    const response = await apiClient.patch({
        url: `centre/${id}/suspend`,
        body: {},
    });
    return response;
};

// Custom hook to suspend a diagnostic center
export const useSuspendDiagnosticCenter = (
    options?: Omit<
        UseMutationOptions<
            DiagnosticCentreActionsResponse,
            ErrorResponse,
            number,
            unknown
        >,
        'mutationKey' | 'mutationFn'
    >,
) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: suspendDiagnosticCenter,
        onSuccess: (data) => {
            if (data.status === 'success') {
                toast.success('Diagnostic center suspended successfully');
                allKeysToValidate.map((key) =>
                    queryClient.invalidateQueries({ queryKey: [key] }),
                );
            } else {
                toast.error(
                    data.message || 'Failed to suspend diagnostic center',
                );
            }
        },
        onError: (error: ErrorResponse) => {
            toast.error(
                error.response?.data.message ||
                    'An error occurred while suspending the diagnostic center',
            );
        },
        ...options,
    });
};
// /centre/6/reject
export const rejectDiagnosticCenter = async (
    id: number,
): Promise<DiagnosticCentreActionsResponse> => {
    const response = await apiClient.patch({
        url: `centre/${id}/reject`,
        body: {},
    });
    return response;
};

// Custom hook to reject a diagnostic center
export const useRejectDiagnosticCenter = (
    options?: Omit<
        UseMutationOptions<
            DiagnosticCentreActionsResponse,
            ErrorResponse,
            number,
            unknown
        >,
        'mutationKey' | 'mutationFn'
    >,
) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: rejectDiagnosticCenter,
        onSuccess: (data) => {
            if (data.status === 'success') {
                toast.success('Diagnostic center rejected successfully');
                allKeysToValidate.map((key) =>
                    queryClient.invalidateQueries({ queryKey: [key] }),
                );
            } else {
                toast.error(
                    data.message || 'Failed to reject diagnostic center',
                );
            }
        },
        onError: (error: ErrorResponse) => {
            toast.error(
                error.response?.data.message ||
                    'An error occurred while rejecting the diagnostic center',
            );
        },
        ...options,
    });
};
