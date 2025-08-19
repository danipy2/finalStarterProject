describe("Bookmark functionality", () => {
  beforeEach(() => {
    // Visit home page and login
    cy.visit("/");
    cy.login("enanuwende@gmail.com", "1111"); // replace with test user
  });

  it("should bookmark a job", () => {
    // Find the first job's bookmark button and click
    cy.get('[data-testid="bookmark-toggle"]',{ timeout: 10000 }).first().click();

    // Assert that the bookmark icon class has changed
    cy.get('[data-testid="bookmark-toggle"]',{ timeout: 10000 })
      .first()
      .find("svg")
      .should("have.class", "text-blue-600");
  });

  it("should remove a bookmark", () => {
    // Click again to unbookmark
    cy.get('[data-testid="bookmark-toggle"]',{ timeout: 10000 }).first().click();

    // Assert the icon is back to unbookmarked
    cy.get('[data-testid="bookmark-toggle"]')
      .first()
      .find("svg")
      .should("not.have.class", "text-blue-600");
  });
});
