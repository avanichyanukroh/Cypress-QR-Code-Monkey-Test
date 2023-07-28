/// <reference types="cypress" />
const path = require("path");
import { deleteDownloadsFiles } from '../support/utils';

describe('QR Code Generator Smoke Test', () => {
  beforeEach(() => {
    cy.visit('https://www.qrcode-monkey.com/');
    cy.get('#onetrust-accept-btn-handler').click();
  });

  it('Display default qrcode-monkey url and QR Code image on initial page load.', () => {
    cy.get('#qrcodeUrl').should('have.value', 'https://www.qrcode-monkey.com');
    cy.get(' div.preview img.card-img-top').readCode().should('have.property', 'text', 'https://qrstud.io/qrmnky');
  });

  it('Changes QR Code when user enters new URL and clicks Create QR Code.', () => {
    cy.get('#qrcodeUrl').clear().type('https://bitly.com/')
    cy.get('#button-create-qr-code').click();
    cy.wait(6000);
    cy.get(' div.preview img.card-img-top').readCode().should('have.property', 'text', 'https://bitly.com/');
  });

  it('Downloads QR Code when user clicks download PNG button', () => {
    deleteDownloadsFiles();
    cy.get('#qrcodeUrl').clear().type('https://bitly.com/');
    cy.get('#button-create-qr-code').click();
    cy.wait(6000);
    cy.window().document().then(function (doc) {
      doc.addEventListener('click', () => {
        setTimeout(function () { doc.location.reload() }, 15000)
      });
      cy.get('#button-download-qr-code-png').click();
    });
    cy.wait(15000);
    const downloadsFolder = Cypress.config('downloadsFolder');
    cy.readFile(path.join(downloadsFolder, 'qr-code.png'));
  });
});