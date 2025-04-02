
import React, { useState, useEffect } from 'react';
import { 
  Page, 
  Card, 
  Layout, 
  Text, 
  Button, 
  Link, 
  Badge,
  InlineStack,
  BlockStack,
  Box,
  Banner,
  TextContainer
} from '@shopify/polaris';
import { useAuth } from '@/context/AuthContext';

const Dashboard = () => {
  // Get logout function from auth context
  const { logout } = useAuth();
  
  // State to track sync status
  const [syncStatus, setSyncStatus] = useState<'syncing' | 'completed'>('syncing');
  const [approvedCount, setApprovedCount] = useState(6);
  const [rejectedCount, setRejectedCount] = useState(0);
  
  // State for the API number
  const [apiNumber, setApiNumber] = useState('917439469952');
  
  // Simulate sync completion after 5 seconds
  useEffect(() => {
    if (syncStatus === 'syncing') {
      const timer = setTimeout(() => {
        setSyncStatus('completed');
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [syncStatus]);
  
  const handleDisconnect = () => {
    // Use the logout function from auth context
    logout();
  };

  const renderExternalLinkIcon = () => (
    <img 
      src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2313855c' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='m7 17 10-10'/><path d='M7 7h10v10'/></svg>"
      alt=""
      width="16"
      height="16"
    />
  );
  
  return (
    <Page>
      <Box paddingBlockEnd="4">
        <InlineStack align="space-between">
          <BlockStack gap="2">
            <Text variant="headingLg" as="h1">Welcome to your Shopify-synced WhatsApp Store!</Text>
            <Text variant="bodyMd" color="subdued">Manage your WhatsApp store integration with Shopify</Text>
          </BlockStack>
          <InlineStack gap="4">
            <Link url="#" external monochrome removeUnderline>
              <InlineStack gap="1" align="center">
                <Text variant="bodySm" color="success">Quick Tour</Text>
                {renderExternalLinkIcon()}
              </InlineStack>
            </Link>
            <Link url="#" external monochrome removeUnderline>
              <InlineStack gap="1" align="center">
                <Text variant="bodySm" color="success">Get Support</Text>
                {renderExternalLinkIcon()}
              </InlineStack>
            </Link>
          </InlineStack>
        </InlineStack>
      </Box>

      <Layout>
        <Layout.Section oneHalf>
          <Card>
            <BlockStack gap="4">
              <Text variant="headingMd" as="h2">Product Status on ShopLinx</Text>
              
              <Box paddingBlockStart="2">
                {syncStatus === 'syncing' ? (
                  <Banner tone="info">
                    <BlockStack gap="1">
                      <Text variant="bodyMd" fontWeight="medium">Product syncing is in process</Text>
                      <Text variant="bodySm" color="subdued">This may take upto 15mins</Text>
                    </BlockStack>
                  </Banner>
                ) : (
                  <Banner tone="success">
                    <Text variant="bodyMd">All products have been successfully synced to WhatsApp!</Text>
                  </Banner>
                )}
              </Box>
              
              <BlockStack gap="2">
                <Box paddingBlockEnd="2">
                  <InlineStack align="space-between">
                    <Badge tone="success">Approved</Badge>
                    <Text variant="bodyMd">{approvedCount} Products</Text>
                  </InlineStack>
                </Box>
                
                <Box paddingBlockEnd="3">
                  <InlineStack align="space-between">
                    <Badge tone="critical">Rejected</Badge>
                    <Text variant="bodyMd">{rejectedCount} Products</Text>
                  </InlineStack>
                </Box>
              </BlockStack>
              
              <Box display="flex" justifyContent="center">
                <Link url="#" external monochrome removeUnderline>
                  <InlineStack gap="1" align="center">
                    <Text variant="bodySm" color="success">View all products</Text>
                    {renderExternalLinkIcon()}
                  </InlineStack>
                </Link>
              </Box>
            </BlockStack>
          </Card>
        </Layout.Section>
        
        <Layout.Section oneHalf>
          <Card>
            <BlockStack gap="4">
              <Text variant="headingMd" as="h2">ShopLinx account</Text>
              
              <InlineStack gap="3">
                <Box background="bg-surface-secondary" borderRadius="100%" height="40px" width="40px" />
                <BlockStack gap="1" blockAlignment="center">
                  <Text variant="bodyMd">Connected WhatsApp</Text>
                  <Text variant="bodySm" color="subdued">API number</Text>
                  <Text variant="bodyMd">{apiNumber}</Text>
                </BlockStack>
                <Box marginLeft="auto">
                  <Button onClick={handleDisconnect} plain>Disconnect</Button>
                </Box>
              </InlineStack>
              
              <TextContainer>
                <Text variant="bodyMd">
                  Send a WhatsApp message to your WhatsApp API number and reply to it from the{' '}
                  <Link url="#" external monochrome>
                    <InlineStack gap="1" align="center" as="span">
                      <Text variant="bodyMd" color="success" as="span">ShopLinx Inbox</Text>
                      {renderExternalLinkIcon()}
                    </InlineStack>
                  </Link>
                  !
                </Text>
              </TextContainer>
              
              <Box background="bg-surface-secondary" padding="3" borderRadius="2">
                <BlockStack gap="1">
                  <Text variant="bodySm" fontWeight="medium">Note:</Text>
                  <Text variant="bodySm">
                    To start a conversation with a new customer, or, to message customers more than 24 hours after their last reply, you need to send them{' '}
                    <Link url="#" external monochrome>
                      <InlineStack gap="1" align="center" as="span">
                        <Text variant="bodySm" color="success" as="span">pre-approved WhatsApp Templates</Text>
                        {renderExternalLinkIcon()}
                      </InlineStack>
                    </Link>
                  </Text>
                </BlockStack>
              </Box>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
      
      <Box paddingBlockStart="4">
        <Card>
          <BlockStack gap="4">
            <Text variant="headingMd" as="h2">Send WhatsApp Catalog Messages</Text>
            
            <Layout>
              <Layout.Section oneHalf>
                <TextContainer>
                  <Text variant="bodyMd">
                    While chatting with customers on WhatsApp, send them your Shopify products from the ShopLinx inbox.
                  </Text>
                </TextContainer>
              </Layout.Section>
              
              <Layout.Section oneHalf>
                <BlockStack gap="2" align="end">
                  <Text variant="bodyMd">Send your 1st WhatsApp Catalog Message!</Text>
                  <Button tone="success" primary>Go to Inbox</Button>
                  <Link url="#" external monochrome removeUnderline>
                    <InlineStack gap="1" align="center">
                      <Text variant="bodySm" color="success">See how</Text>
                      {renderExternalLinkIcon()}
                    </InlineStack>
                  </Link>
                </BlockStack>
              </Layout.Section>
            </Layout>
          </BlockStack>
        </Card>
      </Box>
    </Page>
  );
};

export default Dashboard;
