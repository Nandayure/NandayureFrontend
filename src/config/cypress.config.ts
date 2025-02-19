import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'https://nandayure-frontend-deployment.vercel.app',
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 10000,
    retries: {
      runMode: 2,
      openMode: 1,
    },
    setupNodeEvents(on, config) {
      // implement event listeners here
    },
  },
});
