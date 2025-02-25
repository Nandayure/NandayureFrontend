interface NavigationStep {
  selector: string;
  urlIncludes?: string;
}

declare namespace Cypress {
  interface Chainable {
    performNavigation(steps: NavigationStep[]): Chainable<Element>;
    navigateToConfiguration(path: string, dataCy: string): Chainable<Element>;
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

/**
 * Navega hasta la configuración asegurándose de que el usuario esté logueado y realizando
 * los pasos de navegación en orden, validando la URL final.
 *
 * @param path - Subcadena que debe estar incluida en la URL final.
 * @param dataCy - Valor del atributo data-cy para el botón final.
 * @returns Chainable<Element> permitiendo el encadenamiento de comandos.
 */
Cypress.Commands.add(
  'navigateToConfiguration',
  (path: string, dataCy: string) => {
    // Asegura que el usuario esté logueado.
    cy.login('rh');

    // Configuración de los pasos de navegación.
    const navigationSteps: NavigationStep[] = [
      { selector: '[data-cy="user-menu"]' },
      { selector: '[data-cy="system-configuration-button"]' },
      { selector: `[data-cy="${dataCy}"]`, urlIncludes: path },
    ];

    // Ejecuta la navegación y retorna la cadena para permitir encadenar más comandos.
    return cy.performNavigation(navigationSteps).then(() => {
      // Verifica nuevamente que la URL incluya el path esperado.
      cy.url().should('include', path);
    });
  },
);
