describe("Posts Page", () => {
  beforeEach(() => {
    cy.setCookie(
      "token",
      "8ab2666dde2ff8fd978726bedb30cd2d19f28e9c787ad8fb9b643cd8d7b97174",
    );
    cy.setCookie("user_id", "7760201");
    cy.visit("/posts");
  });

  it("should contain the create modal, button, card layout, and pagination", () => {
    cy.get("#create-post-modal").should("be.visible");
    cy.get("#search-wrapper").should("be.visible");
    cy.get("#card-layout").should("be.visible");
    cy.get(".post-card").should("be.visible");
    cy.get("#pagination-wrapper").should("be.visible");
  });

  it("should open the and post new blog post", () => {
    cy.get("#create-post-modal").click();
    cy.get("input[name='title']")
      .should("be.visible")
      .type("cypress test")
      .should("have.value", "cypress test");
    cy.get("textarea[name='body']")
      .should("be.visible")
      .type("cypress test body content")
      .should("have.value", "cypress test body content");
    cy.get("button[type='submit']")
      .should("be.visible")
      .should("not.be.disabled")
      .click();
    cy.contains("Post created successfully").should("be.visible");
  });

  it("should update the blog post", () => {
    cy.get(".post-card").should("be.visible").first().click();

    cy.get(".post-card")
      .first()
      .within(() => {
        cy.get("#dropdown-btn").should("be.visible").click();
      });

    cy.get("#edit-post-modal").should("be.visible").click();
    cy.get("input[name='title']")
      .should("be.visible")
      .type("{moveToEnd} cypress test")
      .invoke("val")
      .should("include", "cypress test");

    cy.get("textarea[name='body']")
      .should("be.visible")
      .type("{moveToEnd} cypress test body content")
      .invoke("val")
      .should("include", "cypress test body content");

    cy.get("button[type='submit']")
      .should("be.visible")
      .should("not.be.disabled")
      .click();
  });

  it("should delete the blog post", () => {
    cy.get(".post-card").should("be.visible").first().click();

    cy.get(".post-card")
      .first()
      .within(() => {
        cy.get("#dropdown-btn").should("be.visible").click();
      });

    cy.get("#delete-post").should("be.visible").click();
    cy.contains("button", "Yes").should("be.visible").click();
    cy.contains("Post deleted successfully").should("be.visible");
  });
});
