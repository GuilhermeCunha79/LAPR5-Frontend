describe('empty spec', () => {

  beforeEach(() => {
    cy.visit('http://localhost:4200/login')
  })

  it('Login as test user', () => {

    // Email
    cy.get('#input-email [type="text"]').type('4', {force: true})

    cy.get('#input-email [type="text"]').should('have.value', '4')

    // Password
    cy.get('#input-password [type="password"]').type('4', {force: true})

    cy.get('#input-password [type="password"]').should('have.value', '4')

    cy.get('#button-login').as('btn').click({force: true})
  })

  it('filter check', () => {
  })
})
