const selectors = require("../fixtures/selectors.json");

Cypress.Commands.add("login", (login, password) => {
  cy.contains("Авторизация");
  cy.get(selectors.mail).type(login);
  cy.get(selectors.pass).type(password);
  cy.get(selectors.buttonLogin).click();
});
