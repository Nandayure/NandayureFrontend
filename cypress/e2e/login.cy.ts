describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/auth/login');
  });

  it('should login with valid credentials', () => {
    const loginId = Cypress.env('loginId');
    const loginPassword = Cypress.env('loginPassword');

    cy.get('[data-cy="login-input-id"]').type(loginId);
    cy.get('[data-cy="login-input-password"]').type(loginPassword, {
      log: false,
    });
    cy.get('[data-cy="login-button"]').click();

    cy.url().should('include', '/');
  });
});
