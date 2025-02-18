import { NavigationTest } from '../types/navigation';
import {
  commonNavigationTests,
  commonProfileNavigationTests,
  runNavigationTests,
} from './navigation-base';
export const mayorSpecificNavigationTests: NavigationTest[] = [
  {
    description: 'should navigate to "/request-management" from the sidebar',
    path: '/request-management',
    steps: [{ selector: '[data-cy="sidebar-dashboard-request-management"]' }],
  },
];

runNavigationTests(
  'mayor',
  [...commonNavigationTests, ...mayorSpecificNavigationTests],
  commonProfileNavigationTests,
);
