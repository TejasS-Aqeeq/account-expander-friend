
import React from 'react';
import { Button } from "@/components/ui/button";

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
        variant="default"
        className="bg-green-500 hover:bg-green-600 text-white" 
        disabled
      >
        Connected
      </Button>
    );
  }
  
  return (
    <Button 
      variant="default"
      className="bg-teal-400 hover:bg-teal-500" 
      onClick={onConnect}
      disabled={isCheckingConnection}
    >
      {isCheckingConnection ? "Connecting..." : "Connect"}
    </Button>
  );
};

export default ConnectButton;
