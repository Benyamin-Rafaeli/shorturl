/// <reference types="cypress" />

const baseLink = Cypress.env('knesset');
const knessetNumber = 19;

context('Actions', () => {
  Cypress._.times(1, (n) => {
    it('successfully get the form', () => {
      n += 1;
      cy.visit(
        `https://main.knesset.gov.il/Activity/Legislation/Laws/Pages/LawSuggestionsSearch.aspx?t=lawsuggestionssearch&st=allsuggestions&ki=${knessetNumber}&sb=LatestSessionDate&so=D&pn=${n}`
      );
      cy.log(n.toString());
    });
  });
});
