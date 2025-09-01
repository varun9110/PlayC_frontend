import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function MyBookings() {
  const userEmail = JSON.parse(localStorage.getItem('user'))?.email;
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    const res = await axios.get(`http://localhost:5000/api/booking/my-bookings/${userEmail}`);
    console.log(res.data)
    setBookings(res.data);
  };

  const handleCancel = async (id) => {
    await axios.delete(`http://localhost:5000/api/booking/cancel/${id}`);
    fetchBookings();
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div>
      <h2>My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Academy</th>
              <th>Sport</th>
              <th>Date</th>
              <th>Time</th>
              <th>Court</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(b => (
              <tr key={b._id}>
                <td>{b.academyId?.name || 'N/A'}</td>
                <td>{b.sport}</td>
                <td>{b.date}</td>
                <td>{b.startTime} - {b.endTime}</td>
                <td>{b.courtNumber}</td>
                <td>${b.price}</td>
                <td><button onClick={() => handleCancel(b._id)}>Cancel</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
