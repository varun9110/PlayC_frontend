import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register({ onRegistered }) {
  const [form, setForm] = useState({ email: '', password: '', phone: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      console.log(form)
      const res = await axios.post('http://localhost:5000/api/auth/register', form);
      alert(res.data.message);
      onRegistered(form.email);
      navigate('/verify-otp');  // Navigate to verify OTP route
    } catch (err) {
      setError(err.response?.data?.message || 'Error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    navigate('/'); // route to register page
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <br />
      <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
      <br />
      <input name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} required />
      <br />
      <button type="submit" disabled={loading}>{loading ? 'Sending OTP...' : 'Register'}</button>
      <button type="button" onClick={handleLogin} style={{ marginLeft: '10px' }}>
          Login
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}
