describe('empty spec', () => {

  beforeEach(() => {
    cy.visit('http://localhost:4200/login')


    cy.contains('Warehouse Manager').click({force: true})

    cy.contains('Create Delivery').click()

    cy.url().should('include', '/create-delivery')
  })

  it('.createDelivery() - inputs for delivery', () => {
    // Get an input, type into it
    //delivery id
    cy.get('.input-deliveryIdentifier [type="text"]').type('7F2', {force: true})

    cy.get('.input-deliveryIdentifier [type="text"]').should('have.value', '7F2')

    //day

    cy.get('.input-day [type="number"]').type('23', {force: true})

    cy.get('.input-day [type="number"]').should('have.value', '23')

    //month

    cy.get('.input-month [type="text"]').type('december', {force: true})

    cy.get('.input-month [type="text"]').should('have.value', 'december')

    //year

    cy.get('.input-year [type="number"]').type('2012', {force: true})

    cy.get('.input-year [type="number"]').should('have.value', '2012')

    //mass

    cy.get('.input-mass [type="number"]').type('22', {force: true})

    cy.get('.input-mass [type="number"]').should('have.value', '22')

    //placingTime

    cy.get('.input-placingTime [type="number"]').type('2', {force: true})

    cy.get('.input-placingTime [type="number"]').should('have.value', '2')


    //storeId

    cy.get('.input-storeId [type="text"]').type('34A', {force: true})

    cy.get('.input-storeId [type="text"]').should('have.value', '34A')

    //withdrawalTime

    cy.get('.input-withdrawalTime [type="number"]').type('67', {force: true})

    cy.get('.input-withdrawalTime [type="number"]').should('have.value', '67')


    cy.get('button').as('btn').click({force: true})

  })

  it('filter check', () => {

    // cy.get('.header-filter').should('have.value', '7F2')


  })

})
