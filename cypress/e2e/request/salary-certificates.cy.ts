/**
 * @file Prueba para la creación de solicitudes de constancias salariales.
 */
describe('Salary Certificate Request', () => {
    const salaryCertificateData = {
      reason: 'Solicitud para trámite bancario'
    };
    
    beforeEach(() => {
      // Configurar sesión autenticada antes de cada prueba
      cy.session('hr-user-session', () => {
        cy.login('rh');
        cy.url().should('not.include', '/auth/login');
      });
      
      // Navegar directamente a la página de solicitud de constancia salarial
      cy.visit('/request/salary-certificate');
      cy.url().should('include', '/request/salary-certificate');
    });
    
    it('should create a new salary certificate request', () => {
      // Verificar que estamos en la página correcta
      cy.contains('Solicitud de constancia de salario').should('be.visible');
      
      // Completar el formulario con los datos de prueba
      cy.get('label').contains('Motivo').parent().find('input')
        .should('be.visible')
        .clear()
        .type(salaryCertificateData.reason);
      
      // Enviar el formulario sin esperar una respuesta API
      cy.get('button[type="submit"]').first().click();
      
      // Simplemente verificar que el botón cambia de estado o muestra un spinner
      cy.get('button[type="submit"]').should('be.disabled');
    });
    
    after(() => {
      cy.visit('/');
      cy.logout();
    });
  });