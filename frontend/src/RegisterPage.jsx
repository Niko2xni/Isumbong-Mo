import React from 'react';
import './App.css'; 

import loginLg from './assets/loginlg.png';
import rgImage from './assets/rgimage.png'; 

const RegisterPage = () => {
  // A simple function to handle form submission (you'll replace this with actual logic)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registration attempt...');
    // Add your registration logic here
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
          <p className="register-subtitle">Please log in to your account to continue</p>
          
          <form onSubmit={handleSubmit} className="register-form">
            {/* Name Input Field */}
            <div className="input-group">
              <label htmlFor="name" className="input-label">Name</label>
              <input type="text" id="name" placeholder="Enter your Name..." required className="input-field" />
            </div>

            {/* Email Address Input Field */}
            <div className="input-group">
              <label htmlFor="email" className="input-label">Email Address</label>
              <input type="email" id="email" placeholder="gmail.com" required className="input-field" />
            </div>

            {/* Address Input Field */}
            <div className="input-group">
              <label htmlFor="address" className="input-label">Address</label>
              <input type="text" id="address" placeholder="Enter your street address..." required className="input-field" />
            </div>

            {/* Password Input Field */}
            <div className="input-group">
              <label htmlFor="password" className="input-label">Password</label>
              <input type="password" id="password" placeholder="*********" required className="input-field" />
            </div>

            {/* Terms & Policy Checkbox */}
            <div className="form-options register-terms">
              <label className="terms-checkbox">
                <input type="checkbox" required />
                I agree the Terms & Policy
              </label>
            </div>
            
            {/* Sign In Button */}
            <button type="submit" className="register-button">
              Sign In
            </button>
            
            {/* Don't have account? Create an Account Link (This typically means Login here) */}
            <div className="create-account-link">
              Don't have account? <a href="#" className="create-account-text">Create an Account</a>
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