declare namespace Cypress {
  interface Chainable {
    login(role: 'rh' | 'user' | 'mayor'): Chainable<Element>;
  }
}

Cypress.Commands.add('login', (role: 'rh' | 'user' | 'mayor') => {
  if (!role) {
    throw new Error('Debe especificar un rol: "rh", "user" o "mayor".');
  }
  const user = Cypress.env(role);
  if (!user) {
    throw new Error(`No se encontraron credenciales para el rol: ${role}`);
  }
  cy.visit('/auth/login');
  cy.get('[data-cy="login-input-id"]').clear().type(user.loginId);
  cy.get('[data-cy="login-input-password"]')
    .clear()
    .type(user.loginPassword, { log: false });
  cy.get('[data-cy="login-button"]').click();
});
