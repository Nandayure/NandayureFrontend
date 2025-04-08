/**
 * @file Suite de pruebas para operaciones CRUD de puestos de trabajo.
 */

describe('Job Position Management Flow', () => {
  interface JobPositionData {
    name: string;
    description: string;
    baseSalary: string;
    globalSalary: string;
    extrafees: string;
    departmentId?: string;
    departmentIndex: number;
    updatedName?: string;
  }

  // Usar una variable a nivel del contexto que persista entre pruebas
  let jobPositionId: string;
  let jobPositionData: JobPositionData;

  before(() => {
    // Load test data from fixture
    cy.fixture('jobPosition.json').then((data: JobPositionData) => {
      jobPositionData = data;
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
   * Navega a la página de gestión de puestos de trabajo
   */
  const navigateToJobPositionPage = () => {
    cy.visit('/system-configuration/positions');
    cy.url().should('include', '/system-configuration/positions');
  };

  /**
   * @test Creación de un nuevo puesto de trabajo
   */
  it('should create a new job position and save its ID', () => {
    navigateToJobPositionPage();

    // Click the add button
    cy.get('[data-cy="btn-add-job-position"]')
      .first() // Asegurarse de seleccionar solo el primer elemento si hay múltiples
      .should('be.enabled')
      .click();

    // Verify modal is open
    cy.get('[data-cy="modal-add-job-position"]').should('be.visible');

    // Fill the form
    cy.get('[data-cy="input-name-add-job-position"]')
      .should('be.visible')
      .clear()
      .type(jobPositionData.name)
      .should('have.value', jobPositionData.name);

    cy.get('[data-cy="input-add-description-job-position"]')
      .should('be.visible')
      .clear()
      .type(jobPositionData.description)
      .should('have.value', jobPositionData.description);

    cy.get('[data-cy="input-add-salarioBase-job-position"]')
      .should('be.visible')
      .clear()
      .type(jobPositionData.baseSalary)
      .should('have.value', jobPositionData.baseSalary);

    cy.get('[data-cy="input-add-SalarioGlobal-job-position"]')
      .should('be.visible')
      .clear()
      .type(jobPositionData.globalSalary)
      .should('have.value', jobPositionData.globalSalary);

    cy.get('[data-cy="input-add-salarioExtra-job-position"]')
      .should('be.visible')
      .clear()
      .type(jobPositionData.extrafees)
      .should('have.value', jobPositionData.extrafees);

    // Select department usando el índice
    cy.get('[data-cy="select-department-job-position"]').click();
    cy.wait(500); // Esperar a que el menú se abra
    
    // Seleccionar por índice - más confiable
    cy.get('[role="option"]').eq(jobPositionData.departmentIndex).click();

    // Submit the form
    cy.get('[data-cy="btn-submit-add-job-position"]')
      .should('be.enabled')
      .click();

    // Esperar que la página se cargue completamente
    cy.wait(1000);

   
    
    // Buscar el registro usando el search bar
    cy.get('[data-cy="search-job-position"]')
    .first().type(jobPositionData.name, {force: true});

    // Esperar que se filtren los resultados
    cy.wait(1000);

    // Verificar que el nuevo registro es visible y capturar su ID
    cy.contains('td', jobPositionData.name)
      .should('be.visible')
      .closest('tr')
      .within(() => {
        // Obtener y almacenar el ID creado
        cy.get('[data-cy^="jobPosition-id-"]')
          .first() // Asegurarse de seleccionar solo el primer elemento
          .invoke('text')
          .then((id) => {
            const trimmedId = id.trim();
            
            // Verificar que el ID no esté vacío
            expect(trimmedId).to.not.equal('');
            
            // IMPORTANTE: Guardar el ID como variable de Cypress para que persista entre pruebas
            cy.wrap(trimmedId).as('savedJobPositionId');
            
            cy.log(`Created job position with ID: ${trimmedId}`);
            
          });
      });
  });

})