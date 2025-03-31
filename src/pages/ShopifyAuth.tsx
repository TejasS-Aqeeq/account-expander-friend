
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ChevronDown } from "lucide-react";

// Define auth steps for the flow
type AuthStep = 'initial' | 'phone' | 'otp' | 'success';

const ShopifyAuth = () => {
  const [step, setStep] = useState<AuthStep>('initial');
  const [phoneNumber, setPhoneNumber] = useState('+91');
  const [otp, setOtp] = useState('');
  
  // Get the state parameter from URL for CSRF protection
  const urlParams = new URLSearchParams(window.location.search);
  const stateParam = urlParams.get('state') || '';
  
  const handleLogin = () => {
    setStep('phone');
  };
  
  const handlePhoneSubmit = () => {
    if (phoneNumber.length < 10) {
      toast.error("Please enter a valid phone number");
      return;
    }
    
    toast.success("OTP sent successfully");
    setStep('otp');
  };
  
  const handleOtpSubmit = () => {
    if (otp.length < 4) {
      toast.error("Please enter a valid OTP");
      return;
    }
    
    toast.success("Authentication successful");
    setStep('success');
    
    // Display success and notify parent window after a delay
    setTimeout(() => {
      notifyParentAndClose();
    }, 1500);
  };
  
  const notifyParentAndClose = () => {
    // Try to notify parent window via postMessage
    if (window.opener) {
      try {
        window.opener.postMessage({ status: 'connected' }, "*");
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
    
    // Close window after a short delay
    setTimeout(() => window.close(), 500);
  };
  
  const goBackToLogin = () => {
    setStep('phone');
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-300 to-green-400 flex items-center justify-center">
      <div className="w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        {/* BETA Badge and Logo */}
        <div className="flex flex-col items-center mb-6 relative">
          <div className="absolute right-0 top-0">
            <div className="flex items-center text-xs text-gray-500 border border-gray-200 rounded-full px-3 py-1">
              <span className="relative flex h-2 w-2 mr-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
              </span>
              BETA
            </div>
          </div>
          <h1 className="text-3xl font-bold text-blue-700">ShopLinx</h1>
          <p className="text-gray-500 mt-2">Helping businesses grow with AI.</p>
        </div>
        
        {step === 'initial' && (
          <>
            <div className="space-y-4 mt-8">
              <Button 
                className="w-full bg-teal-400 hover:bg-teal-500 text-white"
                onClick={handleLogin}
              >
                Login
              </Button>
              
              <Button 
                className="w-full bg-gray-400 hover:bg-gray-500 text-white"
                variant="secondary"
              >
                Sign Up
              </Button>
            </div>
            
            <div className="mt-6 text-center text-xs text-gray-500">
              <p>Privacy Policy</p>
              <p>Terms and Conditions</p>
            </div>
          </>
        )}
        
        {step === 'phone' && (
          <>
            <div className="space-y-4 mt-6">
              <div>
                <Label htmlFor="phone">Mobile No. *</Label>
                <div className="flex mt-1">
                  <div className="flex items-center border border-gray-300 rounded-l-md px-3 bg-gray-50">
                    <span className="text-sm">🇮🇳</span>
                    <ChevronDown className="h-4 w-4 ml-1 text-gray-500" />
                  </div>
                  <Input
                    id="phone"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="rounded-l-none"
                  />
                </div>
              </div>
              
              <Button 
                className="w-full bg-teal-400 hover:bg-teal-500 text-white"
                onClick={handlePhoneSubmit}
              >
                Login
              </Button>
              
              <div className="text-center text-sm">
                <span className="text-gray-500">Don't have an account? </span>
                <span className="text-teal-500">Sign Up</span>
              </div>
            </div>
          </>
        )}
        
        {step === 'otp' && (
          <>
            <div className="space-y-4 mt-6">
              <div className="flex flex-col items-center space-y-2">
                <InputOTP maxLength={4} value={otp} onChange={setOtp}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} className="w-12 h-12" />
                    <InputOTPSlot index={1} className="w-12 h-12" />
                    <InputOTPSlot index={2} className="w-12 h-12" />
                    <InputOTPSlot index={3} className="w-12 h-12" />
                  </InputOTPGroup>
                </InputOTP>
                
                <span className="text-teal-500 text-sm cursor-pointer">
                  Resend OTP
                </span>
              </div>
              
              <Button 
                className="w-full bg-teal-400 hover:bg-teal-500 text-white mt-4"
                onClick={handleOtpSubmit}
              >
                Submit
              </Button>
              
              <Button 
                className="w-full bg-gray-400 hover:bg-gray-500 text-white"
                variant="secondary"
                onClick={goBackToLogin}
              >
                Back to Login
              </Button>
            </div>
          </>
        )}
        
        {step === 'success' && (
          <div className="text-center py-6">
            <div className="animate-bounce mx-auto h-16 w-16 text-green-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Successfully Connected!</h2>
            <p className="text-gray-600 mt-2">
              Your Shopify store is now connected to Interakt.
            </p>
            <p className="text-gray-500 mt-4">
              This window will close automatically...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopifyAuth;
