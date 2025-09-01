import React, { useState } from 'react';
import axios from 'axios';

export default function BookCourt() {
  const [city, setCity] = useState('');
  const [sport, setSport] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [date, setDate] = useState('');
  const [academies, setAcademies] = useState([]);

  const sportsList = ['Badminton', 'Tennis', 'Table Tennis', 'Squash', 'Basketball', 'Cricket'];

  const handleSearch = async () => {
    const res = await axios.post('http://localhost:5000/api/booking/search', {
      city,
      sport,
      startTime,
      endTime,
      date
    });
    setAcademies(res.data);
  };

  const handleBook = async (academyId, courtNumber, price) => {
    const userEmail = JSON.parse(localStorage.getItem('user')).email;
    await axios.post('http://localhost:5000/api/booking/create', {
      userEmail,
      academyId,
      sport,
      courtNumber,
      date,
      startTime,
      endTime
    });
    alert('Booking Confirmed');
    handleSearch(); // Refresh available courts
  };

  return (
    <div>
      <h2>Book a Court</h2>
      <label>City:</label>
      <input value={city} onChange={e => setCity(e.target.value)} />

      <label>Sport:</label>
      <input value={sport} onChange={e => setSport(e.target.value)} />

      <label>Date:</label>
      <input type="date" value={date} onChange={e => setDate(e.target.value)} />

      <label>Start Time:</label>
      <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} />

      <label>End Time:</label>
      <input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} />

      <button onClick={handleSearch}>Search Academies</button>

      {academies.map(academy => (
        <div key={academy._id}>
          <h3>{academy.name} ({academy.city})</h3>
          <table>
            <thead>
              <tr>
                <th>Court</th>
                <th>Price</th>
                <th>Book</th>
              </tr>
            </thead>
            <tbody>
              {academy.courts.map(court => (
                <tr key={court.courtNumber}>
                  <td>{court.courtNumber}</td>
                  <td>${court.price}</td>
                  <td><button onClick={() => handleBook(academy._id, court.courtNumber, court.price)}>Book</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
