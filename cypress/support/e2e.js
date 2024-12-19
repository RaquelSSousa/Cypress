// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')


// Captura erros não tratados (uncaught exceptions) globalmente
Cypress.on('uncaught:exception', (err, runnable) => {
    // Ignora o erro específico (exemplo: erro relacionado a 'SessionData')
    if (err.message.includes('SessionData') || err.message.includes('Cannot read properties of null')) {
      // Retorna 'false' para impedir que o erro falhe o teste
      return false;
    }
  
    // Deixa que outros erros falhem o teste
    return true;
  });
  