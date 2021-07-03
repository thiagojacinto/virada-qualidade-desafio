/// <reference types="cypress" />

class Perfil {
  constructor() {}

  acessarPerfil() {
    cy.visit("/criar-perfil");
  }

  preencher(dataTestParam, valor) {
    cy.get(`[data-test=${dataTestParam}]`)
      .click()
      .type(valor);
  }

  selecionarStatus(valor = 3) {
    cy.get('[data-test=profile-status]', { log: false })
      .click({ log: false })
      .get(`[data-test=status-${valor}]`)
      .click({ log: false });
  }

  completarPerfil() {
    this.selecionarStatus()
    this.preencher('profile-skills', chance.word());

    this.cadastrarPerfil();
  }

  cadastrarPerfil() {
    cy.get('[data-test=profile-submit]').click();
  }

  verificarExistencia(dataTestParam) {
    cy.get(`[data-test=${dataTestParam}]`).should("be.visible");
  }
}

const perfilPage = new Perfil();
export default { perfilPage }