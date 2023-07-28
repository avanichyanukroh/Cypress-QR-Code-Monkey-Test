# QR Code Monkey smoke test

A project built with cypress.io with automation test scripts testing the QR Code Generator on the (https://www.qrcode-monkey.com/)[QR Code Monkey] site.

## Setup and Installation

	```
  cd /your/project/path
  npm install
  ```

## Steps to Run Test
1. 
 	```
  npx cypress open
  ```
2. Once project window opens, select E2E Testing
3. Select Chrome as your browser
4. Click "Start E2E Testing in Chrome
5. In the Specs window, select QRCodeSmoke.cy.js to run test script

## Future Smoke Tests

- All components within each section display while navigating to each accordion sections
- Default color is set, in Set Colors section
- Selecting Color Gradient and Custom Eye Color displays their respective sections
- Clicking color picker opens color picker tool
- Upload image and verify image appears in Add Logo Image section
- Verify correct numbers of body shape, eye frame shape, and eyeball shape options are rendered in the Customize Design section