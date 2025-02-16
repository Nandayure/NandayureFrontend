declare namespace Cypress {
  interface Chainable {
    login(): Chainable<Element>;
  }
}
Cypress.Commands.add('login', () => {
  const loginId = Cypress.env('loginId');
  const loginPassword = Cypress.env('loginPassword');
  cy.visit('/auth/login');
  cy.get('[data-cy="login-input-id"]').clear().type(loginId);
  cy.get('[data-cy="login-input-password"]')
    .clear()
    .type(loginPassword, { log: false });
  cy.get('[data-cy="login-button"]').click();
});
