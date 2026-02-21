// custom commands for Cypress
Cypress.Commands.add('login', (username, password) => {
  cy.get('[data-test="username"]').type(username);
  cy.get('[data-test="password"]').type(password);
  cy.get('[data-test="login-button"]').click();
});

// Custom command: Add product to cart by data-test ID
Cypress.Commands.add('addToCart', (productId) => {
  cy.get(`[data-test="add-to-cart-${productId}"]`).click();
});

// Custom command: Go to cart
Cypress.Commands.add('goToCart', () => {
  cy.get('[data-test="shopping-cart-link"]').click();
  cy.url().should('include', '/cart.html');
});
