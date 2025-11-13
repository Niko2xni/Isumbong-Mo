import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import './App.css';

import loginLg from './assets/loginlg.png';
import loginImage from './assets/loginimage.png';

const AdminLoginPage = () => {
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

    if (result.success && result.user.role === 'admin') {
      navigate('/admin/dashboard');
    } else if (result.success) {
      setError('You are not authorized to access this page.');
    } else {
      setError(result.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="login-page">
      <header className="login-header">
        <img src={loginLg} alt="Logo" className="logo" />
      </header>

      <main className="login-container">
        <div className="login-visual-panel">
          <img src={loginImage} alt="3D Login Graphic" className="login-graphic" />
          <p className="login-description">
            Admin login for authorized personnel only.
          </p>
        </div>

        <div className="login-form-panel">
          <h2 className="login-title">Admin Log In</h2>

          <form onSubmit={handleSubmit} className="login-form">
            {error && <div className="error-message" style={{color: 'red', marginBottom: '10px'}}>{error}</div>}

            <div className="input-group">
              <span className="input-icon">✉️</span>
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

            <div className="input-group">
              <span className="input-icon">🔒</span>
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

            <button type="submit" className="login-button" disabled={loading}>
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AdminLoginPage;
