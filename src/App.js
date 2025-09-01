import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './Register';
import VerifyOtp from './VerifyOtp';
import Login from './Login';
import Dashboard from './Dashboard';
import AdminLogin from './AdminLogin';
import PrivateRoute from './PrivateRoute';
import AdminOnboardAcademy from './AdminOnboardAcademy';
import BookCourt from './BookCourt';
import UserBookings from './UserBookings';
import AdminBookings from './AdminBookings';
import HostActivity from './HostActivity';
import AllActivities from './AllActivities';
import MyHostedActivities from './MyHostedActivities';
import MyRequests from './MyRequests';
import MyActivities from './MyActivities';
import AcademyLanding from './AcademyLanding';
import './styles.css';

export default function App() {
  const [emailForOtp, setEmailForOtp] = useState('');

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/register" />} />
      <Route path="/register" element={<Register onRegistered={setEmailForOtp} />} />
      <Route
        path="/verify-otp"
        element={emailForOtp ? (
          <VerifyOtp email={emailForOtp} onVerified={() => window.location.href = '/login'} />
        ) : (
          <Navigate to="/register" />
        )}
      />
      <Route path="/login" element={<Login />} />

      <Route path="/adminlogin" element={<PrivateRoute requiredRole="superadmin"><AdminLogin /></PrivateRoute>} />
      <Route path="/admin/onboard" element={<PrivateRoute requiredRole="superadmin"><AdminOnboardAcademy /></PrivateRoute>} />
      <Route path="/admin/bookings" element={<PrivateRoute requiredRole="superadmin"><AdminBookings /></PrivateRoute>} />

      
      <Route path="/dashboard" element={<PrivateRoute requiredRole="user"><Dashboard /></PrivateRoute>} />
      <Route path="/book" element={<PrivateRoute requiredRole="user"><BookCourt /></PrivateRoute>} />
      <Route path="/my-bookings" element={<PrivateRoute requiredRole="user"><UserBookings /></PrivateRoute>} />
      <Route path="/host-activity" element={<PrivateRoute requiredRole="user"><HostActivity /></PrivateRoute>} />
      <Route path="/activities" element={<PrivateRoute requiredRole="user"><AllActivities /></PrivateRoute>} />
      <Route path="/my-hosted" element={<PrivateRoute requiredRole="user"><MyHostedActivities /></PrivateRoute>} />
      <Route path="/my-hosted" element={<PrivateRoute requiredRole="user"><MyHostedActivities /></PrivateRoute>} />
      <Route path="/my-requests" element={<PrivateRoute requiredRole="user"><MyRequests /></PrivateRoute>} />
      <Route path="/my-activities" element={<PrivateRoute requiredRole="user"><MyActivities /></PrivateRoute>} />



      <Route path="/academy-setup" element={<PrivateRoute requiredRole="academy"><AcademyLanding /></PrivateRoute>} />
    </Routes>
  );
}
