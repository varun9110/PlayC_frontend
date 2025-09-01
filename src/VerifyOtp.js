import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function VerifyOtp({ email, onVerified, onBack }) {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/auth/verify-otp', { email, otp });
      alert(res.data.message);
      onVerified();
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Verify OTP</h2>
      <p>OTP sent to {email}</p>
      <input
        placeholder="Enter OTP"
        value={otp}
        onChange={e => setOtp(e.target.value)}
        required
      />
      <br />
      <button type="submit" disabled={loading}>{loading ? 'Verifying...' : 'Verify'}</button>
      <button type="button" onClick={() => navigate('/register')}>Back to Register</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}
