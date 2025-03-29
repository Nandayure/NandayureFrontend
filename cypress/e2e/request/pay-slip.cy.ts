/**
 * @file Prueba para la creación de solicitudes de boletas de pago.
 */
describe('Pay Slip Request', () => {
    const paySlipData = {
      reason: 'Solicitud para trámite hipotecario'
    };
    
    beforeEach(() => { 
        // Configurar sesión autenticada antes de cada prueba
        cy.session('hr-user-session', () => {
          cy.login('rh');
          cy.url().should('not.include', '/auth/login');
        });
      
      // Navegar directamente a la página de solicitud de boleta de pago
      cy.visit('/request/pay-slip');
      cy.url().should('include', '/request/pay-slip');
    });
    
    it('should create a new pay slip request', () => {
      // Verificar que estamos en la página correcta
      cy.contains('Solicitud de boletas de pago').should('be.visible');
      
      // Completar el formulario con los datos de prueba
      // Nota: Usamos 'input[id="reason"]' porque dataCy puede no renderizarse correctamente
      cy.get('label').contains('Motivo').parent().find('input')
        .should('be.visible')
        .clear()
        .type(paySlipData.reason);
      
      // Enviar el formulario sin esperar una respuesta API
      cy.get('[data-cy="btn-pay-slip"]').first().click();
      
      // Verificar que el botón cambia de estado o muestra un spinner
      cy.get('[data-cy="btn-pay-slip"]').should('be.disabled');
    });
    
    after(() => {
      cy.visit('/');
      cy.logout();
    });
  });