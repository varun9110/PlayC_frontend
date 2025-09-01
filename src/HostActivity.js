import React, { useState } from 'react';
import axios from 'axios';

export default function HostActivity() {
    const [form, setForm] = useState({ city: '', date: '', fromTime: '', toTime: '', maxPlayers: '' });
    const [cities] = useState(['Toronto', 'Vancouver', 'Calgary', 'Mississauga']);
    const [selectedCity, setSelectedCity] = useState('');
    const email = JSON.parse(localStorage.getItem('user'))?.email;

    const handleSubmit = async () => {
        await axios.post('http://localhost:5000/api/activity/host', {
            ...form, hostEmail: email
        });
        alert('Activity hosted!');
    };

    return (
        <div className="form">
            <h2>Host Activity</h2>
            <label>Select City</label>
            <select value={selectedCity} onChange={e => { setSelectedCity(e.target.value); setForm({ ...form, city: e.target.value }) }}>
                <option value="">-- Choose City --</option>
                {cities.map(city => <option key={city} value={city}>{city}</option>)}
            </select>
            <input type="date" onChange={e => setForm({ ...form, date: e.target.value })} />
            <input type="time" onChange={e => setForm({ ...form, fromTime: e.target.value })} />
            <input type="time" onChange={e => setForm({ ...form, toTime: e.target.value })} />
            <input type="number" placeholder="Max Players" onChange={e => setForm({ ...form, maxPlayers: e.target.value })} />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}
