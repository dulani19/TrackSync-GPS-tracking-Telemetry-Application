/**
 * Authentication-related TypeScript types and interfaces
 */

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  data?: {
    user: User;
    token?: string;
  };
  message?: string;
  errors?: Record<string, string>;
}

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string>;
  statusCode?: number;
}
