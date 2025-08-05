import { AxiosError } from 'axios';

export type ErrorResponse = AxiosError & {
    response: {
        data: {
            message: string;
        };
    };
};

export type FileUploadResponse = {
    data: {
        status: 'success' | 'fail';
        message: string;
        data: {
            urls: string[]; // Array of URLs for the uploaded files
        };
    };
};

export type GenericResponse<T> = {
    status: 'success' | 'fail';
    message: string;
    data: T;
};

export type ErrorResponseMessage = {
    status: string;
    message: string;
}[];
