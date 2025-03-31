
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ExpandableCard from './ExpandableCard';
import { ArrowUpRight, ChevronUp, ChevronDown, CheckCircle2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";

const WhatsAppSetup = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [popupWindow, setPopupWindow] = useState<Window | null>(null);
  const navigate = useNavigate();

  // Mock Shopify token - in a real app, you would get this from Shopify's authentication
  const shopifyAccessToken = "mock_token_for_demo_purposes";

  useEffect(() => {
    // Listen for messages from the popup window
    const handleMessage = (event: MessageEvent) => {
      // Verify the origin to ensure it's coming from your trusted domain
      if (event.origin === "https://app.shoplinx.ai") {
        if (event.data.status === "connected") {
          setIsConnected(true);
          if (popupWindow) {
            popupWindow.close();
          }
          toast.success("Successfully connected to Interakt!");
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [popupWindow]);

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
    
    // Use a more secure approach by not directly including the token in the URL
    // Instead, use a state parameter and temporary code exchange
    const popupUrl = `https://app.shoplinx.ai/auth/shopify?state=${stateParam}`;
    
    const newWindow = window.open(
      popupUrl,
      'ShoplinxAuth',
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes,status=yes`
    );
    
    if (newWindow) {
      setPopupWindow(newWindow);
      
      // Poll to check if the popup is closed
      const checkPopupClosed = setInterval(() => {
        if (newWindow.closed) {
          clearInterval(checkPopupClosed);
          // If the popup closes without authentication completing, handle that case
          if (!isConnected) {
            toast.error("Connection was cancelled");
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
              >
                Connect
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
