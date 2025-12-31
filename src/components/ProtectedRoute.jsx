
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { currentUser } = useAuth(); // Assuming useAuth provides loading state too ideally, but for now simple check

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return children;
}
