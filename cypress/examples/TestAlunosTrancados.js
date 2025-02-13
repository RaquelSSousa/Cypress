/// <reference types="cypress" />

import 'cypress-iframe';
import { describe } from 'mocha';

describe('Login Prod', () => {

  beforeEach('Login - Conline -> Sis Uni', () => {
    cy.loginSisUni('prod', 'user', 'password');

  });

  it('Teste de Filtros', () => {

    // cy.url().should('include', 'locked-students');  // Verifica se a URL contém 'locked-students'
  });




});

