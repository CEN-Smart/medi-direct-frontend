import { baseUrl } from '@/lib/utils';
import type { FileUploadResponse } from '@/types';
import axios from 'axios';

// /generic/file-upload

async function fileUpload(
    file: File | File[] | null,
): Promise<FileUploadResponse> {
    const formData = new FormData();
    if (Array.isArray(file)) {
        file.forEach((f) => formData.append('files', f as Blob));
    } else {
        formData.append('files', file as Blob);
    }
    return await axios.post(`${baseUrl}/upload-images`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}

export { fileUpload };
