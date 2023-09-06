import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedTestingModule } from '@tmo/shared/testing';

import { BooksFeatureModule } from '../books-feature.module';
import { BookSearchComponent } from './book-search.component';
import { searchBooks } from '@tmo/books/data-access';

describe('ProductsListComponent', () => {
  let component: BookSearchComponent;
  let fixture: ComponentFixture<BookSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BooksFeatureModule, NoopAnimationsModule, SharedTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

    
  it('should get the typed search query', () => {
    const el = fixture.nativeElement.querySelector('input');
    el.value = 'javascript';
    el.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.searchForm.value).toBe('javascript');
    });
  });
  
  it('should call searhBooks and dispatch search action', () => {
    spyOn(component, 'searchBooks');
    const el = fixture.nativeElement.querySelector('input');
    el.value = 'javascript';
    el.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.searchBooks).toHaveBeenCalledWith('javascript');
      expect(component['store'].dispatch).toHaveBeenCalledWith(
        searchBooks({ term: 'javascript' })
      );
    });
  });

});
