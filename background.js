chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'replaceSensitiveInfo') {
    chrome.identity.getAuthToken({ interactive: true }, (token) => {
      if (chrome.runtime.lastError || !token) {
        console.error('Failed to get OAuth token', chrome.runtime.lastError);
        sendResponse({ message: 'Failed to get OAuth token' });
        return;
      }

      chrome.storage.sync.get('secretKeyword', (data) => {
        const secretKeyword = data.secretKeyword || 'SECRET_KEY';

        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          if (tabs[0] && tabs[0].url) {
            const url = new URL(tabs[0].url);
            const docId = url.pathname.split('/')[3]; // Adjusted to correctly get the document ID

            fetch('** GOOGLE APP SCRIPT LINK **', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              body: new URLSearchParams({ secretKeyword, docId })
            })
            .then(response => response.json())
            .then(data => {
              console.log(data.message);  // Log the response message
              sendResponse({ message: data.message });
            })
            .catch(error => {
              console.error('Error:', error);
              sendResponse({ message: 'Error occurred' });
            });
          } else {
            console.error('No active tab found or invalid URL');
            sendResponse({ message: 'No active tab found or invalid URL' });
          }
        });

        return true;  // Keeps the message channel open for async sendResponse
      });
    });

    return true;  // Keeps the message channel open for async sendResponse
  }
});
