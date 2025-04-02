
import React from 'react';
import { 
  Page, 
  Layout, 
  Card, 
  Text, 
  Button 
} from '@shopify/polaris';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { logout } = useAuth();
  
  return (
    <Page title="ShopLinx Dashboard">
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <Text variant="headingMd">Welcome to your WhatsApp Store</Text>
            <Text variant="bodyLg">
              Your Shopify store is now connected to WhatsApp via ShopLinx.
            </Text>
          </Card>
        </Layout.Section>
        
        <Layout.Section secondary>
          <Card sectioned>
            <Card.Section>
              <Text variant="headingMd">Account Status</Text>
              <Text variant="bodyMd">Connected</Text>
            </Card.Section>
            <Card.Section>
              <Button onClick={logout}>Disconnect</Button>
            </Card.Section>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default Dashboard;
