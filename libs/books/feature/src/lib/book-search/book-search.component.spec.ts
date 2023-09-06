import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { OverlayContainer } from '@angular/cdk/overlay';
import {
  createBook,
  createReadingListItem,
  SharedTestingModule,
} from '@tmo/shared/testing';
import { BooksFeatureModule } from '../books-feature.module';
import { BookSearchComponent } from './book-search.component';
import { Book } from '@tmo/shared/models';
import { addToReadingList, getAllBooks, getBooksError, removeFromReadingList } from '@tmo/books/data-access';

describe('ProductsListComponent', () => {
  let component: BookSearchComponent;
  let fixture: ComponentFixture<BookSearchComponent>;
  let store: MockStore;
  let oc: OverlayContainer;
  let overlayContainerElement: HTMLElement;
  let spyTest: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BooksFeatureModule, SharedTestingModule],
      providers: [provideMockStore({ initialState: { books: { entities: [] } } }),]
    }).compileComponents();
    store = TestBed.inject(MockStore);
    oc = TestBed.inject(OverlayContainer);
    overlayContainerElement = oc.getContainerElement();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSearchComponent);
    component = fixture.componentInstance;
    store.overrideSelector(getAllBooks, []);
    store.overrideSelector(getBooksError, '');
    spyTest = spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should add book to reading list', () => {    
    const book: Book = createBook('B');
    component.addBookToReadingList(book);
    expect(store.dispatch).toHaveBeenCalledWith(addToReadingList({ book }));
  });

  it('should create a snackbar', () => {
    const app = fixture.debugElement.componentInstance;
    app.addBookToReadingList(createReadingListItem('A'));
    fixture.detectChanges();
    const snackBar = document.querySelector('snack-bar-container');
    expect(snackBar).toBeTruthy();
  });

  it('should trigger snackBar to UNDO the addReadList', () => {
    const book: Book = createBook('B');
    component.addBookToReadingList(book);
    const buttonElement: HTMLElement = overlayContainerElement
      .querySelector('.mat-simple-snackbar-action > button');
    buttonElement?.click();
    expect(spyTest).toHaveBeenCalledWith(removeFromReadingList({item: {...book, bookId: 'B'}}));
  });
});