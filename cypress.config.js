const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "scd26m",
  e2e: {
    chromeWebSecurity: false,
    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "cypress/results",
      html: false,
      overwrite: false,
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
