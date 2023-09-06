## Code review

In book-search.component.ts,
In book-search.component.html

- AsyncPipe accepts as argument an observable or a promise, 
so don’t need to remember to unsubscribe from the observable when the component is destroyed.

- ngFor with trackBy function to identify items in a list of DOM elements like a list/array 
to perform unique updates in the DOM and improve performance.

- Book description property is directly bound to the template for 
such need sanitization mechanisms (avoiding cross site scriptiong).
Instead used interpolation like other author and publisher.

In total-count.component.ts, 
- We can remove empty ngOnInit method.

## Automated scan

- Search button do not have an accessible name.

- Background and foreground colors do not have a sufficient contrast ratio.

## Accessibility

- Images need to have 'alt' attribute.

- Reading List close button does not have a label.

- Added aria disabled for the "want to read" button.
Modified the label for "want to read" button (Added book title to the label).

## Test cases

- Reducers are not available for failedAddToReadingList and failedRemoveFromReadingList actions. 