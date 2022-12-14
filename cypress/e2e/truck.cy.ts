describe('empty spec', () => {

  beforeEach(() => {
    cy.visit('http://localhost:4200/login')

    cy.contains('Fleet Manager').click({force: true})

    cy.contains('Create Truck').click({force: true})

    cy.url().should('include', '/create-truck')
  })

  it('.createTruck() - inputs for trucks', () => {

    // License Plate

    cy.get('#input-licensePlate [type="text"]').type('AA-88-XX', {force: true})

    //cy.get('#input-licencePlate [type="text"]').should('have.value', 'AA-88-XX')

    // Autonomy

    cy.get('#input-autonomy [type="number"]').type('10', {force: true})

    cy.get('#input-autonomy [type="number"]').should('have.value', '10')

    // CapacityCargo

    cy.get('#input-capacityCargo [type="number"]').type('20', {force: true})

    cy.get('#input-capacityCargo [type="number"]').should('have.value', '20')

    // CapacityTransportation

    cy.get('#input-capacityTransportation [type="number"]').type('30', {force: true})

    cy.get('#input-capacityTransportation [type="number"]').should('have.value', '30')

    // Battery

    cy.get('#input-battery [type="number"]').type('40', {force: true})

    cy.get('#input-battery [type="number"]').should('have.value', '40')

    // Tare

    cy.get('#input-tare [type="number"]').type('50', {force: true})

    cy.get('#input-tare [type="number"]').should('have.value', '50')

    cy.get('#button-truck').as('btn').click({force: true})
  })

  it('filter check', () => {
  })
})
