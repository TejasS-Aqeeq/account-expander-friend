
import React from 'react';
import { Page, EmptyState } from '@shopify/polaris';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  
  return (
    <Page>
      <EmptyState
        heading="Page not found"
        image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
        action={{
          content: 'Back to home',
          onAction: () => navigate('/')
        }}
      >
        <p>The page you're looking for couldn't be found</p>
      </EmptyState>
    </Page>
  );
};

export default NotFound;
