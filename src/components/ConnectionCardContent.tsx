
import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import ConnectButton from './ConnectButton';

interface ConnectionCardContentProps {
  isConnected: boolean;
  isCheckingConnection: boolean;
  onConnect: () => void;
}

const ConnectionCardContent: React.FC<ConnectionCardContentProps> = ({
  isConnected,
  isCheckingConnection,
  onConnect
}) => {
  return (
    <div className="py-4">
      <div className="flex justify-between items-center mb-4">
        <div className="text-gray-600">Interakt Account</div>
        <ConnectButton 
          isConnected={isConnected}
          isCheckingConnection={isCheckingConnection}
          onConnect={onConnect}
        />
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
  );
};

export default ConnectionCardContent;
