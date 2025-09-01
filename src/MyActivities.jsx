import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function MyActivities() {
  const email = JSON.parse(localStorage.getItem('user'))?.email;
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/activity/my-activities/${email}`)
      .then(res => setActivities(res.data))
      .catch(err => console.error(err));
  }, [email]);

  return (
    <div className="form">
      <h2>Activities I'm Attending</h2>
      {activities.length === 0 ? (
        <p>You have no upcoming activities.</p>
      ) : (
        <table className="pricing-table">
          <thead>
          <tr>
            <th>City</th>
            <th>Date</th>
            <th>Time</th>
            <th>Host</th>
            <th>Players</th>
            <th>Action</th>
          </tr>

          </thead>
          <tbody>
            {activities.map(act => (
              <tr key={act._id}>
                <td>{act.city}</td>
                <td>{act.date}</td>
                <td>{act.fromTime} - {act.toTime}</td>
                <td>{act.hostEmail}</td>
                <td>{act.joinedPlayers.length}/{act.maxPlayers}</td>
                <td>
                  {act.hostEmail !== email && (
                    <button
                      onClick={async () => {
                        try {
                          const res = await axios.post('http://localhost:5000/api/activity/retire-self', {
                            activityId: act._id,
                            userEmail: email
                          });
                          alert(res.data.message);
                          setActivities(prev => prev.filter(a => a._id !== act._id)); // remove from UI
                        } catch (err) {
                          alert(err.response?.data?.message || 'Error retiring from activity');
                        }
                      }}
                      style={{ color: 'red' }}
                    >
                      Retire
                    </button>
                  )}
                </td>               
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
