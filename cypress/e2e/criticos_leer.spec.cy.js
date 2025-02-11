describe('Verificar Información del Producto', () => {
    before(() => {
        // Primero realizamos el login
        cy.visit('http://localhost:8080/login');
        cy.get('#usuario').type('user1@example.com');
        cy.get('#contrasena').type('password123');
        cy.get('[data-testid="acceder"]').click();
        cy.contains('Administración').should('be.visible');
    });
    it('Debería mostrar una tabla con una lista de productos', () => {
        // Visitar la página de productos
        cy.visit('http://localhost:8080/admin/home');

        cy.get('[data-testid="productsTable"]').should('be.visible');

        cy.get('[data-testid="productsTable"] thead').within(() => {
            cy.get('[data-testid="headerName"]').should('contain.text', 'Nombre');
            cy.get('[data-testid="headerDescription"]').should('contain.text', 'Descripción');
            cy.get('[data-testid="headerPrice"]').should('contain.text', 'Precio');
            cy.get('[data-testid="headerActions"]').should('contain.text', 'Acciones');
        });

        cy.get('[data-testid^="productRow-"]').should('have.length.greaterThan', 0);

        cy.get('[data-testid^="productRow-"]').first().within(() => {
            cy.get('td').eq(0).should('not.be.empty');
            cy.get('td').eq(1).should('not.be.empty');
            cy.get('td').eq(2).should('not.be.empty');

            cy.get('[data-testid^="editButton-"]').should('be.visible');
            cy.get('[data-testid^="deleteButton-"]').should('be.visible');

            cy.get('[data-testid^="editButton-"]').first().should('contain.text', 'Editar');
            cy.get('[data-testid^="deleteButton-"]').first().should('contain.text', 'Eliminar');
        });
    });
});