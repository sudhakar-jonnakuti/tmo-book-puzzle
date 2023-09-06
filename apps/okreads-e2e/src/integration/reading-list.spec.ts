describe('When: I use the reading list feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should see my reading list', () => {
    cy.get('[data-testing="toggle-reading-list"]').click();
    cy.get('[data-testing="reading-list-container"]').should('contain.text', 'My Reading List');
  });

  it('Then: I should be able to add book to reading list and UNDO it when user clicks UNDO button on the snackbar', async () => {
    cy.get('input[type="search"]').type('javascript');
    cy.get('form').submit();
    if(!(cy.get('[data-testing="book-item"]').find('button:not(:disabled)'))) return;

    const listLength = cy.get('.reading-list-item').then( vals => vals.length);
    cy.get('[data-testing="book-item"]').find('button:not(:disabled)').first().click();
    cy.get('.reading-list-item').should('have.length.greaterThan', listLength);
    
    cy.get('.mat-simple-snackbar-action .mat-button').click();
    cy.get('.reading-list-item').should('have.length', listLength);
  });


  it('Then: should search for a book, add it to the reading list, delete it, and undo the deletion', async () => {
    cy.get('input[type="search"]').type('javascript');
    cy.get('form').submit();
    cy.get('[data-testing="book-item"]').first().click();

    cy.get('[data-testing="toggle-reading-list"]').click();
    cy.get('.reading-list-item').should('have.length', 1);

    cy.get('.reading-list-item:last-child .mat-icon-button').click();
    cy.get('.reading-list-item').should('have.length', 0);

    cy.get('.mat-simple-snackbar-action .mat-button').click();
    cy.get('.reading-list-item').should('have.length', 1);    
  });

});
