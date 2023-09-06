import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addToReadingList,
  clearSearch,
  getAllBooks,
  searchBooks
} from '@tmo/books/data-access';
import { FormControl } from '@angular/forms';
import { Book } from '@tmo/shared/models';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit, OnDestroy {
  searchSubscription$: Subscription;
  searchForm = new FormControl('');

  books$ = this.store.select(getAllBooks);

  constructor(
    private readonly store: Store,
  ) {}

  ngOnInit() {
    this.instantSearchBook();
  }

  instantSearchBook () {
    this.searchSubscription$ = this.searchForm.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
      )
      .subscribe((query: string) => {
        this.searchBooks(query.trim());
      });
  }

  trackByBookId(index, item) {
    return item.id;
  }

  formatDate(date: void | string) {
    return date
      ? new Intl.DateTimeFormat('en-US').format(new Date(date))
      : undefined;
  }

  addBookToReadingList(book: Book) {
    this.store.dispatch(addToReadingList({ book }));
  }

  searchExample() {
    this.searchForm.setValue('javascript');
  }

  searchBooks(query: string) {
    if (query) {
      this.store.dispatch(searchBooks({ term: query }));
    } else {
      this.store.dispatch(clearSearch());
    }
  }

  ngOnDestroy(): void {
    this.searchSubscription$?.unsubscribe();
  }

}