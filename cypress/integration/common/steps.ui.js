Given('register a new user', () => {
  cy.visit("/cadastrar");
  cy.fixture('historia').then(historia => {
      historia.email = chance.email({ domain: "ui-virada.qa" });

      cy.get('[data-test=register-name]')
      .click()
      .type(historia.name);
      cy.get('[data-test=register-email]')
      .click()
      .type(historia.email);
      cy.get('[data-test=register-password]')
      .click()
      .type(historia.password);
      cy.get('[data-test=register-password2]')
      .click()
      .type(historia.password);

      cy.get('[data-test=register-submit]').click();
    })
})

Then('should be redirect to {string} page', (expectedPage) => {
  cy.url().should("include", expectedPage);
})

Then('validation warning should be visible', () => {
  cy.get('.MuiFormHelperText-root').should('be.visible');
})

Then('an alert should appear with {string}', () => {
  cy.get('[data-test=alert]').should("be.visible");
})