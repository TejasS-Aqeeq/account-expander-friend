
import React, { useEffect, useState } from 'react';
import {
  Page,
  Card,
  BlockStack,
  Text,
  TextField,
  Button,
  Frame,
  Box,
  FormLayout
} from '@shopify/polaris';

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
          <Card>
            <BlockStack gap="4">
              <BlockStack gap="1">
                <Text variant="headingLg" as="h2">Welcome to ShopLinx</Text>
                <Text variant="bodyMd" color="subdued">Connect with your Shopify store</Text>
              </BlockStack>
              
              <Text variant="bodyMd">To get started, please connect your Shopify store with ShopLinx.</Text>
              
              <Box paddingBlockStart="2">
                <Button primary onClick={() => setStep('phone')} fullWidth>Continue</Button>
              </Box>
            </BlockStack>
          </Card>
        );
        
      case 'phone':
        return (
          <Card>
            <BlockStack gap="4">
              <BlockStack gap="1">
                <Text variant="headingLg" as="h2">Enter your phone number</Text>
                <Text variant="bodyMd" color="subdued">We'll send a code to verify your identity</Text>
              </BlockStack>
              
              <form onSubmit={handleSubmit}>
                <FormLayout>
                  <TextField
                    label="Phone Number"
                    value={phoneNumber}
                    onChange={(value) => setPhoneNumber(value)}
                    type="tel"
                    autoComplete="tel"
                    requiredIndicator
                  />
                  
                  <Box paddingBlockStart="2">
                    <Button primary submit fullWidth>Send Code</Button>
                  </Box>
                </FormLayout>
              </form>
            </BlockStack>
          </Card>
        );
        
      case 'otp':
        return (
          <Card>
            <BlockStack gap="4">
              <BlockStack gap="1">
                <Text variant="headingLg" as="h2">Verify OTP</Text>
                <Text variant="bodyMd" color="subdued">Enter the code sent to {phoneNumber}</Text>
              </BlockStack>
              
              <form onSubmit={handleSubmit}>
                <FormLayout>
                  <TextField
                    label="One-Time Password"
                    value={otp}
                    onChange={(value) => setOtp(value)}
                    autoComplete="one-time-code"
                    requiredIndicator
                  />
                  
                  <Box paddingBlockStart="2">
                    <Button primary submit fullWidth>Verify & Connect</Button>
                  </Box>
                </FormLayout>
              </form>
            </BlockStack>
          </Card>
        );
        
      case 'success':
        return (
          <Card>
            <BlockStack gap="4">
              <BlockStack gap="1">
                <Text variant="headingLg" as="h2">Successfully Connected!</Text>
                <Text variant="bodyMd" color="subdued">Your Shopify store is now connected to ShopLinx</Text>
              </BlockStack>
              
              <Text variant="bodyMd">You will be redirected back to the application automatically.</Text>
            </BlockStack>
          </Card>
        );
    }
  };

  return (
    <Frame>
      <Page>
        <div style={{ 
          display: 'flex', 
          minHeight: '100vh', 
          alignItems: 'center', 
          justifyContent: 'center', 
          padding: '1rem' 
        }}>
          <Box maxWidth="450px" width="100%">
            {renderContent()}
          </Box>
        </div>
      </Page>
    </Frame>
  );
};

export default ShopifyAuth;
