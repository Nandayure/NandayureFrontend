const unauthorizedRoutes = [
  '/document-management/digital-files',
  '/request-management',
  '/time-tracking',
  '/system-configuration',
  '/auth/register'
];

describe('User Unauthorized Navigation', () => {
  beforeEach(() => {
    cy.session('sesion-usuario', () => {
      cy.login('user');
      cy.url().should('not.include', '/auth/login');
    });
  });

  unauthorizedRoutes.forEach((route) => {
    it(`should redirect unauthorized access for route: ${route}`, () => {
      // Visitar la ruta prohibida sin fallar el test por el status code.
      cy.visit(route, { failOnStatusCode: false });
      // Verificar que se redirige a /unauthorized.
      cy.url().should('include', '/unauthorized');
    });
  });

  afterEach(() => {
    cy.window().then((win) => {
      win.sessionStorage.clear();
      win.localStorage.clear();
    });
  });

  after(() => {
    cy.visit('/');
    cy.logout();
    cy.url().should('include', '/auth/login');
  });
});