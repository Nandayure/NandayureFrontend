import {
  commonNavigationTests,
  commonProfileNavigationTests,
  runNavigationTests,
} from './navigation-base';

import { NavigationTest } from "../types/navigation";

export const rhSpecificNavigationTests: NavigationTest[] = [
  {
    description: 'should navigate to "/document-management" from the sidebar',
    path: '/document-management',
    steps: [{ selector: '[data-cy="sidebar-dashboard-digital-documents"]' }],
  },
  {
    description: 'should navigate to "/request-management" from the sidebar',
    path: '/request-management',
    steps: [{ selector: '[data-cy="sidebar-dashboard-request-management"]' }],
  },
  {
    description: 'should navigate to "/time-tracking" from the sidebar',
    path: '/time-tracking',
    steps: [{ selector: '[data-cy="sidebar-dashboard-time-tracking"]' }],
  },
  {
    description: 'should navigate to "/auth/register" from the sidebar',
    path: '/auth/register',
    steps: [
      { selector: '[data-cy="user-menu"]' },
      { selector: '[data-cy="register-user-button"]' },
    ],
  },
];

runNavigationTests(
  'rh',
  [...commonNavigationTests, ...rhSpecificNavigationTests],
  commonProfileNavigationTests,
);

// system configuration test

export const rhSystemConfigurationNavigationTests: NavigationTest[] = [
  {
    description:
      'should navigate to "/system-configuration/general-settings" from the sidebar',
    path: '/system-configuration/general-settings',
    steps: [
      { selector: '[data-cy="sidebar-system-configuration-general-settings"]' },
    ],
  },
  {
    description:
      'should navigate to "/system-configuration/departments" from the sidebar',
    path: '/system-configuration/departments',
    steps: [
      { selector: '[data-cy="sidebar-system-configuration-departments"]' },
    ],
  },
  {
    description:
      'should navigate to "/system-configuration/positions" from the sidebar',
    path: '/system-configuration/positions',
    steps: [{ selector: '[data-cy="sidebar-system-configuration-positions"]' }],
  },
  {
    description:
      'should navigate to "/system-configuration/annuities" from the sidebar',
    path: '/system-configuration/annuities',
    steps: [{ selector: '[data-cy="sidebar-system-configuration-annuities"]' }],
  },
  {
    description:
      'should navigate to "/system-configuration/financial-institutions" from the sidebar',
    path: '/system-configuration/financial-institutions',
    steps: [
      {
        selector:
          '[data-cy="sidebar-system-configuration-financial-institutions"]',
      },
    ],
  },
  {
    description:
      'should navigate to "/system-configuration/studies" from the sidebar',
    path: '/system-configuration/studies',
    steps: [{ selector: '[data-cy="sidebar-system-configuration-studies"]' }],
  },
];

function runSystemConfigurationNavigationTests(
  role: 'rh',
  navigationTests: NavigationTest[],
) {
  describe(`${role} Navigation system configuration - Authorized Routes`, () => {
    beforeEach(() => {
      cy.session(`sesion-${role}`, () => {
        cy.login(role);
        cy.url().should('not.include', '/auth/login');
      });

      cy.visit('/system-configuration');
      cy.get('[data-cy="sidebar-system-configuration-home"]').should(
        'be.visible',
      );
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
}

runSystemConfigurationNavigationTests(
  'rh',
  rhSystemConfigurationNavigationTests,
);
