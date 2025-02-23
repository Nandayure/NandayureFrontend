describe('template spec', () => {
  beforeEach(() => {
    cy.session(`sesion-rh`, () => {
      cy.login('rh');
      cy.url().should('not.include', '/auth/login');
    });

    cy.visit('/');
    cy.get('[data-cy="sidebar-dashboard-home"]').should('be.visible');
  });

  it('navigation profile', () => {
    cy.get('[data-cy="user-menu"]').first().click();
    cy.get('[data-cy="profile-button"]').click();
    cy.url().should('include', '/profile');
  });

  it('update profile', () => {
    
  });
});
