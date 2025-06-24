import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import axiosRetry from 'axios-retry';

// Environment configuration
const ENV = process.env.NODE_ENV || 'development';

const API_URLS = {
  development: 'http://localhost:8000',
  staging: 'https://staging.yourschoolmaster.railway.app',
  production: 'https://production.yourschoolmaster.railway.app'
//   https://edrp-server-production.up.railway.app/
};

const API_BASE_URL = process.env.REACT_APP_API_URL || API_URLS[ENV];
const API_VERSION = 'v1';

// Create axios instance with default config
const api = axios.create({
  baseURL: `${API_BASE_URL}/api/${API_VERSION}`,
  timeout: 15000, // 15 seconds
  headers: {
    'Content-Type': 'application/json',
    'X-Platform': Platform.OS,
    'X-App-Version': '1.0.0',
  },
});

// Configure retry logic
axiosRetry(api, { 
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error) => {
    return error.response?.status === 429 || axiosRetry.isNetworkError(error);
  }
});

// Request interceptor to add auth token and handle common headers
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      
      // Add request ID for tracking
      config.headers['X-Request-ID'] = Math.random().toString(36).substring(2, 15);
      
      // Log request in development
      if (__DEV__) {
        console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`, {
          params: config.params,
          data: config.data,
          headers: config.headers
        });
      }
      
      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  (error) => {
    return Promise.reject(handleApiError(error));
  }
);

// Response interceptor for error handling and logging
api.interceptors.response.use(
  (response) => {
    if (__DEV__) {
      console.log(`[API Response] ${response.config.method?.toUpperCase()} ${response.config.url}`, {
        status: response.status,
        data: response.data,
        headers: response.headers
      });
    }
    return response;
  },
  (error) => {
    const errorResponse = handleApiError(error);
    
    if (error.response) {
      // Handle specific status codes
      switch (error.response.status) {
        case 401:
          // Handle unauthorized access
          AsyncStorage.removeItem('userToken');
          // You might want to redirect to login screen here
          // navigationRef.navigate('Auth');
          break;
        case 403:
          // Handle forbidden
          break;
        case 404:
          // Handle not found
          break;
        case 429:
          // Handle rate limiting
          break;
        case 500:
          // Handle server error
          break;
        default:
          break;
      }
    }
    
    return Promise.reject(errorResponse);
  }
);

// Centralized error handling
const handleApiError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    const { status, data } = error.response;
    
    if (__DEV__) {
      console.error('[API Error]', {
        status,
        message: data?.message || 'An error occurred',
        error: data?.error,
        url: error.config?.url,
        method: error.config?.method,
      });
    }
    
    return {
      status,
      message: data?.message || 'An error occurred',
      error: data?.error || 'Unknown error',
      validationErrors: data?.errors,
      isNetworkError: false,
    };
  } else if (error.request) {
    // The request was made but no response was received
    console.error('[API Error] No response received:', error.request);
    return {
      status: 0,
      message: 'No response from server. Please check your internet connection.',
      isNetworkError: true,
    };
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error('[API Error] Request setup error:', error.message);
    return {
      status: -1,
      message: error.message || 'Error setting up the request',
      isNetworkError: false,
    };
  }
};

// Helper for creating cancel tokens
export const createCancelToken = () => {
  return axios.CancelToken.source();
};

export default api;
