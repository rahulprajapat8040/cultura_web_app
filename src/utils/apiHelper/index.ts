import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import toast from "react-hot-toast";
import Cookies from 'js-cookie'

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

const api = axios.create({
    baseURL: BASE_URL,
})

api.interceptors.request.use((config) => {
    const token = Cookies.get("accessToken")
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, (error) => Promise.reject(error)
)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const message = error?.response?.data?.message || error.message || 'Something went wrong';
        console.log('message is', error)
        toast.error(message);
        return Promise.reject(error);
    }
);

export default api;

export const handleApiError = (error: unknown): string => {
    const err = error as AxiosError<{ message?: string }>;
    return err.response?.data.message || err.message || "Something went wrong"
}

export const apiRequest = async <T = any>(
    method: 'get' | 'post' | 'put' | 'delete',
    url: string,
    data?: any,
    config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
    return await api.request({ method, url, data, ...config });
}