import React, { useState, useEffect } from "react";
import Modal from './Modal';
import { useNavigate } from 'react-router-dom';
import { complaintAPI } from './services/api';
import './Admin.css';
import { FaSearch } from 'react-icons/fa'; // For a Font Awesome search icon

const ComplaintsAdmin = () => {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [pagination, setPagination] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateData, setUpdateData] = useState({ status: '', remarks: '' });

  useEffect(() => {
    const fetchComplaints = async (page = 1) => {
      try {
        setLoading(true);
        const result = await complaintAPI.getAll(page);
        if (result.success) {
          setComplaints(result.complaints);
          setPagination(result.pagination);
          if (result.complaints.length > 0) {
            setSelectedComplaint(result.complaints[0]);
          }
        } else {
          setError(result.message || 'Failed to fetch complaints.');
        }
      } catch (err) {
        const message = err.response?.data?.message || 'An error occurred.';
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  const handlePageChange = (page) => {
    fetchComplaints(page);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await complaintAPI.updateStatus(selectedComplaint.id, updateData);
      if (result.success) {
        const updatedComplaints = complaints.map(c => c.id === selectedComplaint.id ? result.complaint : c);
        setComplaints(updatedComplaints);
        setSelectedComplaint(result.complaint);
        setIsModalOpen(false);
      } else {
        setError(result.message || 'Failed to update complaint.');
      }
    } catch (err) {
      const message = err.response?.data?.message || 'An error occurred.';
      setError(message);
    }
  };

  const filteredComplaints = complaints.filter(complaint =>
    complaint.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (complaint.complaint_type && complaint.complaint_type.toLowerCase().includes(searchTerm.toLowerCase())) ||
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
        <div className="go-back-history" onClick={() => navigate('/admin/dashboard')}>
          <span className="arrow-icon" role="img" aria-label="left arrow">&larr;</span> Go back
        </div>
        <div className="complaint-list-sidebar">
          <div className="sidebar-heading">Complaints List</div>
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
          {pagination && (
            <div className="pagination-controls">
              <button onClick={() => handlePageChange(pagination.current_page - 1)} disabled={pagination.current_page === 1}>Previous</button>
              <span>Page {pagination.current_page} of {pagination.last_page}</span>
              <button onClick={() => handlePageChange(pagination.current_page + 1)} disabled={pagination.current_page === pagination.last_page}>Next</button>
            </div>
          )}
        </div>
      </div>
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
                <strong>Type:</strong> {selectedComplaint.complaint_type}
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

              <button onClick={() => { setUpdateData({ status: selectedComplaint.status, remarks: selectedComplaint.remarks || '' }); setIsModalOpen(true); }} style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}>
                Update Status
              </button>
            </>
          ) : (
            <div style={{ padding: '20px', textAlign: 'center', color: '#888' }}>
              Select a complaint to view details
            </div>
          )}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>Update Complaint Status</h2>
        <form onSubmit={handleUpdateSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label>Status</label>
            <select value={updateData.status} onChange={(e) => setUpdateData({ ...updateData, status: e.target.value })} style={{ width: '100%', padding: '8px', marginTop: '5px' }}>
              <option value="submitted">Submitted</option>
              <option value="in progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="dismissed">Dismissed</option>
            </select>
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label>Remarks</label>
            <textarea value={updateData.remarks} onChange={(e) => setUpdateData({ ...updateData, remarks: e.target.value })} style={{ width: '100%', padding: '8px', marginTop: '5px', minHeight: '100px' }} />
          </div>
          <div style={{ textAlign: 'right' }}>
            <button type="button" onClick={() => setIsModalOpen(false)} style={{ marginRight: '10px', padding: '10px 20px' }}>Cancel</button>
            <button type="submit" style={{ padding: '10px 20px' }}>Update</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ComplaintsAdmin;