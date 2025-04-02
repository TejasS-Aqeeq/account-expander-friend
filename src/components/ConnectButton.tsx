
import React from 'react';
import { Button } from '@shopify/polaris';

interface ConnectButtonProps {
  isConnected: boolean;
  isCheckingConnection: boolean;
  onConnect: () => void;
}

const ConnectButton: React.FC<ConnectButtonProps> = ({ 
  isConnected, 
  isCheckingConnection, 
  onConnect 
}) => {
  if (isConnected) {
    return (
      <Button disabled>Connected</Button>
    );
  }
  
  return (
    <Button 
      onClick={onConnect}
      loading={isCheckingConnection}
      primary
    >
      {isCheckingConnection ? "Connecting..." : "Connect"}
    </Button>
  );
};

export default ConnectButton;
