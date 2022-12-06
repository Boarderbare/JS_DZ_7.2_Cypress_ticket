const accountData = require("../fixtures/account_data.json");
const selectors = require("../fixtures/selectors.json");

describe("Check login", () => {
  beforeEach(() => {
    cy.visit("/admin");
  });

  it("Should successfully login", () => {
    cy.login(accountData.loginValid, accountData.passValid);
  });

  it("Should not login with invalid login", () => {
    cy.login(accountData.loginInvalid, accountData.passInvalid);
    cy.contains("Ошибка авторизации!").should("be.visible");
  });

  it("Should not login with empty login", () => {
    cy.login(" ", accountData.passInvalid);
    cy.get(selectors.mail)
      .then(($el) => $el[0].checkValidity())
      .should("be.false");
  });

  it("Should not login with empty password", () => {
    cy.login(accountData.loginInvalid, "{shift}");
    cy.get(selectors.pass)
      .then(($el) => $el[0].checkValidity())
      .should("be.false");
  });
});
