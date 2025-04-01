
import { useState, useEffect } from 'react';
import { toast } from "sonner";
import { openAuthPopup } from '@/utils/authPopupUtils';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const useConnectionStatus = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [popupWindow, setPopupWindow] = useState<Window | null>(null);
  const [isCheckingConnection, setIsCheckingConnection] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  // Check local storage on mount for persistent connection status
  useEffect(() => {
    const connectionStatus = localStorage.getItem('shoplinx_connection_status');
    if (connectionStatus === 'connected') {
      setIsConnected(true);
      // If already connected and on index page, redirect to dashboard
      navigate('/dashboard');
    }
  }, [navigate]);

  useEffect(() => {
    // Listen for messages from the popup window
    const handleMessage = (event: MessageEvent) => {
      console.log("Received message:", event.data);
      // Verify the origin in a production environment
      // In development, we'll accept all origins for testing
      if (event.data.status === "connected") {
        setIsConnected(true);
        setIsCheckingConnection(false);
        login(); // Update auth context
        if (popupWindow && !popupWindow.closed) {
          popupWindow.close();
        }
        toast.success("Successfully connected to ShopLinx!");
        // Redirect to dashboard upon successful connection
        navigate('/dashboard');
      }
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [popupWindow, login, navigate]);

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
          const connectionStatus = localStorage.getItem('shoplinx_connection_status');
          if (connectionStatus === 'connected') {
            setIsConnected(true);
            login(); // Update auth context
            toast.success("Successfully connected to ShopLinx!");
            // Redirect to dashboard after connection
            navigate('/dashboard');
            localStorage.removeItem('shoplinx_connection_status'); // Clean up
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
  }, [popupWindow, isConnected, isCheckingConnection, login, navigate]);

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
            const connectionStatus = localStorage.getItem('shoplinx_connection_status');
            if (connectionStatus === 'connected') {
              setIsConnected(true);
              login(); // Update auth context
              toast.success("Successfully connected to ShopLinx!");
              // Redirect to dashboard
              navigate('/dashboard');
              localStorage.removeItem('shoplinx_connection_status'); // Clean up
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
