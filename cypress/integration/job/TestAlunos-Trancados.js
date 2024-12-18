/// <reference types="cypress" />

import 'cypress-iframe';  // Importa o cypress-iframe no início do arquivo

describe('Teste de Login Conline', () => {
  // Antes de cada teste, visita a página de login
  beforeEach(() => {
    cy.fixture('urls').then((url) => {
      cy.visit(url.conline.prod); // Visita a página de login da produção
    });

    cy.fixture('login').then((login) => {
      cy.get('.mt-4 > .form-control')            // Seleciona o campo de nome de usuário
        .type(login.valid.conline.user180);      // Usa o nome de usuário válido da fixture
      cy.get('.d-flex > .form-control')          // Seleciona o campo de senha 
        .type(login.valid.conline.password180);  // Usa a senha válida da fixture
      cy.get(':nth-child(3) > .form-control').click();  // Seleciona o botão de login e clica
      // Verifica se o login foi bem-sucedido, esperando por um elemento na página seguinte
      cy.url().should('include', '/main'); 
      // Verifica se o nome de usuário aparece na página, indicando que o login foi realizado
      cy.contains(login.valid.conline.user180).should('be.visible'); 
    });  
  });

  it ('Deve acessar Conline do Relatório de Alunos Trancados', () => {
    cy.get('.iframeped01')
      .its('0.contentDocument.body') // acessa o corpo do iframe
      .should('be.visible')
      .find('a.qMargin').contains('Relatório de Alunos Trancados').click();
  
  });

  it('Deve acessar a nova aba e verificar o conteúdo', () => {
    // Captura o link que abre a nova aba
    cy.get('a.qMargin')
      .contains('Relatório de Alunos Trancados')
      .invoke('attr', 'href') // Obtém o href do link
      .then((href) => {
        // Visita o link diretamente, sem abrir uma nova aba
        cy.visit(href);
        
        // Aguardar 5 segundos para garantir que a página tenha carregado
        cy.wait(5000); 

        // Agora você pode interagir com a nova página
        cy.url().should('include', 'relatorio-de-alunos-trancados'); // Verifique se está na página correta
        cy.get('h1').should('contain', 'Relatório de Alunos Trancados'); // Verifique o conteúdo da nova página
      });
  });
  

});
