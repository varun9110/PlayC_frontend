import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';


export default function AdminOnboardAcademy() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    city: ''
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });


  const handleSubmit = async (e) => {
    e.preventDefault();
    const role = "academy";

    const payload = {
      ...form,
      role,
    };

    try {
      const res = await axios.post('http://localhost:5000/api/academy/onboard-academy', payload);
      
      alert(res.data.message);
    } catch (err) {
      alert('Error: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="page-container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Onboard Badminton Academy</h2>
        <input name="name" placeholder="Academy Name" value={form.name} onChange={handleChange} required />
        <input
          type="email"
          name="email"
          placeholder="Academy Email"
          value={form.email}
          onChange={handleChange} required
        />
        <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
        <input name="address" placeholder="Address" value={form.address} onChange={handleChange} />
        <input name="city" placeholder="City" value={form.city} onChange={handleChange} />
        

        <button type="submit">Create Academy</button>
      </form>
    </div>
  );
}
