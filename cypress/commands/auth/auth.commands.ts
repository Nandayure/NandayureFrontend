declare namespace Cypress {
  interface Chainable {
    login(role: 'rh' | 'user' | 'mayor' | 'department_head'): Chainable<Element>;
    logout(): Chainable<Element>;
  }
}

Cypress.Commands.add('login', (role: 'rh' | 'user' | 'mayor' | 'department_head') => {
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

Cypress.Commands.add('logout', () => {
  cy.get('[data-cy="user-menu"]').first().should('be.visible').click();
  cy.get('[data-cy="logout-button"]').should('be.visible').click();
});
