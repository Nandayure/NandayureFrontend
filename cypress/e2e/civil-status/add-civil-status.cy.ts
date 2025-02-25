/**
 * @file Prueba para la creación, obtención del id generado y posterior edición/eliminación de un estado civil.
 * @description Este conjunto de pruebas crea un nuevo estado civil, guarda su id en un alias y luego utiliza
 * ese id para lanzar operaciones de edición y eliminación.
 */
describe('Flujo completo de la creación Estado Civil', () => {
  let civilStatusId: string;
  let civilStatusData: { name: string; description: string };

  before(() => {
    cy.fixture('civil-status.json').then((data) => {
      civilStatusData = data;
    });
  });

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
    cy.get('[data-cy="input-name-civil-status"]')
      .clear()
      .type(civilStatusData.name);

    // Ingresar descripción para el estado civil y limpiar el campo
    cy.get('[data-cy="input-description-civil-status"]')
      .clear()
      .type(civilStatusData.description);

    // Enviar el formulario de creación del estado civil
    cy.get('[data-cy="btn-submit-civil-status"]').first().click();

    // Verificar que el modal se cierre
    cy.get('[data-cy="civil-status-modal"]').should('not.exist');

    // Verificar que el nuevo registro está visible en la tabla
    cy.contains('[data-cy^="civil-status-name-"]', civilStatusData.name)
      .should('be.visible')
      .closest('tr')
      .within(() => {
        cy.get('[data-cy^="civil-status-id-"]')
          .invoke('text')
          .then((id) => {
            civilStatusId = id;
            cy.wrap(id).as('savedCivilStatusId');
            cy.log(`ID guardado: ${id}`);

            // Verificar que los datos sean correctos
            cy.get(`[data-cy="civil-status-name-${id}"]`).should(
              'contain',
              civilStatusData.name,
            );
            cy.get(`[data-cy="civil-status-description-${id}"]`).should(
              'contain',
              civilStatusData.description,
            );
          });
      });
  });
});
