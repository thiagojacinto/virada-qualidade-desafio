/* global Given, When, Then */
/// <reference types="cypress" />
const Chance = require("chance");
const Ajv = require("ajv");

const chance = new Chance();
const jsonSchema = new Ajv();

// POST :: 200 :: Successfully log with a registered user
Given('a new user had been created', () => {
  cy.fixture('historia').then(historia  => {
    const payload = historia;
    payload.email = chance.email({ domain: "teste-virada.qa" });
    
    cy.request({
      url: 'api/users',
      method: 'POST',
      body: payload
    }).then(response => {
      cy.wrap(response.body.jwt).as("jwt");
      cy.wrap(payload).as("registeredUser");
    })
  })
})

Given('had obtained a valid jwt', () => {
  cy.get("@jwt").then(jwt => {
    expect(jwt).to.exist.and.not.be.empty;
  })
})

Given('a valid profile was made', () => {
  cy.fixture('perfil').as('payload');
})

When('send a POST request to {string} with that jwt', (route) => {
  cy.get("@jwt", { log: false }).then(jwt => {
    cy.get("@payload", { log: false }).then(payload => {
      cy.request({
        url: route,
        method: 'POST',
        body: payload,
        failOnStatusCode: false,
        headers: {
          'bearer': jwt
        }
      }).then(response => {
        cy.wrap(response).as("response");
      })
    })
  })
})

Then('a valid profile is expected', () => {
  cy.get("@response").then(response => {
    cy.fixture('schemas/perfil/sucesso').then(schema => {

      jsonSchema.validate(schema, response.body);
      expect(jsonSchema.errors, 'JSON Schema validation should not present errors').to.be.null;
    })
  })
})

// POST :: 200 :: Successfully update a profile for a registered user
Given('an already profiled user had logged in', () => {
  cy.fixture('login').then(login  => {
    const payload = login;
    
    cy.request({
      url: 'api/auth',
      method: 'POST',
      body: payload
    }).then(response => {
      cy.wrap(response.body.jwt).as("jwt");
      cy.wrap(payload).as("registeredUser");
    })
  })
})

// POST :: 400 :: Missing input fields fails to create a profile for a registered user
Given('removed {string} from profile', (missingInput) => {
  cy.get("@payload").then(oldPayload => {
    const payload = oldPayload;
    
    delete payload[missingInput];
    cy.wrap(payload).as("payload");
  })
})

// POST :: 401 :: Attempt to create an profile with invalid authentication
Given('had {string} jwt', (wrongInput) => {
  const invalidOptions = {
    invalid: '123',
    empty: ''
  }
  cy.wrap(invalidOptions[wrongInput]).as("jwt");
})