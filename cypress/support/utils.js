export const deleteDownloadsFiles = () => {
  const downloadsFolder = Cypress.config('downloadsFolder')

  cy.task('deleteDownloadsFiles', downloadsFolder)
}