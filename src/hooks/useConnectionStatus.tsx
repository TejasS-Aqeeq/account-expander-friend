
import { useState, useEffect } from 'react';
import { toast } from "sonner";
import { openAuthPopup } from '@/utils/authPopupUtils';

export const useConnectionStatus = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [popupWindow, setPopupWindow] = useState<Window | null>(null);
  const [isCheckingConnection, setIsCheckingConnection] = useState(false);

  useEffect(() => {
    // Listen for messages from the popup window
    const handleMessage = (event: MessageEvent) => {
      console.log("Received message:", event.data);
      // Verify the origin in a production environment
      // In development, we'll accept all origins for testing
      if (event.data.status === "connected") {
        setIsConnected(true);
        setIsCheckingConnection(false);
        if (popupWindow && !popupWindow.closed) {
          popupWindow.close();
        }
        toast.success("Successfully connected to Interakt!");
      }
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [popupWindow]);

  // Add this effect to periodically check if the connection was successful
  // This is a backup in case the postMessage doesn't work
  useEffect(() => {
    if (!popupWindow || isConnected || !isCheckingConnection) return;

    const checkConnectionInterval = setInterval(() => {
      try {
        // If the window is closed, check if we should mark as connected
        if (popupWindow.closed) {
          // We can simulate a successful connection here or check with an API
          // For this demo, we'll check localStorage which the popup might have set
          const connectionStatus = localStorage.getItem('interakt_connection_status');
          if (connectionStatus === 'connected') {
            setIsConnected(true);
            toast.success("Successfully connected to Interakt!");
            localStorage.removeItem('interakt_connection_status'); // Clean up
          } else {
            // Only show error if we haven't already marked as connected
            if (!isConnected) {
              toast.error("Connection was not completed");
            }
          }
          setIsCheckingConnection(false);
          clearInterval(checkConnectionInterval);
        }
      } catch (error) {
        // Handle cross-origin errors which might occur when checking window properties
        console.error("Error checking popup status:", error);
      }
    }, 1000);

    return () => {
      clearInterval(checkConnectionInterval);
    };
  }, [popupWindow, isConnected, isCheckingConnection]);

  const handleConnect = () => {
    const newWindow = openAuthPopup();
    if (newWindow) {
      setPopupWindow(newWindow);
      setIsCheckingConnection(true);
      
      // Poll to check if the popup is closed
      const checkPopupClosed = setInterval(() => {
        if (newWindow.closed) {
          clearInterval(checkPopupClosed);
          // If the popup closes without authentication completing, handle that case
          if (!isConnected && isCheckingConnection) {
            // Check localStorage one more time before showing an error
            const connectionStatus = localStorage.getItem('interakt_connection_status');
            if (connectionStatus === 'connected') {
              setIsConnected(true);
              toast.success("Successfully connected to Interakt!");
              localStorage.removeItem('interakt_connection_status'); // Clean up
            } else {
              setIsCheckingConnection(false);
            }
          }
        }
      }, 500);
    } else {
      toast.error("Popup blocked by browser. Please allow popups for this site.");
    }
  };

  return {
    isConnected,
    isCheckingConnection,
    handleConnect,
    setIsConnected
  };
};
