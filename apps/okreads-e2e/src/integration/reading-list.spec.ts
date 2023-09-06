describe('When: I use the reading list feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });
  it('Then: I should see my reading list', () => {
    cy.get('[data-testing="toggle-reading-list"]').click();
    cy.get('[data-testing="reading-list-container"]').should(
      'contain.text',
      'My Reading List'
    );
  });

  it('Then: I should be able to mark a book as finished by clicking a button',()=>{
    cy.get('#mat-input-0').type('javascript');
    cy.get('form').submit();
    cy.get('[data-testing="want-to-read-button"]').first().click();
    cy.get('[data-testing="want-to-read-button"]').first().should("be.disabled");
    cy.get('[data-testing="toggle-reading-list"]').click();
    cy.get('[data-testing="finished-action-button"]').first().click();
    cy.get('[data-testing="book-finished-label"]').should("exist");
    cy.get('[data-testing="remove-button"]').click();
    cy.get('.reading-list-item').should('have.length', 0);    
  });

});