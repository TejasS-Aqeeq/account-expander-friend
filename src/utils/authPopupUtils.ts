
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
  const popupUrl = `https://app.shoplinx.ai/auth/shopify?state=${stateParam}`;
  
  // Open the popup window
  const newWindow = window.open(
    popupUrl,
    'ShoplinxAuth',
    `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes,status=yes`
  );
  
  if (newWindow) {
    // Create a simple HTML page with the script
    const popupContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Connecting to ShopLinx</title>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
          .loader { border: 5px solid #f3f3f3; border-top: 5px solid #3498db; border-radius: 50%; width: 50px; height: 50px; animation: spin 2s linear infinite; margin: 20px auto; }
          @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        </style>
      </head>
      <body>
        <h2>Connecting to ShopLinx...</h2>
        <div class="loader"></div>
        <p>Please wait while we connect your account. This window will close automatically when complete.</p>
        
        <script>
          // Function to notify the parent window and close this popup
          function completeConnection() {
            console.log("Attempting to notify parent window");
            if (window.opener) {
              try {
                // Try to send a message to the parent window
                window.opener.postMessage({status: 'connected'}, "*");
                console.log("Message sent to parent");
              } catch (e) {
                console.error("Error posting message:", e);
              }
              
              // Also set localStorage as a backup method
              try {
                localStorage.setItem('interakt_connection_status', 'connected');
                console.log("LocalStorage set");
              } catch (e) {
                console.error("Error setting localStorage:", e);
              }
            }
            
            // Close this window after sending the message
            setTimeout(() => {
              window.close();
            }, 500);
          }
          
          // For demo purposes, simulate a successful connection after 3 seconds
          setTimeout(completeConnection, 3000);
        </script>
      </body>
      </html>
    `;
    
    try {
      // Write the content to the popup
      newWindow.document.open();
      newWindow.document.write(popupContent);
      newWindow.document.close();
    } catch (error) {
      console.error("Error writing to popup:", error);
    }
  }
  
  return newWindow;
};
