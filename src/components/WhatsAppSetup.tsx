
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ExpandableCard from './ExpandableCard';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const WhatsAppSetup = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [popupWindow, setPopupWindow] = useState<Window | null>(null);
  const [isCheckingConnection, setIsCheckingConnection] = useState(false);
  const navigate = useNavigate();

  // Mock Shopify token - in a real app, you would get this from Shopify's authentication
  const shopifyAccessToken = "mock_token_for_demo_purposes";

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

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleConnect = () => {
    // Instead of simulating connection success, open a popup to the external authentication page
    const width = 600;
    const height = 700;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;
    
    // Create a state parameter for additional security (CSRF protection)
    const stateParam = generateRandomString(32);
    
    // Store the state parameter in sessionStorage for verification when the popup returns
    sessionStorage.setItem('shoplinx_auth_state', stateParam);
    
    // Create the popup URL with the state parameter
    const popupUrl = `https://app.shoplinx.ai/auth/shopify?state=${stateParam}`;
    
    // Open the popup window
    const newWindow = window.open(
      popupUrl,
      'ShoplinxAuth',
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes,status=yes`
    );
    
    if (newWindow) {
      setPopupWindow(newWindow);
      setIsCheckingConnection(true);
      
      // Create a simple HTML page with the script
      const popupContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Connecting to ShopLinx</title>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
            .loader { border: 5px solid #f3f3f3; border-top: 5px solid #3498db; border-radius: 50%; width: 50px; height: 50px; animation: spin 2s linear infinite; margin: 20px auto; }
            @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
          </style>
        </head>
        <body>
          <h2>Connecting to ShopLinx...</h2>
          <div class="loader"></div>
          <p>Please wait while we connect your account. This window will close automatically when complete.</p>
          
          <script>
            // Function to notify the parent window and close this popup
            function completeConnection() {
              console.log("Attempting to notify parent window");
              if (window.opener) {
                try {
                  // Try to send a message to the parent window
                  window.opener.postMessage({status: 'connected'}, "*");
                  console.log("Message sent to parent");
                } catch (e) {
                  console.error("Error posting message:", e);
                }
                
                // Also set localStorage as a backup method
                try {
                  localStorage.setItem('interakt_connection_status', 'connected');
                  console.log("LocalStorage set");
                } catch (e) {
                  console.error("Error setting localStorage:", e);
                }
              }
              
              // Close this window after sending the message
              setTimeout(() => {
                window.close();
              }, 500);
            }
            
            // For demo purposes, simulate a successful connection after 3 seconds
            setTimeout(completeConnection, 3000);
            
            // If this were a real authentication flow, you would redirect to the actual auth URL
            // and then handle the callback with a script similar to this one
          </script>
        </body>
        </html>
      `;
      
      try {
        // Write the content to the popup
        newWindow.document.open();
        newWindow.document.write(popupContent);
        newWindow.document.close();
      } catch (error) {
        console.error("Error writing to popup:", error);
        // If we can't write to the popup (cross-origin restriction),
        // we'll rely on the existing URL-based approach
      }
      
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

  // Generate a random string for state parameter
  const generateRandomString = (length: number) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handleProceed = () => {
    // Navigate to the dashboard page
    navigate('/dashboard');
  };

  return (
    <div className="max-w-3xl mx-auto bg-gray-50 p-6 rounded-lg shadow-sm">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-xl font-semibold text-gray-700">Set up your Shopify-synced WhatsApp Store!</h1>
          <a href="#" className="text-teal-600 hover:text-teal-700 text-sm flex items-center">
            Get Support <ArrowUpRight className="ml-1 h-4 w-4" />
          </a>
        </div>
        <p className="text-gray-500 mb-2">
          Interakt is an Official WhatsApp Business Service Provider.
        </p>
        <p className="text-gray-500">
          We enable businesses to better utilize WhatsApp by accessing WhatsApp APIs.
        </p>
      </div>

      <ExpandableCard 
        title="Create a free account on Interakt"
        isOpen={isExpanded}
        onToggle={toggleExpand}
        isCompleted={isConnected}
      >
        <div className="py-4">
          <div className="flex justify-between items-center mb-4">
            <div className="text-gray-600">Interakt Account</div>
            {isConnected ? (
              <Button 
                className="bg-green-500 hover:bg-green-600 text-white" 
                disabled
              >
                Connected
              </Button>
            ) : (
              <Button 
                className="bg-teal-600 hover:bg-teal-700" 
                onClick={handleConnect}
                disabled={isCheckingConnection}
              >
                {isCheckingConnection ? "Connecting..." : "Connect"}
              </Button>
            )}
          </div>
          
          <p className="text-gray-600 mb-4">
            By clicking on Connect, you will be able to create an Interakt account and connect it to your Shopify Store.
          </p>
          
          <p className="text-gray-500 mb-2">
            Note: A 14 days free trial with access to premium features will immediately start after you sign up. After the trial, you may continue in a Free Forever Plan (Unlimited conversations with 200 contacts/month & 400 notifications/month) or upgrade to our Starter ($15 per month) or Growth ($29 per month) plans.
          </p>
          
          <a href="#" className="text-teal-600 hover:text-teal-700 text-sm flex items-center">
            Terms & Conditions <ArrowUpRight className="ml-1 h-4 w-4" />
          </a>
        </div>
      </ExpandableCard>

      <div className="mt-6 flex justify-center">
        <Button
          className={isConnected ? "bg-teal-600 hover:bg-teal-700" : "bg-gray-300 text-gray-500 cursor-not-allowed hover:bg-gray-300"}
          disabled={!isConnected}
          onClick={handleProceed}
        >
          Proceed
        </Button>
      </div>

      <div className="mt-10 flex justify-center">
        <a href="#" className="text-teal-600 hover:text-teal-700 text-sm flex items-center">
          Learn More about Interakt <ArrowUpRight className="ml-1 h-4 w-4" />
        </a>
      </div>
    </div>
  );
};

export default WhatsAppSetup;
