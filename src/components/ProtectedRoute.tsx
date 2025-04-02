
import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Additional check to ensure authentication state is consistent
  useEffect(() => {
    // Check localStorage directly to ensure authentication state is correct
    const authStatus = localStorage.getItem('shoplinx_connection_status');
    if (authStatus !== 'connected' && isAuthenticated) {
      // If localStorage indicates not connected but state says authenticated,
      // refresh auth context by triggering navigation
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
