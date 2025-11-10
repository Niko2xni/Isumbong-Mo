import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { complaintAPI } from "./services/api";
import "./App.css";
// Adjust this path to your actual image file for the illustration
import complaintIllustration from "./assets/complaint.png"; 

const ComplaintForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    subject: '',
    type: '',
    description: '',
  });
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
    setLoading(true);

    try {
      const result = await complaintAPI.create(formData);
      
      if (result.success) {
        alert('Complaint submitted successfully!');
        navigate('/check-complaints');
      } else {
        if (result.errors) {
          setFieldErrors(result.errors);
        }
        setError(result.message || 'Failed to submit complaint');
      }
    } catch (err) {
      const errors = err.response?.data?.errors;
      const message = err.response?.data?.message || 'Failed to submit complaint';
      if (errors) {
        setFieldErrors(errors);
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
     
      <main className="main-content-form">
        <div className="go-back" onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }}>
          <span className="arrow-icon" role="img" aria-label="left arrow">
            &larr;
          </span>{" "}
          Go back
        </div>

        <div className="form-container">
          <div className="illustration-card">
            <img
              src={complaintIllustration} 
              alt="Files and Magnifying Glass Illustration"
              className="illustration-image"
            />
            <div className="card-text">
              Want to report something?
              <br />
              <span className="bold-text">File a complaint!</span>
            </div>
          </div>

          {/* Right Side: Form Fields */}
          <form onSubmit={handleSubmit} className="form-fields">
            {error && <div className="error-message" style={{color: 'red', marginBottom: '10px'}}>{error}</div>}
            
            {/* Subject of Complaint */}
            <div className="input-group full-width">
              <label htmlFor="subject">Subject of Complaint</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Text entry..."
                className="text-input"
                required
              />
              {fieldErrors.subject && <span className="field-error" style={{color: 'red', fontSize: '12px'}}>{fieldErrors.subject[0]}</span>}
            </div>

            <div className="form-row type-attach-row">
              {/* Type Field */}
              <div className="input-group small-group">
                <label htmlFor="type">Type</label>
                <input
                  type="text"
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  placeholder="e.g., Bug Report, Feedback"
                  className="text-input"
                  required
                />
                {fieldErrors.type && <span className="field-error" style={{color: 'red', fontSize: '12px'}}>{fieldErrors.type[0]}</span>}
              </div>

              {/* Attach File Field - Placeholder for future implementation */}
              <div className="input-group small-group">
                <label htmlFor="attach">Attach File</label>
                <button type="button" className="icon-button attach-button" disabled>
                  <span role="img" aria-label="plus sign">+</span>
                </button>
                <small style={{fontSize: '10px', color: '#888'}}>Coming soon</small>
              </div>
            </div>

            {/* Description */}
            <div className="input-group full-width">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Text entry..."
                className="textarea-input"
                rows="8"
                required
              />
              {fieldErrors.description && <span className="field-error" style={{color: 'red', fontSize: '12px'}}>{fieldErrors.description[0]}</span>}
            </div>

            {/* Submission Area */}
            <div className="submit-area">
              <p className="submit-prompt">
                All set?{" "}
                <span className="submit-link">
                  Submit to process your report.
                </span>
              </p>
              <button type="submit" className="submit-report-btn" disabled={loading}>
                {loading ? 'SUBMITTING...' : 'SUBMIT REPORT'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ComplaintForm;