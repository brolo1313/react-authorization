// AppRoutes.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/auth/components/Login';
import Registration from './pages/auth/components/Registration';
import ResetPassword from './pages/auth/components/ResetPassword';
import PrivateRoute from './shared/helpers/privateRoute';
import Dashboard from './pages/dashboard/Dashboard';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
    </Routes>
  );
};

export default AppRoutes;
