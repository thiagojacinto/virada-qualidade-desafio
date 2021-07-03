Then('should be redirect to {string} page', (expectedPage) => {
  cy.url().should("include", expectedPage);
})

Then('validation warning should be visible', () => {
  cy.get('.MuiFormHelperText-root').should('be.visible');
})

Then('an alert should appear with {string}', () => {
  cy.get('[data-test=alert]').should("be.visible");
})