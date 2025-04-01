
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ExpandableCard from './ExpandableCard';
import WhatsAppHeader from './WhatsAppHeader';
import ConnectionCardContent from './ConnectionCardContent';
import WhatsAppFooter from './WhatsAppFooter';
import { useConnectionStatus } from '@/hooks/useConnectionStatus';

const WhatsAppSetup = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const { isConnected, isCheckingConnection, handleConnect } = useConnectionStatus();

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleProceed = () => {
    // Navigate to the dashboard page
    navigate('/dashboard');
  };

  return (
    <div className="max-w-3xl mx-auto bg-gray-50 p-6 rounded-lg shadow-sm">
      <WhatsAppHeader />

      <ExpandableCard 
        title="Create a free account on ShopLinx"
        isOpen={isExpanded}
        onToggle={toggleExpand}
        isCompleted={isConnected}
      >
        <ConnectionCardContent 
          isConnected={isConnected}
          isCheckingConnection={isCheckingConnection}
          onConnect={handleConnect}
        />
      </ExpandableCard>

      <WhatsAppFooter 
        isConnected={isConnected}
        onProceed={handleProceed}
      />
    </div>
  );
};

export default WhatsAppSetup;
