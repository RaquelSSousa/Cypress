import './commands'

Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes('SessionData') || err.message.includes('Cannot read properties of null')) {
      return false;
    }
    return true;
  });
  