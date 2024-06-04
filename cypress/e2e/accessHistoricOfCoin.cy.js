// cypress/integration/change_currency.spec.js

describe('Change Currency', () => {
  beforeEach(() => {
    // Visit the root URL before each test
    cy.intercept('GET', 'https://api.coingecko.com/api/v3/coins/markets**').as('getCoins')
    cy.intercept('GET', 'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart**').as(
      'getPrices'
    )
    cy.visit('/')
  })

  it('Click in any coin to see the historic', () => {
    cy.get('[data-test-data-table]').should('be.visible').click()
    cy.get('[data-test-data-table-item-name]').should('be.visible').eq(0).click()
    cy.get('[data-test-apexchart]').should('be.visible')
    cy.url().should('include', '/coin')
  })
})
