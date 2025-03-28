
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ExpandableCard from './ExpandableCard';
import { ArrowUpRight, ChevronUp, ChevronDown, CheckCircle2 } from 'lucide-react';
import { Button } from "@/components/ui/button";

const WhatsAppSetup = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const navigate = useNavigate();

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleConnect = () => {
    // Simulate connection success
    setIsConnected(true);
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
