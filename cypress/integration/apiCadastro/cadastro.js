/* global Given, When, Then */
/// <reference types="cypress" />
const Chance = require("chance");

const chance = new Chance();
let payload;

// POST :: 201 :: Successfully register a new user
Given('a valid user story data', () => {
  cy.fixture('historia').then(historia => {
    payload = historia;
    payload.email = chance.email({ domain: "teste-virada.qa" })
    return payload;
  })
})

When('send a POST request to {string}', (route) => {
  cy.request({
    url: route,
    method: 'POST',
    body: payload,
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

// POST :: 400 :: Missing input fields fails to register a new User
Given('user data without {string}', (missingInput) => {
  cy.fixture('historia').then(historia => {
    payload = historia;
    payload.email = chance.email({ domain: "teste-virada.qa" });
    
    delete payload[missingInput];
    return payload;
  })
})

Then('error message should include {string}', (expectedError) => {
  cy.get("@response").then(response => {
    const includesError = response.body.errors.some(item => item.param.includes(expectedError));
    
    expect(includesError).to.be.true;
  })
})

// POST :: 400 :: Smaller passwords fails to register a new User
Given('with password smaller than requested', () => {
  payload.password = '123';
  return payload;
})

// POST :: 400 :: Already registered email fails to register a new User
Given('an already registered User', () => {
  cy.fixture('historia').then(historia => {
    payload = historia;
    return payload;
  })
})

Then('error message should be {string}', (expectedErrorMessage) => {
  cy.get("@response").then(response => {
    const includesError = response.body.errors.some(item => item.msg.includes(expectedErrorMessage));
    
    expect(includesError, `error.msg should be equal to ${expectedErrorMessage}`).to.be.true;
  })
})