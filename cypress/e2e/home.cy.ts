/// <reference types="cypress" />

describe('Fluxo de navegação', () => {
  it('Deve exibir as opções de navegação', () => {
    cy.visit('/')
    cy.contains('Serviços').should('be.visible')
    cy.contains('Agendar').should('be.visible')
    cy.contains('Home').should('be.visible')
    cy.contains('Profissionais').should('be.visible')
    cy.contains('Dashboard').should('be.visible')
  })

  it('Deve navegar até agendamentos', () => {
    cy.visit('/')
    cy.contains('Agendar').click()
    cy.url().should('include', '/agendamento')
  })

  it('Deve navegar até Serviços', () => {
    cy.visit('/')
    cy.contains('Serviços').click()
    cy.contains('Escolha o Serviço Ideal').should('be.visible')
    cy.url().should('include', '#services')
  })

  it('Deve navegar até Profissionais', () => {
    cy.visit('/')
    cy.contains('Profissionais').click()
    cy.contains('Profissionais Qualificados').should('be.visible')
    cy.url().should('include', '#professionals')
  })

  it('Deve navegar até Dashboards', () => {
    cy.visit('/')
    cy.contains('Dashboard').click()
    cy.contains('Dashboard').should('be.visible')
    cy.url().should('include', '/dashboard')
  })
})
