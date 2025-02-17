export interface NavigationTest {
  description: string;
  path: string;
  steps: NavigationStep[];
}

export interface NavigationStep {
  selector: string;
  urlIncludes?: string;
}
