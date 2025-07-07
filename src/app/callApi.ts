// utils/api.ts

import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import toast from "react-hot-toast";

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
export const Base_Url = `${process.env.NEXT_PUBLIC_BASE_URL}`

interface ApiCallOptions {
    method?: HttpMethod;
    data?: any;
    headers?: Record<string, string>;
    credentials?: RequestCredentials;
    next?: {
        revalidate?: number;
        tags?: string[];
    };

}

export const apiCall = async <T = any>(
    url: string,
    {
        method = 'GET',
        data,
        headers = {},
        credentials,
        next
    }: ApiCallOptions = {}
): Promise<T> => {
    const options: RequestInit = {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
        credentials,
        next
    };

    if (data && method !== 'GET') {
        options.body = JSON.stringify(data);
    }

    try {
        const token = (await cookies()).get('accessToken')?.value;
        const res = await fetch(`${Base_Url}${url}`, {
            ...options, headers: {
                ...options.headers,
                Authorization: `Bearer ${token}`,
            }
        });
        const result = await res.json();
        if (!res.ok) {
            throw new Error(result.message || 'API call failed');
        }
        return result.data as T;
    } catch (error: any) {
        console.error(`API Error: ${method} ${url}`, error.message);
        throw error;
    }
};
