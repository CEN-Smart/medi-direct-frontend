import { apiClient } from '@/services/api';
import { useCreateDiagnosticCenterStore } from '@/stores/diagnostic-center';
import {
    useCancelBookingStore,
    useRescheduleBookingStore,
} from '@/stores/guest-booking';
import { ErrorResponse, GenericResponse } from '@/types';
import {
    CancelBookingPayload,
    RescheduleBookingPayload,
} from '@/types/bookings';
import {
    CreateCenterServicePayload,
    CreateDiagnosticCenterPayload,
    DiagnosticCenterResponse,
    DiagnosticCenterStatus,
    LocationPayload,
    LocationResponse,
    SingleCenterServiceResponse,
} from '@/types/diagnostic-center';
import {
    UndefinedInitialDataOptions,
    UseMutationOptions,
    useMutation,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query';
import { toast } from 'sonner';

import {
    allKeysToValidate,
    bookingsKeys,
    centerServiceKeys,
    diagnosticCenterKeys,
    locationKeys,
} from '../keys';

// Get all diagnostic centers
export const getDiagnosticCenters = async (
    pageNumber: number = 1,
    pageSize: number = 10,
    name: string = '',
    status: DiagnosticCenterStatus = '',
): Promise<DiagnosticCenterResponse> => {
    const response = await apiClient.get({
        url: `/centres?pageNumber=${pageNumber}&pageSize=${pageSize}&name=${name}&status=${status}`,
        auth: true,
    });
    return response;
};

// Custom hook to fetch diagnostic centers
export const useDiagnosticCenters = (
    pageNumber: number = 1,
    pageSize: number = 10,
    name: string = '',
    status: DiagnosticCenterStatus = '',
    options?: Omit<
        UndefinedInitialDataOptions<
            DiagnosticCenterResponse,
            ErrorResponse,
            DiagnosticCenterResponse,
            string[]
        >,
        'queryKey' | 'queryFn'
    >,
) => {
    const hash = [
        diagnosticCenterKeys.read,
        pageNumber.toString(),
        pageSize.toString(),
        name,
        status,
    ];
    return useQuery({
        queryKey: hash,
        queryFn: () => getDiagnosticCenters(pageNumber, pageSize, name, status),
        ...options,
    });
};

// Confirm Bookings /bookings/2

export const confirmBooking = async (
    id?: number,
): Promise<GenericResponse<void>> => {
    const response = await apiClient.patch({
        url: `/bookings/${id}`,
        body: {},
    });
    return response;
};

export const useConfirmBooking = (
    id?: number,
    setIsOpen?: (open: boolean) => void,
    options?: Omit<
        UseMutationOptions<
            GenericResponse<void>,
            ErrorResponse,
            number,
            unknown
        >,
        'mutationFn' | 'mutationKey'
    >,
) => {
    const queryClient = useQueryClient();
    const hash = [bookingsKeys.patch, id];
    return useMutation({
        mutationFn: () => confirmBooking(id ? id : undefined),
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
                error.response?.data.message || 'Failed to confirm booking',
            );
        },
        ...options,
    });
};

// Cancel Bookings /bookings/cancel/2
export const cancelBooking = async (
    id: number,
    payload: CancelBookingPayload,
): Promise<GenericResponse<void>> => {
    const response = await apiClient.patch({
        url: `/bookings/${id}/cancel`,
        body: payload,
    });
    return response;
};

export const useCancelBooking = (
    id: number,
    setIsOpen?: (open: boolean) => void,
    options?: Omit<
        UseMutationOptions<
            GenericResponse<void>,
            ErrorResponse,
            CancelBookingPayload,
            unknown
        >,
        'mutationFn' | 'mutationKey'
    >,
) => {
    const { setIsSuccess } = useCancelBookingStore();
    const queryClient = useQueryClient();
    const hash = [bookingsKeys.patch, id];
    return useMutation({
        mutationFn: (payload: CancelBookingPayload) =>
            cancelBooking(id, payload),
        mutationKey: hash,
        onSuccess: (data) => {
            if (data.status === 'success') {
                allKeysToValidate.forEach((key) => {
                    queryClient.invalidateQueries({ queryKey: [key] });
                });
                if (setIsOpen) {
                    setIsOpen(false);
                }

                setIsSuccess(true);
                toast.success(data.message);
            }
        },
        onError: (error) => {
            toast.error(
                error.response?.data.message || 'Failed to cancel booking',
            );
        },
        ...options,
    });
};

// Reschedule Bookings /bookings/reschedule/2
export const rescheduleBooking = async (
    payload: RescheduleBookingPayload,
    id?: number,
): Promise<GenericResponse<void>> => {
    const response = await apiClient.patch({
        url: `/bookings/${id}/reschedule`,
        body: payload,
    });
    return response;
};

export const useRescheduleBooking = (
    id?: number,
    setIsOpen?: (open: boolean) => void,
    options?: Omit<
        UseMutationOptions<
            GenericResponse<void>,
            ErrorResponse,
            RescheduleBookingPayload,
            unknown
        >,
        'mutationFn' | 'mutationKey'
    >,
) => {
    const { setIsSuccess } = useRescheduleBookingStore();
    const queryClient = useQueryClient();
    const hash = [bookingsKeys.patch, id];
    return useMutation({
        mutationFn: (payload: RescheduleBookingPayload) =>
            rescheduleBooking(payload, id),
        mutationKey: hash,
        onSuccess: (data) => {
            if (data.status === 'success') {
                allKeysToValidate.forEach((key) => {
                    queryClient.invalidateQueries({ queryKey: [key] });
                });

                if (setIsOpen) {
                    setIsOpen(false);
                }
                setIsSuccess(true);
                toast.success(data.message);
            }
        },
        onError: (error) => {
            toast.error(
                error.response?.data.message || 'Failed to reschedule booking',
            );
        },
        ...options,
    });
};

// Create Center Service
export const createCenterService = async (
    centerId: number,
    payload: CreateCenterServicePayload,
): Promise<GenericResponse<void>> => {
    const response = await apiClient.post({
        url: `/service/${centerId}`,
        body: payload,
        auth: true,
    });
    return response;
};

export const useCreateCenterService = (
    centerId: number,
    setIsOpen?: (open: boolean) => void,
    options?: Omit<
        UseMutationOptions<
            GenericResponse<void>,
            ErrorResponse,
            CreateCenterServicePayload,
            unknown
        >,
        'mutationFn' | 'mutationKey'
    >,
) => {
    const queryClient = useQueryClient();
    const hash = [centerServiceKeys.create, centerId];
    return useMutation({
        mutationFn: (payload: CreateCenterServicePayload) =>
            createCenterService(centerId, payload),
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
                error.response?.data.message || 'Failed to create service',
            );
        },
        ...options,
    });
};

// Delete Center Service
export const deleteCenterService = async (
    serviceId: number,
): Promise<GenericResponse<void>> => {
    const response = await apiClient.delete({
        url: `/service/${serviceId}`,
    });
    return response;
};

export const useDeleteCenterService = (
    serviceId: number,
    setIsOpen?: (open: boolean) => void,
    options?: Omit<
        UseMutationOptions<GenericResponse<void>, ErrorResponse, void, unknown>,
        'mutationFn' | 'mutationKey'
    >,
) => {
    const queryClient = useQueryClient();
    const hash = [centerServiceKeys.delete, serviceId];
    return useMutation({
        mutationFn: () => deleteCenterService(serviceId),
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
                error.response?.data.message || 'Failed to delete service',
            );
        },
        ...options,
    });
};

// Update Center Service service/1

export const updateCenterService = async (
    payload: CreateCenterServicePayload,
    serviceId?: number,
): Promise<GenericResponse<void>> => {
    const response = await apiClient.patch({
        url: `/service/${serviceId}`,
        body: payload,
    });
    return response;
};

export const useUpdateCenterService = (
    serviceId?: number,
    setIsOpen?: (open: boolean) => void,
    options?: Omit<
        UseMutationOptions<
            GenericResponse<void>,
            ErrorResponse,
            CreateCenterServicePayload,
            unknown
        >,
        'mutationFn' | 'mutationKey'
    >,
) => {
    const queryClient = useQueryClient();
    const hash = [centerServiceKeys.patch, serviceId];
    return useMutation({
        mutationFn: (payload: CreateCenterServicePayload) =>
            updateCenterService(payload, serviceId),
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
                error.response?.data.message || 'Failed to update service',
            );
        },
        ...options,
    });
};

// Get A Service services/1

export const getService = async (
    centerId: number,
    serviceId?: number,
): Promise<SingleCenterServiceResponse> => {
    const response = await apiClient.get({
        url: `/centers/${centerId}/services/${serviceId}`,
    });
    return response;
};

export const useService = (
    centerId: number,
    serviceId?: number,
    options?: Omit<
        UndefinedInitialDataOptions<
            SingleCenterServiceResponse,
            ErrorResponse,
            SingleCenterServiceResponse,
            string[]
        >,
        'queryKey' | 'queryFn'
    >,
) => {
    const hash = [centerServiceKeys.read, serviceId?.toString()].filter(
        (key) => key !== undefined,
    );
    return useQuery({
        queryKey: hash,
        queryFn: () => getService(centerId, serviceId ? serviceId : undefined),
        ...options,
    });
};

// Get All Locations
export const getLocations = async (
    data: LocationPayload,
): Promise<LocationResponse> => {
    const response = await apiClient.post({
        url: '/geo-coding',
        auth: true,
        body: data,
    });
    return response;
};

// Custom hook to fetch locations to mutate the location data
export const useLocations = (
    setStep?: (step: number) => void,
    options?: Omit<
        UseMutationOptions<
            LocationResponse,
            ErrorResponse,
            LocationPayload,
            unknown
        >,
        'queryKey' | 'queryFn'
    >,
) => {
    const queryClient = useQueryClient();
    const { setCenterData, centerData } = useCreateDiagnosticCenterStore();
    return useMutation({
        mutationFn: getLocations,
        mutationKey: [locationKeys.create],
        onSuccess: (data) => {
            if (data.status === 'success') {
                allKeysToValidate.forEach((key) => {
                    queryClient.invalidateQueries({ queryKey: [key] });
                });
                toast.success(data.message);
                if (setStep) {
                    setStep(3);
                }
                setCenterData({
                    ...centerData,
                    latitude: Number(data.data.location.lat),
                    longitude: Number(data.data.location.lng),
                });
            }
        },
        onError: (error) => {
            toast.error(
                error.response?.data.message || 'Failed to fetch locations',
            );
        },
        ...options,
    });
};

// Create Diagnostic Center /center
export const createDiagnosticCenter = async (
    payload: CreateDiagnosticCenterPayload,
): Promise<GenericResponse<void>> => {
    const response = await apiClient.post({
        url: '/centre',
        body: payload,
        auth: true,
    });
    return response;
};

export const useCreateDiagnosticCenter = (
    setIsOpen?: (open: boolean) => void,
    options?: Omit<
        UseMutationOptions<
            GenericResponse<void>,
            ErrorResponse,
            CreateDiagnosticCenterPayload,
            unknown
        >,
        'mutationFn' | 'mutationKey'
    >,
) => {
    const queryClient = useQueryClient();
    const { clearCenterData } = useCreateDiagnosticCenterStore();
    return useMutation({
        mutationFn: createDiagnosticCenter,
        mutationKey: [diagnosticCenterKeys.create],
        onSuccess: (data) => {
            if (data.status === 'success') {
                allKeysToValidate.forEach((key) => {
                    queryClient.invalidateQueries({ queryKey: [key] });
                });
                clearCenterData();
                toast.success(data.message);
                if (setIsOpen) {
                    setIsOpen(false);
                }
            }
        },
        onError: (error) => {
            toast.error(
                error.response?.data.message ||
                    'Failed to create diagnostic center',
            );
        },
        ...options,
    });
};
