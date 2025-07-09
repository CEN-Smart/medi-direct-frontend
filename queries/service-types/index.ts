import { ServiceType } from '@/schemas/service-types';
import { apiClient } from '@/services/api';
import { ErrorResponse } from '@/types';
import {
    AllServiceTypesResponse,
    SingleServiceTypeResponse,
} from '@/types/service-types';
import {
    UndefinedInitialDataOptions,
    UseMutationOptions,
    useMutation,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query';
import { toast } from 'sonner';

import { allKeysToValidate, serviceTypeKeys } from '../keys';

// Fetch all service types
const fetchAllServiceTypes = async (): Promise<AllServiceTypesResponse> => {
    const response = await apiClient.get({
        url: '/service-types',
    });
    return response;
};

export const useAllServiceTypes = (
    options?: Omit<
        UndefinedInitialDataOptions<
            AllServiceTypesResponse,
            ErrorResponse,
            AllServiceTypesResponse,
            string[]
        >,
        'queryKey' | 'queryFn'
    >,
) => {
    const hash = [serviceTypeKeys.read];
    return useQuery({
        queryKey: hash,
        queryFn: fetchAllServiceTypes,
        ...options,
    });
};

// Fetch a single service type by ID
const fetchServiceTypeById = async (
    id: number,
): Promise<SingleServiceTypeResponse> => {
    const response = await apiClient.get({
        url: `/service-types/${id}`,
    });
    return response;
};

export const useServiceTypeById = (
    id: number,
    options?: Omit<
        UndefinedInitialDataOptions<
            SingleServiceTypeResponse,
            ErrorResponse,
            SingleServiceTypeResponse,
            string[]
        >,
        'queryKey' | 'queryFn'
    >,
) => {
    const hash = [serviceTypeKeys.readOne, id.toString()];
    return useQuery({
        queryKey: hash,
        queryFn: () => fetchServiceTypeById(id),
        ...options,
    });
};

// Create a new service type
const createServiceType = async (
    data: ServiceType,
): Promise<SingleServiceTypeResponse> => {
    const response = await apiClient.post({
        url: '/service-types',
        body: data,
        auth: true,
    });
    return response;
};

export const useCreateServiceType = (
    options?: UseMutationOptions<
        SingleServiceTypeResponse,
        ErrorResponse,
        ServiceType,
        unknown
    >,
) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createServiceType,
        onSuccess: (data) => {
            if (data.status === 'success') {
                allKeysToValidate.forEach((key) => {
                    queryClient.invalidateQueries({ queryKey: [key] });
                });
                toast.success(
                    data.message || 'Service type created successfully',
                );
            }
        },
        onError: (error) => {
            toast.error(
                error.response?.data.message || 'Failed to create service type',
            );
        },
        ...options,
    });
};

// Update an existing service type
const updateServiceType = async (
    id: number,
    data: ServiceType,
): Promise<SingleServiceTypeResponse> => {
    const response = await apiClient.patch({
        url: `/service-types/${id}`,
        body: data,
    });
    return response;
};

export const useUpdateServiceType = (
    id: number,
    options?: UseMutationOptions<
        SingleServiceTypeResponse,
        ErrorResponse,
        ServiceType,
        unknown
    >,
) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) => updateServiceType(id, data),
        onSuccess: (data) => {
            if (data.status === 'success') {
                allKeysToValidate.forEach((key) => {
                    queryClient.invalidateQueries({ queryKey: [key] });
                });
                toast.success(
                    data.message || 'Service type updated successfully',
                );
            }
        },
        onError: (error) => {
            toast.error(
                error.response?.data.message || 'Failed to update service type',
            );
        },
        ...options,
    });
};
