describe('empty spec', () => {

  beforeEach(() => {
    cy.visit('http://localhost:4200/login')

    cy.contains('Logistics Manager').click({force: true})

    cy.url().should('include', '/create-route')
  })

  it('.createRoute() - inputs for routes', () => {

    // RouteID

    cy.get('#input-routeId [type="text"]').type('888', {force: true})

    cy.get('#input-routeId [type="text"]').should('have.value', '888')

    // Origin

    cy.get('#input-routeOrigin [type="text"]').type('XXX', {force: true})

    cy.get('#input-routeOrigin [type="text"]').should('have.value', 'XXX')

    // Destination

    cy.get('#input-routeDestination [type="text"]').type('YYY', {force: true})

    cy.get('#input-routeDestination [type="text"]').should('have.value', 'YYY')

    // Distance

    cy.get('#input-routeDistance [type="number"]').type('10', {force: true})

    cy.get('#input-routeDistance [type="number"]').should('have.value', '10')

    // TimeDistance

    cy.get('#input-routeTimeDistance [type="number"]').type('20', {force: true})

    cy.get('#input-routeTimeDistance [type="number"]').should('have.value', '20')

    // EnergySpent

    cy.get('#input-routeEnergySpent [type="number"]').type('30', {force: true})

    cy.get('#input-routeEnergySpent [type="number"]').should('have.value', '30')

    // ExtraBatterySpent

    cy.get('#input-routeExtraBatteryTime [type="number"]').type('40', {force: true})

    cy.get('#input-routeExtraBatteryTime [type="number"]').should('have.value', '40')

    cy.get('#button-route').as('btn').click({force: true})
  })

  it('filter check', () => {
  })
})
