/// <reference types="cypress" />

class Cadastro {
  constructor() {}

  acessarCadastro() {
    cy.visit("/cadastrar");
  }

  preencher(dataTestParam, valor) {
    cy.get(`[data-test=${dataTestParam}]`)
      .click()
      .type(valor);
  }

  enviarCadastro() {
    cy.get('[data-test=register-submit]').click();
  }

  verificarExistencia(dataTestParam) {
    cy.get(`[data-test=${dataTestParam}]`).should("be.visible");
  }
}

const cadastroPage = new Cadastro();
export default { cadastroPage }