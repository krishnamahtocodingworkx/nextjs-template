"use server";

import { cookies } from "next/headers";

const SOMETHING_WENT_WRONG = "OOPS! Something went wrong";
const BASE_URL = process.env.API_BASE_URL || "";

export const status_code = {
    success: 200,
    invalid: 400,
    timeout: 408,
    notFound: 204,
    badRequest: 400,
    userDelete: 410,
    serverError: 500,
    Unauthorized: 401,
    successAction: 201,
} as const;

export type ApiResponse<T = unknown> = {
    data: T;
    status: number;
    message?: string;
};

export type ErrorResponse = {
    message: string;
    status: number;
};

/**
 * Extract error message (same logic as axios version)
 */
export const extractErrorMessage = (
    error: unknown,
    fallback: string
): string => {
    if (error instanceof Error) return error.message;
    if (typeof error === "string") return error;
    return fallback;
};

/**
 * Core Fetch Wrapper
 */
async function fetchWrapper<T>(
    endpoint: string,
    options: RequestInit & { revalidate?: number } = {}
): Promise<ApiResponse<T>> {
    const cookieStore = cookies();
    const accessToken = (await cookieStore).get("accessToken")?.value;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);

    try {
        const res = await fetch(`${BASE_URL}${endpoint}`, {
            ...options,
            signal: controller.signal,
            headers: {
                "Content-Type": "application/json",
                language: "EN",
                platform: "web",
                version: "1.0.0",
                ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
                ...(options.headers || {}),
            },
            next: options.revalidate
                ? { revalidate: options.revalidate }
                : undefined,
        });

        const data = await res.json().catch(() => null);

        if (!res.ok) {
            if (res.status === status_code.Unauthorized) {
                sessionExpireHandler();
            }

            throw {
                message:
                    data?.error?.message ||
                    data?.message ||
                    res.statusText ||
                    SOMETHING_WENT_WRONG,
                status: res.status,
            } as ErrorResponse;
        }

        return {
            data,
            status: res.status,
            message: data?.message,
        };
        /* eslint-disable */
    } catch (error: any) {
        if (error.name === "AbortError") {
            throw {
                message: "Request timeout. Please try again.",
                status: status_code.timeout,
            };
        }

        throw {
            message: extractErrorMessage(error, SOMETHING_WENT_WRONG),
            status: error?.status || 0,
        };
    } finally {
        clearTimeout(timeout);
    }
}

/**
 * API Service (Server)
 */
const ServerApiService = {
    get<T>(endpoint: string, revalidate?: number) {
        return fetchWrapper<T>(endpoint, {
            method: "GET",
            revalidate,
        });
    },

    post<T>(endpoint: string, body: unknown) {
        return fetchWrapper<T>(endpoint, {
            method: "POST",
            body: JSON.stringify(body),
        });
    },

    put<T>(endpoint: string, body: unknown) {
        return fetchWrapper<T>(endpoint, {
            method: "PUT",
            body: JSON.stringify(body),
        });
    },

    patch<T>(endpoint: string, body: unknown) {
        return fetchWrapper<T>(endpoint, {
            method: "PATCH",
            body: JSON.stringify(body),
        });
    },

    delete<T>(endpoint: string) {
        return fetchWrapper<T>(endpoint, {
            method: "DELETE",
        });
    },
};

/**
 * Session Expire (Server-safe)
 */
const sessionExpireHandler = async () => {
    const cookieStore = cookies();
    (await cookieStore).delete("accessToken");
};

export default ServerApiService;
