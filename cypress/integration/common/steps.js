/* global Given, When, Then */
When('send a POST request to {string}', (route) => {
  cy.get("@payload").then(payload => {
    cy.request({
      url: route,
      method: 'POST',
      body: payload,
      failOnStatusCode: false
    }).then(response => {
      cy.wrap(response).as("response");
    })
  })
})

When('send a GET request to {string}', (route) => {
  cy.request({
    url: route,
    method: 'GET',
    failOnStatusCode: false
  }).then(response => {
    cy.wrap(response).as("response");
  })
})

Then('status should be {int}', (expectedStatusCode) => {
  cy.get("@response").then(response => {
    expect(response.status).to.be.equal(expectedStatusCode);
  })
})

Then('a jwt is expected', () => {
  cy.get("@response").then(response => {
    expect(response.body.jwt).to.exist.and.to.be.not.empty;
  })
})

Then('error message should include {string}', (expectedError) => {
  cy.get("@response").then(response => {
    const includesError = response.body.errors.some(item => item.param.includes(expectedError));
    
    expect(includesError).to.be.true;
  })
})


Then('error message should be {string}', (expectedErrorMessage) => {
  cy.get("@response").then(response => {
    const includesError = response.body.errors.some(item => item.msg.includes(expectedErrorMessage));
    
    expect(includesError, `error.msg should be equal to ${expectedErrorMessage}`).to.be.true;
  })
})