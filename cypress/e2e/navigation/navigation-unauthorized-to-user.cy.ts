function testUnauthorizedNavigationForRole(
  role: 'rh' | 'user' | 'mayor',
  unauthorizedRoutes: string[],
): void {
  describe(`Unauthorized Navigation for role: ${role}`, () => {
    beforeEach(() => {
      cy.session(`session-${role}`, () => {
        cy.login(role);
        cy.url().should('not.include', '/auth/login');
      });
    });

    unauthorizedRoutes.forEach((route) => {
      it(`should redirect unauthorized access for route: ${route}`, () => {
        cy.visit(route, { failOnStatusCode: false });
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
}


testUnauthorizedNavigationForRole('user', [
  '/document-management/digital-files',
  '/request-management',
  '/time-tracking',
  '/system-configuration',
  '/auth/register',
]);

testUnauthorizedNavigationForRole('rh', [
  // Rutas que el rol 'rh' no tiene autorizadas.
]);

testUnauthorizedNavigationForRole('mayor', [
  '/document-management/digital-files',
  '/document-management/*',
  '/request-management/*',
  '/time-tracking',
  '/system-configuration/*',
  '/system-configuration',
  '/auth/register'
]);