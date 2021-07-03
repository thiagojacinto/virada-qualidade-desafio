/* global Given, When, Then */
/// <reference types="cypress" />
const Chance = require("chance");
const { cadastroPage } = require("./cadastro.page");

const chance = new Chance();

// happy :: Successfully register a new user
Given('access {string}', (route) => {
  cadastroPage.acessarCadastro()
  cy.url().should('include', route);
})

When('fulfill correctly the form fields', () => {
  cy.fixture('historia').then(historia => {
    historia.email = chance.email({ domain: "ui-virada.qa" });

    cadastroPage.preencher('register-name', historia.name);
    cadastroPage.preencher('register-email', historia.email);
    cadastroPage.preencher('register-password', historia.password);
    cadastroPage.preencher('register-password2', historia.password);
  })
})

When('submit the form', () => {
  cadastroPage.enviarCadastro();
})

Then('should be redirect to {string} page', (route) => {
  cy.url().should('include', route);
})

// happy :: Register page to have a Login link
Then('should be visible a Login link', () => {
  cadastroPage.verificarExistencia('register-login');
})

// failure :: All register form fields are required
When('fulfill without name', () => {
  cy.fixture('historia').then(historia => {
    historia.email = chance.email({ domain: "ui-virada.qa" });

    cadastroPage.preencher('register-email', historia.email);
    cadastroPage.preencher('register-password', historia.password);
    cadastroPage.preencher('register-password2', historia.password);
  })
})
When('fulfill without email', () => {
  cy.fixture('historia').then(historia => {
    historia.email = chance.email({ domain: "ui-virada.qa" });

    cadastroPage.preencher('register-name',historia.name);
    cadastroPage.preencher('register-password', historia.password);
    cadastroPage.preencher('register-password2', historia.password);
  })
})
When('fulfill without password', () => {
  cy.fixture('historia').then(historia => {
    historia.email = chance.email({ domain: "ui-virada.qa" });

    cadastroPage.preencher('register-name',historia.name);
    cadastroPage.preencher('register-email', historia.email);
    cadastroPage.preencher('register-password2', historia.password);
  })
})
When('fulfill without password2', () => {
  cy.fixture('historia').then(historia => {
    historia.email = chance.email({ domain: "ui-virada.qa" });

    cadastroPage.preencher('register-name',historia.name);
    cadastroPage.preencher('register-email', historia.email);
    cadastroPage.preencher('register-password', historia.password);
  })
})

Then('validation warning should be visible', () => {
  cy.get('.MuiFormHelperText-root').should('be.visible');
})

// failure :: Attempts to register an already registered email
When('fulfill the form fields with registered email', () => {
  cy.fixture('historia').then(historia => {
    
    cadastroPage.preencher('register-name',historia.name);
    cadastroPage.preencher('register-email', historia.email);
    cadastroPage.preencher('register-password', historia.password);
    cadastroPage.preencher('register-password2', historia.password);
  })
})

Then('an alert should appear with {string}', () => {
  cadastroPage.verificarExistencia("alert");
})

// failure :: Attempts to register with small password
When('fulfill the form fields with small password', () => {
  cy.fixture('historia').then(historia => {
    
    cadastroPage.preencher('register-name',historia.name);
    cadastroPage.preencher('register-email', historia.email);
    cadastroPage.preencher('register-password', historia.password.substr(0, 5));
    cadastroPage.preencher('register-password2', historia.password.substr(0, 5));
  })
})
