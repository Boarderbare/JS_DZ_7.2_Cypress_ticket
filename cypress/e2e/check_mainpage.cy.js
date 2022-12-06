const selectors = require("../fixtures/selectors.json");

describe("Check Main Page", () => {
  before(() => {
    cy.visit("/");
  });

  it("should be title", () => {
    cy.title().should("eq", "ИдёмВКино");
    cy.get("h1").should("be.visible").contains("Идём");
    cy.get("h1").should("be.visible").contains("кино");
  });

  it("should be dates of week ", () => {
    cy.get(selectors.amountDays).should("have.length", 7);
    const today = new Date().getDate();
    cy.get(selectors.day).first().contains(today);
  });

  it("should be movie on page", () => {
    cy.get(selectors.moviePoster).should("be.visible");
    cy.get(selectors.movieDescription).should("be.visible");
  });
});
