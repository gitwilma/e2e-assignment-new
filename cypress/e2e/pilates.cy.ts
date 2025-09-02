describe("Studio Pilates Co — skeleton", () => {
  beforeEach(() => cy.task("reseed"));

  it("should render app shell", () => {
    cy.visit("/");
    cy.contains("Studio Pilates Co").should("exist");
  });

  it("should display booking form skeleton", () => {
    cy.visit("/");
    cy.get('[data-cy=class-select]').should("exist");
    cy.get('[data-cy=name-input]').should("exist");
    cy.get('[data-cy=submit-booking]').should("be.disabled");
  });

  it("should allow booking a free class and then shows it as full", () => {
  cy.visit("/");
  cy.get('[data-cy=class-select]').select("Reformer Basic 18:00");
  cy.get('[data-cy=name-input]').type("Kristin");
  cy.get('[data-cy=submit-booking]').click();

  cy.get('[data-cy=booking-success]').should("contain", "Kristin");
  cy.visit("/");
  cy.get('[data-cy=class-select] option:disabled').contains("Reformer Basic 18:00");
});

it("should prevent double booking the same class", () => {
  cy.visit("/");
  cy.get('[data-cy=class-select]').select("Matwork 07:00");
  cy.get('[data-cy=name-input]').type("Jim");
  cy.get('[data-cy=submit-booking]').click();

  cy.visit("/");
  cy.get('[data-cy=class-select] option:disabled').contains("Matwork 07:00");
});

it("should validate invalid input and allow booking after correction", () => {
  cy.visit("/");
  cy.get('[data-cy=class-select]').select("Stretch 12:00");
  cy.get('[data-cy=submit-booking]').should("be.disabled");
  cy.get('[data-cy=name-input]').type("K").blur();
  cy.get('[data-cy=submit-booking]').should("be.disabled");

  cy.get('[data-cy=name-input]').clear().type("Kasper");
  cy.get('[data-cy=submit-booking]').should("not.be.disabled").click();
  cy.get('[data-cy=booking-success]').should("contain", "Kasper");
});

});
