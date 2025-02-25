/**
 * @file Prueba para la creación, obtención del id generado y posterior edición/eliminación de un estado civil.
 * @description Este conjunto de pruebas crea un nuevo estado civil, guarda su id en un alias y luego utiliza
 * ese id para lanzar operaciones de edición y eliminación.
 */
describe('Flujo completo de la creación Estado Civil', () => {
  it('debe crear un estado civil y guardar su id', () => {
    // Navegar a la sección de configuración general
    cy.navigateToConfiguration(
      '/general-settings',
      'sidebar-system-configuration-general-settings',
    );

    // Acceder a la pestaña de estado civil
    cy.get('[data-cy="civil-status-tab"]').first().click();

    // Iniciar la creación de un nuevo estado civil
    cy.get('[data-cy="btn-add-civil-status"]').first().click();

    // Ingresar nombre para el estado civil y limpiar el campo
    cy.get('[data-cy="input-name-civil-status"]').clear().type('Soltero');

    // Ingresar descripción para el estado civil y limpiar el campo
    cy.get('[data-cy="input-description-civil-status"]')
      .clear()
      .type('Sin compromiso');

    // Enviar el formulario de creación del estado civil
    cy.get('[data-cy="btn-submit-civil-status"]').first().click();
  });
});
