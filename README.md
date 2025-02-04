# Project Stage C - Advanced JavaScript, JQuery, HTML & CSS
Website and JS project for COSC3052: Web Programming Bootcamp (PG)

@Author: Saphron Hastie (s4134901@student.rmit.edu.au)
## Library App
A simple web-app that allows the user to manage a personal book collection. Books are uploaded via CSV.

### TODO
- Add variation for 'month' input on unsupported browsers.
- 

## Grading Rubric
|Topic|Grading Requirements|Location|Connected to...|
|---|----|----|---|
|10.2 Objects|Your website must have records relating to its main theme and these must be stored as objects in a Map. All objects must have relevant member variables, set methods and follow good object oriented coding practices. Classes optional.|A `Book` class is used to handle primary data objects, see `book.js`, and a `Library` class holds the main data map and database methods, see `library.js`|no-number csv uploads && 12.4 Modules|
|Adaptation of provided code|Adapt the Canvas->Modules->Week 1-5...->CSV reader example code to load the primary data records of your website. Minimum of two CSV columns required. Code must load an arbitrary number of lines in the CSV file. No need for validation of CSV data.|`files.js` has file handler methods to import the csv, `script.js` adds an eventListener to `'upload-btn'` which turns uploaded data into `Book` objects and add them to a `Map` inside an instance of the `Library` class|10.2 - Objects|
|10.7 Exception handling|Must throw and catch but not both (on the same exception) from within the same function.|`parseCSV()` will throw an error if the split file has fewer than 2 lines (one for headings and at least one for data). This is caught by the anonymous event listener for `#upload-btn` in the `script.js` file.|No number: CSV|
|11.1 Timers|clear… methods optional.|The `drawTitle()` function in the `display.js` file uses a `setInterval()` timer to run the `animateTitle()` animation|11.5 Canvas && 11.6 Canvas Transformations|
|11.2 Modifying CSS with JavaScript|remove… and delete… methods optional.|The canvas width is adjusted id there are fewer than 15 books; see `drawBook()` function in `display.js`|11.5 Canvas|
|11.3 Form validation|One example from each heading (e.g. 'Validating form input with JavaScript…', etc.)|||
|11.4 Browser differences: JavaScript|One example adequate. Not necessary for whole website.|The publication date, in the `new book` form, defaults to a `type="month"` input which is not supported in Firefox and Safari. A JQuery method (at the end of `script.js`) uses JQuery hide/show to swap between the two input options depending on if the `document` can generate a `type="month` input|12.6-12.7 JQuery/JQUery Selectors|
|11.5 Canvas drawing|Either rectangle/path/arc required (Note: Draw based on primary data stored in a Map for full marks). Graph example adaptation permitted. Other drawing methods optional.|`#book-canvas` displays rects for each book, see `drawBook()` function in `display.js`.|10.2 Objects && 11.2 JS for CSS|
|11.6 Canvas transformations and animation|Either translation/rotation/scaling as a part of a visible animation adequate. These can be on drawings separate from 11.5|The `drawTitle()` function has an `animateTitle()` inner function which is called on a timer. Animation uses scaling and save/restore to render an animation once every second|11.1 Timers && 12.2 Inner Functions|
|12.1 Regular expressions|One example using a special character is adequate for whole of 12.1.|`files.js` uses RegEx to allow for escaped commas and variations on linebreaks. A `pattern="[\d]{4}"` is used on the `<input>` for years on `index.html`.|no-number: csv imports|
|12.2 Inner functions, outer functions, and function scope|One example of an inner function adequate for whole of 12.2.|The constructor for `Book` has an inner function called `newUUID` which uses crypto if available or generates a semi-random id based on current time if not. Also, `drawTitle()` returns a `stopAnumation()` function which is then added to an eventListener on a `<button>` to allow the annoying title animation to be paused via `clearInterval()` method.|10.2 Objects && 11.1 Timers && 11.6 Canvas Animation|
|12.4 Modules|At least two separate .js files and function/method invocation across modules required. Modules must demonstrate separation of concerns.|`files.js` contains methods relating to import/export of csvs (would be easily extensible to allow for using a csv library in future), `display.js` holds methods for DOM manipulation and translation of data into visual elements, `library.js` and `book.js` classes are in their own files, and finally `script.js` is the entry point which adds event listeners with relevant imported functions, and holds the current instance of the `Library` class|All??|
|12.5 Strict mode|One instance of strict mode adequate.|`script.js` uses strict mode - my IDE is also set to enforce/highlight strict mode rules by default|N/A or arguably all|
|12.6 Getting started with jQuery|One example of jQuery + good practices for whole of 12.6.|||
|12.7 [JQuery] Selectors|One selector adequate for whole of 12.7.|||
|12.8 [JQuery] Events|One example each from 'ready', 'mouse', 'keyboard/form' adequate.|JQuery example in `script.js` uses an on ready wrapper `$(document).ready(function () {});` to contain the additional JQuery examples.|12.6-12.10 && 11.3 JS Form Validation|
|12.10 [JQuery] DOM manipulation|One add, one remove for the whole of 12.10.|||
|12.3 Closures|Only an explanation using your code during presentation adequate.|Example: the `animateTitle()` inner function and `drawTitle` outer function context stays alive in stack due to repeated calls via the `setInterval` call|All??|

## Notes and Citations
Month override code based on [MDN type="month" Example](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/month#browser_compatibility)