/// <reference types="cypress" />

export function criarAgendamento({
  tipoServico = 'Lavagem Básica',
  profissional = 'João Santos',
  dia = '31',
  horario = '14:00',
  marcaVeiculo = 'Toyota',
  modeloVeiculo = 'Corolla',
  placaVeiculo = 'ABC-1234',
  corVeiculo = 'Prata'
} = {}) {
  cy.contains('Tipo de Serviço').click()
  cy.get('[role="option"]').contains(tipoServico).click({ force: true })

  cy.contains('Profissional').click()
  cy.get('[role="option"]').contains(profissional).click({ force: true })

  cy.contains('Data').click()
  cy.contains(new RegExp(`^${dia}$`)).click({ force: true })

  cy.contains('Horário').click()
  cy.get('[role="option"]').contains(horario).click({ force: true })

  cy.contains('Marca do Veículo').type(marcaVeiculo)
  cy.contains('Modelo do Veículo').type(modeloVeiculo)
  cy.contains('Placa do Veículo').type(placaVeiculo)
  cy.contains('Cor do Veículo').type(corVeiculo)

  cy.contains('Criar Agendamento').click()
}
