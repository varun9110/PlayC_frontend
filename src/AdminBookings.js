import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminBookings() {
  const [academies, setAcademies] = useState([]);
  const [academyId, setAcademyId] = useState('');
  const cities = ['Toronto', 'Vancouver', 'Calgary', 'Mississauga'];
  const [selectedCity, setSelectedCity] = useState('');
  const [date, setDate] = useState('');
  const [bookings, setBookings] = useState([]);
  
    
  useEffect(() => {
    if (selectedCity) {
      axios.get(`http://localhost:5000/api/booking/academies?city=${selectedCity}`)
        .then(res => setAcademies(res.data))
        .catch(err => console.error(err));
    }
  }, [selectedCity]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/booking/academies?city=')
      .then(res => setAcademies(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleSearch = () => {
    if (academyId && date) {
      axios.get(`http://localhost:5000/api/booking/bookings/${academyId}/${date}`)
        .then(res => setBookings(res.data))
        .catch(err => console.error(err));
    }
  };

  return (
    <div className="page-container">
      <div className="form" style={{ width: '100%' }}>
        <h2>Admin - View Bookings</h2>
        <label>Select City</label>
        <select value={selectedCity} onChange={e => setSelectedCity(e.target.value)}>
          <option value="">-- Choose --</option>
          {cities.map(city => <option key={city} value={city}>{city}</option>)}
        </select>
        <label>Academy</label>
        <select onChange={e => setAcademyId(e.target.value)}>
          <option value="">Select</option>
          {academies.map(a => (
            <option key={a._id} value={a._id}>{a.name}</option>
          ))}
        </select>
        <label>Date</label>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} />
        <button onClick={handleSearch}>Search</button>

        {bookings.length > 0 && (
          <table className="pricing-table" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>User</th>
                <th>Court</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b, i) => (
                <tr key={i}>
                  <td>{b.userEmail}</td>
                  <td>{b.courtNumber}</td>
                  <td>{b.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
