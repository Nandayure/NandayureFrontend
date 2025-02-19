import { NavigationTest } from '../types/navigation';
import { commonNavigationTests, commonProfileNavigationTests, runNavigationTests } from './navigation-base';

export const userSpecificNavigationTests: NavigationTest[] = [
];


runNavigationTests('user', [...commonNavigationTests, ...userSpecificNavigationTests], commonProfileNavigationTests);