import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { OverlayContainer } from '@angular/cdk/overlay';
import {
  createBook,
  createReadingListItem,
  SharedTestingModule,
} from '@tmo/shared/testing';
import { ReadingListComponent } from './reading-list.component';
import { BooksFeatureModule } from '@tmo/books/feature';
import { Book, ReadingListItem } from '@tmo/shared/models';
import { addToReadingList, getReadingList, removeFromReadingList } from '@tmo/books/data-access';

describe('ReadingListComponent', () => {
  let component: ReadingListComponent;
  let fixture: ComponentFixture<ReadingListComponent>;
  let store: MockStore;
  let overlayContainerElement: HTMLElement;
  let spyTest: any;
  let overlayContainer: OverlayContainer;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BooksFeatureModule, SharedTestingModule],
      providers: [provideMockStore({ initialState: { items: {} } }),]
    }).compileComponents();
    store = TestBed.inject(MockStore);
    overlayContainer = TestBed.inject(OverlayContainer);
    overlayContainerElement = overlayContainer.getContainerElement();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingListComponent);
    component = fixture.componentInstance;
    store.overrideSelector(getReadingList, []);
    fixture.detectChanges();
    spyTest = spyOn(store, 'dispatch').and.callThrough();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should remove book from reading list', () => {
    const book: ReadingListItem = createReadingListItem('B');
    component.removeFromReadingList(book);
    expect(store.dispatch).toHaveBeenCalledWith(removeFromReadingList({ item: book }));
  });

  it('should create a snackbar', () => {
    const app = fixture.debugElement.componentInstance;
    app.removeFromReadingList(createReadingListItem('A'));
    fixture.detectChanges();
    const snackBarDiv = document.querySelector('snack-bar-container');
    expect(snackBarDiv).toBeTruthy();
  });

  it('should trigger snackBar to UNDO the removeReadList', () => {        
    const book: Book = createBook('B');
    component.removeFromReadingList(book);
    const buttonElement: HTMLElement = overlayContainerElement
      .querySelector('.mat-simple-snackbar-action > button');
    buttonElement?.click();
    expect(spyTest).toHaveBeenCalledWith(addToReadingList({book: {...book, id: 'B'}}));
  });

});
