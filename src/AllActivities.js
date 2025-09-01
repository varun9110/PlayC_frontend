import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AllActivities() {
  const [activities, setActivities] = useState([]);
  const email = JSON.parse(localStorage.getItem('user'))?.email;

  useEffect(() => {
    axios.get(`http://localhost:5000/api/activity/all?email=${email}`)
      .then(res => setActivities(res.data));
  }, [email]);

  const requestJoin = async (id) => {
    await axios.post(`http://localhost:5000/api/activity/request`, {
      activityId: id, userEmail: email
    });
    alert('Request sent!');
  };

  return (
    <div className="form">
      <h2>All Activities</h2>
      {activities.length === 0 ? <p>No activities found.</p> : (
        <table className="pricing-table">
          <thead>
            <tr><th>City</th><th>Date</th><th>Time</th><th>Slots</th><th>Action</th></tr>
          </thead>
          <tbody>
            {activities.map(a => (
              <tr key={a._id}>
                <td>{a.city}</td>
                <td>{a.date}</td>
                <td>{a.fromTime} - {a.toTime}</td>
                <td>{a.joinedPlayers.length}/{a.maxPlayers}</td>
                <td><button onClick={() => requestJoin(a._id)}>Request</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
