
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
        className="bg-green-500 hover:bg-green-600 text-white" 
        disabled
      >
        Connected
      </Button>
    );
  }
  
  return (
    <Button 
      className="bg-teal-600 hover:bg-teal-700" 
      onClick={onConnect}
      disabled={isCheckingConnection}
    >
      {isCheckingConnection ? "Connecting..." : "Connect"}
    </Button>
  );
};

export default ConnectButton;
