describe('template spec', () => {
  beforeEach(() => {
    cy.session(`sesion-rh`, () => {
      cy.login('user');
      cy.url().should('not.include', '/auth/login');
    });

    cy.visit('/');
    cy.get('[data-cy="sidebar-dashboard-home"]').should('be.visible');
  });

  //Navegar por el perfil
  it('navigation profile', () => {
    cy.get('[data-cy="user-menu"]').first().click();
    cy.get('[data-cy="profile-button"]').click();
    cy.url().should('include', '/profile');
  });

  //Actualizar
 
  it('update profile', () => {
    cy.visit('/profile'); 

    // Editar Nombre
    cy.get('[data-cy="edit-profile"]').first().click();
    cy.get('[data-cy="input-Name"]').should('exist').clear().type('Ronny');
    cy.get('[data-cy="button-save"]').click();
    cy.get('[data-cy="dialog-profile"]').should('not.exist');

    // Editar Primer Apellido
    cy.get('[data-cy="edit-profile"]').eq(1).click();
    cy.get('[data-cy="input-Surname1"]').should('exist').clear().type('Gomez');
    cy.get('[data-cy="button-save"]').click();
    cy.get('[data-cy="dialog-profile"]').should('not.exist');

    // Editar Segundo Apellido
    cy.get('[data-cy="edit-profile"]').eq(2).click();
    cy.get('[data-cy="input-Surname2"]').should('exist').clear().type('Rojas');
    cy.get('[data-cy="button-save"]').click();
    cy.get('[data-cy="dialog-profile"]').should('not.exist');

    // Editar Teléfono
    cy.get('[data-cy="edit-profile"]').eq(3).click();
    cy.get('[data-cy="input-CellPhone"]').should('exist').clear().type('60875436');
    cy.get('[data-cy="button-save"]').click();
    cy.get('[data-cy="dialog-profile"]').should('not.exist');

    // Editar Correo Electrónico
    cy.get('[data-cy="edit-profile"]').eq(4).click();
    cy.get('[data-cy="input-Email"]').should('exist').clear().type('nuevoemail@example.com');
    cy.get('[data-cy="button-save"]').click();
    cy.get('[data-cy="dialog-profile"]').should('not.exist');

    // Editar Fecha de Nacimiento
    cy.get('[data-cy="edit-profile"]').eq(5).click();
    cy.get('[data-cy="input-Birthdate"]').should('exist').clear().type('1990-01-01');
    cy.get('[data-cy="button-save"]').click();
    cy.get('[data-cy="dialog-profile"]').should('not.exist');

});

after(() => {
  cy.visit('/');
  cy.reload(); 
  cy.logout(); 
  cy.url().should('include', '/auth/login'); 
});

});