import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:5173", // your running dev server URL
    supportFile: "cypress/support/e2e.ts",
    specPattern: "cypress/e2e/**/*.ts",
  },
});
