
import React, { useEffect } from 'react';
import WhatsAppSetup from '@/components/WhatsAppSetup';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const Index = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <WhatsAppSetup />
    </div>
  );
};

export default Index;
