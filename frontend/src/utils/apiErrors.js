/**
 * API Error Handler Utilities
 * 
 * Common error handling for API calls
 */

/**
 * Error class for API errors
 */
export class APIError extends Error {
  constructor(message, status, data = null) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.data = data;
  }
}

/**
 * Handle API error and return user-friendly message
 * @param {Error} error - Error object
 * @returns {Object} Formatted error object {message, status, type}
 */
export const handleAPIError = (error) => {
  // Network error
  if (!error.response) {
    return {
      message: 'Network error. Please check your connection.',
      status: 0,
      type: 'network',
      originalError: error,
    };
  }

  const { status, data } = error.response;

  // Server error message
  const message = data?.message || data?.error || getDefaultErrorMessage(status);

  return {
    message,
    status,
    type: getErrorType(status),
    data: data || null,
    originalError: error,
  };
};

/**
 * Get error type based on HTTP status code
 * @param {number} status - HTTP status code
 * @returns {string} Error type
 */
export const getErrorType = (status) => {
  if (status === 400) return 'validation';
  if (status === 401) return 'unauthorized';
  if (status === 403) return 'forbidden';
  if (status === 404) return 'not_found';
  if (status === 409) return 'conflict';
  if (status === 422) return 'unprocessable';
  if (status >= 500) return 'server';
  return 'unknown';
};

/**
 * Get default error message based on status code
 * @param {number} status - HTTP status code
 * @returns {string} Error message
 */
export const getDefaultErrorMessage = (status) => {
  const messages = {
    400: 'Bad request. Please check your input.',
    401: 'You are not authorized. Please log in again.',
    403: 'You do not have permission to access this resource.',
    404: 'The requested resource was not found.',
    409: 'Conflict. The resource already exists or has been modified.',
    422: 'Validation error. Please check your input.',
    500: 'Server error. Please try again later.',
    502: 'Bad gateway. Please try again later.',
    503: 'Service unavailable. Please try again later.',
  };

  return messages[status] || 'An error occurred. Please try again.';
};

/**
 * Extract validation errors from API response
 * @param {Error} error - API error
 * @returns {Object} Validation errors by field
 */
export const getValidationErrors = (error) => {
  const { data } = error.response || {};

  if (!data) return {};

  // If errors is an object with field names as keys
  if (data.errors && typeof data.errors === 'object') {
    const errors = {};
    Object.entries(data.errors).forEach(([field, messages]) => {
      errors[field] = Array.isArray(messages) ? messages[0] : messages;
    });
    return errors;
  }

  // If there are individual field errors
  if (data.field && data.message) {
    return {
      [data.field]: data.message,
    };
  }

  return {};
};

/**
 * Check if error is validation error
 * @param {Error} error - API error
 * @returns {boolean} True if validation error
 */
export const isValidationError = (error) => {
  return error.response?.status === 422 || error.response?.status === 400;
};

/**
 * Check if error is authorization error
 * @param {Error} error - API error
 * @returns {boolean} True if authorization error
 */
export const isAuthError = (error) => {
  return error.response?.status === 401;
};

/**
 * Check if error is permission error
 * @param {Error} error - API error
 * @returns {boolean} True if permission error
 */
export const isPermissionError = (error) => {
  return error.response?.status === 403;
};

/**
 * Check if error is not found error
 * @param {Error} error - API error
 * @returns {boolean} True if not found error
 */
export const isNotFoundError = (error) => {
  return error.response?.status === 404;
};

/**
 * Check if error is server error
 * @param {Error} error - API error
 * @returns {boolean} True if server error
 */
export const isServerError = (error) => {
  const status = error.response?.status;
  return status >= 500 && status < 600;
};

/**
 * Check if error is network error
 * @param {Error} error - API error
 * @returns {boolean} True if network error
 */
export const isNetworkError = (error) => {
  return !error.response && error.message;
};

/**
 * Log error to console in development
 * @param {Error} error - Error to log
 * @param {string} context - Context of the error
 */
export const logError = (error, context = '') => {
  if (process.env.NODE_ENV === 'development') {
    console.error(`[${context}]`, error);
  }
};

/**
 * Format error for display
 * @param {Error} error - Error to format
 * @returns {string} Formatted error message
 */
export const formatErrorMessage = (error) => {
  if (typeof error === 'string') {
    return error;
  }

  if (error instanceof APIError) {
    return error.message;
  }

  const handled = handleAPIError(error);
  return handled.message;
};

/**
 * Create error response object
 * @param {string} message - Error message
 * @param {number} status - HTTP status code
 * @param {Object} errors - Field errors
 * @returns {Object} Error response
 */
export const createErrorResponse = (message, status, errors = null) => {
  return {
    success: false,
    message,
    status,
    errors,
  };
};

/**
 * Create success response object
 * @param {*} data - Response data
 * @param {string} message - Success message
 * @returns {Object} Success response
 */
export const createSuccessResponse = (data, message = 'Success') => {
  return {
    success: true,
    message,
    data,
  };
};

/**
 * Transform error for consistent handling
 * @param {Error} error - Original error
 * @returns {Object} Transformed error
 */
export const transformError = (error) => {
  const handled = handleAPIError(error);
  const validationErrors = getValidationErrors(error);

  return {
    message: handled.message,
    status: handled.status,
    type: handled.type,
    errors: validationErrors,
    isValidation: isValidationError(error),
    isAuth: isAuthError(error),
    isServer: isServerError(error),
    isNetwork: isNetworkError(error),
  };
};
