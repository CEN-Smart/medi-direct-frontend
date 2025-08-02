import { apiClient } from '@/services/api';
import type { ErrorResponse } from '@/types';
import {
    SearchedCentersResponse,
    SingleSearchedCenterResponse,
} from '@/types/guest';
import {
    type UndefinedInitialDataOptions,
    useQuery,
} from '@tanstack/react-query';

import { searchCentresKeys } from '../keys';

const fetchSearchedCenters = async (
    pageNumber: number = 1,
    pageSize: number = 10,
    serviceType: string = '',
    state: string = '',
    lga: string = '',
    rating: number | string = '',
): Promise<SearchedCentersResponse> => {
    const response = await apiClient.get({
        url: `/guest/centres?pageNumber=${pageNumber}&pageSize=${pageSize}&serviceType=${serviceType}&state=${state}&lga=${lga}&rating=${rating}`,
        auth: false,
    });

    return response;
};

export const useSearchedCenters = (
    pageNumber: number = 1,
    pageSize: number = 10,
    serviceType: string = '',
    state: string = '',
    lga: string = '',
    rating: number | string = '',
    options?: Omit<
        UndefinedInitialDataOptions<
            SearchedCentersResponse,
            ErrorResponse,
            SearchedCentersResponse,
            string[]
        >,
        'queryKey' | 'queryFn'
    >,
) => {
    const hash = [
        searchCentresKeys.read,
        pageNumber.toString(),
        pageSize.toString(),
        serviceType,
        state,
        lga,
        rating.toString(),
    ];
    return useQuery({
        queryKey: hash,
        queryFn: () =>
            fetchSearchedCenters(
                pageNumber,
                pageSize,
                serviceType,
                state,
                lga,
                rating,
            ),
        ...options,
    });
};

const fetchSingleSearchedCenter = async (
    id: number,
): Promise<SingleSearchedCenterResponse> => {
    const response = await apiClient.get({
        url: `/guest/centres/${id}`,
        auth: false,
    });

    return response;
};

export const useSingleSearchedCenter = (
    id: number,
    options?: Omit<
        UndefinedInitialDataOptions<
            SingleSearchedCenterResponse,
            ErrorResponse,
            SingleSearchedCenterResponse,
            string[]
        >,
        'queryKey' | 'queryFn'
    >,
) => {
    const hash = [searchCentresKeys.readOne, id.toString()];
    return useQuery({
        queryKey: hash,
        queryFn: () => fetchSingleSearchedCenter(id),
        ...options,
    });
};
