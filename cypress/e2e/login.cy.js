describe("Form Validation", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("should check name input, token, and submit button", () => {
    cy.get("input[name='name']")
      .should("be.visible")
      .type("mahaasin")
      .should("have.value", "mahaasin");

    cy.get("input[name='token']")
      .should("be.visible")
      .type("8ab2666dde2ff8fd978726bedb30cd2d19f28e9c787ad8fb9b643cd8d7b97174")
      .should(
        "have.value",
        "8ab2666dde2ff8fd978726bedb30cd2d19f28e9c787ad8fb9b643cd8d7b97174"
      );

    cy.get("button[type='submit']")
      .should("be.visible")
      .should("not.be.disabled")
      .click();

    cy.contains("Login successfully").should("be.visible");
  });
});
