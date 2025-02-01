/// <reference types="cypress" />

describe('Login Prod', () => {

    
    beforeEach('Login - Corretor -> Sis Uni', () => {
        cy.fixture('urls').then((url) => {
            cy.visit(url.corretor['prod']);
            });

        cy.fixture('login').then((login) => {
            cy.get('#email').type(login.valid.corretor['user']);
            cy.get('#password').type(login.valid.corretor['password']);
            cy.get('.inline-flex').click();
            cy.get('.text-lg').should('be.visible').contains('Seu novo Sistema Unificado');
        });

        cy.get('button.text-gray-500').click(); //darkmode
    });

    it("Correção de Redação", () => {


    
    
    });

    it("Temas", () => {


    
    
    });


});
