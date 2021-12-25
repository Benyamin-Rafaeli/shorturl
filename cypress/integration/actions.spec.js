/// <reference types="cypress" />

const knessetNumber = 19;

context('Actions', () => {
  Cypress._.times(1, (n) => {
    it('successfully get the form', () => {
      n += 1;
      cy.visit(
        `https://main.knesset.gov.il/Activity/Legislation/Laws/Pages/LawSuggestionsSearch.aspx?t=lawsuggestionssearch&st=allsuggestions&ki=${knessetNumber}&sb=LatestSessionDate&so=D&pn=${n}`
      );

      cy.wait(2000);

      cy.get('#divLawBillsResults').then((table) => {
        const rows = table.eq(0);
        console.log(rows);
        // const rowText = rows.text().trim();
        // console.log(rowText);
        // const innerUrl = rows.find('href');
        // console.log(innerUrl);

        // debugger;
      });
      // .find('a').its('href');

      cy.log(n.toString());
    });
  });
});
