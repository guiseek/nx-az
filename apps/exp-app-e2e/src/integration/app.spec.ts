import { getGreeting } from '../support/app.po'

describe('exp-app', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.injectAxe()
  })

  it('should display welcome message', () => {
    // Custom command example, see `../support/commands.ts` file
    cy.login('my-email@something.com', 'myPassword')

    // Function helper example, see `../support/app.po.ts` file
    getGreeting().contains('Welcome to exp-app!')
  })

  it('Has no detectable a11y violations on load (custom configuration)', () => {
    // Configure aXe and test the page at initial load

    cy.configureAxe({
      // branding: {
      //   brand: String,
      //   application: String
      // },
      reporter: 'no-passes',
      // checks: [Object],
      rules: [Object],
      // locale: Object
    })
    cy.checkA11y()
  })
})
