import React from "react";
import "./App.css";
// Adjust this path to your actual image file for the illustration
import complaintIllustration from "./assets/complaint.png"; 

const ComplaintForm = () => {
  return (
    <div className="page">
     
      <main className="main-content-form">
        <div className="go-back">
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
          <div className="form-fields">
            {/* Subject of Complaint */}
            <div className="input-group full-width">
              <label htmlFor="subject">Subject of Complaint</label>
              <input
                type="text"
                id="subject"
                placeholder="Text entry..."
                className="text-input"
              />
            </div>

            <div className="form-row type-attach-row">
              {/* Type Field */}
              <div className="input-group small-group">
                <label htmlFor="type">Type</label>
                <button className="icon-button type-button">
                  <span role="img" aria-label="plus sign">+</span>
                </button>
              </div>

              {/* Attach File Field */}
              <div className="input-group small-group">
                <label htmlFor="attach">Attach File</label>
                <button className="icon-button attach-button">
                  <span role="img" aria-label="plus sign">+</span>
                </button>
              </div>
            </div>

            {/* Description */}
            <div className="input-group full-width">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                placeholder="Text entry..."
                className="textarea-input"
                rows="8"
              />
            </div>

            {/* Submission Area */}
            <div className="submit-area">
              <p className="submit-prompt">
                All set?{" "}
                <span className="submit-link">
                  Submit to process your report.
                </span>
              </p>
              <button className="submit-report-btn">SUBMIT REPORT</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ComplaintForm;