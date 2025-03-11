describe("Posts Detail Page", () => {
  beforeEach(() => {
    cy.setCookie(
      "token",
      "8ab2666dde2ff8fd978726bedb30cd2d19f28e9c787ad8fb9b643cd8d7b97174"
    );
    cy.setCookie("user_id", "7760201");
    cy.visit("/posts/198348");
  });

  it("should display content title and body correctly", () => {
    cy.get("h2.ant-typography")
      .should("be.visible")
      .and("contain", "Virga et paulatim et deserunt.");
    cy.get("span.ant-typography")
      .should("be.visible")
      .and("contain", "Aeger acer bibo.");
  });

  it("should display the author details correctly", () => {
    cy.get("h5").contains("Author Detail :").should("be.visible");

    cy.get("p.font-bold")
      .contains("Name")
      .next()
      .should("contain", "Marut Ahuja");

    cy.get("p.font-bold")
      .contains("Email")
      .next()
      .should("contain", "marut_ahuja@klocko.test");

    cy.get("p.font-bold").contains("Gender").next().should("contain", "female");

    cy.get("p.font-bold")
      .contains("Satatus")
      .next()
      .should("contain", "active");
  });

  it("should display back button and working perfectly", () => {
    cy.get("button").contains("Back").should("be.visible").click();
  });
});
