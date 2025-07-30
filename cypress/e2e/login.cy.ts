/// <reference types="cypress" />

describe('Fluxo de navegação', () => {
  it('Deve renderizar o botão de Entrar', () => {
    cy.visit('/')
    cy.contains('Entrar').click()
    cy.contains('Entrar com Microsoft').should('be.visible')
  })

  it('Deve clicar no botão de fechar', () => {
    cy.visit('/')
    cy.contains('Entrar').click()
    cy.contains('Entrar com Microsoft').should('be.visible')
    cy.get('[role="dialog"]').find('button').last().click()
    cy.contains('Entrar com Microsoft').should('not.exist')
  })

  it('Deve simular login e exibir nome do usuário logado', () => {
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
    cy.contains('Gabriel Moraes').should('be.visible')
  })

  it('Deve fazer logout', () => {
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
    cy.contains('Gabriel Moraes').should('be.visible')
    cy.get('[aria-label="Sair"]').click()
    cy.contains('Gabriel Moraes').should('not.exist')
    cy.window().its('localStorage.user').should('not.exist')
  })
})
