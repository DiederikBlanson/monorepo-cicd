describe("template spec", () => {
  it('Visits the website and checks for "Diederik"', () => {
    cy.visit("http://localhost:3000");

    // Use the `should` assertion to check if the text exists on the page
    cy.contains("Diederik").should("exist");
  });
});
