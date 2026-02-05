/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { AuthContextType, User } from '../types/auth.types';
import { authService } from '../services/authService';
import { getErrorMessage } from '../services/api';
import { toast } from 'react-toastify';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Initialize state from localStorage
  const storedToken = authService.getToken();
  const storedUser = authService.getCurrentUser();

  const [user, setUser] = useState<User | null>(storedUser);
  const [token, setToken] = useState<string | null>(storedToken);
  const loading = false; // Loading state is false since we initialize from localStorage

  const login = async (userName: string, password: string): Promise<void> => {
    try {
      const response = await authService.login(userName, password);
      
      const userData: User = {
        userId: response.userId,
        userName: response.userName,
        email: response.email,
      };

      authService.setToken(response.token);
      authService.setUser(userData);
      
      setToken(response.token);
      setUser(userData);
      
      toast.success('Login successful!');
    } catch (error) {
      const message = getErrorMessage(error);
      toast.error(message || 'Login failed. Please check your credentials.');
      throw error;
    }
  };

  const register = async (userName: string, email: string, password: string): Promise<void> => {
    try {
      const response = await authService.register(userName, email, password);
      toast.success(response.message || 'Registration successful! Please login.');
    } catch (error) {
      const message = getErrorMessage(error);
      toast.error(message || 'Registration failed. Please try again.');
      throw error;
    }
  };

  const logout = (): void => {
    authService.logout();
    setToken(null);
    setUser(null);
    toast.info('Logged out successfully');
  };

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!token,
    loading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
