describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/auth/login');
  });

  it('should login with valid credentials', () => {
    cy.get('[data-cy="login-input-id"]').type('504510677');

    cy.get('[data-cy="login-input-password"]').type('SuarezG271003#$', {
      log: false,
    });
    cy.get('[data-cy="login-button"]').click();

    cy.url().should('include', '/');
  });
});
