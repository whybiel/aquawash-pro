/// <reference types="cypress" />

describe('Renderização de feedbacks', () => {
  it('Deve carregar os feedbacks corretamente', () => {
    cy.intercept('GET', 'https://randomuser.me/api/?results=15').as(
      'getFeedbacks'
    )
    cy.visit('/')
    cy.wait('@getFeedbacks').its('response.statusCode').should('eq', 200)
  })

  it('Deve renderizar os feedbacks', () => {
    cy.visit('/')
    cy.contains('Feedbacks').should('be.visible')
  })

  it('Deve exibir 15 feedbacks na página inicial', () => {
    cy.visit('/')
    cy.get('#section-feedbacks > div').should('have.length', 15)
  })
})
