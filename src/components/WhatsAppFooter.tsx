
import React from 'react';
import { 
  Button,
  Link,
  BlockStack,
  Box,
  InlineStack,
  Text
} from '@shopify/polaris';

interface WhatsAppFooterProps {
  isConnected: boolean;
  onProceed: () => void;
}

const WhatsAppFooter: React.FC<WhatsAppFooterProps> = ({ isConnected, onProceed }) => {
  return (
    <BlockStack gap="8">
      <Box display="flex" justifyContent="center">
        <Button
          primary
          onClick={onProceed}
          disabled={!isConnected}
          tone={isConnected ? "success" : undefined}
        >
          Proceed
        </Button>
      </Box>

      <Box display="flex" justifyContent="center">
        <Link url="#" external monochrome removeUnderline>
          <InlineStack gap="1" align="center">
            <Text variant="bodySm" color="success">Learn More about ShopLinx</Text>
            <img 
              src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2313855c' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='m7 17 10-10'/><path d='M7 7h10v10'/></svg>"
              alt=""
              width="16"
              height="16"
            />
          </InlineStack>
        </Link>
      </Box>
    </BlockStack>
  );
};

export default WhatsAppFooter;
