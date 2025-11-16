import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { complaintAPI } from './services/api';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    total: 0,
    inProgress: 0,
    resolved: 0,
    dismissed: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const result = await complaintAPI.getAll();
        if (result.success) {
          const complaints = result.complaints;
          setStats({
            total: complaints.length,
            inProgress: complaints.filter(c => c.status === 'in progress').length,
            resolved: complaints.filter(c => c.status === 'resolved').length,
            dismissed: complaints.filter(c => c.status === 'dismissed').length,
          });
        }
      } catch (error) {
        console.error('Failed to fetch complaint stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="stats-container">
        <div className="stat-card">_Total Complaints_<h2>{stats.total}</h2></div>
        <div className="stat-card">_In Progress_<h2>{stats.inProgress}</h2></div>
        <div className="stat-card">_Resolved_<h2>{stats.resolved}</h2></div>
        <div className="stat-card">_Dismissed_<h2>{stats.dismissed}</h2></div>
      </div>
      <div className="admin-actions">
        <button onClick={() => navigate('/admin/complaints')}>View Complaints List</button>
        <button onClick={() => navigate('/admin/bulletin')}>Add Announcements</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
