import {
  commonNavigationTests,
  commonProfileNavigationTests,
  runNavigationTests,
} from './navigation-base';

import { NavigationTest } from '../types/navigation';

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
  {
    description: 'should navigato to "/system-settings/general-settings" from the sidebar',
    path: '/general-settings',
    steps: [
      { selector: '[data-cy="user-menu"]' },
      { selector: '[data-cy="system-configuration-button"]' },
      { selector: '[data-cy="sidebar-system-configuration-general-settings"]' },
    ],
  },
  {
    description: 'should navigate to "/system-configuration/departments" from the sidebar',
    path: '/departments',
    steps: [
      { selector: '[data-cy="user-menu"]' },
      { selector: '[data-cy="system-configuration-button"]' },
      { selector: '[data-cy="sidebar-system-configuration-departments]' },
    ],
  },
  {
    description: 'should navigate to "/system-configuration/positions" from the sidebar',
    path: '/positions',
    steps: [
      { selector: '[data-cy="user-menu"]' },
      { selector: '[data-cy="system-configuration-button"]' },
      { selector: '[data-cy="sidebar-system-configuration-positions"]' },
    ],
  },
  {
    description: 'should navigate to "/system-configuration/annuities" from the sidebar',
    path: '/annuities',
    steps: [
      { selector: '[data-cy="user-menu"]' },
      { selector: '[data-cy="system-configuration-button"]' },
      { selector: '[data-cy="sidebar-system-configuration-annuities"]' },
    ],
  },
  {
    description: 'should navigate to "/system-configuration/financial-institutions" from the sidebar',
    path: '/financial-institutions',
    steps: [
      { selector: '[data-cy="user-menu"]' },
      { selector: '[data-cy="system-configuration-button"]' },
      { selector: '[data-cy="sidebar-system-configuration-financial-institutions"]' },
    ],
  },
  {
    description: 'should navigate to "/system-configuration/studies" from the sidebar',
    path: '/studies',
    steps: [
      { selector: '[data-cy="user-menu"]' },
      { selector: '[data-cy="system-configuration-button"]' },
      { selector: '[data-cy="sidebar-system-configuration-studies"]' },
    ],
  },

];

runNavigationTests(
  'rh',
  [...commonNavigationTests, ...rhSpecificNavigationTests],
  commonProfileNavigationTests,
);