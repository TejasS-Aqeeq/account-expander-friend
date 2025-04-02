
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export const useConnectionStatus = () => {
  const [isCheckingConnection, setIsCheckingConnection] = useState(false);
  const { isAuthenticated, login } = useAuth();

  const handleConnect = () => {
    setIsCheckingConnection(true);

    // Open a popup window for authentication
    const width = 600;
    const height = 600;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;
    
    const authWindow = window.open(
      '/auth/shopify',
      'ShopLinx Authentication',
      `width=${width},height=${height},top=${top},left=${left}`
    );

    // Listen for messages from the popup window
    const messageListener = (event: MessageEvent) => {
      if (event.data && event.data.status === 'connected') {
        login();
        authWindow?.close();
        setIsCheckingConnection(false);
        window.removeEventListener('message', messageListener);
      }
    };

    window.addEventListener('message', messageListener);

    // Clean up if the popup is closed without authentication
    const checkClosed = setInterval(() => {
      if (authWindow?.closed) {
        clearInterval(checkClosed);
        setIsCheckingConnection(false);
        window.removeEventListener('message', messageListener);
      }
    }, 500);
  };

  return {
    isConnected: isAuthenticated,
    isCheckingConnection,
    handleConnect
  };
};
