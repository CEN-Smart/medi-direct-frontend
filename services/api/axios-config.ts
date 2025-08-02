import { clearLocalStorage, getFromLocalStorage } from '@/helpers';
import { appSecret, baseUrl as baseURL, tokenKey } from '@/lib/utils';
import axios, {
    AxiosError,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from 'axios';

// Set default headers
axios.defaults.headers.common['App-Secret'] = appSecret;

// Create an Axios instance with credentials enabled
const axiosInstance = axios.create({
    baseURL,
});

const onRequest = async (
    config: InternalAxiosRequestConfig,
): Promise<InternalAxiosRequestConfig> => {
    const token = getFromLocalStorage(tokenKey);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        delete config.headers.Authorization;
    }
    // Set the content type for POST and PUT requests
    if (
        (config.method === 'post' || config.method === 'put') &&
        !(config.data instanceof FormData)
    ) {
        config.headers['Content-Type'] = 'application/json';
    } else {
        delete config.headers['Content-Type'];
    }

    return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
    return response;
};

const onResponseError = (error: AxiosError) => {
    const statusCode = error.response?.status;

    if (statusCode === 401 || statusCode === 403) {
        clearLocalStorage();
        window.location.href = '/';
    }
    const token = getFromLocalStorage(tokenKey);
    if (!token) {
        clearLocalStorage();
        window.location.href = '/';
    }
    return Promise.reject(error);
};

// Attach interceptors
axiosInstance.interceptors.request.use(onRequest, onRequestError);
axiosInstance.interceptors.response.use(onResponse, onResponseError);

export default axiosInstance;
