import axios from 'axios';
import type { AxiosError, AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { API_BASE_URL, STORAGE_KEYS, ROUTES } from '../utils/constants';

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add token to requests
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      const status = error.response.status;

      // Handle 401 - Unauthorized (token expired or invalid)
      if (status === 401) {
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER);
        window.location.href = ROUTES.LOGIN;
      }

      // Handle 403 - Forbidden
      if (status === 403) {
        console.error('Access forbidden');
      }

      // Handle 500 - Internal Server Error
      if (status === 500) {
        console.error('Internal server error');
      }
    }

    return Promise.reject(error);
  }
);

// Helper function to extract error message
export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{ errors?: string[]; message?: string; }>;
    if (axiosError.response?.data) {
      const data = axiosError.response.data;
      if (data.errors && Array.isArray(data.errors)) {
        return data.errors.join(', ');
      }
      if (data.message) {
        return data.message;
      }
      if (typeof data === 'string') {
        return data;
      }
    }
    return axiosError.message || 'An error occurred';
  }
  return 'An unexpected error occurred';
};

export default api;
