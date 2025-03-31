
import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const WhatsAppHeader: React.FC = () => {
  return (
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
  );
};

export default WhatsAppHeader;
