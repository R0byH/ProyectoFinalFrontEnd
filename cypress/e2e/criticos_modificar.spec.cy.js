describe('Verificar la funcionalidad de editar un producto', () => {
    before(() => {
      // Primero realizamos el login
      cy.visit('http://localhost:8080/login');
      cy.get('#usuario').type('user1@example.com');
      cy.get('#contrasena').type('password123');
      cy.get('[data-testid="acceder"]').click();
      cy.contains('Página de Administrador').should('be.visible');
    });
  
    it('Debería permitir editar un producto', () => {
      // Verificar que la tabla es visible
      cy.get('[data-testid="productsTable"]').should('be.visible');
      // Verificar que la tabla contiene al menos una fila o registro de productos
      cy.get('[data-testid^="productRow-"]').should('have.length.greaterThan', 0);
      // Seleccionar la primera fila de producto y hacer clic en el botón de editar
      cy.get('[data-testid^="productRow-"]').first().within(() => {
        cy.get('[data-testid^="editButton-"]').first().click();
      });
      // Verificar que el modal de confirmación se ha abierto
      cy.get('[data-testid="productName"]').should('be.visible').clear().type('Nuevo Nombre');
      cy.get('[data-testid="productDescription"]').should('be.visible').clear().type('Nueva Descripción');
      cy.get('[data-testid="productPrice"]').should('be.visible').clear().type('100');
  
      cy.get('button').contains('Guardar').click();
  
      cy.get('[data-testid="productName"]').should('not.exist');
      cy.get('[data-testid="productsTable"]').should('contain.text', 'Nuevo Nombre');
      cy.get('[data-testid="productsTable"]').should('contain.text', 'Nueva Descripción');
      cy.get('[data-testid="productsTable"]').should('contain.text', '100');
    });
  });
  