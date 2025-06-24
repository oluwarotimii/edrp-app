import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Types
interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData extends LoginCredentials {
  name: string;
  role?: 'student' | 'teacher' | 'admin' | 'school_admin';
  schoolId?: string;
  [key: string]: any;
}

interface AuthResponse {
  user: any;
  token: string;
}

// Storage keys
const TOKEN_KEY = 'userToken';
const USER_DATA_KEY = 'userData';

const authService = {
  /**
   * Login with email and password
   */
  async login({ email, password }: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { access_token, user } = response.data;
      
      // Store token and user data
      await Promise.all([
        AsyncStorage.setItem(TOKEN_KEY, access_token),
        AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(user))
      ]);
      
      return { user, token: access_token };
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Login failed. Please check your credentials.';
      throw new Error(errorMessage);
    }
  },

  /**
   * Register a new user
   */
  async register(userData: RegisterData): Promise<any> {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      throw new Error(errorMessage);
    }
  },

  /**
   * Logout the current user
   */
  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
    } finally {
      // Always remove local storage even if API call fails
      await Promise.all([
        AsyncStorage.removeItem(TOKEN_KEY),
        AsyncStorage.removeItem(USER_DATA_KEY)
      ]);
    }
  },

  /**
   * Get current authenticated user
   */
  async getCurrentUser(forceRefresh = false): Promise<any> {
    try {
      if (!forceRefresh) {
        const cachedUser = await AsyncStorage.getItem(USER_DATA_KEY);
        if (cachedUser) return JSON.parse(cachedUser);
      }
      
      const response = await api.get('/users/me');
      await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch user data');
    }
  },

  /**
   * Request password reset
   */
  async forgotPassword(email: string): Promise<any> {
    try {
      const response = await api.post('/auth/forgot-password', { email });
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to process password reset request';
      throw new Error(errorMessage);
    }
  },

  /**
   * Reset password with token
   */
  async resetPassword(token: string, newPassword: string): Promise<any> {
    try {
      const response = await api.post('/auth/reset-password', {
        token,
        new_password: newPassword,
      });
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to reset password';
      throw new Error(errorMessage);
    }
  },

  /**
   * Check if user is authenticated
   */
  async isAuthenticated(): Promise<boolean> {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    return !!token;
  },

  /**
   * Get stored auth token
   */
  async getToken(): Promise<string | null> {
    return await AsyncStorage.getItem(TOKEN_KEY);
  }
};

export default authService;
