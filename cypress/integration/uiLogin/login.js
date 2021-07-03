/* global Given, When, Then */
/// <reference types="cypress" />
const Chance = require("chance");
const { loginPage } = require("./login.page");

const chance = new Chance();

// happy :: Successfully register a new user
Given('access {string}', (route) => {
  loginPage.acessarLogin()
  cy.url().should('include', route);
})

When('fulfill credentials correctly', () => {
  cy.fixture('login').then(usuario => {
    loginPage.preencher('login-email', usuario.email);
    loginPage.preencher('login-password', usuario.password);
  })
})

When('submit the form', () => {
  loginPage.submeterLogin();
})

// happy :: Login page to have a Login link
Then('should be visible a Register link', () => {
  loginPage.verificarExistencia('login-register');
})

// failure :: Attempt to log in with invalid fields
When('fulfill with invalid email', () => {
  cy.fixture('login').then(usuario => {
    loginPage.preencher('login-email', 'invalid-mail-format');
    loginPage.preencher('login-password', usuario.password);
  })
})

When('fulfill with invalid password', () => {
  cy.fixture('login').then(usuario => {
    loginPage.preencher('login-email', usuario.email);
    loginPage.preencher('login-password', '123');
  })
})

// failure :: Attempt to log in with unregistered email
When('fulfill with unregistered email', () => {
  cy.fixture('login').then(usuario => {
    const outroEmail = chance.email({  });

    loginPage.preencher('login-email', outroEmail);
    loginPage.preencher('login-password', usuario.password);
  })
})

// failure :: Attempt to log in with wrong password
When('fulfill with wrong password', () => {
  cy.fixture('login').then(usuario => {
    const senhaErrada = chance.string({ length: 20 });

    loginPage.preencher('login-email', usuario.email);
    loginPage.preencher('login-password', senhaErrada);
  })
})