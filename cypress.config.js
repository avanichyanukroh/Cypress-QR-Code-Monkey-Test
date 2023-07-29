const { defineConfig } = require("cypress");
const { readdir, unlink } = require('fs');
const path = require("path");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
        on('task', {
          deleteDownloadsFiles(folderName) {
            console.log('deleting folder %s', folderName);

          return new Promise((resolve, reject) => {
            readdir(folderName, (err, files) => {
              if (err) throw err;
            
              for (const file of files) {
                unlink(path.join(folderName, file), (err) => {
                  if (err) throw err;
                });
              }
              resolve(null);
            });
          });
          },
        })
    },
  },
  defaultCommandTimeout: 12000,
  chromeWebSecurity: false,
});
