import { useLocalStorage } from '@/hooks/use-local-storage';
import { fileUploadKey } from '@/lib/utils';
import { allKeysToValidate } from '@/queries/keys';
import type { FileUploadResponse } from '@/types';
import {
    UseMutationOptions,
    useMutation,
    useMutationState,
    useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

import { fileUpload } from './actions';
import fileUploadKeys from './file-upload-keys';

export function useFileUpload(
    file: File,
    setFileUpload?: (isFileUpload: boolean) => void,
    isRefresh?: boolean,
    options?: UseMutationOptions<
        FileUploadResponse,
        AxiosError & { response?: { data: { message: string } } },
        File,
        unknown
    >,
) {
    const { setValue } = useLocalStorage<string[]>(fileUploadKey);
    const hash = [fileUploadKeys.create];
    const queryClient = useQueryClient();
    const uploadFile = useMutation({
        mutationKey: hash,
        mutationFn: () => fileUpload(file),
        onSuccess(data) {
            if (data.data.status === 'success') {
                toast.success('File uploaded successfully');
                setValue(data.data.data.urls);
                if (setFileUpload) {
                    setFileUpload(true);
                }
                if (isRefresh) {
                    window.location.reload();
                    allKeysToValidate.forEach((key) => {
                        queryClient.invalidateQueries({ queryKey: [key] });
                    });
                }
            } else if (data.data.status === 'fail') {
                toast.error(data.data.status || 'File upload failed');
            }
        },
        onError(error) {
            toast.error(
                `File upload failed: ${
                    error.response?.data.message || 'An error occurred'
                }`,
            );
        },
        ...options,
    });

    return uploadFile;
}

export function useFileUploadState() {
    const data = useMutationState<FileUploadResponse>({
        filters: {
            mutationKey: [fileUploadKeys.create],
            status: 'success',
        },
        select: (mutation) => mutation.state.data as FileUploadResponse,
    });

    return data;
}
