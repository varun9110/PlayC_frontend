import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function MyRequests() {
  const email = JSON.parse(localStorage.getItem('user'))?.email;
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    const res = await axios.get(`http://localhost:5000/api/activity/my-requests/${email}`);
    setRequests(res.data);
  };

  useEffect(() => {
    fetchRequests();
  });

  const cancelRequest = async (id) => {
    await axios.post(`http://localhost:5000/api/activity/cancel-request`, {
      activityId: id,
      userEmail: email
    });
    fetchRequests();
  };

  return (
    <div className="form">
      <h2>My Join Requests</h2>
      {requests.length === 0 ? (
        <p>No pending requests.</p>
      ) : (
        <table className="pricing-table">
          <thead>
            <tr><th>City</th><th>Date</th><th>Time</th><th>Action</th></tr>
          </thead>
          <tbody>
            {requests.map(act => (
              <tr key={act._id}>
                <td>{act.city}</td>
                <td>{act.date}</td>
                <td>{act.fromTime} - {act.toTime}</td>
                <td>
                  <button onClick={() => cancelRequest(act._id)} style={{ color: 'red' }}>
                    Cancel Request
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
