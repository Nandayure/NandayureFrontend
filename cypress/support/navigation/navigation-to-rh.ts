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
];

runNavigationTests(
  'rh',
  [...commonNavigationTests, ...rhSpecificNavigationTests],
  commonProfileNavigationTests,
);

