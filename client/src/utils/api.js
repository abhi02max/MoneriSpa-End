import axios from 'axios';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production' 
    ? 'https://monerispaacademy.in/api' 
    : 'http://localhost:5001/api',
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const adminInfo = localStorage.getItem('adminInfo');
    if (adminInfo) {
      try {
        const { token } = JSON.parse(adminInfo);
        config.headers.Authorization = `Bearer ${token}`;
      } catch (error) {
        console.error('Error parsing admin info:', error);
        localStorage.removeItem('adminInfo');
      }
    }
    
    // Add request timestamp for debugging
    config.metadata = { startTime: new Date() };
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor with retry logic
api.interceptors.response.use(
  (response) => {
    // Log successful requests in development
    if (process.env.NODE_ENV === 'development') {
      const duration = new Date() - response.config.metadata.startTime;
      console.log(`✅ ${response.config.method?.toUpperCase()} ${response.config.url} - ${response.status} (${duration}ms)`);
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Log errors
    if (process.env.NODE_ENV === 'development') {
      const duration = new Date() - (originalRequest?.metadata?.startTime || new Date());
      console.error(`❌ ${originalRequest?.method?.toUpperCase()} ${originalRequest?.url} - ${error.response?.status || 'Network Error'} (${duration}ms)`);
    }

    // Handle different error types
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          // Unauthorized - clear auth and redirect
          localStorage.removeItem('adminInfo');
          if (window.location.pathname.includes('/dashboard')) {
            window.location.href = '/admin';
          }
          break;
        case 403:
          // Forbidden
          throw new Error('Access denied. Please check your permissions.');
        case 404:
          // Not found
          throw new Error('Resource not found.');
        case 429:
          // Rate limited
          throw new Error('Too many requests. Please wait a moment and try again.');
        case 500:
          // Server error
          throw new Error('Server error. Please try again later.');
        default:
          throw new Error(data?.message || 'An error occurred. Please try again.');
      }
    } else if (error.request) {
      // Network error
      if (error.code === 'ECONNABORTED') {
        throw new Error('Request timeout. Please check your connection and try again.');
      }
      throw new Error('Network error. Please check your internet connection.');
    } else {
      // Other error
      throw new Error('An unexpected error occurred. Please try again.');
    }
  }
);

// Retry function for failed requests
const retryRequest = async (config, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await api(config);
    } catch (error) {
      if (i === retries - 1) throw error;
      
      // Wait before retry (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
    }
  }
};

// Enhanced API methods with better error handling
export const apiService = {
  // GET request with retry
  get: async (url, config = {}) => {
    try {
      return await retryRequest({ method: 'get', url, ...config });
    } catch (error) {
      throw error;
    }
  },

  // POST request with retry
  post: async (url, data = {}, config = {}) => {
    try {
      return await retryRequest({ method: 'post', url, data, ...config });
    } catch (error) {
      throw error;
    }
  },

  // PUT request with retry
  put: async (url, data = {}, config = {}) => {
    try {
      return await retryRequest({ method: 'put', url, data, ...config });
    } catch (error) {
      throw error;
    }
  },

  // DELETE request with retry
  delete: async (url, config = {}) => {
    try {
      return await retryRequest({ method: 'delete', url, ...config });
    } catch (error) {
      throw error;
    }
  },

  // Upload with progress tracking
  upload: async (url, formData, onProgress = null) => {
    try {
      const config = {
        method: 'post',
        url,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (onProgress) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            onProgress(percentCompleted);
          }
        },
      };
      return await retryRequest(config);
    } catch (error) {
      throw error;
    }
  },

  // Health check
  healthCheck: async () => {
    try {
      return await api.get('/health');
    } catch (error) {
      throw new Error('Server is not responding. Please try again later.');
    }
  }
};

export default api;
