import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { complaintAPI } from './services/api';

const ComplaintDetails = () => {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const result = await complaintAPI.getById(id);
        if (result.success) {
          setComplaint(result.complaint);
        }
      } catch (error) {
        console.error('Failed to fetch complaint details:', error);
      }
    };

    fetchComplaint();
  }, [id]);

  if (!complaint) {
    return <div>Loading...</div>;
  }

  return (
    <div className="complaint-details-container">
      <h2>{complaint.subject}</h2>
      <p><strong>Type:</strong> {complaint.complaint_type}</p>
      <p><strong>Description:</strong> {complaint.description}</p>
      <p><strong>Status:</strong> {complaint.status}</p>
      <p><strong>Date Filed:</strong> {new Date(complaint.created_at).toLocaleDateString()}</p>
    </div>
  );
};

export default ComplaintDetails;
