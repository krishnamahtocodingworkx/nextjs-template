"use client";

import axios, {
    AxiosInstance,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from "axios";
import SHOW_ERROR_TOAST, { SHOW_INTERNET_TOAST } from "../utils/showToast";
import { store } from "@/store/store";

const SOMETHING_WENT_WRONG = "OOPS! Something went wrong";
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

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

export const extractErrorMessage = (
    error: unknown,
    fallback: string
): string => {
    const responseData = (
        error as {
            response?: {
                data?: {
                    message?: unknown;
                    error?: { message?: unknown };
                };
            };
        }
    )?.response?.data;

    const message =
        (error as ErrorResponse)?.message ??
        (responseData?.error?.message as string | undefined) ??
        (responseData?.message as string | undefined) ??
        (error as Error)?.message ??
        fallback;

    return message?.toString() ?? fallback;
};

const createAxiosInstance = (
    baseURL: string,
    headers: Record<string, string> = {}
): AxiosInstance => {
    const instance = axios.create({
        baseURL,
        timeout: 30000,
        headers,
    });

    // ✅ Attach token from cookies
    instance.interceptors.request.use(
        (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
            const accessToken = store.getState().auth.accessToken;
            if (accessToken) {
                config.headers.set("Authorization", `Bearer ${accessToken}`);
            }
            return config;
        }
    );

    // ✅ Handle responses and errors
    instance.interceptors.response.use(
        <T>(
            response: AxiosResponse<ApiResponse<T>>
        ): AxiosResponse<ApiResponse<T>> => {
            return response;
        },
        (error): Promise<ErrorResponse> => {
            const message =
                error?.response?.data?.error?.message ||
                error?.response?.data?.message ||
                error?.response?.statusText ||
                error?.message ||
                SOMETHING_WENT_WRONG;

            const status: number = error?.response?.status || error?.status || 0;

            if (!error.response) {
                if (error.code === "ECONNABORTED") {
                    SHOW_ERROR_TOAST("Request timeout. Please try again.");
                    return Promise.reject({
                        message: "Request timeout. Please try again.",
                        status: status_code.timeout,
                    });
                }
                SHOW_INTERNET_TOAST();
                return Promise.reject({
                    message: "Network error. Please check your internet connection.",
                    status: 0,
                });
            }

            if (status === 401) sessionExpireHandler();

            return Promise.reject({ message, status });
        }
    );

    return instance;
};

/**
 * Instances
 */
const $http = createAxiosInstance(BASE_URL, {
    "Content-Type": "application/json",
    language: "EN",
    platform: "web",
    version: "1.0.0",
    ipAddress: "",
});

/**
 * API Service
 */
const ApiService = {
    async get<T>(endPoint: string, params?: string) {
        return $http.get<ApiResponse<T>>(endPoint + (params || ""), {});
    },

    async post<T>(endPoint: string, body: unknown) {
        return $http.post<ApiResponse<T>>(endPoint, body);
    },

    async put<T>(endPoint: string, body: unknown) {
        return $http.put<ApiResponse<T>>(endPoint, body);
    },

    async patch<T>(endPoint: string, body: unknown) {
        return $http.patch<ApiResponse<T>>(endPoint, body);
    },

    async delete<T>(endPoint: string) {
        return $http.delete<ApiResponse<T>>(endPoint);
    },
};

// ✅ Clear cookie instead of localStorage
const sessionExpireHandler = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.replace("/");
};

export default ApiService;
