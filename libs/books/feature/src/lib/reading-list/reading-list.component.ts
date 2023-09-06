import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { addToReadingList, getReadingList, removeFromReadingList } from '@tmo/books/data-access';
import { Book } from '@tmo/shared/models';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent {
  addBookToReadingList(book: Book) {
    throw new Error('Method not implemented.');
  }
  readingList$ = this.store.select(getReadingList);

  constructor(
    private readonly store: Store,
    private snackBar: MatSnackBar) {}

  removeFromReadingList(item) {
    this.store.dispatch(removeFromReadingList({ item }));
    this.undoRemoveFromReadingList(item)
  }

  undoRemoveFromReadingList(item: Book) {
    const snackBarRef = this.snackBar
      .open(`${item.title} removed from the reading lis`, 'Undo', { duration: 3000 })
    
    snackBarRef.onAction().subscribe(() => {
      this.store.dispatch(addToReadingList({
        book: { ...item, id: item.id },
      })
    )});
  }

}
