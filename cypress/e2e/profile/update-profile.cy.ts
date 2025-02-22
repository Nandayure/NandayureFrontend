import { first } from "node_modules/cypress/types/lodash";

describe('template spec', () => {
  beforeEach(() => {
    cy.session(`sesion-rh`, () => {
      cy.login('rh');
      cy.url().should('not.include', '/auth/login');
    });

    cy.visit('/');
    cy.get('[data-cy="sidebar-dashboard-home"]').should('be.visible');
  });

  //Navegar por el perfil
  it('navigation profile', () => {
    cy.get('[data-cy="user-menu"]').first().click();
    cy.get('[data-cy="profile-button"]').click();
    cy.url().should('include', '/profile');
  });

 
  it('update profile', () => {
    
    cy.visit('/profile'); // Ajusta la ruta según sea necesario
    cy.get('[data-cy="edit-profile"]').should('exist').click();

   
  });
});