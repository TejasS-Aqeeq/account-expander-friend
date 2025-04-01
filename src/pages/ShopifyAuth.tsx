
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ShopifyAuth = () => {
  const [step, setStep] = useState<'initial' | 'phone' | 'otp' | 'success'>('initial');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');

  // Function to handle login completion
  const completeLogin = () => {
    // Set connection status in localStorage for persistence
    localStorage.setItem('shoplinx_connection_status', 'connected');
    
    // Send message to parent window about successful connection
    if (window.opener) {
      window.opener.postMessage({ status: 'connected' }, '*');
      // Close this window after a short delay
      setTimeout(() => window.close(), 1000);
    }
  };

  // Handle form submissions based on step
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 'initial') {
      setStep('phone');
    } else if (step === 'phone' && phoneNumber) {
      setStep('otp');
    } else if (step === 'otp' && otp) {
      setStep('success');
      completeLogin();
    }
  };

  // Render different content based on step
  const renderContent = () => {
    switch (step) {
      case 'initial':
        return (
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Welcome to ShopLinx</CardTitle>
              <CardDescription>Connect with your Shopify store</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">To get started, please connect your Shopify store with ShopLinx.</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => setStep('phone')}>Continue</Button>
            </CardFooter>
          </Card>
        );
        
      case 'phone':
        return (
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Enter your phone number</CardTitle>
              <CardDescription>We'll send a code to verify your identity</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input 
                      id="phoneNumber" 
                      placeholder="Enter your phone number" 
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleSubmit}>Send Code</Button>
            </CardFooter>
          </Card>
        );
        
      case 'otp':
        return (
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Verify OTP</CardTitle>
              <CardDescription>Enter the code sent to {phoneNumber}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="otp">One-Time Password</Label>
                    <Input 
                      id="otp" 
                      placeholder="Enter OTP" 
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleSubmit}>Verify & Connect</Button>
            </CardFooter>
          </Card>
        );
        
      case 'success':
        return (
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Successfully Connected!</CardTitle>
              <CardDescription>Your Shopify store is now connected to ShopLinx</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">You will be redirected back to the application automatically.</p>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      {renderContent()}
    </div>
  );
};

export default ShopifyAuth;
