/// <reference types="cypress" />

class Login {
  constructor() {}

  acessarLogin() {
    cy.visit("/login");
  }

  preencher(dataTestParam, valor) {
    cy.get(`[data-test=${dataTestParam}]`)
      .click()
      .type(valor);
  }

  submeterLogin() {
    cy.get('[data-test=login-submit]').click();
  }

  verificarExistencia(dataTestParam) {
    cy.get(`[data-test=${dataTestParam}]`).should("be.visible");
  }
}

const loginPage = new Login();
export default { loginPage }