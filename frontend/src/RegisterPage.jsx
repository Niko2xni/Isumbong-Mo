import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import './App.css'; 

import loginLg from './assets/loginlg.png';
import rgImage from './assets/rgimage.png'; 

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    address: '',
    password: '',
    terms: false,
  });
  
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setFieldErrors({});
    
    if (!formData.terms) {
      setError('You must agree to the Terms & Policy');
      return;
    }
    
    setLoading(true);
    
    const result = await register({
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      address: formData.address,
      password: formData.password,
    });
    
    setLoading(false);
    
    if (result.success) {
      // Redirect to dashboard
      navigate('/dashboard');
    } else {
      if (result.errors) {
        setFieldErrors(result.errors);
      }
      setError(result.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="register-page">
      <header className="register-header">
        {/* Logo at the top left */}
        <img src={loginLg} alt="Logo" className="logo" />
      </header>
      
      <main className="register-container">
        <div className="register-form-panel">
          <h2 className="register-title">Get Started Now</h2>
          <p className="register-subtitle">Create your account to get started</p>
          
          <form onSubmit={handleSubmit} className="register-form">
            {error && <div className="error-message" style={{color: 'red', marginBottom: '10px'}}>{error}</div>}
            
            {/* First Name Input Field */}
            <div className="input-group">
              <label htmlFor="first_name" className="input-label">First Name</label>
              <input 
                type="text" 
                id="first_name" 
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="Enter your first name..." 
                required 
                className="input-field" 
              />
              {fieldErrors.first_name && <span className="field-error" style={{color: 'red', fontSize: '12px'}}>{fieldErrors.first_name[0]}</span>}
            </div>

            {/* Last Name Input Field */}
            <div className="input-group">
              <label htmlFor="last_name" className="input-label">Last Name</label>
              <input 
                type="text" 
                id="last_name" 
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Enter your last name..." 
                required 
                className="input-field" 
              />
              {fieldErrors.last_name && <span className="field-error" style={{color: 'red', fontSize: '12px'}}>{fieldErrors.last_name[0]}</span>}
            </div>

            {/* Email Address Input Field */}
            <div className="input-group">
              <label htmlFor="email" className="input-label">Email Address</label>
              <input 
                type="email" 
                id="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@gmail.com" 
                required 
                className="input-field" 
              />
              {fieldErrors.email && <span className="field-error" style={{color: 'red', fontSize: '12px'}}>{fieldErrors.email[0]}</span>}
            </div>

            {/* Address Input Field */}
            <div className="input-group">
              <label htmlFor="address" className="input-label">Address</label>
              <input 
                type="text" 
                id="address" 
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your street address..." 
                required 
                className="input-field" 
              />
              {fieldErrors.address && <span className="field-error" style={{color: 'red', fontSize: '12px'}}>{fieldErrors.address[0]}</span>}
            </div>

            {/* Password Input Field */}
            <div className="input-group">
              <label htmlFor="password" className="input-label">Password</label>
              <input 
                type="password" 
                id="password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="*********" 
                required 
                className="input-field" 
              />
              {fieldErrors.password && <span className="field-error" style={{color: 'red', fontSize: '12px'}}>{fieldErrors.password[0]}</span>}
            </div>

            {/* Terms & Policy Checkbox */}
            <div className="form-options register-terms">
              <label className="terms-checkbox">
                <input 
                  type="checkbox" 
                  name="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                  required 
                />
                I agree the Terms & Policy
              </label>
            </div>
            
            {/* Register Button */}
            <button type="submit" className="register-button" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </button>
            
            {/* Already have account? Login Link */}
            <div className="create-account-link">
              Already have an account? <a href="/login" className="create-account-text">Log In</a>
            </div>
          </form>
        </div>

        <div className="register-visual-panel">
          {/* 3D Register Image and descriptive text */}
          <img src={rgImage} alt="3D Registration Graphic" className="register-graphic" />
          <p className="register-description">
            The process of creating a new user profile by providing details like username, password, and email to access the system's features.
          </p>
        </div>
      </main>
    </div>
  );
};

export default RegisterPage;