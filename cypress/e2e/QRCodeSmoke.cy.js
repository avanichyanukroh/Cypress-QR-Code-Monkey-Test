/// <reference types="cypress" />
const path = require('path');
import { deleteDownloadsFiles } from '../support/utils';

const QRCodeMonkeyUrl = 'https://www.qrcode-monkey.com';
const acceptCookiesConsentBtn = '#onetrust-accept-btn-handler';
const defaultQRCodeUrl = 'https://qrstud.io/qrmnky';
const bitlyURL = 'https://bitly.com/';
const urlInputField = '#qrcodeUrl';
const QRCodePreview = 'div.preview img.card-img-top';
const createQRCodeBtn = '#button-create-qr-code';
const downloadQRCodeBtn = '#button-download-qr-code-png';
const QRCodePreviewReq = 'https://api.qrcode-monkey.com//qr/custom';

describe('QR Code Generator Smoke Test', () => {
  beforeEach(() => {
    cy.visit(QRCodeMonkeyUrl);
    cy.get(acceptCookiesConsentBtn).click();
  });

  it('Display default qrcode-monkey url and QR Code image on initial page load.', () => {
    cy.get(urlInputField).should('have.value', QRCodeMonkeyUrl);
    cy.get(QRCodePreview).readCode().should('have.property', 'text', defaultQRCodeUrl);
  });

  it('Changes QR Code when user enters new URL and clicks Create QR Code.', () => {
    cy.get(urlInputField).clear().type(bitlyURL)
    cy.get(createQRCodeBtn).click();
    cy.intercept('POST', QRCodePreviewReq).as('getQRCodePreviewImg');
    cy.wait('@getQRCodePreviewImg');
    cy.get(QRCodePreview).readCode().should('have.property', 'text', bitlyURL);
  });

  it('Downloads QR Code when user clicks download PNG button', () => {
    deleteDownloadsFiles();
    cy.get(urlInputField).clear().type(bitlyURL);
    cy.get(createQRCodeBtn).click();
    cy.intercept('POST', QRCodePreviewReq).as('getQRCodePreviewImg');
    cy.wait('@getQRCodePreviewImg');

    // Workaround to trigger reload below. https://github.com/cypress-io/cypress/issues/14857 clicking download 
    // causes a page load and awaits a page reload that won't happen causing it to time out.
    cy.window().document().then(function (doc) {
      doc.addEventListener('click', () => {
        setTimeout(function () { doc.location.reload() }, 12000);
      });
      cy.get(downloadQRCodeBtn).click();
    });
    const downloadsFolder = Cypress.config('downloadsFolder');
    cy.readFile(path.join(downloadsFolder, 'qr-code.png'));
  });
});