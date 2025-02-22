import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000', //https://nandayure-frontend-deployment.vercel.app/
    defaultCommandTimeout: 30000, // Aumenta el timeout de comandos
    pageLoadTimeout: 60000, // Permite más tiempo para cargar la página
    responseTimeout: 30000, // Aumenta el timeout de las respuestas
    retries: {
      runMode: 1, // Reintenta una vez en modo run
      openMode: 0, // Sin reintentos en modo abierto
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
