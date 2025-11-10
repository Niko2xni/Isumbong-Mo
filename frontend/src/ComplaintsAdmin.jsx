import React from "react";
import './admin.css';
import { FaSearch } from 'react-icons/fa'; // For a Font Awesome search icon

const ComplaintsAdmin = () => {
  // Mock data for the Complaint List items (the clickable bars on the left)
  const complaints = [
    { id: 1, text: "Complaint #2024-001" },
    { id: 2, text: "Complaint #2024-002" },
    { id: 3, text: "Complaint #2024-003" },
    { id: 4, text: "Complaint #2024-004" },
    // ... add more as needed to fill the list space
  ];

  // Placeholder content for the Summary Detail pane
  const complaintDetail = {
    reference: "CMP-2024-001-A",
    date: "2024/10/26",
    status: "OPEN",
    subject: "Noise Complaint near Building C",
    text: "This area is for the detailed description of the complaint corresponding to the selected item in the list. The full text will be loaded here from the database.",
  };

  return (
    <div className="page-content-wrapper">
      <div className="sidebar-container">
        {/* Go back link */}
        <div className="go-back-history">
          <span className="arrow-icon" role="img" aria-label="left arrow">
            &larr;
          </span>{" "}
          Go back
        </div>

        {/* Sidebar Content */}
        <div className="complaint-list-sidebar">
          <div className="sidebar-heading">Complaints List</div>
          
          {/* Search Bar */}
          <div className="list-search-container">
            <div className="search-input-wrapper"> {/* The container for positioning */}
                <input 
                    type="text" 
                    placeholder="Search..." 
                    className="search-input-field"
                />
                <FaSearch className="search-icon-inside" />
                    </div>
                <button className="filter-btn">
                    <span className="filter-icon">&#9776;</span>
                </button>
            </div>

          {/* List Items (The repeating gray/blue bars) */}
          <div className="list-items-container">
            {complaints.map((item, index) => (
              <div 
                key={item.id} 
                className={`list-item ${index === 0 ? 'list-item-active' : ''}`}
              >
                {/* Placeholder text or summary */}
              </div>
            ))}
            {/* Adding empty items to fill the space as shown in the screenshot */}
            {Array.from({ length: 10 - complaints.length > 0 ? 10 - complaints.length : 0 }).map((_, index) => (
                <div key={`empty-${index}`} className="list-item list-item-empty"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="summary-content-area">
        <div className="summary-header-bar">
          <h2 className="summary-title">COMPLAINTS SUMMARY</h2>
        </div>
        
        <div className="complaint-detail-pane">
          <div className="detail-row">
            <span className="detail-ref-number">
              <span className="data-field-red">[Reference Number]</span>
            </span>
            <span className="detail-date-status">
              <span className="data-field-red">[Date]</span>
              <span className="data-field-red">[STATUS]</span>
            </span>
          </div>

          <div className="detail-subject">
            <span className="data-field">[Subject]</span>
          </div>

          <div className="detail-text-body">
            Text....
          </div>
          <div className="detail-button-group">
            <button className="action-button status-button">
              Change Status
            </button>
            <button className="action-button remark-button">
              Add Remark
            </button>
            <button className="action-button save-button">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintsAdmin;