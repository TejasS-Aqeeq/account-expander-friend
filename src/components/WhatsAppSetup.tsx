
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Page, 
  Card, 
  Button,
  LegacyCard,
  BlockStack,
  Box
} from '@shopify/polaris';
import WhatsAppHeader from './WhatsAppHeader';
import ConnectionCardContent from './ConnectionCardContent';
import WhatsAppFooter from './WhatsAppFooter';
import { useConnectionStatus } from '@/hooks/useConnectionStatus';

const WhatsAppSetup = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const { isConnected, isCheckingConnection, handleConnect } = useConnectionStatus();

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleProceed = () => {
    // Navigate to the dashboard page
    navigate('/dashboard');
  };

  return (
    <Page>
      <Box padding="4" maxWidth="680px" margin="auto">
        <Card>
          <BlockStack gap="4">
            <Box padding="4">
              <WhatsAppHeader />
            </Box>
            
            <Box padding={{horizontal: "4", bottom: "4"}}>
              <LegacyCard
                title="Create a free account on ShopLinx"
                sectioned
                expandable
                expanded={isExpanded}
                onToggle={toggleExpand}
              >
                <ConnectionCardContent 
                  isConnected={isConnected}
                  isCheckingConnection={isCheckingConnection}
                  onConnect={handleConnect}
                />
              </LegacyCard>
            </Box>
            
            <Box padding="4">
              <WhatsAppFooter 
                isConnected={isConnected}
                onProceed={handleProceed}
              />
            </Box>
          </BlockStack>
        </Card>
      </Box>
    </Page>
  );
};

export default WhatsAppSetup;
