describe('Validación de datos en perfil', () => {
  beforeEach(() => {
    cy.session(`sesion-rh`, () => {
      cy.login('user');
      cy.url().should('not.include', '/auth/login');
    });

    cy.visit('/profile');
  });

  const validateField = (
    index: number,
    inputSelector: string,
    invalidValues: string[],
    validValue: string
  ) => {
    cy.get('[data-cy="edit-profile"]').eq(index)
      .should('exist')
      .should('be.visible')
      .click();
  

    // Prueba valores inválidos
    invalidValues.forEach((value) => {
      cy.get(inputSelector).clear().type(value);
      cy.get('[data-cy="button-save"]').click();
    });

    // Guarda un valor válido
    cy.get(inputSelector).clear().type(validValue);
    cy.get('[data-cy="button-save"]').click();
  };

  it('Debe validar el campo Nombre', () => {
    validateField(0, '[data-cy="input-Name"]', ['A', '123', 'Nombre1'], 'Test');
  });

  it('Debe validar los campos de Apellidos', () => {
    validateField(1, '[data-cy="input-Surname1"]', ['A', '123', 'Apellido1', '@pellido'], 'Rojas');
    validateField(2, '[data-cy="input-Surname2"]', ['A', '123', 'Apellido1', '@pellido'], 'Gómez');
  });

  it('Debe validar el campo Teléfono', () => {
    validateField(3, '[data-cy="input-CellPhone"]', ['123', '1234567a', 'abcdefgh'], '88889999');
  });

  it('Debe validar el campo Email', () => {
    validateField(4, '[data-cy="input-Email"]', ['user@', 'user.com', 'user@domain', 'user@.com'], 'test@email.com');
  });

  it('Debe validar el campo Fecha de nacimiento', () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const futureDate = `${currentYear + 1}-01-01`;
    const invalidDate = `${currentYear}-01-01`;
    const validDate = `${currentYear - 20}-06-15`;

    validateField(5, '[data-cy="input-Birthdate"]', [invalidDate, futureDate], validDate);
  });
});
