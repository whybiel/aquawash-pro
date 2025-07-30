/// <reference types="cypress" />

import { criarAgendamento } from '../support/commands'

describe('Funcionalidade de Agendamento', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.window().then((win) => {
      win.localStorage.setItem(
        'user',
        JSON.stringify({
          name: 'Gabriel Moraes',
          email: 'gabriel@email.com',
          accessToken: 'fake-token'
        })
      )
    })
    cy.reload()
  })

  it('Deve acessar a página de agendamento e exibir o formulário', () => {
    cy.visit('/agendamento')
    cy.contains('Agendar Serviço').should('be.visible')
    cy.get('form').should('exist')
  })

  it('Deve validar campos obrigatórios', () => {
    cy.visit('/agendamento')
    cy.contains('Criar Agendamento').click()
    cy.contains('Selecione um serviço').should('exist')
    cy.contains('Selecione um profissional').should('exist')
    cy.contains('Selecione um horário').should('exist')
    cy.contains('Informe o modelo do veículo').should('exist')
    cy.contains('Informe a marca do veículo').should('exist')
    cy.contains('Informe a placa do veículo').should('exist')
    cy.contains('Informe a cor do veículo').should('exist')
  })

  it('Deve preencher e submeter o formulário com sucesso', () => {
    cy.visit('/agendamento')

    criarAgendamento()

    cy.contains('Criar Agendamento').click()

    cy.contains('Agendamento criado com sucesso!').should('be.visible')
  })

  it('Deve exibir erro em caso de conflito de horário', () => {
    cy.visit('/agendamento')

    criarAgendamento()

    cy.contains('Criar Agendamento').click()

    cy.contains('Agendamento criado com sucesso!').should('be.visible')

    criarAgendamento()

    cy.contains('Conflito de horário').should('be.visible')

    cy.contains('Horário').click()
    cy.get('[role="option"]').contains('16:00').click({ force: true })

    cy.contains('Criar Agendamento').click()

    cy.contains('Agendamento criado com sucesso!').should('be.visible')
  })

  it('Deve criar e editar um agendamento', () => {
    cy.visit('/agendamento')

    criarAgendamento()

    cy.contains('Criar Agendamento').click()

    cy.contains('Agendamento criado com sucesso!').should('be.visible')

    cy.contains('Dashboard').click()

    cy.contains('Editar').click()

    cy.contains('Marca do Veículo')
      .type('{selectall}{backspace}')
      .type('Nova Marca')

    cy.contains('Atualizar Agendamento').click()

    cy.contains('Agendamento atualizado com sucesso!').should('be.visible')

    cy.contains('Dashboard').click()

    cy.contains('Nova Marca').should('be.visible')
  })

  it('Deve criar e apagar um agendamento', () => {
    cy.visit('/agendamento')

    criarAgendamento()

    cy.contains('Criar Agendamento').click()

    cy.contains('Agendamento criado com sucesso!').should('be.visible')

    cy.contains('Dashboard').click()

    cy.contains('Cancelar').click()

    cy.contains('Lavagem Básica').should('not.exist')

    cy.contains('Agendamento cancelado').should('be.visible')
  })
})
