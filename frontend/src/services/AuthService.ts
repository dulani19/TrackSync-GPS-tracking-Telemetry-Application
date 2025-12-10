/**
 * AuthService - OOP-based authentication service
 * Handles user registration, login, and authentication logic
 */

import {
  AuthResponse,
  LoginCredentials,
  SignupCredentials,
} from '../types/AuthTypes';
import { ApiClient, apiClient } from './ApiClient';

export class AuthService {
  private apiClient: ApiClient;

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  /**
   * Register a new user
   */
  async register(credentials: SignupCredentials): Promise<AuthResponse> {
    try {
      const response = await this.apiClient.post<AuthResponse>(
        '/auth/register',
        credentials,
      );

      return {
        success: true,
        data: response.data,
        message: 'Registration successful',
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Registration failed',
        errors: error.errors,
      };
    }
  }

  /**
   * Login an existing user
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await this.apiClient.post<AuthResponse>(
        '/auth/login',
        credentials,
      );

      return {
        success: true,
        data: response.data,
        message: 'Login successful',
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Login failed',
        errors: error.errors,
      };
    }
  }

  /**
   * Logout user (placeholder for future implementation)
   */
  async logout(): Promise<void> {
    // TODO: Implement logout logic (clear tokens, etc.)
    console.log('Logout called');
  }

  /**
   * Get current user (placeholder for future implementation)
   */
  async getCurrentUser(): Promise<AuthResponse> {
    try {
      const response = await this.apiClient.get<AuthResponse>('/auth/me');
      return response;
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Failed to get user',
      };
    }
  }
}

// Export singleton instance
export const authService = new AuthService(apiClient);
