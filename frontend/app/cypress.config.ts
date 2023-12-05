import { defineConfig } from "cypress";

export default defineConfig({
  // projectId: "8a2f6z",
  redirectionLimit: 50,
  defaultCommandTimeout: 30000,
  viewportWidth: 1280,
  viewportHeight: 720,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require("./cypress/plugins/index.js")(on, config);
    },
    baseUrl: "http://localhost:3000",
    testIsolation: false,
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}",
  },
});
