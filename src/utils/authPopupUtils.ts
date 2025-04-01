
/**
 * Utility functions for handling popup authentication
 */

/**
 * Generates a random string for CSRF protection
 */
export const generateRandomString = (length: number): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

/**
 * Creates and opens an authentication popup window
 */
export const openAuthPopup = (): Window | null => {
  const width = 600;
  const height = 700;
  const left = window.screenX + (window.outerWidth - width) / 2;
  const top = window.screenY + (window.outerHeight - height) / 2;
  
  // Create a state parameter for additional security (CSRF protection)
  const stateParam = generateRandomString(32);
  
  // Store the state parameter in sessionStorage for verification when the popup returns
  sessionStorage.setItem('shoplinx_auth_state', stateParam);
  
  // Create the popup URL with the state parameter
  const popupUrl = `/auth/shopify?state=${stateParam}`;
  
  // Open the popup window
  return window.open(
    popupUrl,
    'ShoplinxAuth',
    `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes,status=yes`
  );
};
