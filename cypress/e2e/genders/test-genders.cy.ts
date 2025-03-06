/**
 * @file Suite de pruebas para operaciones CRUD de géneros.
 * @description Esta suite de pruebas abarca el flujo completo para la gestión de géneros:
 * creación, consulta, actualización y eliminación. Cada prueba se enfoca en una operación específica
 * y utiliza el ID guardado desde el paso de creación para mantener la coherencia entre pruebas.
 * Las pruebas verifican que la interfaz de usuario responda correctamente y que los datos
 * se muestren y procesen como se espera en cada paso del proceso.
 */

describe('Gender Management Flow', () => {
  interface GenderData {
    name: string;
    updatedName?: string;
  }

  let genderId: string;
  let genderData: GenderData;

  before(() => {
    // Load test data from fixture
    cy.fixture('gender.json').then((data: GenderData) => {
      genderData = data;
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
   * Navega a la página de gestión de géneros
   * @description Esta función auxiliar se encarga de navegar desde cualquier punto de la
   * aplicación hasta la página de configuración general del sistema, y luego selecciona
   * específicamente la pestaña de géneros. Verifica que la URL resultante incluya
   * la ruta correcta para confirmar la navegación exitosa.
   */
  const navigateToGenderPage = () => {
    cy.visit('/system-configuration/general-settings');
    cy.get('[data-cy="gender-tab"]').first().click();
    cy.url().should('include', '/system-configuration/general-settings');
  };

  /**
   * @test Creación de un nuevo género
   * @description Verifica el proceso completo de creación de un género:
   * - Navegación a la página de géneros
   * - Apertura del modal de creación
   * - Introducción de datos desde el archivo de fixture
   * - Envío del formulario
   * - Verificación de que el registro aparezca en la tabla
   * - Captura del ID generado para uso en pruebas posteriores
   */
  it('should create a new gender and save its ID', function () {
    navigateToGenderPage();

    // Click the add button to open the creation modal
    cy.get('[data-cy="btn-add-gender"]')
      .first()
      .should('be.enabled')
      .click();

    // Fill the form with data from fixture
    cy.get('[data-cy="input-add-name-gender"]')
      .should('be.visible')
      .clear()
      .type(genderData.name)
      .should('have.value', genderData.name);

    // Submit the form
    cy.get('[data-cy="btn-submit-add-gender"]')
      .first()
      .should('be.enabled')
      .click();

    // Buscar el registro usando el search bar
    cy.get('[data-cy="search-gender"]').first().type(genderData.name);

    // Esperar que se filtren los resultados
    cy.wait(500);

    // Verify the new record is visible in the table and capture its ID
    cy.contains('[data-cy^="gender-name-"]', genderData.name)
      .should('be.visible')
      .closest('tr')
      .within(() => {
        // Get and store the created ID
        cy.get('[data-cy^="gender-id-"]')
          .invoke('text')
          .then((id) => {
            const trimmedId = id.trim();
            genderId = trimmedId;

            // Save ID to this context for sharing between tests
            this.savedGenderId = trimmedId;

            cy.log(`Created gender with ID: ${trimmedId}`);

            // Verify data was saved correctly
            cy.get(`[data-cy="gender-name-${trimmedId}"]`).should(
              'contain',
              genderData.name,
            );
          });
      });
  });

  /**
   * @test Edición de un género existente
   */
  it('should edit an existing gender', function () {
    // Use the ID saved from the creation test via this context
    const savedId = this.savedGenderId;

    // Check if savedId exists
    if (!savedId) {
      throw new Error('Failed to get saved gender ID from previous test');
    }

    genderId = String(savedId);

    // Navigate to gender page
    navigateToGenderPage();

    // Store the updated name
    genderData.updatedName = `${genderData.name} editado`;

    // Buscar el registro usando el search bar
    cy.get('[data-cy="search-gender"]').first().type(genderData.name);

    // Esperar que se filtren los resultados
    cy.wait(500);

    // Find the row with the gender and click the edit button
    cy.get(`[data-cy="gender-id-${genderId}"]`)
      .closest('tr')
      .find('[data-cy="btn-edit-gender"]')
      .first()
      .click({ force: true });

    // Edit the name field
    cy.get('[data-cy="input-edit-name-gender"]')
      .should('be.visible')
      .clear()
      .type(genderData.updatedName)
      .should('have.value', genderData.updatedName);

    // Submit the edit form
    cy.get('[data-cy="btn-submit-edit-gender"]')
      .should('be.enabled')
      .click();

    // Verify the changes were saved
    cy.get(`[data-cy="gender-name-${genderId}"]`).should(
      'contain',
      genderData.updatedName,
    );
  });

  /**
   * @test Eliminación de un género
   */
  it('should delete the created gender', function () {
    // Use the ID saved from the creation test via this context
    const savedId = this.savedGenderId;

    // Check if savedId exists
    if (!savedId) {
      throw new Error('Failed to get saved gender ID from previous test');
    }

    genderId = String(savedId);

    // Navigate to gender page
    navigateToGenderPage();

    // Buscar el registro usando el search bar y el nombre actualizado
    if (!genderData.updatedName) {
      throw new Error('Updated name is not defined');
    }
    cy.get('[data-cy="search-gender"]').first().type(genderData.updatedName);

    // Esperar que se filtren los resultados
    cy.wait(500);

    // Find the row with the gender and click the delete button
    cy.get(`[data-cy="gender-id-${genderId}"]`)
      .closest('tr')
      .find('[data-cy="btn-delete-gender"]')
      .first()
      .click({ force: true });

    // Confirm the deletion
    cy.get('[data-cy="btn-confirm-delete-gender"]').click();

    // Verify the row is no longer visible in the table
    cy.get(`[data-cy="gender-row-${genderId}"]`).should('not.exist');
  });

  after(() => {
    cy.visit('/');
    cy.logout();
    cy.url().should('include', '/auth/login');
  });
});