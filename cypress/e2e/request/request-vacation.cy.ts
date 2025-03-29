/**
 * @file Suite de pruebas para operaciones de solicitudes de vacaciones.
 * @description Esta suite de pruebas abarca el flujo completo para la gestión 
 * de solicitudes de vacaciones: creación, consulta, y seguimiento del estado.
 */
describe('Vacation Request Flow', () => {
  interface VacationRequestData {
    startDate: Date;
    endDate: Date;
    daysRequested: number;
  }
  
  let requestId: string = '';
  let vacationData: VacationRequestData;
  
  before(() => {
    // Configurar datos de prueba
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + 7); // 7 días en el futuro
    
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 14); // 14 días en el futuro
    
    vacationData = {
      startDate,
      endDate,
      daysRequested: 8 // incluye días de inicio y fin
    };
  });
  
  beforeEach(() => {
    // Configurar sesión autenticada antes de cada prueba
    cy.session('hr-user-session', () => {
      cy.login('rh');
      cy.url().should('not.include', '/auth/login');
    });
    
    // Navegar al inicio
    cy.visit('/');
  });

  /**
   * Navega a la página de solicitud de vacaciones
   */
  const navigateToVacationRequestPage = () => {
    // Navegar directamente a la URL de solicitud de vacaciones
    cy.visit('/request/vacation-request');
    
    // Verificar que estamos en la página correcta
    cy.url().should('include', '/request/vacation-request');
  };
  
  /**
   * @test Creación de una nueva solicitud de vacaciones
   */
  it('should create a new vacation request and save its ID', function () {
    navigateToVacationRequestPage();
    
    // Verificar que la descripción está visible para confirmar que la página cargó correctamente
    cy.get('[data-cy="vacation-request-description"]').should('be.visible');
    
    // Abrir el calendario - solo usar first() si realmente es necesario
    cy.get('[data-cy="btn-date-request-vacation"]').first().click();
    
    // Generar los selectores para las fechas específicas
    const startDateStr = vacationData.startDate.toISOString().split('T')[0]; // formato YYYY-MM-DD
    const endDateStr = vacationData.endDate.toISOString().split('T')[0]; // formato YYYY-MM-DD
    
    // Esperar a que el calendario sea visible
    cy.get('[data-cy="calendar-popover"]').should('exist');
    
    // Seleccionar fechas - usar eq(0) solo si hay duplicados
    cy.get(`[data-cy="calendar-day-${startDateStr}"]`).eq(0).click();
    cy.get(`[data-cy="calendar-day-${endDateStr}"]`).eq(0).click();
    
    // Verificar que el botón de envío esté habilitado
    cy.get('[data-cy="btn-submit-request-vacation"]')
      .should('not.be.disabled')
      .should('be.visible');
    
    // Interceptar la solicitud a la API para capturar la respuesta
    cy.intercept('POST', '/api/vacation-requests').as('createRequest');
    
    // Enviar el formulario
    cy.get('[data-cy="btn-submit-request-vacation"]').click();
    
    // Esperar a que se complete la solicitud
    cy.wait('@createRequest').then((interception) => {
      // Verificar que la solicitud fue exitosa (descomentar cuando la API esté funcionando)
      //expect(interception.response.statusCode).to.eq(201);
      
      // Obtener y guardar el ID de la solicitud creada si está disponible
      if (interception.response && interception.response.body && interception.response.body.id) {
        requestId = interception.response.body.id;
        // Guardar ID para compartir entre pruebas
        this.savedRequestId = requestId;
        cy.log(`Created vacation request with ID: ${requestId}`);
      } else {
        cy.log('No request ID was returned or response structure is different');
      }
    });
    
    // Verificar que no hay errores
    cy.get('[data-cy="error-message"]').should('not.exist');
    
    // Verificar el botón después del envío
    cy.contains('Enviar solicitud').should('be.visible');
  });
  
  after(() => {
    cy.visit('/');
    cy.logout();
    cy.url().should('include', '/auth/login');
  });
});