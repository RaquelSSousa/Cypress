/// <reference types="cypress" />

describe('Teste de Login', () => {
  // Antes de cada teste, visita a página de login
  beforeEach(() => {
    cy.fixture('urls').then((url) => {
      cy.visit(url.aonline.login); // Visita a página de login
    });
  });

  it('Deve exibir erro com credenciais inválidas', () => {
    // Carrega os dados da fixture
    cy.fixture('loginData').then((login) => {
      // Preenche o campo de nome de usuário com dados inválidos
      cy.get('input[name="username"]')
        .type(login.invalid.username);  // Usa o nome de usuário inválido da fixture

      // Preenche o campo de senha com dados inválidos
      cy.get('input[name="password"]')
        .type(login.invalid.password);  // Usa a senha inválida da fixture

      // Clica no botão de login
      cy.get('button[type="submit"]')
        .click();

      // Verifica se a mensagem de erro é exibida
      cy.contains('Username or password invalid!').should('be.visible'); // Substitua pela mensagem de erro esperada
    });
  });

  it('Deve realizar o login com sucesso', () => {
    // Carrega os dados da fixture
    cy.fixture('loginData').then((login) => {
      // Preenche o campo de nome de usuário com dados válidos
      cy.get('input[name="username"]')  // Seleciona o campo de nome de usuário (substitua pelo seletor correto)
        .type(login.valid.username);      // Usa o nome de usuário válido da fixture

      // Preenche o campo de senha com dados válidos
      cy.get('input[name="password"]')  // Seleciona o campo de senha (substitua pelo seletor correto)
        .type(login.valid.password);      // Usa a senha válida da fixture

      // Clica no botão de login
      cy.get('button[type="submit"]')   // Seleciona o botão de login (substitua pelo seletor correto)
        .click();

      // Verifica se o login foi bem-sucedido, esperando por um elemento na página seguinte
      cy.url({ timeout: 17000 }).should('include', '/home/avisos'); // Substitua com o URL esperado após o login bem-sucedido

      // // Verifica se o nome de usuário aparece na página, indicando que o login foi realizado
      // cy.contains('Olá, ' + data.valid.username).should('be.visible'); // Verifica se o nome do usuário aparece na página
    });
  });

});