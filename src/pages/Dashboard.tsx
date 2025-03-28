
import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  // State to track sync status
  const [syncStatus, setSyncStatus] = useState<'syncing' | 'completed'>('syncing');
  const [approvedCount, setApprovedCount] = useState(6);
  const [rejectedCount, setRejectedCount] = useState(0);
  
  // State for the API number
  const [apiNumber, setApiNumber] = useState('917439469952');
  
  // Simulate sync completion after 5 seconds
  React.useEffect(() => {
    if (syncStatus === 'syncing') {
      const timer = setTimeout(() => {
        setSyncStatus('completed');
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [syncStatus]);
  
  const handleDisconnect = () => {
    // Handle disconnect logic here
    console.log("Disconnecting Interakt account");
    // In a real app, we would make an API call here
  };
  
  return (
    <div className="max-w-5xl mx-auto bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-700">Welcome to your Shopify-synced WhatsApp Store!</h1>
          <p className="text-gray-500 mt-2">Manage your WhatsApp store integration with Shopify</p>
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="text-teal-600 hover:text-teal-700 text-sm flex items-center">
            Quick Tour <ArrowUpRight className="ml-1 h-4 w-4" />
          </a>
          <a href="#" className="text-teal-600 hover:text-teal-700 text-sm flex items-center">
            Get Support <ArrowUpRight className="ml-1 h-4 w-4" />
          </a>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Product Status Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Product Status on Interakt</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg mb-4">
              {syncStatus === 'syncing' ? (
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-700 font-medium">Product syncing is in process</p>
                    <p className="text-gray-500 text-sm">This may take upto 15mins</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <p className="text-gray-700">All products have been successfully synced to WhatsApp!</p>
                </div>
              )}
            </div>
            
            <div className="flex justify-between items-center mb-2">
              <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100 px-3 py-1">Approved</Badge>
              <span className="text-gray-700">{approvedCount} Products</span>
            </div>
            
            <div className="flex justify-between items-center mb-4">
              <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100 px-3 py-1">Rejected</Badge>
              <span className="text-gray-700">{rejectedCount} Products</span>
            </div>
            
            <div className="text-center">
              <a href="#" className="text-teal-600 hover:text-teal-700 text-sm flex items-center justify-center">
                View all products <ArrowUpRight className="ml-1 h-4 w-4" />
              </a>
            </div>
          </CardContent>
        </Card>
        
        {/* Interakt Account Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Interakt account</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start mb-4">
              <div className="h-10 w-10 bg-amber-200 rounded-full flex-shrink-0 mr-3"></div>
              <div className="flex-grow">
                <div className="flex justify-between w-full">
                  <div>
                    <p className="text-gray-700">Connected WhatsApp</p>
                    <p className="text-gray-500">API number</p>
                    <p className="text-gray-700">{apiNumber}</p>
                  </div>
                  <Button 
                    variant="outline" 
                    className="border-gray-300 hover:bg-gray-100 text-gray-700"
                    onClick={handleDisconnect}
                  >
                    Disconnect
                  </Button>
                </div>
              </div>
            </div>
            
            <p className="text-gray-600 mb-1">
              Send a WhatsApp message to your WhatsApp API number and reply to it from the{' '}
              <a href="#" className="text-teal-600 hover:text-teal-700 inline-flex items-center">
                Interakt Inbox <ArrowUpRight className="ml-1 h-3 w-3" />
              </a>{' '}
              !
            </p>
            
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 mt-3">
              <p className="text-gray-600 text-sm font-medium mb-1">Note:</p>
              <p className="text-gray-600 text-sm">
                To start a conversation with a new customer, or, to message customers more than 24 hours after their last reply, you need to send them{' '}
                <a href="#" className="text-teal-600 hover:text-teal-700 inline-flex items-center">
                  pre-approved WhatsApp Templates <ArrowUpRight className="ml-1 h-3 w-3" />
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Additional Section: Send WhatsApp Catalog Messages */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Send WhatsApp Catalog Messages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between">
            <div className="md:w-1/2 mb-4 md:mb-0">
              <p className="text-gray-600">
                While chatting with customers on WhatsApp, send them your Shopify products from the Interakt inbox.
              </p>
            </div>
            <div className="md:w-1/2 flex flex-col items-center md:items-end">
              <p className="text-gray-600 mb-2">Send your 1st WhatsApp Catalog Message!</p>
              <Button className="bg-teal-600 hover:bg-teal-700">
                Go to Inbox
              </Button>
              <a href="#" className="text-teal-600 hover:text-teal-700 text-sm flex items-center mt-2">
                See how <ArrowUpRight className="ml-1 h-4 w-4" />
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
