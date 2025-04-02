
import React from 'react';
import { Button } from "@shopify/polaris";

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
      <Button
        disabled
        tone="success"
      >
        Connected
      </Button>
    );
  }
  
  return (
    <Button
      onClick={onConnect}
      disabled={isCheckingConnection}
      tone="success"
    >
      {isCheckingConnection ? "Connecting..." : "Connect"}
    </Button>
  );
};

export default ConnectButton;
