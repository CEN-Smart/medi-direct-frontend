import { apiClient } from '@/services/api';
import { ErrorResponse } from '@/types';
import {
    AllUsersResponse,
    SingleUserResponse,
    UserDetailsResponse,
} from '@/types/user';
import { UndefinedInitialDataOptions, useQuery } from '@tanstack/react-query';

import { allUsersKeys, userDetailsKeys } from '../keys';

// Fetch user profile details
export const getUserProfile = async (): Promise<UserDetailsResponse> => {
    const response = await apiClient.get({
        url: '/users/me',
        auth: true,
    });
    return response;
};

// Custom hook to fetch user profile details
export const useUserProfile = (
    options?: Omit<
        UndefinedInitialDataOptions<
            UserDetailsResponse,
            ErrorResponse,
            UserDetailsResponse,
            string[]
        >,
        'queryKey' | 'queryFn'
    >,
) => {
    const hash = [userDetailsKeys.read];
    return useQuery({
        queryKey: hash,
        queryFn: getUserProfile,
        ...options,
    });
};

// Fetch all users
export const getAllUsers = async (
    pageSize: number = 10,
    pageNumber: number = 1,
    nameOrEmail: string = '',
): Promise<AllUsersResponse> => {
    const response = await apiClient.get({
        url: `/users?pageSize=${pageSize}&pageNumber=${pageNumber}&nameOrEmail=${nameOrEmail}`,
        auth: true,
    });
    return response;
};

// Custom hook to fetch all users
export const useAllUsers = (
    pageSize: number = 10,
    pageNumber: number = 1,
    nameOrEmail: string = '',
    options?: Omit<
        UndefinedInitialDataOptions<
            AllUsersResponse,
            ErrorResponse,
            AllUsersResponse,
            string[]
        >,
        'queryKey' | 'queryFn'
    >,
) => {
    const hash = [
        allUsersKeys.read,
        pageSize.toString(),
        pageNumber.toString(),
        nameOrEmail,
    ];
    return useQuery({
        queryKey: hash,
        queryFn: () => getAllUsers(pageSize, pageNumber, nameOrEmail),
        ...options,
    });
};

// Fetch single user details by ID
export const getSingleUserDetails = async (
    userId: number,
): Promise<SingleUserResponse> => {
    const response = await apiClient.get({
        url: `/users/${userId}`,
        auth: true,
    });
    return response;
};

// Custom hook to fetch single user details
export const useSingleUserDetails = (
    userId: number,
    options?: Omit<
        UndefinedInitialDataOptions<
            SingleUserResponse,
            ErrorResponse,
            SingleUserResponse,
            string[]
        >,
        'queryKey' | 'queryFn'
    >,
) => {
    const hash = [userDetailsKeys.read, userId.toString()];
    return useQuery({
        queryKey: hash,
        queryFn: () => getSingleUserDetails(userId),
        ...options,
    });
};
