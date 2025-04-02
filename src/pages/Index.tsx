
import React, { useEffect } from 'react';
import WhatsAppSetup from '@/components/WhatsAppSetup';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Frame } from '@shopify/polaris';

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
    <Frame>
      <div style={{ minHeight: '100vh', backgroundColor: '#f6f6f7', padding: '2rem' }}>
        <WhatsAppSetup />
      </div>
    </Frame>
  );
};

export default Index;
