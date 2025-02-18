interface NavigationStep {
  selector: string;
  urlIncludes?: string;
}

declare namespace Cypress {
  interface Chainable {
    performNavigation(steps: NavigationStep[]): Chainable<Element>;
  }
}

Cypress.Commands.add('performNavigation', (steps: NavigationStep[]) => {
  steps.forEach((step) => {
    cy.get(step.selector).should('be.visible').first().click();

    if (step.urlIncludes) {
      cy.url().should('include', step.urlIncludes);
    }
  });
});