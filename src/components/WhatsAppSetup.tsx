
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  Page, 
  Layout, 
  Collapsible 
} from '@shopify/polaris';
import WhatsAppHeader from './WhatsAppHeader';
import ConnectionCardContent from './ConnectionCardContent';
import WhatsAppFooter from './WhatsAppFooter';
import { useConnectionStatus } from '../hooks/useConnectionStatus';

const WhatsAppSetup = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const { isConnected, isCheckingConnection, handleConnect } = useConnectionStatus();

  const handleProceed = () => {
    // Navigate to the dashboard page
    navigate('/dashboard');
  };

  const toggleCollapsible = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Page>
      <Layout>
        <Layout.Section>
          <Card>
            <Card.Section>
              <WhatsAppHeader />
            </Card.Section>
            
            <Card.Section 
              title="Create a free account on ShopLinx"
              onClick={toggleCollapsible}
            >
              <Collapsible 
                open={isExpanded} 
                id="whatsapp-connection-collapsible"
              >
                <ConnectionCardContent 
                  isConnected={isConnected}
                  isCheckingConnection={isCheckingConnection}
                  onConnect={handleConnect}
                />
              </Collapsible>
            </Card.Section>
            
            <Card.Section>
              <WhatsAppFooter 
                isConnected={isConnected}
                onProceed={handleProceed}
              />
            </Card.Section>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default WhatsAppSetup;
