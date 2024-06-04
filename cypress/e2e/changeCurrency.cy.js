// cypress/integration/change_currency.spec.js

describe('Change Currency', () => {
  beforeEach(() => {
    // Visit the root URL before each test
    cy.intercept('GET', 'https://api.coingecko.com/api/v3/coins/markets**').as('getCoins')
    cy.visit('/')
  })

  it('opens the dropdown and changes the currency for EUR', () => {
    cy.get('[data-test-navbar]').should('be.visible').click()
    cy.get('.navbar-dropdown-list > .mdi-chevron-down').should('be.visible').click()

    // Check that the dropdown is open
    cy.get('[data-test-change-currency-list]').should('be.visible').contains('EUR').click()
    cy.wait('@getCoins')
  })
  it('opens the dropdown and changes the currency for USD', () => {
    cy.get('[data-test-navbar]').should('be.visible').click()
    cy.get('.navbar-dropdown-list > .mdi-chevron-down').should('be.visible').click()

    // Check that the dropdown is open
    cy.get('[data-test-change-currency-list]').should('be.visible').contains('USD').click()
    cy.wait('@getCoins')
  })
})
