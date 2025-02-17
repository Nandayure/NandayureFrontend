interface NavigationTest {
  description: string;
  path: string;
  steps: NavigationStep[];
}

interface NavigationStep {
  selector: string;
  urlIncludes?: string;
}

export const navigationTests: NavigationTest[] = [
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
