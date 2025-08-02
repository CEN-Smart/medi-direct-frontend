import { baseUrl } from '@/lib/utils';
import type { FileUploadResponse } from '@/types';
import axios from 'axios';

// /generic/file-upload

async function fileUpload(file: File): Promise<FileUploadResponse> {
    const formData = new FormData();
    formData.append('files', file);
    return await axios.post(`${baseUrl}/image-upload`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}

export { fileUpload };
