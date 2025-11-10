import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  register: async (userData) => {
    const response = await api.post('/register', userData);
    return response.data;
  },
  
  login: async (credentials) => {
    const response = await api.post('/login', credentials);
    return response.data;
  },
  
  logout: async () => {
    const response = await api.post('/logout');
    return response.data;
  },
  
  me: async () => {
    const response = await api.get('/me');
    return response.data;
  },
};

// Complaint API calls
export const complaintAPI = {
  getAll: async () => {
    const response = await api.get('/complaints');
    return response.data;
  },
  
  getById: async (id) => {
    const response = await api.get(`/complaints/${id}`);
    return response.data;
  },
  
  create: async (complaintData) => {
    const response = await api.post('/complaints', complaintData);
    return response.data;
  },
  
  update: async (id, complaintData) => {
    const response = await api.put(`/complaints/${id}`, complaintData);
    return response.data;
  },
  
  delete: async (id) => {
    const response = await api.delete(`/complaints/${id}`);
    return response.data;
  },
};

export default api;
