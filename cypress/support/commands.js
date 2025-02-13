Cypress.Commands.add('loginSisUni', (ambi, user, pass) => {
    
    let savedUrl;
  
    cy.fixture('urls').then((url) => {
      cy.visit(url.conline[ambi]); 
    });
  
  
    // Login Conline
    cy.fixture('login').then((login) => {
      cy.get('.mt-4 > .form-control').type(login.valid.conline[user]);      
      cy.get('.d-flex > .form-control').type(login.valid.conline[pass]);  
      cy.get(':nth-child(3) > .form-control').click();  
      cy.url().should('include', '/main');
      cy.contains(login.valid.conline[user]).should('be.visible');
    });
  
    cy.get('.iframeped01[name="iframe04"]') 
      .should('be.visible') 
      .its('0.contentDocument.body') 
      .should('be.visible') 
      .find('a.qMargin').contains('Relatório de Alunos Trancados')
      .then(($link) => {
        const href = $link.attr('href'); 
        savedUrl = href; 
        Cypress.env('savedUrl', savedUrl);  
        cy.log('URL do relatório: ' + savedUrl);  
      })
      .then(() => {
        cy.requestWithRedirect(savedUrl); 
      });
  
    cy.get('form.content-start').contains('Relatório de Alunos Trancados').should('be.visible');
    cy.get('button.text-gray-500').click(); 
    cy.get("img[alt='IESB']").click();
    cy.get('.text-lg.font-semibold').should('be.visible').contains('Seu novo Sistema Unificado').should('be.visible');
    cy.url().then((url) => {
      Cypress.env('finalUrl', url);  
      cy.log('URL do SIS UNI: ' + url);
    });
  });
  
  Cypress.Commands.add('requestWithRedirect', (savedUrl) => {
    
    const baseUrl = 'https://online.iesb.br';
    const fullUrl = baseUrl + savedUrl; 
  
    cy.log('URL completa (component): ' + fullUrl);
  
    cy.request(fullUrl).then((response) => {
      expect(response.status).to.eq(200);  
      cy.visit(fullUrl);  
  
    });
  });
