import React, { createContext, useState, useContext, useEffect } from 'react';
import api, { authAPI } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
      const savedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
      
      if (token && savedUser) {
        try {
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          setUser(JSON.parse(savedUser));
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Error parsing saved user:', error);
          localStorage.removeItem('auth_token');
          localStorage.removeItem('user');
          sessionStorage.removeItem('auth_token');
          sessionStorage.removeItem('user');
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const data = await authAPI.login(credentials);
      if (data.success) {
        if (credentials.remember) {
          localStorage.setItem('auth_token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
        } else {
          sessionStorage.setItem('auth_token', data.token);
          sessionStorage.setItem('user', JSON.stringify(data.user));
        }
        api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
        setUser(data.user);
        setIsAuthenticated(true);
        return { success: true, user: data.user };
      }
      return { success: false, message: data.message };
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      return { success: false, message };
    }
  };

  const register = async (userData) => {
    try {
      const data = await authAPI.register(userData);
      if (data.success) {
        localStorage.setItem('auth_token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
        setUser(data.user);
        setIsAuthenticated(true);
        return { success: true, user: data.user };
      }
      return { success: false, message: data.message };
    } catch (error) {
      const errors = error.response?.data?.errors;
      const message = error.response?.data?.message || 'Registration failed';
      return { success: false, message, errors };
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout failed', error);
    } finally {
      // Clear token from storage
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      sessionStorage.removeItem('auth_token');
      sessionStorage.removeItem('user');

      // Clear the authorization header from the axios instance
      delete api.defaults.headers.common['Authorization'];

      // Reset state
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
