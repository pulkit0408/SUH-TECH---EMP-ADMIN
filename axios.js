// src/utils/axios.js
import axios from 'axios';

// Create an Axios instance
const authAPI = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

// Request interceptor
authAPI.interceptors.request.use(
  (config) => {
    // Fix: Use consistent token key (your Login component uses 'authToken')
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
authAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('Unauthorized, redirect to login');
      // Clear invalid token
      localStorage.removeItem('authToken');
      // Redirect to login page
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);


export default authAPI;
