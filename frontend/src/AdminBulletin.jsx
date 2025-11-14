import React, { useState, useEffect } from 'react';
import { announcementAPI } from './services/api';
import './AdminBulletin.css';

const AdminBulletin = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [newAnnouncement, setNewAnnouncement] = useState({ title: '', description: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await announcementAPI.getAll();
        if (response.success) {
          setAnnouncements(response.announcements);
        }
      } catch (err) {
        setError('Failed to fetch announcements.');
      }
    };
    fetchAnnouncements();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAnnouncement({ ...newAnnouncement, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newAnnouncement.title || !newAnnouncement.description) {
      setError('Title and description are required.');
      return;
    }

    try {
      const response = await announcementAPI.create(newAnnouncement);
      if (response.success) {
        setAnnouncements([response.announcement, ...announcements]);
        setNewAnnouncement({ title: '', description: '' });
        setError('');
      } else {
        setError(response.message || 'Failed to post announcement.');
      }
    } catch (err) {
      console.error('Error creating announcement:', err.response?.data);
      const message = err.response?.data?.message || 'An error occurred while posting the announcement.';
      setError(message);
    }
  };

  return (
    <div className="admin-bulletin-container">
      <h1>Admin Bulletin</h1>

      <div className="announcement-form-section">
        <h2>Post New Announcement</h2>
        <form onSubmit={handleSubmit} className="announcement-form">
          <input
            type="text"
            name="title"
            value={newAnnouncement.title}
            onChange={handleInputChange}
            placeholder="Title"
            required
          />
          <textarea
            name="description"
            value={newAnnouncement.description}
            onChange={handleInputChange}
            placeholder="What's on your mind?"
            required
          />
          <button type="submit">Post</button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>

      <div className="announcements-list-section">
        <h2>Recent Announcements</h2>
        <div className="announcements-list">
          {announcements.length > 0 ? (
            announcements.map((ann) => (
              <div key={ann.id} className="announcement-item">
                <h3>{ann.title}</h3>
                <p>{ann.description}</p>
                <small>
                  Posted by {ann.author?.first_name} {ann.author?.last_name} on {new Date(ann.created_at).toLocaleDateString()}
                </small>
              </div>
            ))
          ) : (
            <p>No announcements yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminBulletin;