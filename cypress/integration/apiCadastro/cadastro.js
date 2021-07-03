/* global Given, When, Then */
/// <reference types="cypress" />
const Chance = require("chance");

const chance = new Chance();

// POST :: 201 :: Successfully register a new user
Given('a valid user story data', () => {
  cy.fixture('historia').then(historia => {
    const payload = historia;
    payload.email = chance.email({ domain: "teste-virada.qa" });
    cy.wrap(payload).as("payload");
  })
})

// POST :: 400 :: Missing input fields fails to register a new User
Given('user data without {string}', (missingInput) => {
  cy.fixture('historia').then(historia => {
    const payload = historia;
    payload.email = chance.email({ domain: "teste-virada.qa" });
    
    delete payload[missingInput];
    cy.wrap(payload).as("payload");
  })
})

// POST :: 400 :: Smaller passwords fails to register a new User
Given('with password smaller than requested', () => {
  cy.get("@payload").then(oldPayload => {

    oldPayload.password = '123';
    cy.wrap(oldPayload).as("payload");
  })
})

// POST :: 400 :: Already registered email fails to register a new User
Given('an already registered User', () => {
  cy.fixture('historia').then(historia => {
    cy.wrap(historia).as("payload");
  })
})