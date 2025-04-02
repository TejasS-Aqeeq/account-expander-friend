
import React, { useState } from 'react';
import { 
  Page,
  Card,
  FormLayout,
  TextField,
  Button,
  Text
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
  const handleSubmit = () => {
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
          <Card sectioned>
            <Card.Section title="Welcome to ShopLinx">
              <Text>Connect with your Shopify store</Text>
            </Card.Section>
            <Card.Section>
              <Text>To get started, please connect your Shopify store with ShopLinx.</Text>
            </Card.Section>
            <Card.Section>
              <Button primary onClick={handleSubmit}>Continue</Button>
            </Card.Section>
          </Card>
        );
        
      case 'phone':
        return (
          <Card sectioned>
            <Card.Section title="Enter your phone number">
              <Text>We'll send a code to verify your identity</Text>
            </Card.Section>
            <Card.Section>
              <FormLayout>
                <TextField
                  label="Phone Number"
                  value={phoneNumber}
                  onChange={setPhoneNumber}
                  type="tel"
                  autoComplete="tel"
                  required
                />
                <Button primary onClick={handleSubmit}>Send Code</Button>
              </FormLayout>
            </Card.Section>
          </Card>
        );
        
      case 'otp':
        return (
          <Card sectioned>
            <Card.Section title="Verify OTP">
              <Text>Enter the code sent to {phoneNumber}</Text>
            </Card.Section>
            <Card.Section>
              <FormLayout>
                <TextField
                  label="One-Time Password"
                  value={otp}
                  onChange={setOtp}
                  autoComplete="one-time-code"
                  required
                />
                <Button primary onClick={handleSubmit}>Verify & Connect</Button>
              </FormLayout>
            </Card.Section>
          </Card>
        );
        
      case 'success':
        return (
          <Card sectioned>
            <Card.Section title="Successfully Connected!">
              <Text>Your Shopify store is now connected to ShopLinx</Text>
            </Card.Section>
            <Card.Section>
              <Text>You will be redirected back to the application automatically.</Text>
            </Card.Section>
          </Card>
        );
    }
  };

  return (
    <Page>
      <div style={{ maxWidth: '450px', margin: '0 auto' }}>
        {renderContent()}
      </div>
    </Page>
  );
};

export default ShopifyAuth;
