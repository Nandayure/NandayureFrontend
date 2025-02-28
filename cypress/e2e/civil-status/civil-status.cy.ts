/**
 * @file Suite de pruebas para operaciones CRUD de estados civiles.
 * @description Esta suite de pruebas abarca el flujo completo para la gestión de estados civiles:
 * creación, consulta, actualización y eliminación. Cada prueba se enfoca en una operación específica
 * y utiliza el ID guardado desde el paso de creación para mantener la coherencia entre pruebas.
 * Las pruebas verifican que la interfaz de usuario responda correctamente y que los datos
 * se muestren y procesen como se espera en cada paso del proceso.
 */

describe('Civil Status Management Flow', () => {
  interface CivilStatusData {
    name: string;
    description: string;
    updatedName?: string;
    updatedDescription?: string;
  }

  let civilStatusId: string;
  let civilStatusData: CivilStatusData;

  before(() => {
    // Load test data from fixture
    cy.fixture('civil-status.json').then((data: CivilStatusData) => {
      civilStatusData = data;
    });
  });

  beforeEach(() => {
    // Set up authenticated session before each test
    cy.session('hr-user-session', () => {
      cy.login('rh');
      cy.url().should('not.include', '/auth/login');
    });

    // Navigate to dashboard
    cy.visit('/');
    cy.get('[data-cy="sidebar-dashboard-home"]').should('be.visible');
  });

  /**
   * Navega a la página de gestión de estados civiles
   * @description Esta función auxiliar se encarga de navegar desde cualquier punto de la
   * aplicación hasta la página de configuración general del sistema, y luego selecciona
   * específicamente la pestaña de estados civiles. Verifica que la URL resultante incluya
   * la ruta correcta para confirmar la navegación exitosa.
   */
  const navigateToCivilStatusPage = () => {
    cy.visit('/system-configuration/general-settings');
    cy.get('[data-cy="civil-status-tab"]').first().click();
    cy.url().should('include', '/system-configuration/general-settings');
  };

  /**
   * @test Creación de un nuevo estado civil
   * @description Verifica el proceso completo de creación de un estado civil:
   * - Navegación a la página de estados civiles
   * - Apertura del modal de creación
   * - Introducción de datos desde el archivo de fixture
   * - Envío del formulario
   * - Verificación de que el registro aparezca en la tabla
   * - Captura del ID generado para uso en pruebas posteriores
   */
  it('should create a new civil status and save its ID', function () {
    navigateToCivilStatusPage();

    // Click the add button to open the creation modal
    cy.get('[data-cy="btn-add-civil-status"]')
      .first()
      .should('be.enabled')
      .click();

    // Fill the form with data from fixture
    cy.get('[data-cy="input-add-name-civil-status"]')
      .should('be.visible')
      .clear()
      .type(civilStatusData.name)
      .should('have.value', civilStatusData.name);

    cy.get('[data-cy="input-add-description-civil-status"]')
      .should('be.visible')
      .clear()
      .type(civilStatusData.description)
      .should('have.value', civilStatusData.description);

    // Submit the form
    cy.get('[data-cy="btn-submit-add-civil-status"]')
      .first()
      .should('be.enabled')
      .click();

    // Buscar el registro usando el search bar
    cy.get('[data-cy="search-civil-status"]').first().type(civilStatusData.name);

    // Esperar que se filtren los resultados
    cy.wait(500);

    // Verify the new record is visible in the table and capture its ID
    cy.contains('[data-cy^="civil-status-name-"]', civilStatusData.name)
      .should('be.visible')
      .closest('tr')
      .within(() => {
        // Get and store the created ID
        cy.get('[data-cy^="civil-status-id-"]')
          .invoke('text')
          .then((id) => {
            const trimmedId = id.trim();
            civilStatusId = trimmedId;

            // Save ID to this context for sharing between tests
            this.savedCivilStatusId = trimmedId;

            cy.log(`Created civil status with ID: ${trimmedId}`);

            // Verify data was saved correctly
            cy.get(`[data-cy="civil-status-name-${trimmedId}"]`).should(
              'contain',
              civilStatusData.name,
            );

            cy.get(`[data-cy="civil-status-description-${trimmedId}"]`).should(
              'contain',
              civilStatusData.description,
            );
          });
      });
  });

  /**
   * @test Edición de un estado civil existente
   */
  it('should edit an existing civil status', function () {
    // Use the ID saved from the creation test via this context
    const savedId = this.savedCivilStatusId;

    // Check if savedId exists
    if (!savedId) {
      throw new Error('Failed to get saved civil status ID from previous test');
    }

    civilStatusId = String(savedId);

    // Navigate to civil status page
    navigateToCivilStatusPage();

    // Store the updated name
    civilStatusData.updatedName = `${civilStatusData.name} editado`;

    // Buscar el registro usando el search bar
    cy.get('[data-cy="search-civil-status"]').first().type(civilStatusData.name);

    // Esperar que se filtren los resultados
    cy.wait(500);

    // Find the row with the civil status and click the edit button
    cy.get(`[data-cy="civil-status-id-${civilStatusId}"]`)
      .closest('tr')
      .find('[data-cy="btn-edit-civil-status"]')
      .first()
      .click({ force: true });

    // Edit the name field
    cy.get('[data-cy="input-edit-name-civil-status"]')
      .should('be.visible')
      .clear()
      .type(civilStatusData.updatedName)
      .should('have.value', civilStatusData.updatedName);

    // Submit the edit form
    cy.get('[data-cy="btn-submit-edit-civil-status"]')
      .should('be.enabled')
      .click();

    // Verify the changes were saved
    cy.get(`[data-cy="civil-status-name-${civilStatusId}"]`).should(
      'contain',
      civilStatusData.updatedName,
    );
  });

  /**
   * @test Eliminación de un estado civil
   */
  it('should delete the created civil status', function () {
    // Use the ID saved from the creation test via this context
    const savedId = this.savedCivilStatusId;

    // Check if savedId exists
    if (!savedId) {
      throw new Error('Failed to get saved civil status ID from previous test');
    }

    civilStatusId = String(savedId);

    // Navigate to civil status page
    navigateToCivilStatusPage();

    // Buscar el registro usando el search bar y el nombre actualizado
    if (!civilStatusData.updatedName) {
      throw new Error('Updated name is not defined');
    }
    cy.get('[data-cy="search-civil-status"]').first().type(civilStatusData.updatedName);


    // Esperar que se filtren los resultados
    cy.wait(500);

    // Find the row with the civil status and click the delete button
    cy.get(`[data-cy="civil-status-id-${civilStatusId}"]`)
      .closest('tr')
      .find('[data-cy="btn-delete-civil-status"]')
      .first()
      .click({ force: true });

    // Confirm the deletion
    cy.get('[data-cy="btn-confirm-delete-civil-status"]').click();

    // Verify the row is no longer visible in the table
    cy.get(`[data-cy="civil-status-row-${civilStatusId}"]`).should('not.exist');
  });

  after(() => {
    cy.visit('/');
    cy.logout();
    cy.url().should('include', '/auth/login');
  });
});
