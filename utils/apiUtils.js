/**
 * API Response Handler
 * A utility to handle API responses consistently across the application
 */

export const handleResponse = (response) => {
  if (!response) {
    throw new Error('No response received from server');
  }

  // Handle successful response (status code 2xx)
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }

  // Handle error responses
  const error = new Error(response.data?.message || 'An error occurred');
  error.status = response.status;
  error.data = response.data;
  throw error;
};

/**
 * Format validation errors from the API
 * @param {Object} errors - Validation errors from the API
 * @returns {Array} Array of formatted error messages
 */
export const formatValidationErrors = (errors) => {
  if (!errors) return [];
  
  if (Array.isArray(errors)) {
    return errors;
  }
  
  if (typeof errors === 'object') {
    return Object.entries(errors).map(([field, messages]) => ({
      field,
      message: Array.isArray(messages) ? messages[0] : messages,
    }));
  }
  
  return [{ message: String(errors) }];
};

/**
 * Create query string from object
 * @param {Object} params - Query parameters
 * @returns {string} Formatted query string
 */
export const createQueryString = (params = {}) => {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (Array.isArray(value)) {
        value.forEach(item => searchParams.append(`${key}[]`, item));
      } else if (typeof value === 'object') {
        searchParams.append(key, JSON.stringify(value));
      } else {
        searchParams.append(key, value);
      }
    }
  });
  
  return searchParams.toString();
};

/**
 * Handle API errors consistently
 * @param {Error} error - The error object
 * @param {Object} options - Additional options
 * @param {boolean} options.showError - Whether to show error to user
 * @param {Function} options.onError - Custom error handler
 */
export const handleApiError = (error, options = {}) => {
  const { showError = true, onError } = options;
  
  // Log the error in development
  if (__DEV__) {
    console.error('API Error:', {
      message: error.message,
      status: error.status,
      data: error.data,
      stack: error.stack,
    });
  }
  
  // Call custom error handler if provided
  if (typeof onError === 'function') {
    return onError(error);
  }
  
  // Default error handling
  if (showError) {
    // You can integrate with your notification system here
    // e.g., showToast(error.message, 'error');
  }
  
  // Re-throw the error for further handling if needed
  throw error;
};

/**
 * Create a debounced function
 * @param {Function} func - The function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait = 300) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Create a throttled function
 * @param {Function} func - The function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
export const throttle = (func, limit = 1000) => {
  let inThrottle = false;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Convert FormData to plain object
 * @param {FormData} formData - The FormData to convert
 * @returns {Object} Plain JavaScript object
 */
export const formDataToObject = (formData) => {
  const object = {};
  formData.forEach((value, key) => {
    // Check if the property already exists
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      // If it's an array, push the new value
      if (Array.isArray(object[key])) {
        object[key].push(value);
      } else {
        // Convert to array with existing and new value
        object[key] = [object[key], value];
      }
    } else {
      // Add the property
      object[key] = value;
    }
  });
  return object;
};
