
import React from 'react';
import { 
  Text, 
  Link,
  TextContainer
} from '@shopify/polaris';
import { ExternalMinor } from '@shopify/polaris-icons';
import ConnectButton from './ConnectButton';

interface ConnectionCardContentProps {
  isConnected: boolean;
  isCheckingConnection: boolean;
  onConnect: () => void;
}

const ConnectionCardContent: React.FC<ConnectionCardContentProps> = ({
  isConnected,
  isCheckingConnection,
  onConnect
}) => {
  return (
    <div style={{ padding: '1rem 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <Text variant="bodyMd" color="subdued">ShopLinx Account</Text>
        <ConnectButton 
          isConnected={isConnected}
          isCheckingConnection={isCheckingConnection}
          onConnect={onConnect}
        />
      </div>
      
      <TextContainer>
        <Text variant="bodyMd" color="subdued">
          By clicking on Connect, you will be able to create a ShopLinx account and connect it to your Shopify Store.
        </Text>
      </TextContainer>
      
      <TextContainer>
        <Text variant="bodySm" color="subdued">
          Note: A 14 days free trial with access to premium features will immediately start after you sign up. After the trial, you may continue in a Free Forever Plan (Unlimited conversations with 200 contacts/month & 400 notifications/month) or upgrade to our Starter ($15 per month) or Growth ($29 per month) plans.
        </Text>
      </TextContainer>
      
      <div style={{ marginTop: '1rem' }}>
        <Link url="#" external monochrome removeUnderline>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Text variant="bodySm" color="success">Terms & Conditions</Text>
            <img 
              src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2313855c' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='m7 17 10-10'/><path d='M7 7h10v10'/></svg>"
              alt=""
              width="16"
              height="16"
            />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ConnectionCardContent;
