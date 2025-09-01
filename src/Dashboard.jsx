import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleBookCourt = () => {
    navigate('/book');
  };

  const handleMyBookings = () => {
    navigate('/my-bookings');
  }

  if (!user) {
    return (
      <div>
        <p>Unauthorized access. Redirecting...</p>
        {setTimeout(() => navigate('/login'), 1000)}
      </div>
    );
  }

  return (
    <div>
      <h2>Welcome, {user.email}</h2>
      <p>Phone: {user.phone}</p>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleBookCourt}>Book a Court</button>
      <button onClick={handleMyBookings}>My Bookings</button>

      <Link to="/host-activity">
        <button className="primary-btn">Host an Activity</button>
      </Link>

      <Link to="/activities">
        <button className="secondary-btn">View All Activities</button>
      </Link>

      <Link to="/my-hosted"><button>My Hosted Activities</button></Link>

      <Link to="/my-requests"><button>My Join Requests</button></Link>

      <Link to="/my-activities">
        <button>My Upcoming Activities</button>
      </Link>




    </div>
  );
}
