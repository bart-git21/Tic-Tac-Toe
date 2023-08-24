describe("game", () => {
  beforeEach(() =>
    cy.visit("http://localhost/projects/js_projects/tic%20tac%20toe/index.html")
  );

  it("Start func works correctly", () => {
    cy.get('[data-test="resultField"]').should("have.not.text");
  });

  it("Click func works correctly", () => {
    cy.get('[data-test="ticTacWrapper"] > div').eq(0).click();
    cy.get('[data-test="ticTacWrapper"]').within(() => {
      cy.get("div").its(0).should("contains.text", "X");
    });

    cy.get('[data-test="ticTacWrapper"] > div').eq(0).click();
    cy.get('[data-test="ticTacWrapper"]').within(() => {
      cy.get("div").its(0).should("contains.text", "X");
    });

    cy.get('[data-test="ticTacWrapper"] > div').eq(1).click();
    cy.get('[data-test="ticTacWrapper"]').within(() => {
      cy.get("div").its(1).should("contains.text", "O");
    });
  });

  it("Winning case works correctly", () => {
    cy.get('[data-test="ticTacWrapper"] > div').eq(0).click();
    cy.get('[data-test="ticTacWrapper"] > div').eq(1).click();
    cy.get('[data-test="ticTacWrapper"] > div').eq(4).click();
    cy.get('[data-test="ticTacWrapper"] > div').eq(5).click();
    cy.get('[data-test="ticTacWrapper"] > div').eq(8).click();
    
    cy.get('[data-test="resultField"]').should("have.text", "X is winning!");
  })

  it.only("Draw case works correctly", () => {
    cy.get('[data-test="ticTacWrapper"] > div').eq(0).click();
    cy.get('[data-test="ticTacWrapper"] > div').eq(1).click();
    cy.get('[data-test="ticTacWrapper"] > div').eq(2).click();
    cy.get('[data-test="ticTacWrapper"] > div').eq(4).click();
    cy.get('[data-test="ticTacWrapper"] > div').eq(5).click();
    cy.get('[data-test="ticTacWrapper"] > div').eq(8).click();
    cy.get('[data-test="ticTacWrapper"] > div').eq(7).click();
    
    cy.get('[data-test="resultField"]').should("have.text", "it's draw");
  })
});
