import React from 'react';
import { FaEnvelope } from 'react-icons/fa'; 

const ContactUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Inquiry submitted!');
  };

  return (
    <div className="contact-us-container">
      <h1 className="contact-title">Contact Us</h1>

      <div className="contact-content-wrapper">
        <div className="contact-form-side">
          <form className="contact-form" onSubmit={handleSubmit}>
            
            <div className="form-group">
              <input type="text" id="name" placeholder="Name" className="form-input" required />
            </div>

            <div className="form-group icon-group">
              <FaEnvelope className="input-icon" aria-label="Email icon" />
              <input type="email" id="email" placeholder="Email" className="form-input" required />
            </div>
            
            <div className="form-group">
              <textarea id="message" placeholder="Message" className="form-textarea" rows="6" required />
            </div>

            <button type="submit" className="submit-btn">
              Submit Inquiry
            </button>
          </form>
        </div>

        <div className="contact-details-side">
          <div className="contact-card"> 
            <h2 className="card-title">Contact Details</h2>
            
            <div className="contact-info">
              <p className="contact-item email-link">
                IsumbongMo@gmail.com
              </p>
              <p className="contact-item">
                09XXXXXXXXX
              </p>
              <p className="contact-item address">
                1338 Arlegui St., Quiapo, Manila
              </p>
            </div>
            
            <div className="envelope-illustration-wrapper"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;