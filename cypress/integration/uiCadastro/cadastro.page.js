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

  completarCadastro() {
    cy.fixture('historia').then(historia => {
      historia.email = chance.email({ domain: "ui-virada.qa" });

      this.preencher('register-name', historia.name);
      this.preencher('register-email', historia.email);
      this.preencher('register-password', historia.password);
      this.preencher('register-password2', historia.password);

      this.enviarCadastro();
    })
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