// navigation-base.ts
import { NavigationTest } from '../types/navigation';

// Rutas comunes para todos los roles
export const commonNavigationTests: NavigationTest[] = [
  {
    description: 'should navigate to "/my-file" from the sidebar',
    path: '/my-file',
    steps: [{ selector: '[data-cy="sidebar-dashboard-my-documents"]' }],
  },
  {
    description:
      'should navigate to "/request/vacation-request" by clicking through the sidebar',
    path: '/request/vacation-request',
    steps: [
      { selector: '[data-cy="sidebar-dashboard-requests"]' },
      { selector: '[data-cy="sidebar-dashboard-vacation-request"]' },
    ],
  },
  {
    description:
      'should navigate to "/request/pay-slip" by clicking through the sidebar',
    path: '/request/pay-slip',
    steps: [
      { selector: '[data-cy="sidebar-dashboard-requests"]' },
      { selector: '[data-cy="sidebar-dashboard-pay-slip"]' },
    ],
  },
  {
    description:
      'should navigate to "/request/salary-certificate" by clicking through the sidebar',
    path: '/request/salary-certificate',
    steps: [
      { selector: '[data-cy="sidebar-dashboard-requests"]' },
      { selector: '[data-cy="sidebar-dashboard-salary-certificate"]' },
    ],
  },
  {
    description:
      'should navigate to "/request-management/my-requests" by clicking through the sidebar',
    path: '/request-management/my-requests',
    steps: [{ selector: '[data-cy="sidebar-dashboard-my-requests"]' }],
  },
];

// Rutas comunes para el perfil de usuario
export const commonProfileNavigationTests: NavigationTest[] = [
  {
    description: 'should navigate to "/profile" from the sidebar',
    path: '/profile',
    steps: [
      { selector: '[data-cy="user-menu"]' },
      { selector: '[data-cy="profile-button"]' },
    ],
  },
  {
    description: 'should navigate to "/security" from the sidebar',
    path: '/security',
    steps: [
      { selector: '[data-cy="user-menu"]' },
      { selector: '[data-cy="profile-button"]' },
      { selector: '[data-cy="sidebar-profile-security"]' },
    ],
  },
];

// Función base para ejecutar tests de navegación
export function runNavigationTests(
  role: 'rh' | 'user' | 'mayor',
  navigationTests: NavigationTest[],
  profileNavigationTests: NavigationTest[],
) {
  describe(`${role} Navigation dashboard - Authorized Routes`, () => {
    beforeEach(() => {
      cy.session(`sesion-${role}`, () => {
        cy.login(role);
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
      cy.visit('/');
      cy.logout();
      cy.url().should('include', '/auth/login');
    });

    navigationTests.forEach(({ description, path, steps }) => {
      it(description, () => {
        cy.performNavigation(steps);
        cy.url().should('include', path);
        cy.get('main').should('exist');
      });
    });
  });

  describe(`${role} Navigation profile - Authorized Routes`, () => {
    beforeEach(() => {
      cy.session(`sesion-${role}`, () => {
        cy.login(role);
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
      cy.visit('/');
      cy.logout();
      cy.url().should('include', '/auth/login');
    });

    profileNavigationTests.forEach(({ description, path, steps }) => {
      it(description, () => {
        cy.performNavigation(steps);
        cy.url().should('include', path);
        cy.get('main').should('exist');
      });
    });
  });
}
