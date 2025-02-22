describe('Validate register emplooyee', () => {
  beforeEach(() => {
    cy.session(`sesion-rh`, () => {
      cy.login('rh')
      cy.url().should('not.include', '/auth/login');
    });

    cy.visit('/');
    cy.get('[data-cy="sidebar-dashboard-home"]').should('be.visible');
  });

  it('navigate to /auth/register', () => {
    cy.get('[data-cy="user-menu"]').first().click();
    cy.get('[data-cy="register-user-button"]').click();
    cy.url().should('include', '/auth/register');
  });

  it('displays validation errors when submitting empty registration form', () => {
    // Navegar a la página de registro
    cy.get('[data-cy="user-menu"]').first().click();
    cy.get('[data-cy="register-user-button"]').click();
    cy.url().should('include', '/auth/register');

    // Enviar el formulario vacío
    cy.get('[data-cy="form-register"]').within(() => {
      cy.get('[data-cy="button-Registrarse"]').click();
    });

    // Verificar mensajes de error de campos vacíos
    cy.get('[data-cy="error-Name"]').should(
      'contain',
      'El nombre es requerido',
    );
    cy.get('[data-cy="error-Surname1"]').should(
      'contain',
      'El primer apellido es requerido',
    );
    cy.get('[data-cy="error-Surname2"]').should(
      'contain',
      'El segundo apellido es requerido',
    );
    cy.get('[data-cy="error-Birthdate"]').should(
      'contain',
      'La fecha de nacimiento no es válida.',
    );
    cy.get('[data-cy="error-HiringDate"]').should(
      'contain',
      'La fecha de contratación no es válida.',
    );
    cy.get('[data-cy="error-Email"]').should(
      'contain',
      'El correo electrónico no es válido',
    );
    cy.get('[data-cy="error-CellPhone"]').should(
      'contain',
      'El número de teléfono es requerido',
    );
    cy.get('[data-cy="error-NumberChlidren"]').should(
      'contain',
      'El número de hijos es requerido',
    );
    cy.get('[data-cy="error-AvailableVacationDays"]').should(
      'contain',
      'Los días de vacaciones disponibles son requeridos',
    );
    cy.get('[data-cy="error-MaritalStatusId"]').should(
      'contain',
      'El estado civil es requerido.',
    );
    cy.get('[data-cy="error-GenderId"]').should(
      'contain',
      'El género es requerido.',
    );
    cy.get('[data-cy="error-JobPositionId"]').should(
      'contain',
      'El puesto de trabajo es requerido.',
    );
  });

  after(() => {
    cy.visit('/');
    cy.logout();
    cy.url().should('include', '/auth/login');
  });
});
