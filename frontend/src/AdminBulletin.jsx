import React from 'react';
import './App.css'; 
import attachedImage from "./assets/attachedimage.png";

const AdminBulletin = () => {
  return (
    <div className="admin-bulletin-content-only">
      <main className="bulletin-main-content-no-nav">
        
        {/* Announcement Post Box */}
        <div className="post-box">
          <div className="post-details">
            <p className="post-title">Post Announcements</p>
            <p className="post-text">Text holder</p>
          </div>
          <button className="attachment-button">
            <img src={attachedImage} alt="Attach" className="attachment-icon" />
          </button>
        </div>

        {/* First Gray Content Block */}
        <div className="content-block-large">
          {/* Bulletin content goes here */}
        </div>
        
        {/* Second Gray Content Block */}
        <div className="content-block-medium">
          {/* Bulletin content goes here */}
        </div>
        
      </main>
    </div>
  );
};

export default AdminBulletin;