import { BrowserMultiFormatReader } from '@zxing/browser';

const reader = new BrowserMultiFormatReader();

Cypress.Commands.add('readCode', { prevSubject: true }, (subject) => {
  const img = subject[0];
  console.log(img);
  const image = new Image();
  image.width = img.width;
  image.height = img.height;
  image.src = img.src;
  image.crossOrigin = 'Anonymous';
  return reader.decodeFromImageElement(image);
});