import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './styles.css';

export default function AdminLogin() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  if (!user || user.role !== 'superadmin') {
    return (
      <div className="page-container">
        <p>Unauthorized access. Redirecting...</p>
        {setTimeout(() => navigate('/login'), 1000)}
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="form" style={{ maxWidth: '600px' }}>
        <h2>Superadmin Dashboard</h2>
        <p>Welcome, <strong>{user.email}</strong></p>

        <div style={{ margin: '20px 0' }}>
          <Link to="/admin/onboard">
            <button className="primary-btn">Onboard New Academy</button>
          </Link>
        </div>

        <div style={{ margin: '20px 0' }}>
          <Link to="/admin/bookings">
            <button className="primary-btn">View admin bookings</button>
          </Link>
        </div>

        <button onClick={handleLogout} className="secondary-btn">Logout</button>
      </div>
    </div>
  );
}
