
import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface WhatsAppFooterProps {
  isConnected: boolean;
  onProceed: () => void;
}

const WhatsAppFooter: React.FC<WhatsAppFooterProps> = ({ isConnected, onProceed }) => {
  return (
    <>
      <div className="mt-6 flex justify-center">
        <Button
          className={isConnected ? "bg-teal-600 hover:bg-teal-700" : "bg-gray-300 text-gray-500 cursor-not-allowed hover:bg-gray-300"}
          disabled={!isConnected}
          onClick={onProceed}
        >
          Proceed
        </Button>
      </div>

      <div className="mt-10 flex justify-center">
        <a href="#" className="text-teal-600 hover:text-teal-700 text-sm flex items-center">
          Learn More about Interakt <ArrowUpRight className="ml-1 h-4 w-4" />
        </a>
      </div>
    </>
  );
};

export default WhatsAppFooter;
