describe("Studio Pilates Co — skeleton", () => {
  beforeEach(() => cy.task("reseed"));

  it("renders app shell", () => {
    cy.visit("/");
    cy.contains("Studio Pilates Co").should("exist");
  });

  it("shows booking form skeleton", () => {
    cy.visit("/");
    cy.get('[data-cy=class-select]').should("exist");
    cy.get('[data-cy=name-input]').should("exist");
    cy.get('[data-cy=submit-booking]').should("be.disabled");
  });
});
