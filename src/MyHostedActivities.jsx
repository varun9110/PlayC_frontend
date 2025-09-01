import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function MyHostedActivities() {
  const email = JSON.parse(localStorage.getItem('user'))?.email;
  const [activities, setActivities] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);

  const fetchActivities = async () => {
    const res = await axios.get(`http://localhost:5000/api/activity/hosted/${email}`);
    setActivities(res.data);
  };

  useEffect(() => {
    fetchActivities();
  });

  const respond = async (id, userEmail, action) => {
    await axios.post('http://localhost:5000/api/activity/respond', {
      activityId: id,
      userEmail,
      action
    });
    fetchActivities();
  };

  const retirePlayer = async (id, userEmail) => {
    await axios.post('http://localhost:5000/api/activity/retire-player', {
      activityId: id,
      userEmail
    });
    fetchActivities();
  };

  const cancelActivity = async (id) => {
    if (window.confirm('Are you sure you want to cancel this activity?')) {
      await axios.delete(`http://localhost:5000/api/activity/cancel/${id}`);
      fetchActivities();
    }
  };

  const toggleRow = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  return (
    <div className="form">
      <h2>My Hosted Activities</h2>
      {activities.length === 0 ? (
        <p>You haven’t hosted any activities yet.</p>
      ) : (
        <table className="pricing-table">
          <thead>
            <tr>
              <th>City</th>
              <th>Date</th>
              <th>Time</th>
              <th>Players</th>
              <th>Pending Requests</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((act, index) => (
              <React.Fragment key={act._id}>
                <tr>
                  <td>{act.city}</td>
                  <td>{act.date}</td>
                  <td>{act.fromTime} - {act.toTime}</td>
                  <td>{act.joinedPlayers.length}/{act.maxPlayers}</td>
                  <td>{act.pendingRequests.length}</td>
                  <td>
                    <button onClick={() => toggleRow(index)}>
                      {expandedRow === index ? 'Hide Details' : 'Manage'}
                    </button>
                    <button onClick={() => cancelActivity(act._id)} style={{ color: 'red', marginLeft: '8px' }}>
                      Cancel
                    </button>
                  </td>
                </tr>

                {expandedRow === index && (
                  <tr>
                  <td colSpan="6">
                    <div style={{ background: '#f9f9f9', padding: '1rem' }}>
                        <h4>Joined Players</h4>
                        {act.joinedPlayers.length === 0 ? (
                          <p>No players joined yet.</p>
                        ) : (
                          <table className="inner-table">
                            <thead>
                              <tr>
                                <th>Email</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {act.joinedPlayers.map(player => (
                                <tr key={player}>
                                  <td>{player}</td>
                                  <td>
                                    {player !== email ? (
                                      <button
                                        onClick={() => retirePlayer(act._id, player)}
                                        style={{ color: 'red' }}
                                      >
                                        Retire
                                      </button>
                                    ) : (
                                      <em>Host</em>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                        <h4>Pending Requests</h4>
                        {act.pendingRequests.length === 0 ? (
                          <p>No pending requests.</p>
                        ) : (
                          <table className="inner-table">
                            <thead>
                              <tr>
                                <th>Email</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {act.pendingRequests.map(req => (
                                <tr key={req}>
                                  <td>{req}</td>
                                  <td>
                                    <button
                                      onClick={() => respond(act._id, req, 'approve')}
                                      style={{ marginRight: '8px', backgroundColor: '#4CAF50', color: 'white' }}
                                    >
                                      Approve
                                    </button>
                                    <button
                                      onClick={() => respond(act._id, req, 'reject')}
                                      style={{ backgroundColor: '#f44336', color: 'white' }}
                                    >
                                      Reject
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}

                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
