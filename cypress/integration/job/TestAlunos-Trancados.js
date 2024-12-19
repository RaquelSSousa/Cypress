/// <reference types="cypress" />

import 'cypress-iframe';  // Importa o cypress-iframe no início do arquivo

describe('Teste de Login Conline', () => {

  // Variável global para armazenar a URL
  let savedUrl;

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
    cy.get('.iframeped01[name="iframe04"]') // seleciona o iframe
      .should('be.visible') //espera i iframe ficar visivel
      .its('0.contentDocument.body') // acessa o corpo do iframe
      .should('be.visible') // espera o corpo do iframe ficar visivel
      .find('a.qMargin').contains('Relatório de Alunos Trancados') // .click(); // seleciona o link e clica
      .then(($link) => {
        const href = $link.attr('href');  // Captura o atributo 'href' diretamente
        savedUrl = href;  // Salva a URL
        Cypress.env('savedUrl', savedUrl);  // Armazena a URL no Cypress.env
        cy.log('URL do relatório: ' + savedUrl);  // Mostra a URL capturada
      });    
  });

  it('Abertura SIS UNI via request', () => {
    const savedUrl = Cypress.env('savedUrl'); // Acessa a URL salva
    cy.log('URL capturada: ' + savedUrl);
  
    // Adiciona o domínio completo caso a URL esteja em formato relativo
    const fullUrl = 'https://online.iesb.br' + savedUrl;  // Concatena o domínio com a URL relativa
    cy.log('URL completa: ' + fullUrl);
  
    // Envia uma solicitação HTTP com a URL do token
    cy.request(fullUrl).then((response) => {
      // Verifica a resposta do servidor
      expect(response.status).to.eq(200);  // Verifica se a solicitação foi bem-sucedida
  
      // Loga a resposta completa para inspeção
      cy.log('Resposta completa:', JSON.stringify(response.body));
  
      // Verifica se a URL de redirecionamento existe na resposta
      const redirectUrl = response.body.redirectUrl;
      if (redirectUrl) {
        cy.visit(redirectUrl);  // Visita a URL de redirecionamento
      } else {
        cy.log('Redirecionamento não encontrado. Visitando a URL original.');
        cy.visit(fullUrl);  // Visita a URL original diretamente caso o redirecionamento não seja encontrado
      }
    });

    // Verifica se a página contém o texto esperado
    cy.get('form.content-start').contains('Relatório de Alunos Trancados').should('be.visible');
  });
  
  


  // // O sis uni deve abrir o link do relatório de alunos trancados
  // it('Abertura SIS UNI', () => {
  //   const savedUrl = Cypress.env('savedUrl'); // Acessa a URL salva
  //   cy.log('URL capturada: ' + savedUrl);
  
  //   // Envia uma solicitação HTTP com a URL do token
  //   cy.request(savedUrl).then((response) => {
  //     // Verifica a resposta do servidor
  //     expect(response.status).to.eq(200);  // Verifica se a solicitação foi bem-sucedida
  
  //     // Agora você pode extrair o conteúdo ou fazer mais verificações
  //     // (Por exemplo, se você precisa navegar para uma página específica após o request)
  //     cy.visit(response.body.redirectUrl);  // Acessa a URL de redirecionamento, se necessário


  //   // // Acessa a URL salva
  //   // const savedUrl = Cypress.env('savedUrl');

  //   // // Visita a URL salva
  //   // cy.visit(savedUrl);



  //   });
  // });
  

});
