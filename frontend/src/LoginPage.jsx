import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import './App.css'; 

import loginLg from './assets/loginlg.png'; 
import loginImage from './assets/loginimage.png';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    const result = await login({
      email: formData.email,
      password: formData.password,
      remember: formData.remember,
    });
    
    setLoading(false);
    
    if (result.success) {
      // Redirect to dashboard
      navigate('/dashboard');
    } else {
      setError(result.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="login-page">
      <header className="login-header">
        {/* Logo at the top left */}
        <img src={loginLg} alt="Logo" className="logo" />
      </header>
      
      <main className="login-container">
        <div className="login-visual-panel">
          {/* 3D Login Image and descriptive text */}
          <img src={loginImage} alt="3D Login Graphic" className="login-graphic" />
          <p className="login-description">
            Logging in allows users to access their personal accounts. It requires entering a registered username and password for verification.
          </p>
        </div>
        
        <div className="login-form-panel">
          <h2 className="login-title">Log In</h2>
          
          <form onSubmit={handleSubmit} className="login-form">
            {error && <div className="error-message" style={{color: 'red', marginBottom: '10px'}}>{error}</div>}
            
            {/* Email Input Field */}
            <div className="input-group">
              <span className="input-icon">✉️</span> {/* Using an emoji/icon placeholder */}
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email" 
                required 
                className="input-field" 
              />
            </div>

            {/* Password Input Field */}
            <div className="input-group">
              <span className="input-icon">🔒</span> {/* Using an emoji/icon placeholder */}
              <input 
                type="password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password" 
                required 
                className="input-field" 
              />
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="form-options">
              <label className="remember-me">
                <input 
                  type="checkbox" 
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                />
                Remember Me
              </label>
            </div>
            
            {/* Log In Button */}
            <button type="submit" className="login-button" disabled={loading}>
              {loading ? 'Logging in...' : 'Log In'}
            </button>
            
            {/* Create an Account Link */}
            <div className="create-account-link">
              Don't have account? <a href="/register" className="create-account-text">Create an Account</a>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;