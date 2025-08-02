import { useRouter } from 'next/navigation';

import { clearLocalStorage, setToLocalStorage } from '@/helpers';
import { tokenKey } from '@/lib/utils';
import { LoginData, SignUp, UpdatePassword } from '@/schemas/auth';
import { PersonalInfo } from '@/schemas/batch-update';
import { apiClient } from '@/services/api';
import { useUserValidation } from '@/state-management/validate-user';
import { ErrorResponse, ErrorResponseMessage, GenericResponse } from '@/types';
import { SignInResponse, SignUpResponse } from '@/types/onboarding';
import {
    UseMutationOptions,
    useMutation,
    useQueryClient,
} from '@tanstack/react-query';
import { toast } from 'sonner';

import { allKeysToValidate } from '../keys';

// Sign up a new user
const signUpUser = async (data: SignUp): Promise<SignUpResponse> => {
    const response = await apiClient.post({
        url: '/sign-up',
        body: data,
        auth: false,
    });
    return response;
};

export const useSignUpUser = (
    ref: React.RefObject<HTMLFormElement | null>,
    options?: UseMutationOptions<
        SignUpResponse,
        ErrorResponse,
        SignUp,
        unknown
    >,
) => {
    const router = useRouter();
    const { resetAll } = useUserValidation();
    return useMutation({
        mutationFn: signUpUser,
        onSuccess: (data) => {
            if (data.status === 'success') {
                toast.success(
                    typeof data.message === 'string'
                        ? data.message
                        : 'Sign up successful',
                );
                if (ref.current) {
                    ref.current.reset();
                }
                resetAll();
                router.push('/auth/login');
            } else if (data.status === 'fail') {
                toast.error(
                    typeof data.message !== 'string'
                        ? data.message.map((msg) => msg.message)
                        : data.message,
                );
                if (ref.current) {
                    ref.current.reset();
                }
            }
        },
        onError: (error) => {
            toast.error(error.response?.data.message || 'Failed to sign up');
        },
        ...options,
    });
};

// Login a user
const loginUser = async (data: LoginData): Promise<SignInResponse> => {
    const response = await apiClient.post({
        url: '/sign-in',
        body: data,
        auth: false,
    });
    return response;
};
export const useLoginUser = (
    ref: React.RefObject<HTMLFormElement | null>,
    options?: UseMutationOptions<
        SignInResponse,
        ErrorResponse,
        LoginData,
        unknown
    >,
) => {
    const router = useRouter();

    return useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            if (data.status === 'success') {
                toast.success(
                    typeof data.message === 'string'
                        ? data.message
                        : 'Login successful',
                );
                // Store user token in local storage
                setToLocalStorage(tokenKey, data.token);
                // Reset form if ref is provided
                if (ref.current) {
                    ref.current.reset();
                }
                router.push('/dashboard');
                // Redirect to user dashboard
            } else if (data.status === 'fail') {
                toast.error(
                    typeof data.message !== 'string'
                        ? data.message.map((msg) => msg.message)
                        : data.message,
                );
                // Reset form if ref is provided
                if (ref.current) {
                    ref.current.reset();
                }
            }
        },
        onError: (error) => {
            toast.error(error.response?.data.message || 'Failed to log in');
        },
        ...options,
    });
};

// update-password
const updateUserPassword = async (
    data: Omit<UpdatePassword, 'confirmPassword'>,
): Promise<GenericResponse<ErrorResponseMessage>> => {
    const response = await apiClient.patch({
        url: '/update-password',
        body: data,
    });
    return response;
};

export const useUpdateUserPassword = (
    ref: React.RefObject<HTMLFormElement | null>,
    setIsOpen?: (isOpen: boolean) => void,
    options?: Omit<
        UseMutationOptions<
            GenericResponse<ErrorResponseMessage>,
            ErrorResponse,
            Omit<UpdatePassword, 'confirmPassword'>,
            unknown
        >,
        'mutationKey' | 'mutationFn'
    >,
) => {
    return useMutation({
        mutationFn: updateUserPassword,
        onSuccess: (data) => {
            if (data.status === 'success') {
                toast.success(
                    typeof data.message === 'string'
                        ? data.message
                        : 'Password updated successfully',
                );
                // Reset form if ref is provided
                if (ref.current) {
                    ref.current.reset();
                }
                // Close modal if setIsOpen is provided
                if (setIsOpen) {
                    setIsOpen(false);
                }
            }
        },
        onError: (error) => {
            toast.error(
                error.response?.data.message || 'Failed to update password',
            );
        },
        ...options,
    });
};

// batch-update
const batchUpdateUser = async (
    data: PersonalInfo,
): Promise<GenericResponse<ErrorResponseMessage>> => {
    const response = await apiClient.patch({
        url: '/batch-update',
        body: data,
    });
    return response;
};

export const useBatchUpdateUser = (
    ref: React.RefObject<HTMLFormElement | null>,
    options?: Omit<
        UseMutationOptions<
            GenericResponse<ErrorResponseMessage>,
            ErrorResponse,
            PersonalInfo,
            unknown
        >,
        'mutationKey' | 'mutationFn'
    >,
) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: batchUpdateUser,
        onSuccess: (data) => {
            if (data.status === 'success') {
                toast.success(
                    typeof data.message === 'string'
                        ? data.message
                        : 'User information updated successfully',
                );

                allKeysToValidate.forEach((key) => {
                    queryClient.invalidateQueries({ queryKey: [key] });
                });
                // Reset form if ref is provided
                if (ref.current) {
                    ref.current.reset();
                }
            }
        },
        onError: (error) => {
            toast.error(
                error.response?.data.message ||
                    'Failed to update user information',
            );
        },
        ...options,
    });
};

// Logout a user
export const useLogoutUser = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    return () => {
        // Clear all queries and reset the query client
        allKeysToValidate.forEach((key) => {
            queryClient.invalidateQueries({ queryKey: [key] });
        });
        queryClient.clear();
        // Clear local storage
        clearLocalStorage();
        // Redirect to home page
        router.push('/');
    };
};
