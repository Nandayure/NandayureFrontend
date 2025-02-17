import { navigationTests } from '../../support/navigation/navigation-to-user-dashboard';

describe('User Navigation - Authorized Routes', () => {
  beforeEach(() => {
    cy.session('sesion-usuario', () => {
      cy.login('user');
      cy.url().should('not.include', '/auth/login');
    });

    cy.visit('/');
    cy.get('[data-cy="sidebar-dashboard-home"]').should('be.visible');
  });

  afterEach(() => {
    cy.window().then((win) => {
      win.sessionStorage.clear();
      win.localStorage.clear();
    });
  });

  after(() => {
    cy.logout();
    cy.url().should('include', '/auth/login');
  });

  // Genera los tests dinámicamente
  navigationTests.forEach(({ description, path, steps }) => {
    it(description, () => {
      cy.performNavigation(steps);
      cy.url().should('include', path);
      // Verificación adicional del contenido
      cy.get('main').should('exist');
    });
  });
});
