import { useCreateDiagnosticCenterStore } from '@/stores/diagnostic-center';
import { useTestResultStore } from '@/stores/guest-booking';
import type { FileUploadResponse } from '@/types';
import {
    UseMutationOptions,
    useMutation,
    useMutationState,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

import { fileUpload } from './actions';
import fileUploadKeys from './file-upload-keys';

export type UseCase =
    | 'Medical License'
    | 'CAC Document'
    | 'Center Logo'
    | 'Center Images'
    | 'Test Result'
    | null;

export function useFileUpload(
    file: File | File[] | null,
    useCase?: UseCase,
    options?: UseMutationOptions<
        FileUploadResponse,
        AxiosError & { response?: { data: { message: string } } },
        File | File[] | null
    >,
) {
    const { setCenterData, centerData } = useCreateDiagnosticCenterStore();
    const { setResultImageUrl } = useTestResultStore();
    const hash = [fileUploadKeys.create];
    const uploadFile = useMutation({
        mutationKey: hash,
        mutationFn: () => fileUpload(file),
        onSuccess(data) {
            if (data.data.status === 'success') {
                toast.success('File uploaded successfully');
                const urls = data.data.data.urls;
                if (useCase) {
                    switch (useCase) {
                        case 'Medical License':
                            setCenterData({
                                ...centerData,
                                licenseDocument: urls[0],
                            });
                            break;
                        case 'CAC Document':
                            setCenterData({
                                ...centerData,
                                cacDocument: urls[0],
                            });
                            break;
                        case 'Center Logo':
                            setCenterData({
                                ...centerData,
                                logo: urls[0],
                            });
                            break;
                        case 'Center Images':
                            setCenterData({
                                ...centerData,
                                images: [...(centerData.images || []), ...urls],
                            });
                            break;
                        case 'Test Result':
                            setResultImageUrl(urls[0]);
                            break;
                        default:
                            break;
                    }
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
