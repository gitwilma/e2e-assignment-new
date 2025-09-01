describe("Studio Pilates Co — skeleton", () => {
  beforeEach(() => {
    cy.task("reseed");
  });

  it("renders app shell", () => {
    cy.visit("/");
    cy.contains("Studio Pilates Co").should("exist");
  });
});
