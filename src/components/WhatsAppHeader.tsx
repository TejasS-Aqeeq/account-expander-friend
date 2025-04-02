
import React from 'react';
import { 
  Text, 
  Link,
  BlockStack,
  InlineStack
} from '@shopify/polaris';
import { ArrowUpRightIcon } from '@shopify/polaris-icons';

const WhatsAppHeader: React.FC = () => {
  return (
    <BlockStack gap="2">
      <InlineStack gap="4" align="space-between">
        <Text variant="headingMd" as="h1">Set up your Shopify-synced WhatsApp Store!</Text>
        <Link url="#" external monochrome removeUnderline>
          <InlineStack gap="1" align="center">
            <Text variant="bodySm" color="success">Get Support</Text>
            <img 
              src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2313855c' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='m7 17 10-10'/><path d='M7 7h10v10'/></svg>"
              alt=""
              width="16"
              height="16"
            />
          </InlineStack>
        </Link>
      </InlineStack>
      <Text variant="bodyMd" color="subdued">
        ShopLinx is an Official WhatsApp Business Service Provider.
      </Text>
      <Text variant="bodyMd" color="subdued">
        We enable businesses to better utilize WhatsApp by accessing WhatsApp APIs.
      </Text>
    </BlockStack>
  );
};

export default WhatsAppHeader;
