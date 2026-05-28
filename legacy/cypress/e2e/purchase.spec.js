describe('SauceDemo - Purchase Flow', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/')
  })

  it('should complete a successful purchase flow', () => {
    // Login como standard_user
    cy.login('standard_user', 'secret_sauce')
    
    // Validar que está na página de produtos
    cy.url().should('include', '/inventory.html')
    cy.get('.title').should('contain', 'Products')

    // Adicionar 3 produtos ao carrinho
    // Produto 1: Sauce Labs Backpack
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    
    // Produto 2: Sauce Labs Bike Light
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
    
    // Produto 3: Sauce Labs Bolt T-Shirt
    cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click()

    // Validar badge do carrinho mostra 3 itens
    cy.get('[data-test="shopping-cart-badge"]').should('have.text', '3')

    // Clicar no carrinho
    cy.get('[data-test="shopping-cart-link"]').click()
    cy.url().should('include', '/cart.html')

    // Validar que os 3 produtos estão no carrinho
    cy.get('.cart_item').should('have.length', 3)

    // Clicar em Checkout
    cy.get('[data-test="checkout"]').click()
    cy.url().should('include', '/checkout-step-one.html')

    // Preencher informações de checkout
    cy.get('[data-test="firstName"]').type('John')
    cy.get('[data-test="lastName"]').type('Doe')
    cy.get('[data-test="postalCode"]').type('12345')

    // Clicar Continue
    cy.get('[data-test="continue"]').click()
    cy.url().should('include', '/checkout-step-two.html')

    // Validar resumo de compra (3 itens)
    cy.get('.cart_item').should('have.length', 3)

    // Clicar em Finish para finalizar a compra
    cy.get('[data-test="finish"]').click()
    cy.url().should('include', '/checkout-complete.html')

    // Validar mensagem de sucesso final
    cy.get('.complete-header').should('contain', 'Thank you for your order!')
    cy.get('.complete-text').should('be.visible')
  })
})
