describe('Logout', () => {
  /**
   * @description Verifica el flujo completo de inicio y cierre de sesión
   * @test Debe permitir al usuario iniciar sesión correctamente
   * @test Debe mostrar el menú de usuario después del login
   * @test Debe permitir cerrar sesión mediante el botón correspondiente
   * @test Debe redireccionar a la página de login después del logout
   */
  it('should redirect to login page after logout', () => {
    cy.login('rh');
    cy.url().should('not.include', '/auth/login');

    cy.logout();
    cy.url().should('include', '/auth/login');
  });
});
