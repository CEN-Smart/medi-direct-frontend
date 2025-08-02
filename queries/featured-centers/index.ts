import { apiClient } from '@/services/api';
import type { ErrorResponse } from '@/types';
import {
    CenterOperatingHoursResponse,
    TopRatedCentersResponse,
} from '@/types/guest';
import {
    type UndefinedInitialDataOptions,
    useQuery,
} from '@tanstack/react-query';

import { operatingHoursKeys, topRatedCentersKeys } from '../keys';

const fetchTopRatedCenters = async (
    state: string,
    lga: string,
): Promise<TopRatedCentersResponse> => {
    const response = await apiClient.get({
        url: `/top-rated-centres?state=${state}&lga=${lga}`,
        auth: false,
    });
    return response;
};

export const useTopRatedCenters = (
    state: string,
    lga: string,
    options?: Omit<
        UndefinedInitialDataOptions<
            TopRatedCentersResponse,
            ErrorResponse,
            TopRatedCentersResponse,
            string[]
        >,
        'queryKey' | 'queryFn'
    >,
) => {
    const hash = [topRatedCentersKeys.read, state, lga];
    return useQuery({
        queryKey: hash,
        queryFn: () => fetchTopRatedCenters(state, lga),
        ...options,
    });
};

// operating-hours/1

const fetchOperatingHours = async (
    centerId: number,
): Promise<CenterOperatingHoursResponse> => {
    const response = await apiClient.get({
        url: `/operating-hours/${centerId}`,
        auth: false,
    });
    return response;
};

export const useOperatingHours = (
    centerId?: number,
    options?: Omit<
        UndefinedInitialDataOptions<
            CenterOperatingHoursResponse,
            ErrorResponse,
            CenterOperatingHoursResponse,
            string[]
        >,
        'queryKey' | 'queryFn'
    >,
) => {
    const hash = [operatingHoursKeys.read, centerId?.toString()].filter(
        (key) => key !== undefined,
    );
    return useQuery({
        queryKey: hash,
        queryFn: () => fetchOperatingHours(centerId as number),
        ...options,
    });
};
