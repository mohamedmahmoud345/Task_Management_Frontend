import api from './api';
import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, User } from '../types/auth.types';
import { STORAGE_KEYS } from '../utils/constants';

export const authService = {
  // Login user
  login: async (userName: string, password: string): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/api/Account/login', {
      userName,
      password,
    } as LoginRequest);
    return response.data;
  },

  // Register user
  register: async (userName: string, email: string, password: string): Promise<RegisterResponse> => {
    const response = await api.post<RegisterResponse>('/api/Account/register', {
      userName,
      email,
      password,
    } as RegisterRequest);
    return response.data;
  },

  // Get current user from localStorage
  getCurrentUser: (): User | null => {
    const userJson = localStorage.getItem(STORAGE_KEYS.USER);
    if (userJson) {
      try {
        return JSON.parse(userJson) as User;
      } catch {
        return null;
      }
    }
    return null;
  },

  // Get token from localStorage
  getToken: (): string | null => {
    return localStorage.getItem(STORAGE_KEYS.TOKEN);
  },

  // Set token in localStorage
  setToken: (token: string): void => {
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
  },

  // Set user in localStorage
  setUser: (user: User): void => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  },

  // Logout - clear localStorage
  logout: (): void => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem(STORAGE_KEYS.TOKEN);
  },
};
