/* global Given, When, Then */
/// <reference types="cypress" />
const Chance = require("chance");

const chance = new Chance();

// POST :: 200 :: Successfully log with a registered user
Given('a valid user credentials', () => {
  cy.fixture('login').as("payload");
})

// POST :: 400 :: Missing input fields fails to log with a registered user
Given('user credentials without {string}', (missingInput) => {
  cy.fixture('login').then(login => {
    const payload = login;
    
    delete payload[missingInput];
    cy.wrap(payload).as("payload");
  })
})

// POST :: 401 :: Attempts to log with invalid credentials
Given('a user with invalid email', () => {
  cy.fixture('login').then(login => {
    const payload = login;
    payload.email = chance.email({ domain: "invalido-virada.qa" });
    
    cy.wrap(payload).as("payload");
  })
})

Given('a user with invalid password', () => {
  cy.fixture('login').then(login => {
    const payload = login;
    payload.password = '123456789'
    
    cy.wrap(payload).as("payload");
  })
})