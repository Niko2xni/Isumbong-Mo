import React from 'react';
import './App.css'; 

import loginLg from './assets/loginlg.png'; 
import loginImage from './assets/loginimage.png';

const LoginPage = () => {
  // A simple function to handle form submission (you'll replace this with actual logic)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt...');
    // Add your login authentication logic here
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
            {/* Email Input Field */}
            <div className="input-group">
              <span className="input-icon">✉️</span> {/* Using an emoji/icon placeholder */}
              <input type="email" placeholder="Email" required className="input-field" />
            </div>

            {/* Password Input Field */}
            <div className="input-group">
              <span className="input-icon">🔒</span> {/* Using an emoji/icon placeholder */}
              <input type="password" placeholder="Password" required className="input-field" />
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" />
                Remember Me
              </label>
              <a href="#" className="forgot-password">Forgot Password?</a>
            </div>
            
            {/* Log In Button */}
            <button type="submit" className="login-button">
              Log In
            </button>
            
            {/* Create an Account Link */}
            <div className="create-account-link">
              Don't have account? <a href="#" className="create-account-text">Create an Account</a>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;