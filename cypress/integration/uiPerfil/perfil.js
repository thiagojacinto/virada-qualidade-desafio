/* global Given, When, Then */
/// <reference types="cypress" />
const Chance = require("chance");
const { perfilPage } = require("./perfil.page");

const chance = new Chance();

Given('access {string}', (route) => {
  perfilPage.acessarPerfil()
  cy.url().should('include', route);
})

When('fulfill correctly required form fields', () => {
  perfilPage.completarPerfil()
})

When('submit the form', () => {
  perfilPage.cadastrarPerfil();
})

Given('fulfill the form indicating an invalid URL', () => {
  perfilPage.selecionarStatus()
  perfilPage.preencher('profile-skills', chance.word());
  perfilPage.preencher('profile-webSite', chance.word());
})