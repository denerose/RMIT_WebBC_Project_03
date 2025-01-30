import { Book } from './book.js';

/**
 * Returns new HTML element with properties ready to be appended to the DOM
 * @param {string} elType element type e.g. 'div', 'p', 'h1'
 * @param {object} props object containing properties for the element - {string} id, {array<string>} or {string} classes, {string} text
 * @returns {HTMLElement} element
 */
function newElement(elType, props) {
	const element = document.createElement(elType);

	if (typeof props !== 'object') {
		console.warn('props must be an object');
		return element;
	}

	if (props.classes && Array.isArray(props.classes)) {
		props.classes.forEach((c) => element.classList.add(c));
	} else if (typeof props.classes === 'string') {
		element.classList.add(props.classes);
	}

	if (props.id) element.id = props.id;

	if (props.text) element.textContent = props.text;

	return element;
}

function newBookElement(book, libraryRef) {
	const bookEl = newElement('div', {
		classes: ['book', 'card'],
		id: book.callNum,
	});
	const title = newElement('h3', { text: book.title });
	const author = newElement('p', { classes: 'author', text: `${book.author}` });
	const pages = newElement('p', { text: `${book.pages} pages` });
	const readPercentage = newElement('p', {
		text: `${book.readPercentage}% read`,
	});
	const pubDate = newElement('p', { text: `Published: ${book.pubDate}` });
	const callNum = newElement('p', { text: `Call Number: ${book.callNum}` });
	const delBtn = newElement('button', { text: 'X', classes: 'delBtn' });

	delBtn.addEventListener('click', () => {
		libraryRef.removeBook(book.callNum);
		displayBooks(libraryRef);
	});

	bookEl.appendChild(title);
	bookEl.appendChild(author);
	bookEl.appendChild(pages);
	bookEl.appendChild(readPercentage);
	bookEl.appendChild(pubDate);
	bookEl.appendChild(delBtn);
	bookEl.appendChild(callNum);

	return bookEl;
}

export function displayBooks(library) {
	const booksContainer = document.getElementById('book-list');
	booksContainer.replaceChildren();

	library.getAllBooks().forEach((book) => {
		const bookEl = newBookElement(book, library);
		booksContainer.appendChild(bookEl);
	});
}
