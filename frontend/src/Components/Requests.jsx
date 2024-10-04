// src/components/Requests.jsx
import React, { useEffect, useState } from 'react';
import './styles/requests.css'; // Ensure you have a CSS file for styling

const Requests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/register');
        if (response.ok) {
          const data = await response.json();
          setRequests(data);
        } else {
          console.error('Failed to fetch requests');
        }
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };

    fetchRequests();
  }, []);

  const handleAccept = async (u_id) => {
    try {
      const response = await fetch(`http://localhost:5001/api/register/${u_id}/accept`, {
        method: 'PUT',
      });
      if (response.ok) {
        alert('Request accepted');
        console.log('successfully accepted request');
        setRequests(requests.filter((request) => request.u_id !== u_id));
      } else {
        console.error('Failed to accept request');
      }
    } catch (error) {
      console.error('Error accepting request:', error);
    }
  };

  const handleReject = async (u_id) => {
    try {
      const response = await fetch(`http://localhost:5001/api/register/${u_id}/reject`, {
        method: 'DELETE',
      });
      if (response.ok) {
        alert('Request rejected');
        setRequests(requests.filter((request) => request.u_id !== u_id));
      } else {
        console.error('Failed to reject request');
      }
    } catch (error) {
      console.error('Error rejecting request:', error);
    }
  };

  return (
    <div className="requests-container">
      <h2>User Requests</h2>
      <div className="requests-box">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Department ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.length > 0 ? (
              requests.map((request) => (
                <tr key={request.u_id}>
                  <td>{request.u_name}</td>
                  <td>{request.email}</td>
                  <td>{request.d_id}</td>
                  <td>
                    <button onClick={() => handleAccept(request.u_id)}>Accept</button>
                    <button onClick={() => handleReject(request.u_id)}>Reject</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No requests available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Requests;
