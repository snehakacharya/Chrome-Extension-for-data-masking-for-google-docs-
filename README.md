# Chrome-Extension-for-data-masking-for-google-docs-
This Chrome extension is designed to help users protect sensitive information in Google Docs by masking email addresses and phone numbers with a secret keyword. The extension leverages Google Apps Script and Chrome's messaging API to perform the masking action efficiently.
Features
Mask Sensitive Information: Replace all email addresses and phone numbers in a Google Doc with a secret keyword.
OAuth Authentication: Secure access to Google Docs using OAuth 2.0.
User-Friendly Interface: Simple popup interface with a button to trigger the masking action.

Technologies Used
JavaScript
HTML/CSS
Chrome Extensions API
Google Apps Script
OAuth 2.0
Getting Started
Prerequisites
Google Chrome browser
Basic knowledge of JavaScript and Chrome extensions
Installation
Clone the repository:

sh
Copy code
git clone https://github.com/your-username/your-repo-name.git
Load the extension:

Open Google Chrome and go to chrome://extensions/.
Enable "Developer mode" in the top right corner.
Click "Load unpacked" and select the directory where you cloned the repository.
Set up Google Apps Script:

Create a new Google Apps Script project and copy the code from code.gs into the script editor.
Deploy the script as a web app and make note of the URL.
Configure OAuth 2.0:

Follow the Google OAuth 2.0 guide to set up OAuth credentials.
Update the extension's code with your OAuth client ID and secret.
Usage
Open a Google Doc.
Click on the extension icon in the Chrome toolbar.
In the popup, click "Replace Sensitive Info" to mask all email addresses and phone numbers with the secret keyword.
Code Overview
popup.html
Defines the popup UI with a button for masking sensitive information.

popup.js
Handles button clicks and sends messages to the background script.

content.js
Contains the logic for finding and replacing sensitive information in the Google Doc's text nodes.

background.js
Handles OAuth authentication and communicates with Google Apps Script to perform the masking action.

code.gs
Google Apps Script code that processes the text in the Google Doc, performing the masking operation.

Contributing
Contributions are welcome! Please fork this repository and submit a pull request with your changes.

Contact
If you have any questions or need further assistance, feel free to open an issue or contact me directly at snehakacharya19@gmail.com .
