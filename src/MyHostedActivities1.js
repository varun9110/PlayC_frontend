import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function MyHostedActivities() {
  const [activities, setActivities] = useState([]);
  const email = JSON.parse(localStorage.getItem('user'))?.email;

  useEffect(() => {
    axios.get(`http://localhost:5000/api/activity/hosted/${email}`)
      .then(res => setActivities(res.data));
  }, [email]);

  const respond = async (id, userEmail, action) => {
    await axios.post('http://localhost:5000/api/activity/respond', {
      activityId: id, userEmail, action
    });
    setActivities(prev => [...prev]); // force refresh
  };

  return (
    <div className="form">
      <h2>My Hosted Activities</h2>
      {activities.map(act => (
        <div key={act._id} style={{ marginBottom: '2rem' }}>
          <h4>{act.city} on {act.date} ({act.fromTime} - {act.toTime})</h4>
          <p>Pending Requests:</p>
          {act.pendingRequests.length === 0 ? (
            <p>None</p>
          ) : act.pendingRequests.map(email => (
            <div key={email}>
              {email}
              <button onClick={() => respond(act._id, email, 'approve')}>Approve</button>
              <button onClick={() => respond(act._id, email, 'reject')}>Reject</button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
