const accountData = require("../fixtures/account_data.json");
const place = require("../fixtures/place_in_hall.json");
const selectors = require("../fixtures/selectors.json");

it("Should find a hall and  book tickets", () => {
  cy.visit("/admin");
  cy.login(accountData.loginValid, accountData.passValid);

  cy.get(selectors.adminHallOpen) // ищем зал с открытой продажей  и бронируем билет
    .its("length")
    .then((numberOfHall) => {
      for (let i = 1; i <= numberOfHall; i += 1) {
        let buttonHall = `#start-sales > div:nth-child(2) > ul > li:nth-child(${i})`;
        cy.get(buttonHall).click();

        if (cy.get(selectors.signOpenSale).contains("Продажа билетов открыта!!!")) {
          cy.get(buttonHall).then(($el) => {
            const nameHall = $el.text();
            cy.visit("/");
            cy.get(`body > nav > a:nth-child(${place.day})`).click();
            cy.contains(nameHall).parent().find(selectors.selectSeance).click();
            cy.get(selectors.infoHall).contains(nameHall).should("be.visible");
            cy.get(`div.buying-scheme__wrapper > div:nth-child(${place.row}) > span:nth-child(${place.seat})`).click();
            cy.get(selectors.button).contains("Забронировать").click();
            cy.get("h2").should("have.text", "Вы выбрали билеты:").should("be.visible");
            const placeTicket = place.row + "/" + place.seat;
            cy.contains(placeTicket).should("be.visible");
            cy.contains(nameHall).should("be.visible");
            // не бронировать билет окончательно. не поянтно как снять потом бронь
            // cy.get("button").contains("Получить код бронирования").click();
            // cy.get("h2").should("have.text", "Электронный билет").should("be.visible");
         
          });
          break;
        }
      }
    });
});
