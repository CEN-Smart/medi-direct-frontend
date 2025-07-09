import { apiClient } from '@/services/api';
import { ErrorResponse } from '@/types';
import { AllStatesAndLgaResponse } from '@/types/generic';
import { UndefinedInitialDataOptions, useQuery } from '@tanstack/react-query';

import { allStatesAndLgaKeys } from '../keys';

// Fetch all states and LGAs
const fetchAllStates = async (): Promise<AllStatesAndLgaResponse> => {
    const response = await apiClient.get({
        url: '/states',
    });
    return response;
};

export const useAllStates = (
    options?: Omit<
        UndefinedInitialDataOptions<
            AllStatesAndLgaResponse,
            ErrorResponse,
            AllStatesAndLgaResponse,
            string[]
        >,
        'queryKey' | 'queryFn'
    >,
) => {
    const hash = [allStatesAndLgaKeys.read];
    return useQuery({
        queryKey: hash,
        queryFn: fetchAllStates,
        ...options,
    });
};

// Fetch LGAs by state
const fetchLgaByState = async (
    state: string,
): Promise<AllStatesAndLgaResponse> => {
    const response = await apiClient.get({
        url: `/states/${state}/lgas`,
    });
    return response;
};

export const useLgaByState = (
    state: string,
    options?: Omit<
        UndefinedInitialDataOptions<
            AllStatesAndLgaResponse,
            ErrorResponse,
            AllStatesAndLgaResponse,
            string[]
        >,
        'queryKey' | 'queryFn'
    >,
) => {
    const hash = [allStatesAndLgaKeys.readOne, state];
    return useQuery({
        queryKey: hash,
        queryFn: () => fetchLgaByState(state),
        enabled: !!state,
        ...options,
    });
};
