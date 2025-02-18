import { navigationUserProfileTests, navigationUserTests } from "../../support/navigation/navigation-to-user";


describe('User Navigation dashboard - Authorized Routes', () => {
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
  navigationUserTests.forEach(({ description, path, steps }) => {
    it(description, () => {
      cy.performNavigation(steps);
      cy.url().should('include', path);
      // Verificación adicional del contenido
      cy.get('main').should('exist');
    });
  });
});

describe('User Navigation profile - Authorized Routes', () => {
  beforeEach(() => {
    cy.session('sesion-usuario', () => {
      cy.login('user');
      cy.url().should('not.include', '/auth/login');
    });

    cy.visit('/profile');
    cy.get('[data-cy="sidebar-profile-home"]').should('be.visible');
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

  navigationUserProfileTests.forEach(({ description, path, steps }) => {
    it(description, () => {
      cy.performNavigation(steps);
      cy.url().should('include', path);
      // Verificación adicional del contenido
      cy.get('main').should('exist');
    });
  });
});
