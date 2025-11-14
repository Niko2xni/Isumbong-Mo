import React, { useState, useEffect } from 'react';
import { announcementAPI } from './services/api';
import './UserBulletin.css';

const UserBulletin = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await announcementAPI.getAll();
        if (response.success) {
          setAnnouncements(response.announcements);
        } else {
          setError('Failed to fetch announcements.');
        }
      } catch (err) {
        setError('An error occurred while fetching announcements.');
      }
    };
    fetchAnnouncements();
  }, []);

  const handleViewDetails = (announcement) => {
    setSelectedAnnouncement(announcement);
  };

  const closeModal = () => {
    setSelectedAnnouncement(null);
  };

  return (
    <div className="user-bulletin-container">
      <h1>Announcements</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="announcements-grid">
        {announcements.length > 0 ? (
          announcements.map((ann) => (
            <div key={ann.id} className="announcement-card" onClick={() => handleViewDetails(ann)}>
              <h3>{ann.title}</h3>
              <p className="announcement-excerpt">{ann.description.substring(0, 100)}...</p>
              <small>
                Posted by {ann.author?.first_name} {ann.author?.last_name} on {new Date(ann.created_at).toLocaleDateString()}
              </small>
            </div>
          ))
        ) : (
          <p>No announcements yet.</p>
        )}
      </div>

      {selectedAnnouncement && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedAnnouncement.title}</h2>
            <p>{selectedAnnouncement.description}</p>
            <small>
              Posted by {selectedAnnouncement.author?.first_name} {selectedAnnouncement.author?.last_name} on {new Date(selectedAnnouncement.created_at).toLocaleDateString()}
            </small>
            <button onClick={closeModal} className="close-modal-btn">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserBulletin;