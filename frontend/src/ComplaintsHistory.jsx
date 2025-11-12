import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { complaintAPI } from "./services/api";
import "./App.css";
import { FaSearch } from 'react-icons/fa'; // For a Font Awesome search icon

const ComplaintsHistory = () => {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const result = await complaintAPI.getAll();
      
      if (result.success) {
        setComplaints(result.complaints);
        if (result.complaints.length > 0) {
          setSelectedComplaint(result.complaints[0]);
        }
      } else {
        setError(result.message || 'Failed to fetch complaints. Please try again later.');
      }
    } catch (err) {
      const message = err.response?.data?.message || 'An error occurred while fetching complaints.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const filteredComplaints = complaints.filter(complaint =>
    complaint.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    complaint.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    complaint.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'submitted':
        return '#FFA500';
      case 'in_progress':
        return '#2196F3';
      case 'resolved':
        return '#4CAF50';
      default:
        return '#757575';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
  };

  return (
    <div className="page-content-wrapper">
      <div className="sidebar-container">
        {/* Go back link */}
        <div className="go-back-history" onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }}>
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
            <div className="search-input-wrapper">
                <input 
                    type="text" 
                    placeholder="Search..." 
                    className="search-input-field"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FaSearch className="search-icon-inside" />
                    </div>
                <button className="filter-btn">
                    <span className="filter-icon">&#9776;</span>
                </button>
            </div>

          {/* List Items */}
          <div className="list-items-container">
            {loading ? (
              <div style={{ padding: '20px', textAlign: 'center' }}>Loading...</div>
            ) : error ? (
              <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>{error}</div>
            ) : filteredComplaints.length === 0 ? (
              <div style={{ padding: '20px', textAlign: 'center' }}>No complaints found</div>
            ) : (
              filteredComplaints.map((item) => (
                <div 
                  key={item.id} 
                  className={`list-item ${selectedComplaint?.id === item.id ? 'list-item-active' : ''}`}
                  onClick={() => setSelectedComplaint(item)}
                  style={{ cursor: 'pointer', padding: '10px' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '14px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginRight: '10px' }}>
                      {item.subject}
                    </div>
                    <div style={{ fontSize: '11px', flexShrink: 0 }}>
                      <span style={{ color: getStatusColor(item.status), fontWeight: 'bold' }}>
                        {item.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="summary-content-area">
        <div className="summary-header-bar">
          <h2 className="summary-title">COMPLAINTS SUMMARY</h2>
        </div>
        
        <div className="complaint-detail-pane">
          {selectedComplaint ? (
            <>
              <div className="detail-row">
                <span className="detail-ref-number">
                  <span className="data-field-red">CMP-{selectedComplaint.id.toString().padStart(6, '0')}</span>
                </span>
                <span className="detail-date-status">
                  <span className="data-field-red">{formatDate(selectedComplaint.created_at)}</span>
                  <span className="data-field-red" style={{ color: getStatusColor(selectedComplaint.status) }}>
                    {selectedComplaint.status.toUpperCase()}
                  </span>
                </span>
              </div>

              <div className="detail-subject">
                <span className="data-field">{selectedComplaint.subject}</span>
              </div>

              <div style={{ marginTop: '15px', marginBottom: '10px' }}>
                <strong>Type:</strong> {selectedComplaint.type}
              </div>

              <div className="detail-text-body">
                {selectedComplaint.description}
              </div>

              {selectedComplaint.remarks && (
                <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '5px' }}>
                  <strong>Admin Remarks:</strong>
                  <p style={{ marginTop: '10px' }}>{selectedComplaint.remarks}</p>
                  {selectedComplaint.admin && (
                    <p style={{ marginTop: '5px', fontSize: '12px', color: '#666' }}>
                      - {selectedComplaint.admin.first_name} {selectedComplaint.admin.last_name}
                    </p>
                  )}
                </div>
              )}

              <div style={{ marginTop: '20px', fontSize: '12px', color: '#888' }}>
                <div>Created: {new Date(selectedComplaint.created_at).toLocaleString()}</div>
                <div>Last Updated: {new Date(selectedComplaint.updated_at).toLocaleString()}</div>
              </div>
            </>
          ) : (
            <div style={{ padding: '20px', textAlign: 'center', color: '#888' }}>
              Select a complaint to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComplaintsHistory;