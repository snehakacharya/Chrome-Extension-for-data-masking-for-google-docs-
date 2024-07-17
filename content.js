console.log('Content script loaded');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'replaceSensitiveInfo') {
    console.log('Received request to replace sensitive info');

    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const phoneRegex = /\+?\d[\d -]{8,12}\d/g;
    const secretKeyword = request.secretKeyword || 'SECRET_KEY';

    // Function to replace sensitive info in a given node
    function replaceTextInNode(node) {
      const originalText = node.textContent;
      const newText = originalText.replace(emailRegex, secretKeyword).replace(phoneRegex, secretKeyword);
      if (originalText !== newText) {
        console.log(`Replacing: ${originalText} -> ${newText}`);
        node.textContent = newText;
      }
    }

    // Recursive function to get all text nodes within a parent node
    function getTextNodes(node) {
      let textNodes = [];
      if (node.nodeType === Node.TEXT_NODE) {
        textNodes.push(node);
      } else {
        for (let child of node.childNodes) {
          textNodes = textNodes.concat(getTextNodes(child));
        }
      }
      return textNodes;
    }

    // Function to process all text nodes within the Google Docs document
    function replaceSensitiveInfo() {
      const docBody = document.querySelector('.kix-appview-editor') || document.body;
      if (!docBody) {
        console.log('Google Docs body not found');
        return;
      }

      const textNodes = getTextNodes(docBody);
      console.log(`Found ${textNodes.length} text nodes`);

      textNodes.forEach(node => replaceTextInNode(node));
      console.log('Replacement Done');
    }

    // Set up a MutationObserver to handle dynamically loaded content
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === Node.TEXT_NODE || node.nodeType === Node.ELEMENT_NODE) {
            const textNodes = getTextNodes(node);
            textNodes.forEach(textNode => replaceTextInNode(textNode));
          }
        });
      });
    });

    // Start observing the document body for changes
    const docBody = document.querySelector('.kix-appview-editor') || document.body;
    if (docBody) {
      observer.observe(docBody, { childList: true, subtree: true });
    }

    // Initial replacement
    replaceSensitiveInfo();

    sendResponse({ status: 'success' });
    return true;
  }
});
